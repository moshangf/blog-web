<template>
  <header class="web_other_header">
    <!--  导航菜单  -->
    <HeaderNav/>

  </header>
</template>


<script setup>
import HeaderNav from "./header/HeaderNav";</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
}

.web_other_header {
  background-image: url("../../src/assets/img/archive.jpg");
  position: relative;
  height: 400px;
  width: 100%;
  background-position: center center;
  background-size: cover;
  transition: all 0.5s;
}
</style>