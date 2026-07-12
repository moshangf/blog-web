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
        <span>工信部备案号：<a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">京ICP备2026027344号</a></span>
        <span class="beian_gongan">
          <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010602202859" target="_blank" rel="noopener noreferrer">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAbwAAAG8B8aLcQwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEZSURBVDiNpZM9TsNAEIXfzBekcUCi4QJcIhUNAhUFRQIHoKDhCFyAgoKSgkMkSlp+JKJNQcUVKOkouQKVK0T8JLFjJ3ZowkiestqZb9+b2V0C/OdJ6T1VOecGAG4BzNXa78vlchAT3wGoByEEVWtdltWNJEmKiPiqtd5LKQ+Z2RPRnohqiqhSSk1E1JRSj1rrw0R/wMwPzLyplFoSkY/orPeeiGZEtN1utx8AuOj3+wcA8NPpdO6Z+bVWqx0S0bLX692Uy+Wzdrv92Gg0bgE0m81mtV6v36SUH0qpN0R0TUQHAQBJ0zQH8CYiDwBmAO5ijJNSqfQJYN9auw9gYow5K5fL31rrVylly8wXwQeY+YWZPYD3XwMAnCRJcnxW/AKT0j+BRWH0GQAAAABJRU5ErkJggg==" alt="公安备案图标" class="gongan_icon"/>
            京公网安备11010602202859号
          </a>
        </span>
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
  justify-content: center;
  padding: 0 12px;
}
.beian_inner .site-name {
  font-weight: 600;
  color: #333;
}
.beian_inner .status {
  color: #999;
}

/* 工信部备案链接 */
.beian_inner a {
  color: #666;
  text-decoration: none;
  transition: color 0.3s;
}
.beian_inner a:hover {
  color: #3399ff;
}

/* 公安备案信息样式 */
.beian_gongan {
  display: inline-flex;
  align-items: center;
}
.beian_gongan a {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #666;
  text-decoration: none;
  transition: color 0.3s;
}
.beian_gongan a:hover {
  color: #3399ff;
}
.gongan_icon {
  width: 14px;
  height: 14px;
  display: inline-block;
  vertical-align: middle;
}

/* 移动端备案信息 */
@media screen and (max-width: 768px) {
  .beian_inner {
    gap: 6px;
    font-size: 11px;
    flex-direction: column;
    padding: 0 16px;
  }
  .gongan_icon {
    width: 12px;
    height: 12px;
  }
}

@media screen and (max-width: 480px) {
  .beian_bar {
    padding: 6px 0;
  }
  .beian_inner {
    font-size: 10px;
    gap: 4px;
  }
  .gongan_icon {
    width: 11px;
    height: 11px;
  }
}

</style>
