<template>
  <div class="index_view">
    <!--  页头  -->
    <WebHeader/>

    <!--  内容  -->
    <main class="web_main">
      main
      <div class="web_main_inner">
        inner
      </div>
    </main>

    <!--  页脚  -->
    <footer class="web_footer">footer</footer>
  </div>
</template>

<script setup>
import WebHeader from '../components/WebHeader'</script>


<style lang="scss">

.index_view {
  background-color: #f0eeee;

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
}


</style>
