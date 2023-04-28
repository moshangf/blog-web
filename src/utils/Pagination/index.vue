<!--全局分页组件-->
<template>
  <div class="pagination">
    <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageNum"
        :page-size="page.pageSize"
        :page-sizes="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
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
.pagination {
  padding: 24px 12px;
  text-align: right;
}

</style>

