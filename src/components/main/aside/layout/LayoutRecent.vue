<template>
  <div class="card recent">

    <div class="item_headline">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-chaxunlishi"></use>
      </svg>

      <span class="title">最近文章</span>
    </div>

    <div class="aside_list">
      <div class="aside_list_item">
        文章1
      </div>

      <div class="aside_list_item">
        文章2
      </div>

      <div class="aside_list_item">
        文章3
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "LayoutRecent"
}
</script>

<style scoped lang="scss">
.item_headline {
  font-size: 1.2em;
  padding: 0 0 6px;

  .title {
    margin-left: 10px;
  }
}

.aside_list {
  box-sizing: border-box;

  .aside_list_item {
    align-items: center;
    padding: 6px 0;
  }

  .aside_list_item:first-child {
    padding-top: 0;
  }

  .aside_list_item:not(:last-child) {
    border-bottom: 1px dashed #f5f5f5;
  }

  .aside_list_item:last-child {
    padding-bottom: 0;
  }
}

</style>