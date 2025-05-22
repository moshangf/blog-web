<template>
  <div class="archive-container">
    <!-- 归档统计 -->
    <div class="count-section">
      <div class="vertical-text">
        <span>文</span><span>章</span><span>总</span><span>览</span>
        <span class="separator">—</span>
        <span class="total">{{ total }}</span>
      </div>
      <!-- 添加当前筛选条件显示 -->
      <div v-if="year" class="filter-info">
        {{ year }}年{{ month ? month + '月' : '全年' }}
      </div>
    </div>

    <!-- 时间轴 -->
    <div class="timeline">
      <el-timeline>
        <el-timeline-item v-for="(item, index) in articleList" :key="index" type="primary" size="large" hollow
          placement="top">
          <!--文章发表时间-->
          <div class="time-section">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-rili1"></use>
            </svg>
            <time>{{ item.createTime }}</time>
          </div>

          <div class="timeline-item">
            <!--文章封面-->
            <div class="cover">
              <el-image class="cover-image" :src="item.cover" fit="cover" />
            </div>

            <!--文章标题和简介-->
            <div class="content">
              <h3 class="title" @click="toArticle(item.id)">{{ item.title }}</h3>
              <p class="intro">{{ item.intro }}</p>
              <!-- 添加文章标签 -->
              <div class="tags" v-if="item.tags && item.tags.length">
                <el-tag v-for="tag in item.tags" :key="tag" size="small" effect="light" class="tag-item">
                  {{ tag }}
                </el-tag>
              </div>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>

    <!--分页-->
    <div class="pagination">
      <Pagination :total="total" :page-index="pageNum" @pageChange="pageChange" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/api/index.js";
import { ElImage } from "element-plus";
import Pagination from "@/utils/Pagination/index.vue";

const route = useRoute();
const router = useRouter();

const articleList = ref([]);
const total = ref(0);
const pageNum = ref(1);
const pageSize = ref(10);
const year = ref(null);
const month = ref(null);

// 加载文章列表
const loadArticles = async () => {
  try {
    const params = {
      pageNum: pageNum.value,
      pageSize: pageSize.value,
      year: year.value,
      month: month.value
    };

    const res = await api.getArticleList(params);
    if (res.data.code === 20000 && res.data.data) {
      articleList.value = res.data.data.pagingList;
      total.value = res.data.data.count;
    }
  } catch (error) {
    console.error('获取文章列表失败:', error);
    ElMessage.error('获取文章列表失败');
  }
};

// 分页变化
const pageChange = (val) => {
  pageNum.value = val.pageNum;
  pageSize.value = val.pageSize;
  loadArticles();
};

// 跳转到文章详情
const toArticle = (id) => {
  router.push({ name: 'articleInfo', params: { id } });
};

// 监听路由参数变化
watch(
  () => route.params,
  (params) => {
    // 将路由参数转换为数字
    year.value = params.year ? parseInt(params.year) : null;
    month.value = params.month ? parseInt(params.month) : null;
    // 重置分页
    pageNum.value = 1;
    // 重新加载文章列表
    loadArticles();
  },
  { immediate: true }
);

// 添加计算属性用于显示筛选条件
const filterText = computed(() => {
  if (!year.value) return '全部文章';
  return `${year.value}年${month.value ? month.value + '月' : '全年'}`;
});

// 更新页面标题
watch(filterText, (newVal) => {
  document.title = `文章归档 - ${newVal}`;
});
</script>

<style lang="scss" scoped>
.archive-container {
  background: rgba(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 12px;
  min-height: 80vh;

  .count-section {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f0f0f0;

    .vertical-text {
      display: flex;
      align-items: baseline;
      font-size: 1.5em;
      letter-spacing: 4px;

      span {
        display: inline-block;
        margin: 0 4px;

        &.separator {
          margin: 0 10px;
        }

        &.total {
          color: #409eff;
          font-weight: bold;
        }
      }
    }

    .filter-info {
      margin-left: 20px;
      font-size: 1.2em;
      color: #666;
      background: #f5f5f5;
      padding: 5px 15px;
      border-radius: 20px;
    }
  }

  .timeline {
    .time-section {
      font-size: 1.2em;
      margin-bottom: 10px;
      color: #409eff;

      .icon {
        width: 1.2em;
        height: 1.2em;
        vertical-align: -0.15em;
        margin-right: 10px;
      }
    }

    .timeline-item {
      display: flex;
      background: #f8f9fa;
      border-radius: 8px;
      overflow: hidden;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .cover {
        width: 200px;
        height: 140px;
        overflow: hidden;

        .cover-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;

          &:hover {
            transform: scale(1.05);
          }
        }
      }

      .content {
        flex: 1;
        padding: 15px 20px;

        .title {
          font-size: 1.2em;
          margin-bottom: 10px;
          cursor: pointer;
          color: #2c3e50;

          &:hover {
            color: #409eff;
          }
        }

        .intro {
          color: #666;
          margin-bottom: 10px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          overflow: hidden;
        }

        .tags {
          display: flex;
          gap: 8px;

          .tag-item {
            border-radius: 12px;
          }
        }
      }
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
}

@media screen and (max-width: 768px) {
  .archive-container {
    padding: 15px;

    .timeline-item {
      flex-direction: column;

      .cover {
        width: 100%;
        height: 180px;
      }

      .content {
        padding: 12px;
      }
    }
  }
}
</style>