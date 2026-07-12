<template>
  <!--  一言  -->
  <div class="site_info">
    <div class="poetry">
      <div class="content">{{ displayContent }}</div>
      <div class="author">{{ displayAuthor }}</div>
    </div>
  </div>
</template>

<script>
import {onMounted, ref, onUnmounted} from "vue";
import 'jinrishici'

export default {
  name: "HeaderInfo",
  setup: function () {
    const text = ref({ content: '', author: '' });
    const displayContent = ref('');
    const displayAuthor = ref('');
    let timer = null;

    const typeText = () => {
      let contentIndex = 0;
      let authorIndex = 0;
      let isTypingContent = true;

      timer = setInterval(() => {
        if (isTypingContent) {
          if (contentIndex < text.value.content.length) {
            displayContent.value += text.value.content.charAt(contentIndex);
            contentIndex++;
          } else {
            isTypingContent = false;
          }
        } else {
          if (authorIndex < text.value.author.length) {
            displayAuthor.value += text.value.author.charAt(authorIndex);
            authorIndex++;
          } else {
            clearInterval(timer);
          }
        }
      }, 200);
    };

    onMounted(() => {
      const jinrishici = require('jinrishici');
      jinrishici.load(result => {
        text.value = {
          content: result.data.content,
          author: `—— 《${result.data.origin.title}》`
        };
        typeText();
      });
    });

    // 组件卸载时清除定时器
    onUnmounted(() => {
      if (timer) {
        clearInterval(timer);
      }
    });

    return {
      displayContent,
      displayAuthor
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
  width: 80%;
  max-width: 700px;
  
  .poetry {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .content {
      font-size: 1.72em;
      color: white;
      margin-bottom: 10px;
      text-align: center;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }
    
    .author {
      font-size: 1.2em;
      color: white;
      align-self: flex-end;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
  }
}

/* 移动端 */
@media screen and (max-width: 768px) {
  .site_info {
    width: 85%;
    
    .poetry {
      .content {
        font-size: 1.2em;
      }
      .author {
        font-size: 0.95em;
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .site_info {
    width: 90%;
    
    .poetry {
      .content {
        font-size: 1em;
      }
      .author {
        font-size: 0.85em;
      }
    }
  }
}
</style>