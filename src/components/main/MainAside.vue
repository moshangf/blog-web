<template>
  <div class="aside" :class="{ 'article-page': isArticlePage }">

    <!--  个人信息（文章页移动端隐藏） -->
    <div v-if="!isArticlePage || !isMobile" class="aside-section">
      <AsideInfo />
    </div>

    <!--  公告（文章页移动端隐藏） -->
    <div v-if="!isArticlePage || !isMobile" class="aside-section">
      <AsideNotice />
    </div>

    <!--  最近文章/归档信息/网站信息  -->
    <div class="sticky_layout">
      <!-- 文章目录 -->
      <LayoutToc v-if="isArticlePage" />

      <!-- 归档（文章页隐藏） -->
      <template v-if="!isArticlePage">
        <LayoutArchives />
      </template>

      <!-- 最新文章（文章页移动端隐藏） -->
      <div v-if="!isArticlePage || !isMobile" class="aside-section">
        <LayoutRecent />
      </div>

      <!-- 网站信息（文章页隐藏） -->
      <template v-if="!isArticlePage">
        <LayoutWebInfo />
      </template>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import AsideInfo from './aside/AsideInfo'
import AsideNotice from "./aside/AsideNotice";
import LayoutArchives from "./aside/layout/LayoutArchives";
import LayoutRecent from "./aside/layout/LayoutRecent";
import LayoutToc from "./aside/layout/LayoutToc";
import LayoutWebInfo from "./aside/layout/LayoutWebInfo";

const route = useRoute()
const isArticlePage = computed(() => {
  return route.name === 'articleInfo'
})

// 移动端检测
const isMobile = ref(window.innerWidth <= 768)
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style lang="scss">
.aside {
  margin-left: 15px;
  width: 26%;
  border-radius: 8px;
}

.sticky_layout {
  position: sticky;  // 添加sticky定位
  top: 20px;        // 距离顶部20px时开始吸顶
  transition: top 0.3s; // 平滑过渡效果
}

.card {
  background: rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
  margin-top: 20px;
  padding: 20px 24px;
  border-radius: 8px;
}

/* 移动端：侧边栏全宽，堆叠在内容下方 */
@media screen and (max-width: 768px) {
  .aside {
    width: 100%;
    margin-left: 0;
    margin-top: 20px;
  }

  .card {
    padding: 16px;
  }

  /* 文章页移动端：目录卡片紧凑样式 */
  .aside.article-page {
    margin-top: 0;

    .card {
      margin-top: 0;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(51, 153, 255, 0.15);
      border-radius: 10px;
    }
  }
}
</style>