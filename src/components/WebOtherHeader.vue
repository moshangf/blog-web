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
  //background-image: url("../../src/assets/img/index.png");
  height: 50vh;
  width: 100%;
  background-size: cover;
}
</style>