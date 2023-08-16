<template>
  <div class="index_view">
    <!--  背景  -->
    <div class="web_bg"/>

    <!--  顶部导航栏  -->
    <HeaderNav/>

    <!--  页头  -->
    <WebHeader v-if="isIndex"/>
    <WebBanner v-else :propData="article"/>
    
    <!--  内容  -->
    <WebMain/>

    <!--  页脚  -->
    <WebFooter/>
  </div>
</template>

<script setup>
import WebMain from "../components/WebMain";
import WebFooter from "../components/WebFooter";
import {provide, ref} from "vue";
import WebHeader from "../components/WebHeader";
import HeaderNav from "../components/header/HeaderNav";
import WebBanner from "../components/WebBanner";

let article = ref('')
provide('article', article) //接收子组件参数
</script>

<script>
export default {
  computed: {
    isIndex() {
      return this.$route.path === "/";
    }
  }
}
</script>


<style lang="scss">

.web_bg {
  background-image: url("../../src/assets/img/background.png");
  position: fixed;
  z-index: -999;
  width: 100%;
  height: 100%;
  background-attachment: local;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

</style>
