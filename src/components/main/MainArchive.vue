<template>
  <!-- 正文 -->
  <div class="archive">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "MainArchive"
}
</script>

<style scoped>
.archive {
  background: rgba(255, 255, 255, 0.8);
  padding: 50px 40px;
  transition: all 0.3s;
  width: 74%;
  border-radius: 8px;
}
</style>