// 后端服务器接口
const baseUrl = "http://localhost:9090/web/public";

const base = {
  // 登录接口
  login: baseUrl + "/user/login",

  // 获取验证码接口
  captcha: baseUrl + "/user/captcha",

  // 获取登录用户信息
  currentUser: baseUrl + "/user/currentUser",

  // 搜索用户接口
  userSearch: baseUrl + "/user/search",

  // 查询文章列表接口
  articleList: baseUrl + "/articles/list",

  // 查询文章详情接口
  articleInfo: baseUrl + "/articles/info",

  // 查询文章评论接口
  commentList: baseUrl + "/comment/commentList",

  // 查询文章评论分页接口
  replyPage: baseUrl + "/comment/replyPage",

  // 添加文章评论接口
  commentAdd: baseUrl + "/comment/add",

  // 删除文章评论接口
  commentDelete: baseUrl + "/comment/deleteCheck",

  // 点赞评论接口
  commentLike: baseUrl + "/comment/like",
};

export default base;
