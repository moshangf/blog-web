<!-- 顶部展示区 -->
<template>
  <header id="web_other_header" :style="{ backgroundImage: `url(${currentCover})` }">
    <div class="page_title">
      <div class="article_title" v-if="isArticlePage">
        <h1>{{ propData?.title }}</h1>
        <p class="article_info time-info">
          <i class="iconfont icon-chuangjianshijian"></i>
          <span>发布于 {{ propData?.createTime ? dayjs(propData.createTime).format('YYYY-MM-DD HH:mm:ss') : '' }}</span>
          <span class="separator">|</span>
          <i class="iconfont icon-gengxinshijian"></i>
          <span>更新于 {{ propData?.updateTime ? dayjs(propData.updateTime).format('YYYY-MM-DD HH:mm:ss') : '' }}</span>
        </p>
        <p class="article_info count-info">
          <i class="iconfont icon-zishu"></i>
          <span>字数 {{ propData?.textCount || 0 }}</span>
          <span class="separator">|</span>
          <i class="iconfont icon-liulanliang"></i>
          <span>浏览量 {{ propData?.pageView || 0 }}</span>
          <span class="separator">|</span>
          <i class="iconfont icon-_dianzanliang"></i>
          <span>点赞数 {{ propData?.likesCount || 0 }}</span>
        </p>
      </div>
      <h1 class="title" v-else>{{ routeTitle }}</h1>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, watchEffect } from "vue";
import { computed } from 'vue'
import dayjs from "dayjs";

const props = defineProps({
  propData: {
    type: Object,
    required: false,
    default: () => ({
      cover: '',
      title: '',
      createTime: '',
      updateTime: '',
      pageView: 0,
      likesCount: 0,
      textCount: 0
    })
  },
  bannerData: {
    type: Object,
    required: false,
    default: () => ({
      cover: '',
      title: ''
    })
  }
})

const router = useRouter();
const routeTitle = ref(router.currentRoute.value.meta.title)
const isArticlePage = computed(() => {
  return routeTitle.value === "文章详情"
})

const currentCover = ref('')

// 监听路由和文章数据变化
watchEffect(() => {
  const path = router.currentRoute.value.path
  const isArticle = router.currentRoute.value.meta.title === "文章详情"
  
  if (isArticle) {
    // 是文章页面时，使用文章封面
    currentCover.value = props.propData?.cover || ''
  } else {
    // 不是文章页面时，使用传入的banner背景
    currentCover.value = props.bannerData?.cover || ''
  }
})

watchEffect(() => {
  // 在路由变化时触发组件重新渲染
  routeTitle.value = router.currentRoute.value.meta.title;
})
</script>

<style lang="scss" scoped>
.article_title {
  text-align: center;
  margin-bottom: 30px;

  h1 {
    font-size: 2.2em;
    margin-bottom: 15px;
    font-weight: 600;
    line-height: 1.4;
    color: #f5f5f5; // 乳白色
  }

  .article_info {
    font-size: 15px;
    margin-bottom: 6px;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      margin-right: 0;
      color: #f5f5f5; // 乳白色
      display: inline-flex;
      align-items: center;
    }

    .separator {
      margin: 0 10px;
    }
    
    .iconfont {
      color: #f5f5f5;
      margin-right: 5px;
      font-size: 15px;
      display: inline-flex;
      align-items: center;
    }
  }

  .count-info {
    margin-bottom: 0;
    font-size: 15px;
  }
}

#web_other_header {
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  height: 400px;
  width: 100%;
  transition: all 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  animation: slide-down 1s;

  @keyframes slide-down {
    0% {
      opacity: 0;
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
      filter: alpha(opacity=0);
      -webkit-transform: translateY(-50px);
      -moz-transform: translateY(-50px);
      -o-transform: translateY(-50px);
      -ms-transform: translateY(-50px);
      transform: translateY(-50px);
    }

    100% {
      opacity: 1;
      -ms-filter: none;
      filter: none;
      -webkit-transform: translateY(0);
      -moz-transform: translateY(0);
      -o-transform: translateY(0);
      -ms-transform: translateY(0);
      transform: translateY(0);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // background: rgba(0, 0, 0, 0.1); // 添加一个半透明遮罩
    z-index: 1;
  }

  .page_title {
    position: relative;
    z-index: 2; // 确保标题在遮罩层上方
    .title {
      color: #f5f5f5; // 乳白色
      font-size: 2.2em;
    }
  }
}
</style>