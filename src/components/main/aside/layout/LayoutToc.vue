<!-- 文章目录组件 -->
<template>
  <div class="card toc">
    <div class="item_headline">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-mulu1"></use>
      </svg>
      <span class="title">目录</span>
    </div>

    <div class="toc-content">
      <div v-for="(item, index) in tocItems" 
           :key="index" 
           class="toc-item"
           :class="{ 
             [`toc-level-${item.relativeLevel}`]: true,
             'active': activeId === item.id
           }"
           @click="scrollToAnchor(item.id)">
        <span class="number">{{ item.number }}</span>
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { debounce } from 'lodash-es'

const route = useRoute()
const tocItems = ref([])
const activeId = ref(null)
let observer = null
let scrollListener = null

// 生成序号和目录项
const generateToc = () => {
  const article = document.querySelector('.article-content')
  if (!article) return

  const headers = article.querySelectorAll('h1, h2, h3, h4, h5, h6')
  if (headers.length === 0) return

  // 获取最小的标题级别
  const levels = Array.from(headers).map(h => parseInt(h.tagName.charAt(1)))
  const minLevel = Math.min(...levels)
  
  let lastLevel = minLevel
  let currentNumbers = [0]

  tocItems.value = Array.from(headers).map((header, index) => {
    const level = parseInt(header.tagName.charAt(1))
    const relativeLevel = level - minLevel

    // 序号生成逻辑
    while (level > lastLevel) {
      currentNumbers.push(0)
      lastLevel++
    }
    while (level < lastLevel) {
      currentNumbers.pop()
      lastLevel--
    }
    
    currentNumbers[currentNumbers.length - 1]++
    
    // 确保每个标题都有唯一ID
    if (!header.id) {
      header.id = `toc-heading-${index}`
    }

    return {
      id: header.id,
      text: header.textContent,
      level,
      relativeLevel,
      number: [...currentNumbers].join('.')
    }
  })
}

// 更新当前激活的标题
const updateActiveHeading = () => {
  const headers = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
  const scrollPosition = window.scrollY

  for (let i = headers.length - 1; i >= 0; i--) {
    const header = headers[i]
    if (header.offsetTop <= scrollPosition + 100) {
      activeId.value = header.id
      break
    }
  }
}

// 添加滚动监听
const setupScrollListener = () => {
  const debouncedUpdate = debounce(updateActiveHeading, 100)
  scrollListener = debouncedUpdate
  window.addEventListener('scroll', debouncedUpdate)
}

// 清理滚动监听
const cleanupScrollListener = () => {
  if (scrollListener) {
    window.removeEventListener('scroll', scrollListener)
    scrollListener = null
  }
}

// 滚动到锚点
const scrollToAnchor = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// 初始化目录和观察器
const initToc = () => {
  // 清理之前的观察器
  if (observer) {
    observer.disconnect()
  }

  generateToc()
  setupScrollListener()
  
  const article = document.querySelector('.article-content')
  if (article) {
    observer = new MutationObserver(debounce(generateToc, 200))
    observer.observe(article, {
      childList: true,
      subtree: true
    })
  }
}

// 监听路由参数变化
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      setTimeout(initToc, 100)
    }
  }
)

onMounted(() => {
  initToc()
})

// 统一清理所有副作用
onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
  cleanupScrollListener()
})
</script>

<style lang="scss" scoped>
.card {
  background: rgba(255, 255, 255, 0.8);
  overflow: hidden;
  margin-top: 20px;
  padding: 20px 24px;
  // 移除 position: sticky 相关样式
  
  .item_headline {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .title {
      font-size: 1.2em;
      margin-left: 10px;
    }
  }
}

.toc {
  .toc-content {
    max-height: calc(100vh - 300px);  // 确保在视口高度内可以滚动
    overflow-y: auto;
    // 添加滚动条样式
    &::-webkit-scrollbar {
      width: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 2px;
    }
    
    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .toc-item {
    padding: 4px 0;
    cursor: pointer;
    font-size: 0.9em;
    color: #4c4948;
    transition: all 0.3s ease;
    display: flex;
    align-items: flex-start;
    gap: 4px;

    &:hover {
      color: #3399ff;
    }

    &.active {
      background-color: rgba(0, 255, 0, 0.1);
      border-radius: 4px;
      padding-left: 4px;
      margin-left: -4px;
    }

    .number {
      color: #666;
      margin-right: 4px;
      min-width: 24px;
      text-align: right;
    }
  }

  // 使用相对层级的样式
  .toc-level-0 {
    padding-left: 0;  // 最高层级没有缩进
    font-weight: 600;
    font-size: 1em;
  }

  .toc-level-1 {
    padding-left: 1.5em;  // 每个层级增加固定的缩进
    font-size: 0.95em;
  }

  .toc-level-2 {
    padding-left: 3em;
    font-size: 0.9em;
  }

  .toc-level-3 {
    padding-left: 4.5em;
    font-size: 0.85em;
  }

  .toc-level-4 {
    padding-left: 6em;
    font-size: 0.8em;
  }

  .toc-level-5 {
    padding-left: 7.5em;
    font-size: 0.75em;
  }
}
</style>