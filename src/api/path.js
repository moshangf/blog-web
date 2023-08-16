const mode = {
    // 文章模块
    article: "/articles",

    // 评论模块
    comment: "/comment",

}

const base = {
    // 后端服务器接口
    baseUrl: "http://localhost:9090",

    // 文章列表接口
    articleList: mode.article + "/list",

    // 文章详情接口
    articleInfo: mode.article + "/info/",

    // 文章评论接口
    commentList: mode.comment + "/listCommentByArticleId",

    // 添加文章评论
    commentAdd: mode.comment + "/add",

    // 删除文章评论
    commentDelete: mode.comment + "/deleteCheck"
}

export default base;