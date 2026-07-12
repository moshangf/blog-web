<template>
  <div class="card recent">

    <div class="item_headline">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-chaxunlishi"></use>
      </svg>
      <span class="title">最近文章</span>
    </div>


    <div class="aside_list">
      <div class="aside_list_item" v-for="item in articleList.value" :key="item.id">
        <div class="thumbnail">
          <el-image :src="item.cover" fit="cover" @click="toArticle(item.id)"/>
        </div>

        <div class="content">
          <router-link :to="'/articles/'+item.id">
            <span class="content_span" @click="toArticle(item.id)">{{ item.title }}</span>
          </router-link>
          <time>发表于：{{ item.createTime }}</time>

        </div>
      </div>
    </div>


  </div>
</template>

<script setup>

import {onMounted, reactive} from "vue";
import api from "../../../../api";
import {useRouter} from "vue-router";

let articleList = reactive({});
let router = useRouter();

onMounted(() => {
  let param = {pageNum: 1, pageSize: 3}
  api.getArticleList(param).then(res => {
    articleList.value = res.data.data.pagingList;
  })
})

/**
 * 跳转文章详情页面
 */
const toArticle = (val) => {
  router.push({name: 'articleInfo', params: {id: val}})
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
      cursor: pointer;
    }

    .content {
      padding-left: 10px;

      .content_span {
        font-size: 0.9em;
        line-height: 2;
        cursor: pointer;
      }

      .content_span:hover {
        font-size: 0.9em;
        line-height: 2;
        cursor: pointer;
        color: #3399ff;
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


.el-image {
  display: unset;
}

/* 移动端最近文章 */
@media screen and (max-width: 768px) {
  .aside_list {
    .aside_list_item {
      .thumbnail {
        width: 3.6em;
        height: 3.6em;
      }

      .content {
        .content_span {
          font-size: 0.85em;
        }

        time {
          font-size: 0.75em;
        }
      }
    }
  }
}
</style>