<template>
  <!--  页脚  -->
  <footer class="web_footer"></footer>
</template>

<script>
export default {
  name: "WebFooter"
}
</script>

<style scoped>
.web_footer {
  position: relative;
  padding: 20px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
}

/* 移动端页脚 */
@media screen and (max-width: 768px) {
  .web_footer {
    padding: 14px;
  }
}

@media screen and (max-width: 480px) {
  .web_footer {
    padding: 10px;
  }
}
</style>