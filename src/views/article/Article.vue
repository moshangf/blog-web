<template>
  <div class="article">
    <div v-html="content"/>

  </div>
</template>

<script setup>
import {inject, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import api from "../../api";

const content = ref();
let article = ref();
article = inject('article') //向父组件传递
const router = useRouter();

onMounted(() => {
  const articleId = router.currentRoute.value.params.id;
  api.getArticleInfo(articleId).then(res => {
    content.value = res.data.data.content;
    article.value = res.data.data;
  })
})

</script>


<style scoped lang="scss">
.article {
  background: rgba(255, 255, 255, 0.8);
  padding: 50px;
  border-radius: 12px;
}


</style>