<template>
  <!--  一言  -->
  <div class="site_info">
        <span class="title">
          {{ displayText }}
        </span>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "HeaderInfo",
  setup: function () {
    // 实现文字逐字出现
    const text = ref('玉惨花愁出凤城，莲花楼下柳青青');
    const displayText = ref('');
    // onMounted(() => {
    //   axios.get('/api').then(response => {
    //     text.value = response.data.data;
    //   });
    //
    //   let index = 0;
    //   setInterval(() => {
    //     if (index < text.value.length) {
    //       displayText.value += text.value.charAt(index);
    //       index++;
    //     }
    //   }, 300);
    // });
    let index = 0;

    setInterval(() => {
      if (index < text.value.length) {
        displayText.value += text.value.charAt(index);
        index++;
      }
    }, 300);

    return {
      displayText,
    };
  },
}
</script>

<style lang="scss">
.site_info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  span.title {
    font-size: 1.72em;
  }
}
</style>