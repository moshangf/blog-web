<template>
  <header ref="header" class="web_header">
    <!--  导航菜单  -->
    <HeaderNav/>

    <!--  一言  -->
    <HeaderInfo/>

    <!--  向下翻页  -->
    <HeaderDown :headerRef="header"/>
  </header>
</template>


<script setup>
import HeaderNav from "./header/HeaderNav";
import HeaderInfo from "./header/HeaderInfo";
import HeaderDown from "./header/HeaderDown";
import {ref} from "vue";

const header = ref(null);
</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
}

.web_header {
  background-image: url("../../src/assets/img/index.png");
  height: 100vh;
  width: 100%;
  background-size: cover;
}
</style>