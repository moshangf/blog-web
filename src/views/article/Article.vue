<template>
  <div class="article">

    <!-- 文章内容 -->
    <div class="article-content" v-html="processContent(content)" />

    <!-- 割线 -->
    <hr class="article_hr" />    <!-- 评论区 -->
    <u-comment-scroll :disable="disable" @more="more">
      <u-comment class="comment" :config="config" @submit="submit" @reply-page="replyPage" @before-data="beforeData"
        @like="like" @operate="operate" relative-time upload />
    </u-comment-scroll>

  </div>
</template>


<script setup>
import { inject, onMounted, reactive, ref, nextTick, onUnmounted, createApp, h } from "vue";
import { useRouter } from "vue-router";
import api from "../../api";
import emoji from "../../assets/js/emoji.js";
import { UToast } from "undraw-ui";
import { useCopyCode } from '../../utils/useCopyCode.js'
import { ElMessage, ElImageViewer } from 'element-plus'

const { copyCode } = useCopyCode()

const router = useRouter();
const content = ref();
const article = inject('article') //向父组件传递文章信息
const articleId = router.currentRoute.value.params.id;

const config = reactive({
  user: {
    id: null, // 从后端获取登录用户信息
    username: '', // 用户名
    avatar: '', // 用户头像
    level: 1, // 用户等级
    homeLink: '', // 用户主页链接
    likeIds: [] // 用户点赞列表
  },
  emoji: emoji,
  comments: [], // 评论列表
  replyShowSize: 5, // 回复列表显示条数
  relativeTime: true,  // 开启人性化时间
  page: true, // 开启分页
})

const query = reactive({
  pageNum: 1, // 当前页数
  pageSize: 3, // 页大小
  total: 0,   // 评论总数 
  articleId: articleId // 文章id
})

// 添加预览相关的响应式变量
const imageUrls = ref([])

/**
 * 展示文章正文内容
 */
const processContent = (content) => {
  if (!content) return '';
  const div = document.createElement('div');
  div.innerHTML = content;

  // 处理标题
  const headings = div.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const titleTemplate = (text) => `
    <span class="title-icon">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-icon-test"></use>
      </svg>
    </span>
    <span class="title-text">${text}</span>
  `;

  headings.forEach(heading => {
    heading.innerHTML = titleTemplate(heading.textContent);
  });

  return div.innerHTML;
}

/**
 * 预览图片
 */
const previewImage = (index) => {
  if (imageUrls.value.length > 0) {
    // 创建容器并挂载
    const container = document.createElement('div')
    document.body.appendChild(container)

    const instance = createApp({
      render() {
        return h(ElImageViewer, {
          urlList: imageUrls.value,
          initialIndex: index,
          onClose: () => {
            instance.unmount();
            container.remove(); // 确保移除容器
          },
        })
      }
    })

    instance.mount(container)
  }
}

/**
 *  工具栏操作
 * @param type 操作类型
 * @param comment 评论
 * @param finish 回调函数
 */
const operate = async (type, comment, finish) => {
  try {
    switch (type) {
      case '删除':
        const res = await api.deleteComment(comment.id)
        if (res.data.code === 20000) {
          UToast({ message: '删除成功!', type: 'success' })
          finish()
        } else {
          UToast({ message: '删除失败!', type: 'error' })
        }
        break
      case '举报':
        UToast({ message: '举报成功!', type: 'success' })
        break
    }
  } catch (error) {
    UToast({ message: '操作失败!', type: 'error' })
  }
}

/**
 * 提交评论事件
 * @param content 评论内容
 * @param parentId 父评论id
 * @param files 评论文件内容
 * @param finish 回调函数
 * @param replyId 回复id
 */
// 使用 async/await 简化异步代码
const submit = async ({ content, parentId, finish }) => {
  const submitAction = async () => {
    try {
      const userInfo = config.user
      // 构建评论参数
      const param = {
        parentId,
        userId: userInfo.id,
        articleId,
        content
      }

      const res = await api.addComment(param)
      if (res.data.code === 20000) {
        finish(res.data.data)
        UToast({ message: '评论成功!', type: 'success' })
      } else {
        UToast({ message: res.data.message, type: 'error' })
      }
    } catch (error) {
      UToast({ message: error.message, type: 'error' })
    }
  }
  await submitAction()
}

/**
 * 点赞事件
 * @param id 评论id
 * @param finish 回调函数
 */
const like = async (id, finish) => {
  const likeAction = async () => {
    try {
      const res = await api.likeComment(id)
      if (res.data.code === 20000) {
        // 确保id始终为数字类型
        const numId = Number(id)
        const comment = findComment(config.comments, numId)

        const configUser = config.user
        if (!configUser.likeIds.includes(numId)) {
          configUser.likeIds.push(numId)
          if (comment) {
            comment.likeNum = (comment.likeNum || 0) + 1
          }
          UToast({ message: '点赞成功!', type: 'success' })
        } else {
          const index = configUser.likeIds.indexOf(numId)
          configUser.likeIds.splice(index, 1)
          if (comment) {
            comment.likeNum = Math.max((comment.likeNum || 0) - 1, 0)
          }
          UToast({ message: '取消点赞成功!', type: 'success' })
        }
      } else {
        UToast({ message: res.data.message, type: 'error' })
      }
    } catch (error) {
      UToast({ message: '点赞操作失败!', type: 'error' })
    } finally {
      // if (finish) finish()
    }
  }

  await likeAction()
}

const findComment = (comments, targetId) => {
  for (const comment of comments) {
    if (comment.id === targetId) return comment
    if (comment.replies?.length) {
      const found = findComment(comment.replies, targetId)
      if (found) return found
    }
  }
  return null
}

/**
 * 获取当前登录用户信息
 */
const fetchUserInfo = async () => {
  try {
    const res = await api.getCurrentUser()
    if (res.data.code === 20000 && res.data.data) {
      const user = res.data.data
      config.user = {
        id: user.id,
        username: user.nickname,
        avatar: user.avatar,
        likeIds: user.likeCommentIds ? user.likeCommentIds.split(',').map(Number) : []
      }
    } else {
      // 用户未登录
    }
  } catch (error) {
    ElMessage.error('获取用户信息失败')
  }
}

/**
 * 是否禁用滚动加载评论
 */
const disable = ref(false)

/**
 * 获取评论列表
 */
const fetchComments = async () => {
  try {
    const res = await api.getCommentList(query)
    if (res.data.code === 20000) {
      config.comments = res.data.data.list || []
      query.total = res.data.data.total
      query.pageNum++
    } else {
      UToast({ message: '获取评论列表失败', type: 'error' })
    }
  } catch (error) {
    UToast({ message: '获取评论列表失败', type: 'error' })
  }
}

/**
 * 加载更多评论
 */
const more = async () => {
  if (query.pageNum <= Math.ceil(query.total / query.pageSize)) {
    const res = await api.getCommentList(query);
    config.comments.push(...res.data.data.list);
    query.pageNum++;
  } else {
    disable.value = true;
  }
}

/**
 * 获取文章详情
 */
const fetchArticleInfo = async () => {
  try {
    const res = await api.getArticleInfo(articleId)
    if (res.data.code === 20000) {
      content.value = res.data.data.content
      article.value = {
        title: res.data.data.title,
        createTime: res.data.data.createTime,
        pageView: res.data.data.pageView,
        likesCount: res.data.data.likesCount,
        content: res.data.data.content,
        cover: res.data.data.cover,
        id: res.data.data.id
      }

      // 等待 DOM 更新完成后处理目录和图片
      nextTick(() => {
        // 初始化目录
        window.dispatchEvent(new CustomEvent('article-content-updated'))
        // 初始化图片预览
        const articleContent = document.querySelector('.article-content')
        if (articleContent) {
          const images = articleContent.querySelectorAll('img')
          imageUrls.value = Array.from(images).map(img => img.src)
          
          images.forEach((img, index) => {
            img.style.cursor = 'zoom-in'
            img.addEventListener('click', () => {
              previewImage(index)
            })
          })
        }
      })
    }
  } catch (error) {
    ElMessage.error('获取文章详情失败')
  }
}

/**
 * 获取回复列表
 * @param param0 
 */
const replyPage = async ({ parentId, pageNum, pageSize, finish }) => {
  try {
    const res = await api.getReplyPage({ parentId, pageNum, pageSize, articleId: articleId })
    if (res.data.code === 20000) {
      finish(res.data.data)
    } else {
      UToast({ message: '获取回复列表失败', type: 'error' })
    }
  } catch (error) {
    UToast({ message: '获取回复列表失败', type: 'error' })
    finish([]) // 出错时返回空数组
  }
}

// 加载前评论数据处理
const beforeData = async () => {

}

/**
 * 初始化代码块复制功能
 */
const initCodeCopy = () => {
  setTimeout(() => {
    const preBlocks = document.querySelectorAll('.article-content pre')
    preBlocks.forEach(pre => {
      if (!pre.querySelector('.copy-btn')) {
        const copyButton = document.createElement('button')
        copyButton.className = 'copy-btn'
        copyButton.textContent = '复制'
        copyButton.addEventListener('click', copyCode)
        pre.appendChild(copyButton)
      }
    })
  }, 100)
}


onMounted(async() => {
  window.previewImage = previewImage;
  try {
    // 先获取文章详情
    await fetchArticleInfo()
    
    // 再并行执行其他请求
    await Promise.allSettled([
      fetchUserInfo(),
      fetchComments()
    ])
  } finally {
    // 最后初始化代码块复制功能
    initCodeCopy()
  }
})

onUnmounted(() => {
  delete window.previewImage;
  // 清理所有可能存在的预览容器
  document.querySelectorAll('.el-image-viewer__wrapper').forEach(el => el.remove());
})

</script>


<style lang="scss">
// 删除 scoped 样式块中的重复内容，只保留组件特定样式
.article {
  background: rgba(255, 255, 255, 0.8);
  padding: 50px;
  border-radius: 12px;

  .article_hr {
    margin: 40px auto;
    border: 2px dashed;
    width: calc(100% - 4px);
    color: #3399ff;
  }

  .comment {
    background: rgba(255, 255, 255, 0.8);
  }
}
</style>

<style lang="scss">
// 添加一个全局类名来避免样式污染
.article-content {
  line-height: 1.8;
  color: #2c3e50;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    display: flex;
    align-items: center;
    margin: 1.6em 0 0.6em;
    font-weight: 600;
    line-height: 1.4;
    position: relative;

    // 移除之前的 before 伪元素样式
    &::before {
      display: none;
    }

    // 添加图标容器
    .title-icon {
      margin-right: 8px;
      display: flex;
      align-items: center;

      .icon {
        width: 1em;
        height: 1em;
        fill: #3399ff;
        overflow: hidden;
      }
    }
  }

  // 标题文字渐变效果
  h1,
  h2,
  h3 {
    .title-text {
      background: linear-gradient(to right, #3399ff 2%, #2c3e50);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
  }

  // 内容块样式优化
  p {
    margin: 1em 0;
    line-height: 1.8;
    color: #4c4c4c;
  }

  // 列表项样式优化
  ul,
  ol {
    li {
      color: #4c4c4c;
      margin: 8px 0;
    }
  }

  // 代码块样式优化
  pre {
    margin: 16px 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    code {
      color: #c9d1d9;
    }
  }

  img {
    max-width: 100%;
    border-radius: 4px;
    display: block;
    margin: 1em auto;
    cursor: pointer;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.02);
    }
  }

  code {
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 3px;
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
    font-size: 0.85em;
    padding: 0.2em 0.4em;
  }

  pre {
    background-color: #282c34;
    border-radius: 6px;
    padding: 1em;
    overflow: auto;
    position: relative; // 添加相对定位

    // 添加复制按钮样式
    .copy-btn {
      position: absolute;
      right: 10px;
      top: 10px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      color: #fff;
      padding: 4px 8px;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.3s;
      opacity: 0; // 默认隐藏

      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    }

    &:hover {
      .copy-btn {
        opacity: 1; // 鼠标悬停时显示
      }
    }

    code {
      background: none;
      color: #abb2bf;
      padding: 0;
      font-size: 0.9em;
      font-family: Consolas, Monaco, 'Andale Mono', monospace;
      line-height: 1.5;
      word-break: normal;
      white-space: pre;
      tab-size: 4;
    }
  }

  blockquote {
    border-left: 4px solid #3399ff;
    margin: 1em 0;
    padding: 0.5em 1em;
    background-color: rgba(51, 153, 255, 0.1);
    color: #666;
  }

  ul,
  ol {
    padding-left: 2em;
    margin: 1em 0;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 1em 0;

    th,
    td {
      border: 1px solid #eaecef;
      padding: 0.6em 1em;
    }

    th {
      background-color: #f6f8fa;
    }
  }
}

:deep(.el-image-viewer__wrapper) {
  .el-image-viewer__btn {
    color: #fff;
    
    i {
      font-size: 24px;
    }
  }
  
  .el-image-viewer__actions {
    opacity: 0.9;
  }
}
</style>