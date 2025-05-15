<template>
  <div class="timeline">
    <div class="count">
      <h2>文章总览 — {{ total }}</h2>
    </div>

    <el-timeline>
      <el-timeline-item
          v-for="(item, index) in articleList.value"
          :key="index"
          type="primary"
          size="large"
          hollow
          placement="top"
      >
        <!--文章发表时间-->
        <div class="time_class">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-rili1"></use>
          </svg>
          <time>{{ item.createTime }}</time>
        </div>

        <div class="timeline_item">
          <!--文章封面-->
          <div class="cover">
            <el-image class="cover_image" :src="item.cover" fit="cover"/>
          </div>

          <!--文章标题和简介-->
          <div class="layout">
            <el-space class="title" @click="toArticle(item.id)">{{ item.title }}</el-space>
            <div class="intro">{{ item.intro }}</div>
          </div>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>

  <!--  分页  -->
  <div class="page">
    <Pagination
        :total="total"
        :page_index="pageNum"
        @pageChange="pageChange"
    />
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import api from "../../api";
import Pagination from "@/utils/Pagination/index.vue";
import {useRouter} from "vue-router";

const articleList = reactive({});
const total = ref(0);
const pageNum = ref(1);
const pageSize = ref(10);
const router = useRouter();

onMounted(() => {
  let param = {pageNum: pageNum.value, pageSize: pageSize.value,}
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

  let param = {pageNum: pageNum.value, pageSize: pageSize.value}
  api.getArticleList(param).then(res => {
    articleList.value = res.data.data.pagingList;
    total.value = res.data.data.count;
  })
}

/**
 * 跳转到文章详情页
 */
const toArticle = (val) => {
  router.push({name: 'articleInfo', params: {id: val}})
}
</script>

<style lang="scss" scoped>
.timeline {
  background: rgba(255, 255, 255, 0.8);
  padding: 50px;
  border-radius: 12px;
  display: flex;
  
  .count {
    margin-bottom: 30px;
  }

  .time_class {
    font-size: 1.2em;
    margin-bottom: 10px;
  }

  .timeline_item {
    display: flex;
    align-items: center;

    .cover {
      width: 15%;
      height: 100%;

      .cover_image {
        display: unset;
      }
    }

    .layout {
      width: 70%;
      padding-left: 20px;


      .title {
        margin-bottom: 20px;
        font-size: 1.2em;
        cursor: pointer;
      }

      .title:hover {
        margin-bottom: 20px;
        color: #3399ff;
      }

      .intro {
        text-indent: 2em; //首行缩进
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }

  .icon {
    width: 1.2em;
    height: 1.2em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    margin-right: 10px;
  }
}

.page {
  display: flex;
  justify-content: center;
  margin: 30px 0;
  margin-top: auto;
}
</style>