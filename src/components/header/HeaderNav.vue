<template>
  <!--  顶部导航栏  -->
  <nav :class="{'hidden':isHidden}">
    <!--   页面log   -->
    <a href="/">
          <span class="logo">
            Logo
          </span>
    </a>

    <!--   导航菜单   -->
    <div class="menus">
      <!--  搜索按钮  -->
      <div class="search-button">
        <i class="iconfont icon-sousuoxiao"></i>
        <span>搜索</span>
      </div>

      <!--  菜单项  -->
      <div class="menus_items">

        <div class="menus_item">
          <router-link to="/">
            <i class="iconfont icon-shouye"></i>
            <span>首页</span>
          </router-link>
        </div>

        <div class="menus_item">
          <router-link to="/archives">
            <i class="iconfont icon-timeline-fill"></i>
            <span>时间轴</span>
          </router-link>
        </div>

        <div class="menus_item">
          <router-link to="/tags">
            <i class="iconfont icon-biaoqian"></i>
            <span>标签</span>
          </router-link>
        </div>

        <div class="menus_item">
          <router-link to="/categories">
            <i class="iconfont icon-fenlei"></i>
            <span>分类</span>
          </router-link>
        </div>

        <div class="menus_item">
          <router-link to="">
            <i class="iconfont icon-zerenqingdan"></i>
            <span>清单</span>
          </router-link>
        </div>

        <div class="menus_item">
          <router-link to="/link">
            <i class="iconfont icon-lianjie"></i>
            <span>友链</span>
          </router-link>
        </div>

        <div class="menus_item">
          <router-link to="/about">
            <i class="iconfont icon-guanyu"></i>
            <span>关于</span>
          </router-link>
        </div>

      </div>
    </div>

    <!--   主题切换   -->
    <div class="check">
      <!--  v-model 绑定 themeConfig.isDark-->
      <el-switch
          v-model="themeConfig.isDark"
          inline-prompt
          active-icon="Sunny"
          inactive-icon="Moon"
      />
    </div>
  </nav>
</template>

<script>

import {useDark} from "@vueuse/core";

export default {
  name: "web_nav",
  data() {
    const isDark = useDark()
    return {
      themeConfig: {
        isDark: isDark
      },
      lastScrollTop: 0, // 上次滚动的位置
      isHidden: false, // 是否隐藏导航栏
    }
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    // 导航栏动态显示
    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      let delta = scrollTop - this.lastScrollTop; //滚动距离的差值
      this.isHidden = delta > 0;
      this.lastScrollTop = scrollTop; // 更新上一次滚动距离
    }
  },

}
</script>

<style lang="scss" scoped>

nav {
  background-color: transparent;
  height: 60px;
  box-shadow: 1px 1px 5px #0003;
  display: flex;
  align-items: center; /* 垂直居中 */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.hidden {
  display: none !important;
}

span, i {
  color: #EFEDEE;
}

.logo {
  margin-right: auto;
  display: inline-block;
  padding: 0 30px;
}

.menus {
  display: inline-block;
  padding: 0 30px;
  margin-left: auto;
}

.check {
  padding-right: 50px;
}

.search-button {
  display: inline-block;
}

.menus_items {
  display: inline-block;

  .menus_item {
    position: relative;
    display: inline-block;
    padding: 0 0 0 14px;
  }
}


.iconfont {
  vertical-align: middle;
  padding-right: 0.3em;
}

.span {
  vertical-align: middle;
}

.menus_item span {
  font-size: 0.8em;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.search-button span {
  font-size: 0.8em;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

</style>