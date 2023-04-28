<template>
  <div class="article_list">


    <div class="list_item" v-for="(item,index) in articleList.value" :key="index">
      <div class="cover">
        <el-image class="cover_image" :src="item.cover" fit="cover"/>
      </div>

      <div class="info">
        <div class="title">
          <router-link to="/articles">{{ item.title }}</router-link>
        </div>


        <div class="subhead">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-rili"></use>
          </svg>
          <span class="date">发表于{{ item.createTime }}</span>

          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-pinglun"></use>
          </svg>
          <span class="comment_count"> 0条评论</span>
        </div>


        <div class="intro">{{ item.intro }}</div>
      </div>
    </div>

    <!--  分页  -->
    <div class="page">
      <Pagination
          :total="total"
          :page_index="pageNum"
          @pageChange="pageChange"
      />
    </div>
  </div>
</template>


<script setup>
import {onMounted, reactive, ref} from "vue";
import api from "../../api";
import Pagination from "../../utils/Pagination";

const articleList = reactive({});
const total = ref(0);
const pageNum = ref(1);
const pageSize = ref(10);

onMounted(() => {
  let param = {pageNum: pageNum.value, pageSize: pageSize.value,}
  api.getArticleList(param).then(res => {
    console.log(res.data)
    articleList.value = res.data.data.pagingList;
    total.value = res.data.data.count;
  })
})

/**
 * 分页函数
 * @param val 分页条件
 */
const pageChange = (val) => {
  pageSize.value = val.pageSize
  pageNum.value = val.pageNum

  let param = {pageNum: pageNum.value, pageSize: pageSize.value}
  api.getArticleList(param).then(res => {
    console.log(res.data)
    articleList.value = res.data.data.pagingList;
    total.value = res.data.data.count;
  })
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
  flex: 1;
}

</style>

