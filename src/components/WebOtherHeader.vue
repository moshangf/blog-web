<template>
  <header id="web_other_header" :style="{backgroundImage: `url(${propData.cover})`}">
    <!--  导航菜单  -->
    <HeaderNav/>

    <div class="page_title">
      <h1 class="title">{{ propData.title }}</h1>
      <h1 class="title">{{ propData.intro }}</h1>
    </div>

  </header>
</template>


<script setup>
import HeaderNav from "./header/HeaderNav";

const props = defineProps({
  propData: Object
})

</script>

<style lang="scss" scoped>
html {
  scroll-behavior: smooth;
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