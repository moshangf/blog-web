<template>
  <header id="web_other_header" :style="{ backgroundImage: `url(${propData?.cover || ''})` }">
    <div class="page_title">
      <div class="article_title" v-if="isArticlePage">
        <h1>{{ propData?.title }}</h1>
        <p class="article_info">
          <span>发布时间: {{ propData?.createTime ? dayjs(propData.createTime).format('YYYY-MM-DD HH:mm:ss') : '' }}</span>
          <span>浏览量: {{ propData?.pageView || 0 }}</span>
          <span>点赞数: {{ propData?.likesCount || 0 }}</span>
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
    required: true,
    default: () => ({
      cover: '',
      title: '',
      createTime: '',
      pageView: 0,
      likesCount: 0
    })
  }
})

const router = useRouter();
const routeTitle = ref(router.currentRoute.value.meta.title)
const isArticlePage = computed(() => {
  console.log('meta名称:', routeTitle.value)
  return routeTitle.value === "文章详情"
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
    font-size: 2em;
    margin-bottom: 15px;
    font-weight: 600;
    line-height: 1.4;
    // 渐变色效果
    background-image: linear-gradient(to right,
        #8b0000,
        #d2691e,
        #daa520,
        #228b22);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: rainbow 6s linear infinite;
  }

  // 添加动画效果
  @keyframes rainbow {
    0% {
      background-position: 0% 50%;
    }

    100% {
      background-position: 400% 50%;
    }
  }

  .article_info {
    color: #000000;
    font-size: 14px;

    span {
      margin-right: 20px;
      background-image: linear-gradient(to right,
          #8b0000,
          #d2691e,
          #daa520,
          #228b22);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      animation: rainbow 6s linear infinite;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}

#web_other_header {
  background-image: url("../../src/assets/img/archive.jpg");
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


  .page_title {
    .title {
      color: white;
    }
  }
}
</style>