<template>
  <div class="card web_info">
    <div class="item_headline">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zhexiantu"></use>
      </svg>
      <span class="title">网站信息</span>
    </div>

    <div class="web_info">
      <div class="web_info_item">
        <div class="item_name">文章数目</div>
        <div class="item_count">{{ stats.articleCount || 0 }}</div>
      </div>
      <div class="web_info_item">
        <div class="item_name">本站总字数</div>
        <div class="item_count">{{ formatWordCount(stats.wordCount) }}</div>
      </div>
      <div class="web_info_item">
        <div class="item_name">本站访客数</div>
        <div class="item_count">{{ stats.visitorCount || 0 }}</div>
      </div>
      <div class="web_info_item">
        <div class="item_name">最后更新时间</div>
        <div class="item_count">{{ formatLastUpdate(stats.lastUpdateTime) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';


export default {
  name: "LayoutWebInfo",
  data() {
    return {
      stats: {
        articleCount: 0,
        wordCount: 0,
        visitorCount: 0,
        lastUpdateTime: null
      }
    }
  },

  created() {
    this.fetchWebsiteStats();
  },

  methods: {
    async fetchWebsiteStats() {
      try {
        const { data } = await api.getWebsiteStats();
        this.stats = data.data;
      } catch (error) {
        console.error('获取网站统计信息失败:', error);
      }
    },

    formatWordCount(count) {
      if (!count) return '0';
      return count > 1000 ? (count / 1000).toFixed(1) + 'k' : count;
    },

    formatLastUpdate(time) {
      if (!time) return '暂无更新';
      return formatDistanceToNow(new Date(time), { addSuffix: true, locale: zhCN });
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


.web_info_item {
  display: flex;
  padding: 0 10px;

  .item_name {
    flex: 1;
    line-height: 2;
  }

  .item_count {
    line-height: 2;
  }
}
</style>