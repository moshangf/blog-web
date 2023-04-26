<template>
  <div class="card notice">

    <div class="item_headline">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gonggao"></use>
      </svg>
      <span class="title">公告</span>
    </div>

    <div class="des">This is my Blog</div>

  </div>
</template>

<script>
export default {
  name: "AsideNotice"
}
</script>

<style scoped lang="scss">
.item_headline {
  font-size: 1.2em;
  padding-bottom: 10px;

  .title {
    margin-left: 10px;
  }
}
</style>