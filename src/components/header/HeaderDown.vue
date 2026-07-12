<template>
  <!--  底部翻页按钮  -->
  <div class="scroll_down">
    <el-icon size="30" @click="scrollToContent" id="page">
      <ArrowDown/>
    </el-icon>
  </div>
</template>

<script>

export default {
  props: {
    headerRef: {type: Object, default: null}
  },

  setup(props) {
    const scrollToContent = () => {
      window.scrollTo({
        top: props.headerRef.offsetHeight,
        behavior: 'smooth'
      });
    };

    return {
      scrollToContent,
    };
  },


}
</script>

<style lang="scss" scoped>
.scroll_down {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  cursor: pointer;

  #page {
    position: relative;
    animation-name: floating;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }

  @keyframes floating {
    0% {
      transform: translateY(0);
      color: #ffffff;
    }
    50% {
      transform: translateY(-20px);
      color: #333;
    }
    100% {
      transform: translateY(0);
      color: #ffffff;
    }
  }
}

/* 移动端下翻按钮 */
@media screen and (max-width: 768px) {
  .scroll_down {
    bottom: 1.5rem;
    
    #page {
      font-size: 24px !important;
    }
  }
}
</style>