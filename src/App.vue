<template>
  <router-view/>
  <quick-login/>
</template>

<script setup>
import QuickLogin from './utils/QuickLogin/index.vue'
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import api from './api'

const store = useStore()

/**
 * 检查并记录访客信息
 * 如果没有访客ID或者最后访问日期不是今天，则记录新的访问
 */
const checkAndRecordVisitor = async () => {
  const today = new Date().toISOString().split('T')[0]
  const visitorId = store.getters.getVisitorId
  const lastVisitDate = store.getters.getLastVisitDate

  // 如果没有访客ID或者最后访问日期不是今天，则记录新的访问
  if (!visitorId || lastVisitDate !== today) {
    const newVisitorId = visitorId || uuidv4()
    try {
      await api.recordVisitor(newVisitorId)
      store.dispatch('updateVisitorInfo', {
        visitorId: newVisitorId,
        visitDate: today
      })
    } catch (error) {
      console.error('记录访客信息失败:', error)
    }
  }
}

onMounted(() => {
  checkAndRecordVisitor()
})
</script>

<style lang="scss">
</style>
