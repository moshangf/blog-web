import request from "../utils/request";
import path from "./path";

const api = {
  /**
   * 获取验证码
   * @returns {Promise<AxiosResponse<any>>}
   */
  getCaptcha() {
    return request.get(path.captcha);
  },

  /**
   * 用户登录
   * @param data
   * @returns {Promise<AxiosResponse<any>>}
   */
  login(data) {
    return request.post(path.login, data);
  },

  /**
   * 查询当前用户信息
   * @returns {Promise<AxiosResponse<any>>}
   */
  getCurrentUser() {
    return request.get(path.currentUser);
  },

  /**
   * 搜索用户,用于@功能
   * @param {*} keywords
   * @returns {Promise<AxiosResponse<any>>}
   */
  searchUsers(keywords) {
    return request.get(path.userSearch, {
      params: { keywords },
    });
  },

  /**
   * 查询文章列表
   * @param param 查询条件
   * @returns {Promise<AxiosResponse<any>>}
   */
  getArticleList(param) {
    return request.get(path.articleList, { params: param });
  },

  /**
   * 查询文章详情
   * @param param 文章id
   * @returns {Promise<AxiosResponse<any>>}
   */
  getArticleInfo(param) {
    return request.get(path.articleInfo, { params: { id: param } });
  },

  /**
   * 根据文章id查询评论
   * @param param 评论查询参数
   * @returns {Promise<AxiosResponse<any>>}
   */
  getCommentList(param) {
    return request.get(path.commentList, { params: param });
  },

  /**
   * 根据评论id查询回复列表
   * @param parentId 评论id
   * @param pageNum 当前页码
   * @param pageSize 每页显示条数
   * @param articleId 文章id
   * @returns {Promise<AxiosResponse<any>>}
   */
  getReplyPage({ parentId, current, size, articleId }) {
    return request.get(path.replyPage, {
      params: { parentId, pageNum: current, pageSize: size, articleId },
    });
  },

  /**
   * 添加评论
   * @param param 评论参数
   * @returns {Promise<AxiosResponse<any>>}
   */
  addComment(param) {
    return request.post(path.commentAdd, param);
  },

  /**
   * 根据id删除评论
   * @param param
   * @returns {Promise<AxiosResponse<any>>}
   */
  deleteComment(param) {
    return request.delete(path.commentDelete, { params: param });
  },

  /**
   * 根据id举报评论
   * @param param
   * @returns {Promise<AxiosResponse<any>>}
   */
  reportComment(param) {
    return request.post(path.reportComment, param);
  },

  /**
   * 点赞评论
   * @param {*} 评论id
   * @returns {Promise<AxiosResponse<any>>} 点赞状态 true表示已点赞，false表示已取消点赞
   */
  likeComment(commentId) {
    return request.get(path.commentLike, { params: { commentId } });
  },

  /**
   * 点赞文章
   * @param {*} articleId 文章id
   * @returns {Promise<AxiosResponse<any>>} 点赞状态 true表示已点赞，false表示已取消点赞
   */
  likeArticle(articleId) {
    return request.get(path.articleLike, { params: { articleId } });
  },

  /**
   * 检查文章点赞状态
   * @param {*} articleId 文章id
   * @returns {Promise<AxiosResponse<any>>} 点赞状态 true表示已点赞，false表示已取消点赞
   */
  checkArticleLikeStatus(articleId) {
    return request.get(path.checkArticleLikeStatus, { params: { articleId } });
  },

  /**
   * 更新文章浏览量
   * @param {*} articleId 文章id
   * @returns {Promise<AxiosResponse<any>>}
   */
  updateArticleView(articleId) {
    return request.get(path.updateArticleView, { params: { articleId } });
  },

  /**
   * 记录访客信息
   * @param {string} visitorId - 访客唯一标识
   * @returns {Promise<AxiosResponse<any>>}
   */
  recordVisitor(visitorId) {
    return request.get(path.recordVisitor, { params: { visitorId } });
  },

  /**
   * 获取作者信息
   * @returns {Promise<AxiosResponse<any>>}
   */
  getAuthorInfo() {
    return request.get(path.authorInfo);
  },

  /**
   * 获取网站公告
   * @returns {Promise<AxiosResponse<any>>}
   */
  getNotice() {
    return request.get(path.notice);
  },

  /**
   * 获取文章列表
   * @param params {pageNum, pageSize, year, month} 分页参数和筛选条件
   * @returns {Promise<AxiosResponse<any>>}
   */
  getArticleList(params) {
    return request.get(path.articleList, { params });
  },

  /**
   * 获取归档数据
   * @returns {Promise<AxiosResponse<any>>}
   */
  getArchives() {
    return request.get(path.archive);
  },

  /**
   * 获取网站统计信息
   * @returns {Promise<AxiosResponse<any>>}
   */
  getWebsiteStats() {
    return request.get(path.websiteStats);
  },

  /**
   * 搜索文章
   * @param {Object} params 搜索参数
   * @returns {Promise<AxiosResponse<any>>}
   */
  searchArticles(params) {
    return request.get(path.searchArticles, { params });
  },
};

export default api;
