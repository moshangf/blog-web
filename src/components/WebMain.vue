<template>
  <!--  内容  -->
  <main class="web_main">
    <!--  正文  -->
    <MainArchive/>

    <!--  侧边信息  -->
    <MainAside/>
  </main>
</template>

<script setup>
import MainArchive from "./main/MainArchive";
import MainAside from "./main/MainAside";</script>

<style lang="scss" scoped>
.web_main {
  display: flex;
  flex: 1 auto;
  margin: 0 auto;
  padding: 40px 15px;
  max-width: 1200px;
  width: 100%;
}
</style>