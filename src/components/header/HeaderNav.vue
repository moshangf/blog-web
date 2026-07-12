<template>
  <!--  顶部导航栏  -->
  <nav :class="{'hidden':isHidden, 'at-top': isTop, 'menu-open': isMenuOpen}">
    <!--   页面log   -->
    <a href="/">
          <span class="logo">
            Logo
          </span>
    </a>

    <!--   菜单遮罩层（移动端）  -->
    <div class="menu-overlay" :class="{'show': isMenuOpen}" @click="toggleMenu"></div>

    <!--   导航菜单   -->
    <div class="menus" :class="{'show': isMenuOpen}">
      <!--  搜索按钮  -->
      <div class="search-button" @click="handleSearch">
        <i class="iconfont icon-sousuoxiao"></i>
        <span>搜索</span>
      </div>

      <!--  菜单项  -->
      <div class="menus_items">

        <div class="menus_item">
          <router-link to="/" @click="closeMenu">
            <i class="iconfont icon-shouye"></i>
            <span>首页</span>
          </router-link>
        </div>

        <div class="menus_item">
          <router-link to="/archives" @click="closeMenu">
            <i class="iconfont icon-timeline-fill"></i>
            <span>时间轴</span>
          </router-link>
        </div>

        <div class="menus_item">
          <router-link to="/tags" @click="closeMenu">
            <i class="iconfont icon-biaoqian"></i>
            <span>标签</span>
          </router-link>
        </div>

        <div class="menus_item">
          <router-link to="/categories" @click="closeMenu">
            <i class="iconfont icon-fenlei"></i>
            <span>分类</span>
          </router-link>
        </div>

        <div class="menus_item">
          <router-link to="" @click="closeMenu">
            <i class="iconfont icon-zerenqingdan"></i>
            <span>清单</span>
          </router-link>
        </div>

        <div class="menus_item">
          <router-link to="/link" @click="closeMenu">
            <i class="iconfont icon-lianjie"></i>
            <span>友链</span>
          </router-link>
        </div>

        <div class="menus_item">
          <router-link to="/about" @click="closeMenu">
            <i class="iconfont icon-guanyu"></i>
            <span>关于</span>
          </router-link>
        </div>

      </div>
    </div>

    <!--   主题切换 + 汉堡菜单按钮  -->
    <div class="nav-actions">
      <div class="check">
        <el-switch
            v-model="themeConfig.isDark"
            inline-prompt
            active-icon="Sunny"
            inactive-icon="Moon"
        />
      </div>
      <div class="hamburger" :class="{'active': isMenuOpen}" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <!-- 搜索组件 -->
    <ArticleSearch ref="searchRef" />
  </nav>
</template>

<script>
import {useDark} from "@vueuse/core";
import ArticleSearch from '../../utils/ArticleSearch/ArticleSearch.vue'

export default {
  name: "web_nav",
  components: {
    ArticleSearch
  },
  data() {
    const isDark = useDark()
    return {
      themeConfig: {
        isDark: isDark
      },
      lastScrollTop: 0, // 上次滚动的位置
      isHidden: false, // 是否隐藏导航栏
      isTop: true, // 是否在顶部
      isMenuOpen: false, // 移动端菜单是否打开
    }
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    // 初始化检查是否在顶部
    this.handleScroll()
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
      // 更新是否在顶部的状态
      this.isTop = scrollTop <= 0
    },

    handleSearch() {
      this.$refs.searchRef.openSearchDialog()
    },

    // 切换移动端菜单
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
      // 菜单打开时禁止body滚动
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : ''
    },

    // 关闭移动端菜单
    closeMenu() {
      this.isMenuOpen = false
      document.body.style.overflow = ''
    }
  },

}
</script>

<style lang="scss" scoped>

nav {
  background-color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  height: 60px;
  display: flex;
  align-items: center; /* 垂直居中 */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;

  &.at-top {
    background-color: transparent;

    span, i {
      color: #ffffff;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }

    .el-switch {
      --el-switch-off-color: rgba(255, 255, 255, 0.3);
      border-color: #ffffff;
    }
  }
}

.hidden {
  display: none !important;
}

span, i {
  color: #332b28;
  transition: color 0.3s ease;
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

/* 导航右侧操作区：主题切换 + 汉堡菜单 */
.nav-actions {
  display: flex;
  align-items: center;
  padding-right: 20px;
  gap: 12px;
}

.check {
  padding-right: 0;
}

/* 汉堡菜单按钮 */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  cursor: pointer;
  z-index: 10001;
  gap: 5px;
  transition: all 0.3s ease;

  span {
    display: block;
    width: 22px;
    height: 2px;
    background-color: #332b28;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  &.active {
    span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }
  }
}

/* 移动端菜单遮罩层 */
.menu-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9997;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;

  &.show {
    opacity: 1;
    pointer-events: auto;
  }
}

.search-button {
  display: inline-block;
  cursor: pointer;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #3399ff;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
}

.menus_items {
  display: inline-block;

  .menus_item {
    position: relative;
    display: inline-block;
    padding: 0 0 0 14px;
    cursor: pointer;

    a {
      position: relative;
      text-decoration: none;
      color: inherit;

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #3399ff;
        transition: width 0.3s ease;
      }

      &:hover::after {
        width: 100%;
      }
    }
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

/* ===== 移动端响应式 ===== */
@media screen and (max-width: 768px) {
  nav {
    height: 56px;
  }

  .logo {
    padding: 0 16px;
    font-size: 0.9em;
  }

  .hamburger {
    display: flex;
  }

  .menus {
    position: fixed;
    top: 0;
    right: -280px;
    width: 260px;
    height: 100vh;
    background: rgba(255, 255, 255, 0.98);
    flex-direction: column;
    padding: 80px 20px 30px;
    margin-left: 0;
    z-index: 9998;
    transition: right 0.3s ease;
    overflow-y: auto;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);

    &.show {
      right: 0;
    }
  }

  .menu-overlay {
    display: block;

    &:not(.show) {
      pointer-events: none;
    }
  }

  .search-button {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    margin-bottom: 10px;
    background: #f5f5f5;
    border-radius: 8px;
    font-size: 0.9em;

    .iconfont {
      font-size: 1.2em;
    }

    span {
      font-size: 0.9em;
      text-shadow: none;
    }

    &::after {
      display: none;
    }
  }

  .menus_items {
    display: flex;
    flex-direction: column;
    width: 100%;

    .menus_item {
      display: block;
      padding: 0;
      border-bottom: 1px solid #f0f0f0;

      a {
        display: flex;
        align-items: center;
        padding: 14px 16px;
        font-size: 1em;
        transition: background 0.2s;

        &:hover {
          background: #f0f7ff;
        }

        &::after {
          display: none;
        }

        .iconfont {
          font-size: 1.2em;
          width: 28px;
        }

        span {
          font-size: 0.95em;
          text-shadow: none;
          color: #332b28;
        }
      }
    }
  }

  /* 移动端导航在顶部透明样式覆盖 */
  nav.at-top {
    .menus_items .menus_item a span {
      color: #332b28;
    }
    .hamburger span {
      background-color: #ffffff;
    }
  }
}

/* 小屏手机 */
@media screen and (max-width: 480px) {
  .menus {
    width: 220px;
    right: -220px;
  }

  .check {
    :deep(.el-switch) {
      --el-switch-height: 20px;
    }
  }
}

</style>