<template>
  <!--  一言  -->
  <div class="site_info">
        <span class="title">
          {{ displayText }}
        </span>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import 'jinrishici'

export default {
  name: "HeaderInfo",
  setup: function () {
    // 实现文字逐字出现
    const text = ref(null);
    const displayText = ref('');

    onMounted(() => {
      const jinrishici = require('jinrishici');
      jinrishici.load(result => {
        text.value = result.data.content + "—— 《" + result.data.origin.title + "》"
      });

      let index = 0;
      setInterval(() => {
        if (index < text.value.length) {
          displayText.value += text.value.charAt(index);
          index++;
        }
      }, 300);
    });

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
    color: white;
  }
}
</style>