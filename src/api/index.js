import request from "../utils/request";
import path from "./path";


const api = {
    /**
     * 查询文章列表
     * @param param 查询条件
     * @returns {Promise<AxiosResponse<any>>}
     */
    getArticleList(param) {
        return request.get(path.baseUrl + path.articleList, {params: param});
    },

    /**
     * 查询文章详情
     * @param param 文章id
     * @returns {Promise<AxiosResponse<any>>}
     */
    getArticleInfo(param) {
        return request.get(path.baseUrl + path.articleInfo + param);
    },

    /**
     * 根据文章id查询评论
     * @param param 文章id
     * @returns {Promise<AxiosResponse<any>>}
     */
    getCommentListByArticleId(param) {
        return request.get(path.baseUrl + path.commentList, {params: param});
    },

    /**
     * 添加评论
     * @param param 评论参数
     * @returns {Promise<AxiosResponse<any>>}
     */
    addComment(param) {
        return request.post(path.baseUrl + path.commentAdd, param)
    },

    /**
     * 根据id删除评论
     * @param param
     * @returns {Promise<AxiosResponse<any>>}
     */
    deleteComment(param) {
        return request.delete(path.baseUrl + path.commentDelete, {data: [param]});
    }
}


export default api;