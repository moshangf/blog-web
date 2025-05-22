<template>
  <div class="card info">
    <!--  作者信息  -->
    <div class="canter">
      <div class="avatar">
        <el-avatar :src="authorInfo.avatar || require('@/assets/img/avatar.jpg')" :size="120" />
      </div>
      <div class="name">{{ authorInfo.name }}</div>
      <div class="description">{{ authorInfo.description }}</div>
    </div>

    <!--  博客统计  -->
    <!-- <div class="statistics">
      <router-link to="/articles" class="stat-item">
        <div class="title">文章</div>
        <div class="count">3</div>
      </router-link>

      <router-link to="/tags" class="stat-item">
        <div class="title">标签</div>
        <div class="count">2</div>
      </router-link>

      <router-link to="/categories" class="stat-item">
        <div class="title">分类</div>
        <div class="count">1</div>
      </router-link>
    </div> -->



    <!--  图标  -->
    <div class="icons">
      <a class="social-icon" :href="authorInfo.social.github" target="_blank" v-if="authorInfo.social.github">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-github"></use>
        </svg>
      </a>

      <a class="social-icon" :href="authorInfo.social.gitee" target="_blank" v-if="authorInfo.social.gitee">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gitee"></use>
        </svg>
      </a>

      <a class="social-icon" :href="'mailto:' + authorInfo.social.email" v-if="authorInfo.social.email">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youxiang"></use>
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import api from '@/api'

export default {
  name: "Info",
  setup() {
    const store = useStore()
    const authorInfo = ref(store.state.authorInfo)

    // 检查是否需要更新作者信息
    const checkNeedUpdate = () => {
      const lastUpdate = authorInfo.value.lastUpdate
      if (!lastUpdate) return true
      
      // 设置更新间隔为5分钟
      const UPDATE_INTERVAL = 5 * 60 * 1000
      return Date.now() - lastUpdate > UPDATE_INTERVAL
    }

    /**
     * 获取作者信息
     * @description 通过API获取作者信息，并更新Vuex状态
     */
    const fetchAuthorInfo = async () => {
      try {
        const response = await api.getAuthorInfo()
        if (response.data.code === 20000 && response.data.data) {
          // 添加更新时间戳并持久化作者信息
          const authorData = {
            ...response.data.data,
            lastUpdate: Date.now()
          }
          store.commit('setAuthorInfo', authorData)
          authorInfo.value = store.state.authorInfo
        }
      } catch (error) {
        console.error('获取作者信息失败:', error)
      }
    }

    onMounted(() => {
      // 如果没有作者信息或需要更新，则获取新数据
      if (!authorInfo.value.name || checkNeedUpdate()) {
        fetchAuthorInfo()
      }
    })

    return {
      authorInfo
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  margin-top: 0;
  padding: 20px 20px 20px 20px;

  // 作者信息
  .canter {
    text-align: center;

    .name {
      font-weight: 500;
      font-size: 1.5em;
      margin-top: 10px;
    }

    .description {
      margin-top: 10px;
    }
  }

  // 博客统计
  .statistics {
    margin: 14px 0 4px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    text-align: center;

    .stat-item {
      padding: 10px 20px;
    }

    .title {
      font-size: 20px;
      margin-bottom: 5px;
    }

    .count {
      font-size: 20px;
    }
  }

  // 图标
  .icons {
    display: flex;
    margin-top: 20px;
    padding: 10px 0px 0px 0px;
    text-align: center;
    border-top: 2px dashed #9fd1e3;

    .social-icon {
      width: 33%;
      font-size: 1.6em;
    }
  }

}
</style>