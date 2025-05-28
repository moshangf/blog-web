// 后端服务器接口
const baseUrl = "http://localhost:9090/web/public";
// 公网域名
// const baseUrl = "https://你的域名/web/public";

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
  commentDelete: baseUrl + "/comment/deleteMyComment",

  // 举报评论接口
  reportComment: baseUrl + "/comment/report",

  // 点赞评论接口
  commentLike: baseUrl + "/comment/like",

  // 访客记录接口
  recordVisitor: baseUrl + "/visitor/record",

  // 获取作者信息接口
  authorInfo: baseUrl + "/author/info",

  // 获取网站公告接口
  notice: baseUrl + "/notice/info",

  // 获取归档列表接口
  archive: baseUrl + "/articles/archive",

  // 获取网站统计信息
  websiteStats: baseUrl + "/website/stats",

  // 查询评论审核状态接口
  commentAuditStatus: baseUrl + "/comment/auditStatus",
};

export default base;
