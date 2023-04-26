<template>
  <div class="card archives">

    <div class="item_headline">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-guidang"></use>
      </svg>
      <span class="title">归档</span>
    </div>

    <ul class="archive_list">
      <li class="archive_list_item">
        <router-link to="/archives" class="rl">
          <span class="archive_list_item_date">十二月 2022</span>
          <span class="archive_list_item_count"> 3</span>
        </router-link>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: "LayoutArchives"
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

.archive_list {
  list-style: none;

  .archive_list_item {
    padding: 0 10px;

    .rl {
      display: flex;

      .archive_list_item_date {
        flex: 1;
      }
    }
  }
}
</style>