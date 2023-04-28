<template>
  <div class="card web_info">
    <div class="item_headline">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zhexiantu"></use>
      </svg>

      <span class="title">网站信息</span>
    </div>


    <div class="web_info">
      <div class="web_info_item">
        <div class="item_name">文章数目</div>
        <div class="item_count">3</div>
      </div>
      <div class="web_info_item">
        <div class="item_name">本站总字数</div>
        <div class="item_count">16k</div>
      </div>
      <div class="web_info_item">
        <div class="item_name">本站访客数</div>
        <div class="item_count">169</div>
      </div>
      <div class="web_info_item">
        <div class="item_name">最后更新时间</div>
        <div class="item_count">3个月前</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "LayoutWebInfo"
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


.web_info_item {
  display: flex;
  padding: 0 10px;

  .item_name {
    flex: 1;
    line-height: 2;
  }

  .item_count {
    line-height: 2;
  }
}


</style>