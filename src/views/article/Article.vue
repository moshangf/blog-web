<template>
  <div class="article">
    <div v-html="content"/>

    <hr class="article_hr"/>

    <u-comment class="comment"
               :config="config"
               @submit="submit"
               @like="like"
               @operate="operate"
               relative-time
               upload/>
  </div>
</template>


<script setup>
import {inject, onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import api from "../../api";
import emoji from "../../assets/js/emoji";
import {throttle, createObjectURL, UToast, dayjs} from "undraw-ui";


const router = useRouter();
const content = ref();
let article = ref();
article = inject('article') //向父组件传递文章信息
const articleId = router.currentRoute.value.params.id;
const config = reactive({
  user: {
    id: 1,
    username: 'rose',
    avatar: 'https://static.juzicon.com/avatars/avatar-200602130320-HMR2.jpeg?x-oss-process=image/resize,w_100',
    // 评论id数组 建议:存储方式用户uid和评论id组成关系,根据用户uid来获取对应点赞评论id,然后加入到数组中返回
    likeIds: [1, 2, 3]
  },
  emoji: emoji,
  comments: [],
  total: 10,
  // 默认全部用户显示，#1当前用户显示，#2当前用户以外显示
  tools: ['举报#2', '删除#1', '复制', '屏蔽#2']
})


/**
 *  工具栏操作
 * @param type 操作类型
 * @param comment 评论
 * @param finish 回调函数
 */
const operate = (type, comment, finish) => {
  _throttle(type, comment, finish)
}
const _throttle = throttle((type, comment, finish) => {
  switch (type) {
    case '删除':
      api.deleteComment(comment.id).then(res => {
        if (res.data.code === 20000) {
          UToast({message: '删除成功!', type: 'success'})
          finish()
        }
      });
      break
    case '举报':
      UToast({message: '举报成功!', type: 'success'})
      break
  }
})


let temp_id = 100   // 评论id
/**
 * 提交评论事件
 * @param content 评论内容
 * @param parentId 父评论id
 * @param files 评论文件内容
 * @param finish 回调函数
 * @param replyId 回复id
 */
const submit = ({content, parentId, files, finish, replyId}) => {
  let str = '提交评论:' + content + ';\n父id: ' + parentId + ';\n图片:' + files + ';\nfinish:' + finish + ';\n回复id:' + replyId
  console.log(str)

  /**
   * 上传文件后端返回图片访问地址，格式以'||'为分割; 如:  '/static/img/program.gif||/static/img/normal.webp'
   */
  let contentImg = files.map(e => createObjectURL(e)).join('||')

  const comment = {
    id: String((temp_id += 1)),
    parentId: parentId,
    uid: config.user.id,
    address: '来自江苏',
    content: content,
    likes: 0,
    contentImg: contentImg,
    user: {
      username: config.user.username,
      avatar: config.user.avatar,
      level: 6,
      homeLink: `/${(temp_id += 1)}`
    },
    reply: null
  }

  // 保存评论到后端
  let param = {
    parentId: parentId,
    userId: config.user.id,
    articleId: articleId,
    likes: 0,
    content: content
  }
  api.addComment(param).then(res => {
    if (res.data.code === 20000) {
      setTimeout(() => {
        finish(comment)
        UToast({message: '评论成功!', type: 'info'})
      }, 200)
    } else {
      UToast({message: '评论失败!', type: 'error'})
    }
  })
}

/**
 * 点赞事件
 * @param id 评论id
 * @param finish 回调函数
 */
const like = (id, finish) => {
  console.log('点赞评论: ' + id)
  setTimeout(() => {
    finish()
  }, 200)
}

onMounted(() => {
  // 查询文章详情
  api.getArticleInfo(articleId).then(res => {
    content.value = res.data.data.content;
    article.value = res.data.data;
  })

  // 分页查询文章评论
  let param = {pageNum: 1, pageSize: 10, articleId: articleId}
  api.getCommentListByArticleId(param).then(res => {
    console.log("后端数据：", res.data.data)
    config.comments = res.data.data
  })
})

</script>


<style scoped lang="scss">
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