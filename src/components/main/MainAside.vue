<template>
  <div class="aside">

    <!--  个人信息  -->
    <AsideInfo />

    <!--  公告  -->
    <AsideNotice />

    <!--  最近文章/归档信息/网站信息  -->
    <div class="sticky_layout">
      <!-- 文章目录 -->
      <LayoutToc v-if="isArticlePage" />

      <!-- 归档 -->
      <template v-if="!isArticlePage">
        <LayoutArchives />
      </template>

      <!-- 最新文章 -->
      <LayoutRecent />

      <!-- 网站信息 -->
      <template v-if="!isArticlePage">
        <LayoutWebInfo />
      </template>
    </div>

  </div>
</template>

<script setup>
import AsideInfo from './aside/AsideInfo'
import AsideNotice from "./aside/AsideNotice";
import LayoutArchives from "./aside/layout/LayoutArchives";
import LayoutRecent from "./aside/layout/LayoutRecent";
import LayoutToc from "./aside/layout/LayoutToc";
import LayoutWebInfo from "./aside/layout/LayoutWebInfo";
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isArticlePage = computed(() => {
  return route.name === 'articleInfo'
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
</style>