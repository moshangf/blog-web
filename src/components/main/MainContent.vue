<template>
  <!-- 正文 -->
  <div class="content">
    <router-view :key="route.fullPath"/>
  </div>
</template>

<script>
import {useRoute} from 'vue-router'

export default {
  setup() {
    const route = useRoute();
    return {
      route
    }
  }
}
</script>

<style scoped>
.content {
  transition: all 0.3s;
  width: 74%;
  border-radius: 8px;
}
</style>