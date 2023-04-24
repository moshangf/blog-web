<template>
  <div class="index_view">
    <!--  页头  -->
    <WebIndexHeader v-if="isIndex"/>
    <WebOtherHeader v-else/>

    <!--  内容  -->
    <WebMain/>

    <!--  页脚  -->
    <WebFooter/>
  </div>
</template>

<script setup>
import WebIndexHeader from '../components/WebIndexHeader';
import WebOtherHeader from '../components/WebOtherHeader'
import WebMain from "../components/WebMain";
import WebFooter from "../components/WebFooter";</script>

<script>
import {useRouter} from "vue-router";

export default {
  computed: {
    isIndex() {
      let router = useRouter().currentRoute.value.fullPath;
      return this.$route.path === "/";
    }
  }
}
</script>


<style lang="scss">

.index_view {
  background-color: #f0eeee;
}


</style>
