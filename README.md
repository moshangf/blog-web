# 博客网站前端项目

## 项目概述
这是一个基于Vue.js的博客网站前端项目，包含了博客展示、文章浏览、分类标签、归档等功能模块。

## 技术栈
- Vue.js: 前端框架
- Vue Router: 路由管理
- Vuex: 状态管理
- Axios: HTTP请求
- CSS: 样式设计

## 项目结构
```
├── .browserslistrc         # 浏览器兼容性配置
├── .env.development        # 开发环境变量
├── .env.production         # 生产环境变量
├── .gitignore              # Git忽略文件配置
├── README.md               # 项目说明文档
├── babel.config.js         # Babel配置
├── package-lock.json       # 依赖版本锁定文件
├── package.json            # 项目依赖配置
├── public\                 # 静态资源目录
│   ├── favicon.ico         # 网站图标
│   ├── index.html          # 入口HTML文件
│   └── static\             # 静态资源
│       └── emoji\          # 表情图标
├── src\                    # 源代码目录
│   ├── App.vue             # 根组件
│   ├── api\                # API接口封装
│   │   ├── index.js        # API入口
│   │   └── path.js         # API路径配置
│   ├── assets\             # 资源目录
│   │   ├── css\            # 样式文件
│   │   ├── img\            # 图片资源
│   │   └── js\             # 公共JS
│   ├── components\         # 公共组件
│   │   ├── SideToolbar.vue # 侧边工具栏
│   │   ├── WebBanner.vue   # 网站横幅
│   │   ├── WebFooter.vue   # 网站页脚
│   │   ├── WebHeader.vue   # 网站头部
│   │   ├── WebMain.vue     # 网站主内容区
│   │   ├── header\         # 头部相关组件
│   │   └── main\           # 主内容区相关组件
│   ├── main.js             # 入口JS文件
│   ├── router\             # 路由配置
│   │   └── index.js        # 路由入口
│   ├── store\              # 状态管理
│   │   └── index.js        # 状态管理入口
│   ├── utils\              # 工具函数
│   │   ├── ArticleSearch\  # 文章搜索工具
│   │   ├── CommentOperate\ # 评论操作工具
│   │   ├── Pagination\     # 分页工具
│   │   ├── QuickLogin\     # 快速登录工具
│   │   ├── request.js      # 请求封装
│   │   └── useCopyCode.js  # 代码复制工具
│   └── views\              # 页面视图
│       ├── IndexView.vue   # 首页视图
│       ├── about\          # 关于页面
│       ├── archive\        # 归档页面
│       ├── article\        # 文章页面
│       ├── category\       # 分类页面
│       ├── link\           # 链接页面
│       └── tag\            # 标签页面
└── vue.config.js           # Vue配置文件
```

## 功能模块
1. **首页**: 展示最新文章、分类、标签等信息
2. **文章详情**: 展示单篇文章内容、评论等
3. **分类页面**: 按分类查看文章
4. **标签页面**: 按标签查看文章
5. **归档页面**: 按时间归档查看文章
6. **关于页面**: 展示博客关于信息
7. **链接页面**: 展示友情链接等

## 环境配置
- **开发环境**: .env.development 文件配置
- **生产环境**: .env.production 文件配置

## 项目设置
```
npm install
```

### 开发环境运行
```
npm run serve
```

### 生产环境构建
```
npm run build
```

### 代码检查与修复
```
npm run lint
```

## 自定义配置
See [Configuration Reference](https://cli.vuejs.org/config/).
