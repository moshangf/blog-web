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

    <!--  备案信息（仅首页显示） -->
    <div class="beian_bar" v-if="isIndex">
      <div class="beian_inner">
        <span class="site-name">山鬼说</span>
        <span>域名：mhblog.com.cn</span>
        <span>备案时间：2026-05-23 23:48:48</span>
        <span>工信部备案号：京ICP备2026027344号</span>
        <span>公安备案号：—</span>
        <span class="status">网站状态：—</span>
      </div>
    </div>

    <!--  侧边工具栏  -->
    <SideToolbar/>
  </div>
</template>

<script setup>
import WebMain from "../components/WebMain";
import WebFooter from "../components/WebFooter";
import {provide, ref, computed} from "vue";
import WebHeader from "../components/WebHeader";
import HeaderNav from "../components/header/HeaderNav";
import WebBanner from "../components/WebBanner";
import SideToolbar from "../components/SideToolbar.vue";
import { bannerConfig } from '../assets/js/bannerConfig';
import { useRoute } from 'vue-router';

const route = useRoute();
// 修改为包含所有必要属性的响应式对象
const article = ref({
  title: '',
  createTime: '',
  updateTime: '',
  pageView: 0,
  likesCount: 0,
  content: '',
  cover: '',
  id: '',
  textCount: 0
})

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

/* 备案信息样式 */
.beian_bar {
  width: 100%;
  background: rgba(255,255,255,0.9);
  border-top: 1px solid #e6e6e6;
  padding: 8px 0;
  position: relative;
  text-align: center;
  font-size: 12px;
  color: #666;
}
.beian_inner {
  display: inline-flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}
.beian_inner .site-name {
  font-weight: 600;
  color: #333;
}
.beian_inner .status {
  color: #999;
}

</style>
