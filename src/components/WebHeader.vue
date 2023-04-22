<template>
  <header class="web_header" ref="pageRef">
    <!--  顶部导航栏  -->
    <transition name="fade">
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
              <a href="/">
                <i class="iconfont icon-shouye"></i>
                <span>首页</span>
              </a>
            </div>

            <div class="menus_item">
              <a href="/archives">
                <i class="iconfont icon-timeline-fill"></i>
                <span>时间轴</span>
              </a>
            </div>

            <div class="menus_item">
              <a href="">
                <i class="iconfont icon-biaoqian"></i>
                <span>标签</span>
              </a>
            </div>

            <div class="menus_item">
              <a href="">
                <i class="iconfont icon-fenlei"></i>
                <span>分类</span>
              </a>
            </div>

            <div class="menus_item">
              <a href="">
                <i class="iconfont icon-zerenqingdan"></i>
                <span>清单</span>
              </a>
            </div>

            <div class="menus_item">
              <a href="">
                <i class="iconfont icon-lianjie"></i>
                <span>友链</span>
              </a>
            </div>

            <div class="menus_item">
              <a href="">
                <i class="iconfont icon-guanyu"></i>
                <span>关于</span>
              </a>
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
    </transition>

    <!--  一言  -->
    <div class="site_info">
        <span class="title">
          {{ displayText }}
        </span>
    </div>

    <!--  底部翻页按钮  -->
    <div class="scroll_down" ref="pageRef">
      <el-icon size="30" @click="scrollToContent" id="page">
        <ArrowDown/>
      </el-icon>
    </div>
  </header>
</template>


<script>
import {useDark} from '@vueuse/core'
import {ref} from "vue";

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


  setup() {
    // 控制翻页对象
    const pageRef = ref(null);
    const scrollToContent = () => {
      window.scrollTo(0, pageRef.value.offsetHeight);
    };

    // 实现文字逐字出现
    const text = ref('玉惨花愁出凤城，莲花楼下柳青青');
    const displayText = ref('');

    // onMounted(() => {
    //   axios.get('/api').then(response => {
    //     text.value = response.data.data;
    //   });
    //
    //   let index = 0;
    //   setInterval(() => {
    //     if (index < text.value.length) {
    //       displayText.value += text.value.charAt(index);
    //       index++;
    //     }
    //   }, 300);
    // });

    let index = 0;
    setInterval(() => {
      if (index < text.value.length) {
        displayText.value += text.value.charAt(index);
        index++;
      }
    }, 300);


    return {
      pageRef,
      scrollToContent,
      displayText,
    };
  },
}
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

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
}

.menus_item {
  position: relative;
  display: inline-block;
  padding: 0 0 0 14px;
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

.site_info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.scroll_down {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  cursor: pointer;
}

#page {
  position: relative;
  animation-name: floating;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}

@keyframes floating {
  0% {
    transform: translateY(0);
    color: #ffffff;
  }
  50% {
    transform: translateY(-20px);
    color: #333;
  }
  100% {
    transform: translateY(0);
    color: #ffffff;
  }
}

span.title {
  font-size: 1.72em;
}
</style>