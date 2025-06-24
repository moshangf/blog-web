<template>
  <main class="web_main">
    <!--  正文  -->
    <MainContent/>

    <!--  侧边栏  -->
    <MainAside/>
  </main>
</template>

<script setup>
import MainContent from "./main/MainContent";
import MainAside from "./main/MainAside";</script>

<style lang="scss" scoped>
.web_main {
  display: flex;
  flex: 1 auto;
  margin: 0 auto;
  padding: 40px 15px;
  max-width: 1200px;
  width: 100%;
  animation: bottom-top 1s;


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


</style>