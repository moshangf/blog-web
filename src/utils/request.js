import axios from "axios";

// 公共配置
const instance = axios.create({
    timeout: 5 * 1000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    },
})

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
    config => {
        config.headers.Authorization = localStorage.getItem('accessToken');
        
        console.log("axios请求:", config.url, "参数:", config.params.param)

        return config;
    },
    error => {
        console.log(error)
        return Promise.reject(new Error(error));
    }
)


/**
 * 响应拦截器
 */
instance.interceptors.response.use(
    response => {
        console.log("axios响应：code:", response.data.code, "message:", response.data.message)

        return response;
    },
    error => {
        console.log("axios响应错误：", error)
        return Promise.reject(new Error(error));
    }
)


export default instance;