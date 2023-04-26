<template>
  <div class="aside">

    <!--  个人信息  -->
    <AsideInfo/>

    <!--  公告  -->
    <AsideNotice/>

    <!--  最近文章/归档信息/网站信息  -->
    <div class="sticky_layout">
      <LayoutRecent/>
      <LayoutArchives/>
      <LayoutWebInfo/>
    </div>

  </div>
</template>

<script setup>
import AsideInfo from './aside/AsideInfo'
import AsideNotice from "./aside/AsideNotice";
import LayoutArchives from "./aside/layout/LayoutArchives";
import LayoutRecent from "./aside/layout/LayoutRecent";
import LayoutWebInfo from "./aside/layout/LayoutWebInfo";</script>

<style lang="scss">
.aside {
  margin-left: 15px;
  width: 26%;
  border-radius: 8px;
}

.card {
  background: rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
  margin-top: 20px;
  padding: 20px 24px;
  border-radius: 8px;
}
</style>