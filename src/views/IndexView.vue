<template>
  <div class="index_view">
    <!--  背景  -->
    <div class="web_bg"/>

    <!--  顶部导航栏  -->
    <HeaderNav/>

    <!--  页头  -->
    <WebHeader v-if="isIndex"/>
    <WebBanner v-else :banner-data="currentBannerData" :prop-data="article || {}"/>
    
    <!--  内容  -->
    <WebMain/>

    <!--  页脚  -->
    <WebFooter/>
  </div>
</template>

<script setup>
import WebMain from "../components/WebMain";
import WebFooter from "../components/WebFooter";
import {provide, ref, computed} from "vue";
import WebHeader from "../components/WebHeader";
import HeaderNav from "../components/header/HeaderNav";
import WebBanner from "../components/WebBanner";
import { bannerConfig } from '../assets/js/bannerConfig';
import { useRoute } from 'vue-router';

const route = useRoute();
const article = ref({})  // 修改为对象的初始值
provide('article', article) //接收子组件参数

// 根据当前路由获取对应的banner数据
const currentBannerData = computed(() => {
  const path = route.path.split('/')[1] // 获取路由的第一段
  const isArticle = route.meta.title === "文章详情"
  
  if (isArticle) {
    return null; // 文章页面使用 propData
  }
  
  switch (path) {
    case 'archives':
      return bannerConfig.archives;
    case 'tags':
      return bannerConfig.tags;
    case 'categories':
      return bannerConfig.categories;
    case 'link':
      return bannerConfig.link;
    case 'about':
      return bannerConfig.about;
    default:
      return null;
  }
})
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
