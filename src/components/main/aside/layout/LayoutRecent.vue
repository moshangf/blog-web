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
        <div class="thumbnail">
          <router-link to="/tags">
            <el-image :src="require('@/assets/img/avatar.jpg')" fit="cover"/>
          </router-link>
        </div>

        <div class="content">
          <router-link to="/tags">
            <span class="content_span">redis学习</span>
          </router-link>

          <time datetime="2022-12-22T02:26:19" title="发表于2022-12-22 02:26:19">2022-12-22</time>
        </div>
      </div>

      <div class="aside_list_item">
        <div class="thumbnail">
          <router-link to="/tags">
            <el-image :src="require('@/assets/img/avatar.jpg')" fit="cover"/>
          </router-link>
        </div>

        <div class="content">
          <router-link to="/tags">
            <span class="content_span">redis学习</span>
          </router-link>

          <time datetime="2022-12-22T02:26:19" title="发表于2022-12-22 02:26:19">2022-12-22</time>
        </div>
      </div>

      <div class="aside_list_item">
        <div class="thumbnail">
          <router-link to="/tags">
            <el-image :src="require('@/assets/img/avatar.jpg')" fit="cover"/>
          </router-link>
        </div>

        <div class="content">
          <router-link to="/tags">
            <span class="content_span">redis学习</span>
          </router-link>

          <time datetime="2022-12-22T02:26:19" title="发表于2022-12-22 02:26:19">2022-12-22</time>
        </div>
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
  padding-bottom: 10px;

  .title {
    margin-left: 10px;
  }
}

.aside_list {
  box-sizing: border-box;

  .aside_list_item {
    align-items: center;
    padding: 6px 0;
    display: flex;

    .thumbnail {
      width: 4.2em;
      height: 4.2em;
    }

    .content {
      padding-left: 10px;

      .content_span {
        font-size: 1em;
        line-height: 2;
      }

      time {
        display: block;
        font-size: 0.8em;
        color: #7f838b;
      }
    }
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