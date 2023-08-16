import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局样式
import './assets/css/reset.css'
// ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// ElementPlus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// ElementPlus暗夜样式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 阿里图标样式
import './assets/js/iconfont'
import './assets/css/iconfont.css'
// 引入undraw-ui
import UndrawUi from 'undraw-ui'
import 'undraw-ui/dist/style.css'


const app = createApp(App)

app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.use(UndrawUi)


app.use(store).use(router).mount('#app')

