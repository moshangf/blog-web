import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 全局样式
import "./assets/css/reset.css";
// ElementPlus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
// ElementPlus图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// ElementPlus暗夜样式
import "element-plus/theme-chalk/dark/css-vars.css";
// 阿里图标样式
import "./assets/js/iconfont";
import "./assets/css/iconfont.css";

const app = createApp(App);

// ElP配置中文
app.use(ElementPlus, {
  locale: zhCn,
  size: "small",
  zIndex: 3000,
  darkMode: true,
});
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(store).use(router).mount("#app");

// 生产环境禁用 console.log
if (process.env.NODE_ENV === 'production') {
  console.log = () => {}
  console.debug = () => {}
  console.info = () => {}
  // 保留 console.warn 和 console.error
}