<template>
  <div class="index_view">
    <!--  背景  -->
    <div class="web_bg"/>

    <!--  页头  -->
    <WebIndexHeader v-if="isIndex"/>
    <WebOtherHeader v-else :propData="article"/>

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
import WebIndexHeader from "../components/WebIndexHeader";
import WebOtherHeader from "../components/WebOtherHeader";

let article = ref('')
provide('article', article) //接收子组件参数
</script>

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
