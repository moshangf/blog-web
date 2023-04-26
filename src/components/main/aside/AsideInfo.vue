<template>
  <div class="card info">
    <!--  作者信息  -->
    <div class="canter">
      <div class="avatar">
        <el-avatar :src="require('@/assets/img/avatar.jpg')" :size="120"/>
      </div>
      <div class="name">山鬼</div>
      <div class="description">一只萌新</div>
    </div>

    <!--  博客统计  -->
    <div class="statistics">
      <router-link to="/articles">
        <div class="title">文章</div>
        <div class="count">3</div>
      </router-link>

      <router-link to="/tags">
        <div class="title">标签</div>
        <div class="count">2</div>
      </router-link>

      <router-link to="/categories">
        <div class="title">分类</div>
        <div class="count">1</div>
      </router-link>
    </div>

    <!--  图标  -->
    <div class="icons">
      <a class="social-icon" href="https://github.com/moshangf?tab=repositories">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-github"></use>
        </svg>
      </a>

      <a class="social-icon" href="https://gitee.com/moshangfeng3">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gitee"></use>
        </svg>
      </a>

      <a class="social-icon" href="mailto:15531132417@163.com">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youxiang"></use>
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Info"
}
</script>

<style scoped lang="scss">
.card {
  margin-top: 0;

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
    padding: 0 50px;
    text-align: center;

    .social-icon {
      width: 33%;
      font-size: 1.6em;
    }
  }

}
</style>