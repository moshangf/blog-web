<template>
  <div class="index_view">
    <!--  背景  -->
    <div class="web_bg"/>

    <!--  页头  -->
    <WebIndexHeader v-if="isIndex">
      <!--  导航菜单  -->
      <HeaderNav/>

      <!--  一言  -->
      <HeaderInfo/>

      <!--  向下翻页  -->
      <HeaderDown :headerRef="header"/>
    </WebIndexHeader>


    <WebOtherHeader v-else :propData="article">
      <header id="web_other_header" :style="{backgroundImage: `url(${propData.cover})`}">
        <!--  导航菜单  -->
        <HeaderNav/>

        <div class="page_title">
          <h1 class="title">{{ propData.title }}</h1>
          <h1 class="title">{{ propData.intro }}</h1>
        </div>

      </header>
    </WebOtherHeader>

    <!--  内容  -->
    <WebMain>
      <!--  正文  -->
      <MainContent/>

      <!--  侧边信息  -->
      <MainAside/>

      <!--  回到顶部  -->
      <el-backtop :right="50" :bottom="50"/>
    </WebMain>

    <!--  页脚  -->
    <WebFooter/>

    <!--  回到顶部按钮  -->
    <div class="back_top"></div>
  </div>
</template>

<script>
export default {
  name: "demo"
}
</script>

<style scoped>

</style>