import request from "../utils/request";
import path from "./path";


const api = {
    // 查询文章列表
    getArticleList(param) {
        return request.get(path.baseUrl + path.articleList, {params: param});
    },

    // 查询文章详情
    getArticleInfo(param) {
        return request.get(path.baseUrl + path.articleInfo + param);
    }
}

export default api;