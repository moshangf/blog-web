import axios from "../utils/request";
import path from "./path";


const api = {
    // 文章列表
    getArticleList() {
        return axios.get(path.baseUrl + path.articleList)
    }

}

export default api;