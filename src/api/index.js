import request from "../utils/request";
import path from "./path";


const api = {
    // 文章列表
    getArticleList(param) {
        return request.get(path.baseUrl + path.articleList, {params: param})
    }

}

export default api;