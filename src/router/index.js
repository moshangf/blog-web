import {createRouter, createWebHistory} from 'vue-router'
import NProgress from "nprogress";
import 'nprogress/nprogress.css';

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('../views/IndexView.vue'),
        children: [
            {
                path: '',
                name: 'articleList',
                component: () => import('../views/article/ArticleList'),
                meta: {title: '主页'}
            },
            {
                path: '/articles',
                name: 'articles',
                component: () => import('../views/article/ArticleList'),
                meta: {title: '文章列表'}
            },
            {
                path: '/articles/:id',
                name: 'articleInfo',
                component: () => import('../views/article/Article'),
                meta: {title: '文章详情'}
            },
            {
                path: '/archives',
                name: 'archives',
                component: () => import('../views/archive/Archive'),
                meta: {title: '时间轴'}
            },
            {
                path: '/tags',
                name: 'tags',
                component: () => import('../views/tag/Tag.vue'),
                meta: {title: '标签'}
            },
            {
                path: '/categories',
                name: 'categories',
                component: () => import('../views/category/Category'),
                meta: {title: '分类'}
            },
            {
                path: '/link',
                name: 'link',
                component: () => import('../views/link/Link.vue'),
                meta: {title: '友链'}
            },
            {
                path: '/about',
                name: 'about',
                component: () => import('../views/about/About.vue'),
                meta: {title: '关于'}
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    NProgress.start();
    document.title = to.meta.title || '山鬼说'
    next()
})

router.afterEach(() => {
    NProgress.done();
})

export default router
