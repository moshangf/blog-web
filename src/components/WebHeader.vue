<template>
  <header ref="header" class="web_header">
    <!--  一言  -->
    <HeaderInfo/>

    <!--  向下翻页  -->
    <HeaderDown :headerRef="header"/>
  </header>
</template>


<script setup>
import HeaderInfo from "./header/HeaderInfo";
import HeaderDown from "./header/HeaderDown";
import {ref} from "vue";

const header = ref(null);
</script>

<style lang="scss">
.web_header {
  background-image: url("../../src/assets/img/index.png");
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.2);  /* 添加半透明背景 */
  background-blend-mode: overlay;  /* 设置背景混合模式 */
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
}

/* 移动端首屏适配 */
@media screen and (max-width: 768px) {
  .web_header {
    height: 60vh;
    min-height: 400px;
    background-position: center center;
  }
}

@media screen and (max-width: 480px) {
  .web_header {
    height: 50vh;
    min-height: 350px;
  }
}
</style>