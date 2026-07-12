<template>
  <div class="article_list">


    <div class="list_item" v-for="(item, index) in articleList.value" :key="index">
      <div class="cover">
        <el-image class="cover_image" :src="item.cover" fit="cover" />
      </div>

      <div class="info">
        <div class="title">
          <el-space class="article_title" @click="toArticle(item.id)">{{ item.title }}</el-space>
        </div>


        <div class="subhead">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-rili"></use>
          </svg>
          <span class="date">发表于{{ item.createTime }}</span>

          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-pinglun"></use>
          </svg>
          <span class="comment_count"> {{ item.commentsNum }}条评论</span>
        </div>


        <div class="intro">{{ item.intro }}</div>
      </div>
    </div>
  </div>

  <!--  分页  -->
  <div class="page">
    <Pagination :total="total" :page_index="pageNum" @pageChange="pageChange" />
  </div>
</template>


<script setup>
import { onMounted, reactive, ref } from "vue";
import api from "../../api";
import Pagination from "@/utils/Pagination/index.vue";
import { useRouter } from "vue-router";

const articleList = reactive({});
const total = ref(0);
const pageNum = ref(1);
const pageSize = ref(10);
const router = useRouter();

onMounted(() => {
  let param = { pageNum: pageNum.value, pageSize: pageSize.value, }
  api.getArticleList(param).then(res => {
    articleList.value = res.data.data.pagingList;
    total.value = res.data.data.count;
  })
})

/**
 * 分页查询
 * @param val 分页条件
 */
const pageChange = (val) => {
  pageSize.value = val.pageSize
  pageNum.value = val.pageNum

  let param = { pageNum: pageNum.value, pageSize: pageSize.value }
  api.getArticleList(param).then(res => {
    articleList.value = res.data.data.pagingList;
    total.value = res.data.data.count;
  })
}


/**
 * 跳转文章详情页面
 */
const toArticle = (val) => {
  router.push({ name: 'articleInfo', params: { id: val } })
}

</script>


<style scoped lang="scss">
.list_item {
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  margin-top: 20px;
  border-radius: 12px;
  align-items: center;
  height: 250px;
  overflow: hidden;

  .cover {
    width: 44%;
    height: 100%;

    .cover_image {
      display: unset;
    }
  }

  .info {
    width: 55%;
    padding: 0 40px;

    .title {
      font-size: 1.4em;
      line-height: 1.4;

      .article_title {
        cursor: pointer;
      }

      .article_title:hover {
        color: #3399ff;
      }
    }

    .subhead {
      color: #858585;
      line-height: 2;

      .date {
        font-size: 80%;
        padding-left: 5px;
        padding-right: 15px;
      }

      .comment_count {
        font-size: 80%;
        padding-left: 5px;
      }
    }

    .intro {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      line-height: 2;
      color: #4B494C;
      font-size: 12px;
    }

  }
}

.list_item:first-child {
  margin-top: 0;
}

.archive_list {
  display: flex;
}

.page {
  display: flex;
  justify-content: center;
  margin: 30px 0;
  margin-top: auto;
}

/* 移动端文章列表 */
@media screen and (max-width: 768px) {
  .list_item {
    flex-direction: column;
    height: auto;

    .cover {
      width: 100%;
      height: 200px;
      border-radius: 12px 12px 0 0;
    }

    .info {
      width: 100%;
      padding: 16px 20px;

      .title {
        font-size: 1.1em;
      }

      .subhead {
        line-height: 1.8;
        font-size: 0.85em;
      }

      .intro {
        -webkit-line-clamp: 3;
        line-clamp: 3;
        margin-top: 8px;
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .list_item {
    .cover {
      height: 180px;
    }

    .info {
      padding: 12px 16px;

      .title {
        font-size: 1em;
      }
    }
  }
}
</style>
