<!--全局分页组件-->
<template>
  <div class="pagination">
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="page.pageNum" :page-size="page.pageSize" :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper" :total="total" :hide-on-single-page="false">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: {
      type: Number
    },
    pageNum: {
      type: Number
    },
  },
  data() {
    return {
      pageSizes: [10, 20, 50, 100],
      page: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    // // 每页查看条数变化
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.$emit('pageChange', this.page);
    },
    // 当前页码变化
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.$emit('pageChange', this.page);
    }
  },

}
</script>

<style scoped>
.pagenation {
  padding: 20px 0;
  text-align: center;
}

/* 移动端分页 */
@media screen and (max-width: 768px) {
  :deep(.el-pagination) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 4px;

    .el-pagination__total,
    .el-pagination__jump {
      font-size: 12px;
    }
    
    .btn-prev, .btn-next, .el-pager li {
      min-width: 28px;
      height: 28px;
      font-size: 12px;
      line-height: 28px;
    }
  }
}

@media screen and (max-width: 480px) {
  :deep(.el-pagination) {
    .el-pagination__sizes {
      display: none !important;
    }
  }
}
</style>
