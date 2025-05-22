<template>
  <div class="card notice">

    <div class="item_headline">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gonggao"></use>
      </svg>
      <span class="title">公告</span>
    </div>

    <div class="des" v-html="notice"></div>

  </div>
</template>

<script>
import api from '../../../api'

export default {
  name: "AsideNotice",
  data() {
    return {
      notice: ''
    }
  },
  created() {
    this.getNotice()
  },
  methods: {
    async getNotice() {
      try {
        const { data } = await api.getNotice()
        if (data.code === 20000 && data.data) {
          this.notice = data.data
        }
      } catch (error) {
        console.error('获取公告失败：', error)
      }
    }
  }
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
</style>