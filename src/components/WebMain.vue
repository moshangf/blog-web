<template>
  <!--  内容  -->
  <main class="web_main">
    main
    <div class="web_main_inner">
      <router-view/>
    </div>
  </main>
</template>

<script>

export default {
  name: "WebMain"
}
</script>

<style lang="scss">
.web_main {
  display: flex;
  justify-content: center;

  .web_main_inner {
    background-color: white;
    min-height: 1000px;
    width: 1200px;
    margin: 40px 20px;
  }
}
</style>