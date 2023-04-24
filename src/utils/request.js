import axios from "axios";

// 公共配置
const instance = axios.create({
    timeout: 5000
})

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)


/**
 * 响应拦截器
 */
instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.log("响应错误：", error)
        return Promise.reject(new Error(error));
    }
)


export default instance;