<template>
  <el-dialog
    v-model="dialogVisible"
    title="搜索文章"
    width="50%"
    :show-close="true"
    :close-on-click-modal="true"
    :append-to-body="true"
    :destroy-on-close="true"
    custom-class="search-dialog"
  >
    <div class="search-container">
      <el-input
        v-model="searchQuery"
        placeholder="请输入文章标题或简介"
        clearable
        @input="handleSearch"
        class="search-input"
        size="large"
      >
        <template #prefix>
          <el-icon class="search-icon"><Search /></el-icon>
        </template>
      </el-input>

      <div class="divider" v-if="searchResults.length > 0 || searchQuery">
        <el-icon><ScissorLine /></el-icon>
      </div>

      <div class="search-results" v-if="searchResults.length > 0">
        <div
          v-for="article in searchResults"
          :key="article.id"
          class="search-item"
          @click="handleArticleClick(article)"
        >
          <el-icon class="item-icon"><Document /></el-icon>
          <div class="article-info">
            <h3 v-html="highlightText(article.title)"></h3>
            <p v-if="article.intro"><span style="color: rgb(65, 131, 196)" v-html="highlightText(article.intro)"></span></p>
            <p v-html="highlightText(formatContent(article.content))"></p>
          </div>
        </div>
      </div>
      <div v-else-if="searchQuery" class="no-results">
        未找到相关文章
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Search, ScissorLine, Document } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import api from '../../api'

const router = useRouter()
const dialogVisible = ref(false)
const searchQuery = ref('')
const searchResults = ref([])

// 搜索防抖定时器
let searchTimeout = null

// 处理搜索输入
const handleSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  
  searchTimeout = setTimeout(async () => {
    if (searchQuery.value.trim()) {
      try {
        const res = await api.searchArticles({
          keyword: searchQuery.value.trim()
        })
        if (res.data.code === 20000) {
          searchResults.value = res.data.data
        }
      } catch (error) {
        console.error('搜索文章失败:', error)
        searchResults.value = []
      }
    } else {
      searchResults.value = []
    }
  }, 300)
}

// 高亮文本中的关键词
const highlightText = (text) => {
  if (!text || !searchQuery.value.trim()) return text
  
  const keywords = searchQuery.value.trim().split(/\s+/)
  let highlightedText = text
  
  keywords.forEach(keyword => {
    if (keyword) {
      // 使用正则表达式进行全局不区分大小写匹配
      const regex = new RegExp(`(${escapeRegExp(keyword)})`, 'gi')
      highlightedText = highlightedText.replace(regex, '<span class="highlight">$1</span>')
    }
  })
  
  return highlightedText
}

// 转义正则表达式特殊字符
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// 处理文章点击
const handleArticleClick = (article) => {
  router.push(`/articles/${article.id}`)
  dialogVisible.value = false
  searchQuery.value = ''
  searchResults.value = []
}

// 打开搜索弹窗
const openSearchDialog = () => {
  dialogVisible.value = true
  searchQuery.value = ''
  searchResults.value = []
}

// 格式化内容
const formatContent = (content) => {
  if (!content) return '';
  // 移除HTML标签并截断
  const plainText = content.replace(/<[^>]*>/g, '');
  return plainText.length > 100 ? plainText.substring(0, 100) + '...' : plainText;
}

// 监听弹窗关闭
watch(dialogVisible, (newValue) => {
  if (!newValue) {
    // 弹窗关闭时清空搜索
    searchQuery.value = ''
    searchResults.value = []
  }
})

// 导出方法供外部使用
defineExpose({
  openSearchDialog
})
</script>

<style lang="scss" scoped>
.search-container {
  padding: 10px;

  .search-input {
    margin-bottom: 10px;
    font-size: 16px;
    
    :deep(.el-input__wrapper) {
      padding: 8px 15px;
    }
    
    :deep(.el-input__inner) {
      height: 42px;
      font-size: 16px;
    }
    
    .search-icon {
      font-size: 18px;
      margin-right: 5px;
    }
  }

  .divider {
    display: flex;
    align-items: center;
    color: #a8a8a8;
    margin: 10px 0;
    
    &::before, &::after {
      content: '';
      flex: 1;
      height: 1px;
      background-color: #e0e0e0;
      margin: 0 10px;
    }
  }

  .search-results {
    margin-top: 10px;
    max-height: 400px;
    overflow-y: auto;

    .search-item {
      display: flex;
      padding: 15px 10px;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #f5f7fa;
      }

      .item-icon {
        margin-right: 10px;
        font-size: 20px;
        color: #909399;
        margin-top: 2px;
      }

      .article-info {
        flex: 1;
        
        h3 {
          margin: 0 0 8px;
          font-size: 16px;
          color: #303133;
          text-align: start;
        }

        p {
          margin: 0;
          font-size: 14px;
          color: #909399;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-align: start;
        }
      }
    }
  }

  .no-results {
    margin-top: 20px;
    text-align: center;
    color: #909399;
    font-size: 14px;
  }
}

:deep(.highlight) {
  background-color: #ffeaa7;
  color: #d35400;
  font-weight: bold;
  border-radius: 2px;
  padding: 0 2px;
}

:deep(.search-dialog) {
  transition: all 0.3s ease-in-out;
  transform-origin: center top;
  border-radius: 8px;
  overflow: hidden;
}

:deep(.el-overlay) {
  transition: opacity 0.3s ease-in-out;
}

:deep(.el-overlay-dialog) {
  transition: all 0.3s ease-in-out;
}

:deep(.el-dialog) {
  transition: all 0.3s ease-in-out;
  transform: translateY(-20px);
}

:deep(.el-overlay-dialog:has(.search-dialog)) {
  animation: dialogFadeIn 0.3s;
}

@keyframes dialogFadeIn {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 移动端搜索弹窗 */
@media screen and (max-width: 768px) {
  :deep(.search-dialog) {
    width: 90% !important;
    max-width: 90% !important;
    margin: 30px auto !important;
    border-radius: 12px;
  }

  .search-container {
    padding: 0;

    .search-input {
      :deep(.el-input__inner) {
        height: 38px;
        font-size: 14px;
      }
    }

    .search-results {
      max-height: 50vh;

      .search-item {
        padding: 12px 8px;

        .article-info {
          h3 {
            font-size: 14px;
          }

          p {
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>