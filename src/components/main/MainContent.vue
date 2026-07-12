<template>
  <!-- 正文 -->
  <div class="content">
    <router-view :key="route.fullPath" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute();
</script>

<style scoped>
.content {
  transition: all 0.3s;
  width: 74%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

/* 移动端：内容区全宽 */
@media screen and (max-width: 768px) {
  .content {
    width: 100%;
  }
}
</style>