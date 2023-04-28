<template>
  <div class="index_view">
    <!--  背景  -->
    <div class="web_bg"/>

    <!--  页头  -->
    <WebIndexHeader v-if="isIndex"/>
    <WebOtherHeader v-else/>

    <!--  内容  -->
    <WebMain/>

    <!--  页脚  -->
    <WebFooter/>

    <!--  右侧悬浮按钮  -->
    <div class="right_side"></div>
  </div>
</template>

<script setup>
import WebIndexHeader from '../components/WebIndexHeader';
import WebOtherHeader from '../components/WebOtherHeader'
import WebMain from "../components/WebMain";
import WebFooter from "../components/WebFooter";</script>

<script>
import {useRouter} from "vue-router";

export default {
  computed: {
    isIndex() {
      let router = useRouter().currentRoute.value.fullPath;
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
