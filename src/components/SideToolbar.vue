<template>
  <div class="side-toolbar" :class="{ 'article-page': isArticlePage, 'show': showToolbar }">

    <!-- 回到顶部按钮 -->
    <div class="toolbar-item" @click="scrollToTop" title="回到顶部">
      <i class="iconfont icon-dingbu"></i>
    </div>

    <!-- 回到底部按钮 -->
    <div class="toolbar-item" @click="scrollToBottom" title="回到底部">
      <i class="iconfont icon-dibu"></i>
    </div>

    <!-- 沉浸式阅读模式按钮（仅在文章页面显示） -->
    <div v-if="isArticlePage" class="toolbar-item" @click="toggleImmersiveMode"
      :title="immersiveMode ? '退出阅读模式' : '沉浸式阅读'">
      <i class="iconfont" :class="immersiveMode ? 'icon-tuichu' : 'icon-yuedumoshi'"></i>
    </div>

    <!-- 文章点赞按钮（仅在文章页面显示） -->
    <div v-if="isArticlePage" class="toolbar-item" @click="handleLikeArticle" :class="{ 'liked': isLiked, 'disabled': !isLoggedIn }"
      :title="!isLoggedIn ? '请先登录' : isLiked ? '取消点赞' : '点赞'">
      <i class="iconfont icon-icon"></i>
      <span class="like-count" v-if="likesCount > 0">{{ likesCount }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, inject, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import api from '../api'
import { ElMessage } from 'element-plus'

// 获取Vuex store
const store = useStore()

// 是否为文章页面
const route = useRoute()
const isArticlePage = computed(() => route.meta.title === "文章详情")

// 检查用户是否已登录
const isLoggedIn = computed(() => store.getters.isLoggedIn)
const userInfo = computed(() => store.getters.getUserInfo)

// 文章点赞相关
const isLiked = ref(false)
const likesCount = ref(0)
const articleId = computed(() => isArticlePage.value ? route.params.id : null)
// 标记是否已执行检查
const hasCheckedLikeStatus = ref(false)

// 从Article组件注入的文章数据
const article = inject('article', ref({}))

// 更新点赞数
const updateLikesCount = () => {
  // 从article中获取最新的点赞数
  if (article.value) {
    // 处理likesCount可能不存在的情况
    likesCount.value = typeof article.value.likesCount === 'number' ? article.value.likesCount : 0
  }
}

// 沉浸式阅读模式状态
const immersiveMode = ref(false)

// 滚动到顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 滚动到底部
const scrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  })
}

// 处理文章点赞
const handleLikeArticle = async () => {
  if (!articleId.value) return
  
  // 检查用户是否已登录
  if (!isLoggedIn.value) {
    ElMessage.warning('请先登录后再点赞!')
    // 触发快捷登录组件显示，并传递登录成功后要执行的点赞操作
    window.dispatchEvent(new CustomEvent('show-quick-login', {
      detail: {
        action: () => handleLikeArticle()
      }
    }))
    return
  }
  
  try {
    const res = await api.likeArticle(articleId.value)
    if (res.data.code === 20000) {
      const likeStatus = res.data.data
      isLiked.value = likeStatus
      
      if (likeStatus) {
        // 点赞成功
        likesCount.value++
        ElMessage.success('点赞成功!')
      } else {
        // 取消点赞
        likesCount.value = Math.max(0, likesCount.value - 1)
        ElMessage.info('已取消点赞!')
      }
      
      // 重要：同步更新article对象中的点赞数
      if (article.value) {
        article.value.likesCount = likesCount.value
      }
      
      // 触发自定义事件，通知Article组件更新点赞状态
      window.dispatchEvent(new CustomEvent('article-like-updated', { 
        detail: { isLiked: isLiked.value, likesCount: likesCount.value }
      }))
    } else {
      ElMessage.error(res.data.message || '操作失败')
    }
  } catch (error) {
    console.error('点赞操作失败:', error)
    ElMessage.error('点赞操作失败!')
  }
}

// 切换沉浸式阅读模式
const toggleImmersiveMode = () => {
  immersiveMode.value = !immersiveMode.value
  
  if (immersiveMode.value) {
    enterImmersiveMode()
  } else {
    exitImmersiveMode()
  }
}

// 进入阅读模式
const enterImmersiveMode = () => {
  const elements = {
    aside: '.aside',
    nav: 'nav',
    banner: '#web_other_header',
    commentSection: '.u-comment-scroll',
    hr: '.article_hr',
    content: '.content',
    article: '.article'
  }
  
  try {
    // 隐藏元素
    Object.entries(elements).forEach(([key, selector]) => {
      if (key !== 'content' && key !== 'article') {
        const element = document.querySelector(selector)
        if (element) element.style.display = 'none'
      }
    })
    
    // 调整文章容器宽度
    const content = document.querySelector(elements.content)
    if (content) {
      content.style.width = '100%'
      content.style.marginTop = '20px'
    }
    
    // 调整文章容器样式
    const article = document.querySelector(elements.article)
    if (article) {
      article.style.maxWidth = '800px'
      article.style.margin = '20px auto'
    }
  } catch (error) {
    console.error('进入阅读模式失败:', error)
    immersiveMode.value = false
  }
}

// 退出阅读模式
const exitImmersiveMode = () => {
  const elements = {
    aside: '.aside',
    nav: 'nav',
    banner: '#web_other_header',
    commentSection: '.u-comment-scroll',
    hr: '.article_hr',
    content: '.content',
    article: '.article'
  }
  
  try {
    // 恢复元素显示
    Object.entries(elements).forEach(([key, selector]) => {
      if (key !== 'content' && key !== 'article') {
        const element = document.querySelector(selector)
        if (element) element.style.display = ''
      }
    })
    
    // 恢复文章容器样式
    const content = document.querySelector(elements.content)
    if (content) {
      content.style.width = '74%'
      content.style.marginTop = ''
    }
    
    const article = document.querySelector(elements.article)
    if (article) {
      article.style.maxWidth = ''
      article.style.margin = ''
    }
  } catch (error) {
    console.error('退出阅读模式失败:', error)
  }
}

// 监听滚动事件，控制工具栏显示
const showToolbar = ref(false)

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  showToolbar.value = scrollTop > 300
}

// 监听ESC键退出阅读模式
const handleKeyDown = (event) => {
  if (event.key === 'Escape' && immersiveMode.value) {
    toggleImmersiveMode()
  }
}

// 检查用户是否已点赞文章 - 优化版本，防止重复请求
const checkArticleLikeStatus = async () => {
  // 如果已经检查过或无文章ID或用户未登录，则不再检查
  if (hasCheckedLikeStatus.value || !articleId.value || !isLoggedIn.value) return
  
  // 标记为已检查，无论成功与否
  hasCheckedLikeStatus.value = true
  
  try {
    // 通过API检查文章点赞状态
    const res = await api.checkArticleLikeStatus(articleId.value)
    if (res.data.code === 20000) {
      isLiked.value = res.data.data
    }
  } catch (error) {
    console.error('获取点赞状态失败:', error)
  }
}

// 监听文章点赞更新事件
const handleArticleLikeUpdated = (event) => {
  if (!event || !event.detail) return
  
  const { isLiked: newIsLiked, likesCount: newLikesCount } = event.detail
  isLiked.value = !!newIsLiked
  likesCount.value = typeof newLikesCount === 'number' ? newLikesCount : 0
  
  // 同步更新article对象中的点赞数
  if (article.value) {
    article.value.likesCount = likesCount.value
  }
}

// 获取sessionStorage中的immersive模式状态
const getImmersiveState = () => {
  if (isArticlePage.value && articleId.value) {
    return sessionStorage.getItem(`immersive_${articleId.value}`) === 'true'
  }
  return false
}

// 保存immersive模式状态到sessionStorage
const saveImmersiveState = () => {
  if (isArticlePage.value && articleId.value) {
    sessionStorage.setItem(`immersive_${articleId.value}`, immersiveMode.value)
  }
}

// 恢复之前的immersive模式状态
const restoreImmersiveState = () => {
  if (getImmersiveState() && !immersiveMode.value) {
    toggleImmersiveMode()
  }
}

// 监听路由变化
const router = useRouter()
router.beforeEach((to, from) => {
  // 如果是从一个文章页面跳转到另一个文章页面
  if (from.meta.title === "文章详情" && to.meta.title === "文章详情" && from.params.id !== to.params.id) {
    // 只重置检查标志和点赞状态，点赞数会在article数据加载后通过updateLikesCount更新
    hasCheckedLikeStatus.value = false
    isLiked.value = false
  }
  return true
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('article-like-updated', handleArticleLikeUpdated)
  
  // 如果是文章页面，初始化点赞状态和阅读模式
  if (isArticlePage.value) {
    updateLikesCount()
    checkArticleLikeStatus()
    restoreImmersiveState()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('article-like-updated', handleArticleLikeUpdated)
  
  // 保存阅读模式状态
  saveImmersiveState()
  
  // 确保退出阅读模式
  if (immersiveMode.value) {
    exitImmersiveMode()
  }
})

// 监听文章数据变化
watchEffect(() => {
  if (isArticlePage.value && article.value) {
    updateLikesCount()
  }
})

// 当登录状态变化时，重置检查标志
watchEffect(() => {
  if (!isLoggedIn.value) {
    isLiked.value = false
    hasCheckedLikeStatus.value = false
  }
})

// 当文章ID变化时，重置检查标志
watchEffect(() => {
  if (articleId.value) {
    // 重置检查标志
    hasCheckedLikeStatus.value = false
    isLiked.value = false
    
    // 当进入新文章页面时，等待article数据更新后再获取点赞状态和数量
    if (isArticlePage.value) {
      // 不立即重置likesCount，等待updateLikesCount从article中获取新值
      if (isLoggedIn.value) {
        checkArticleLikeStatus()
      }
    }
  } else {
    // 不在文章页时重置点赞数
    likesCount.value = 0
  }
})
</script>

<style lang="scss" scoped>
.side-toolbar {
  position: fixed;
  right: 20px;
  bottom: 100px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.3s ease;

  &.show {
    opacity: 1;
    transform: translateX(0);
  }

  .toolbar-item {
    width: 40px;
    height: 40px;
    background-color: rgba(30, 144, 255, 0.8);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    position: relative;

    &:hover {
      background-color: rgba(30, 144, 255, 1);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &.liked {
      background-color: #ff6b6b;

      &:hover {
        background-color: #ff5252;
      }
    }
    
    &.disabled {
      background-color: rgba(200, 200, 200, 0.8);
      cursor: not-allowed;
      
      &:hover {
        background-color: rgba(200, 200, 200, 0.8);
        transform: none;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
    }

    .iconfont {
      font-size: 20px;
      color: #fff;
    }

    .like-count {
      position: absolute;
      top: -5px;
      right: -5px;
      background-color: #ff5252;
      color: white;
      border-radius: 10px;
      padding: 0 5px;
      font-size: 12px;
      min-width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

/* 移动端工具栏适配 */
@media screen and (max-width: 768px) {
  .side-toolbar {
    right: 12px;
    bottom: 80px;
    gap: 8px;

    .toolbar-item {
      width: 34px;
      height: 34px;

      .iconfont {
        font-size: 16px;
      }

      .like-count {
        font-size: 10px;
        min-width: 16px;
        height: 16px;
        top: -4px;
        right: -4px;
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .side-toolbar {
    right: 8px;
    bottom: 70px;
    gap: 6px;

    .toolbar-item {
      width: 30px;
      height: 30px;

      .iconfont {
        font-size: 14px;
      }
    }
  }
}
</style>