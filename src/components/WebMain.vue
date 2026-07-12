<template>
  <main class="web_main" :class="{ 'article-page': isArticlePage }">
    <!--  侧边栏（文章页移动端放在正文前） -->
    <MainAside/>

    <!--  正文  -->
    <MainContent/>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainContent from "./main/MainContent";
import MainAside from "./main/MainAside";

const route = useRoute()
const isArticlePage = computed(() => route.name === 'articleInfo')
</script>

<style lang="scss" scoped>
.web_main {
  display: flex;
  flex: 1 auto;
  margin: 0 auto;
  padding: 40px 15px;
  max-width: 1200px;
  width: 100%;
  animation: bottom-top 1s;

  /* 桌面端：侧边栏在正文右侧 */
  flex-direction: row;
  .aside { order: 1; }
  .content { order: 0; }


  @keyframes bottom-top {
    0% {
      margin-top: 50px;
      opacity: 0;
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
      filter: alpha(opacity=0);
    }
    100% {
      margin-top: 0;
      opacity: 1;
      -ms-filter: none;
      filter: none;
    }
  }
}

/* 移动端：垂直布局 */
@media screen and (max-width: 768px) {
  .web_main {
    flex-direction: column;
    padding: 20px 12px;

    .content { order: 0; }

    /* 普通页面：侧边栏在正文下方 */
    .aside { order: 1; }

    /* 文章页：目录移到正文上方 */
    &.article-page {
      .aside { order: -1; }
    }
  }
}
</style>