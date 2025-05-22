<template>
  <div class="card archives">
    <div class="item_headline">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-guidang"></use>
      </svg>
      <span class="title">归档</span>
    </div>

    <!-- 添加年份快速选择 -->
    <div class="year-selector">
      <span v-for="year in years" :key="year" :class="['year-item', selectedYear === year ? 'active' : '']"
        @click="selectYear(year)">
        {{ year }}
      </span>
    </div>

    <ul class="archive_list">
      <li v-for="archive in archives" :key="archive.yearMonth" class="archive_list_item">
        <router-link :to="`/archives/${archive.year}/${archive.month}`" class="rl">
          <span class="archive_list_item_date">{{ archive.monthText }} {{ archive.year }}</span>
          <span class="archive_list_item_count">{{ archive.count }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import api from '@/api/index.js'

export default {
  name: "LayoutArchives",
  setup() {
    const archiveData = ref({
      total: 0,
      years: [],
      archives: []
    })

    // 选中的年份
    const selectedYear = ref(new Date().getFullYear())

    // 获取归档数据
    const fetchArchiveData = async () => {
      try {
        const res = await api.getArchives()
        if (res.data.code === 20000 && res.data.data) {
          archiveData.value = res.data.data
        }
      } catch (error) {
        console.error('获取归档数据失败:', error)
      }
    }

    // 在组件挂载时获取数据
    onMounted(() => {
      fetchArchiveData()
    })

    // 计算属性：年份列表
    const years = computed(() => archiveData.value.years)

    // 计算属性：归档列表
    const archives = computed(() => 
      archiveData.value.archives.filter(archive => 
        selectedYear.value === null || archive.year === selectedYear.value
      )
    )

    // 选择年份方法
    const selectYear = (year) => {
      selectedYear.value = year === selectedYear.value ? null : year
    }

    return {
      archiveData,
      years,
      archives,
      selectedYear,
      selectYear
    }
  }
}
</script>

<style scoped lang="scss">
.item_headline {
  font-size: 1.2em;
  padding-bottom: 10px;

  .title {
    margin-left: 10px;
  }
}

// 添加年份选择器样式
.year-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;

  .year-item {
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 0.9em;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: #f5f5f5;
    color: #666;

    &:hover {
      background-color: #e0e0e0;
    }

    &.active {
      background-color: #409eff;
      color: white;
    }
  }
}

.archive_list {
  list-style: none;

  .archive_list_item {
    padding: 8px 12px;
    margin: 4px 0;
    border-radius: 6px;
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    .rl {
      display: flex;
      align-items: center;

      .archive_list_item_date {
        flex: 1;
        color: #666;
      }

      .archive_list_item_count {
        padding: 2px 8px;
        background: #f0f0f0;
        border-radius: 12px;
        font-size: 0.9em;
        color: #666;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .archives {
    .year-selector {
      display: flex;
      overflow-x: auto;
      padding: 8px 0;
      flex-wrap: nowrap;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;  // Firefox
      &::-webkit-scrollbar {  // Chrome/Safari
        display: none;
      }

      .year-item {
        flex-shrink: 0;
      }
    }

    .archive_list_item {
      padding: 12px 8px; // 移动端更大的点击区域
    }
  }
}
</style>