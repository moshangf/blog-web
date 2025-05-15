import axios from "axios";
import store from '@/store'

// 公共配置
const instance = axios.create({
  timeout: 5 * 1000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
  (config) => {
    // 尝试从localStorage中获取token
    const accessToken = store.state.accessToken;

    // 如果有token就添加到请求头中
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    console.log(
      "axios请求:",
      config.url,
      "参数:",
      config.params ? config.params : "无参"
    );

    return config;
  },
  (error) => {
    console.log("请求错误:", error);
    return Promise.reject(new Error(error));
  }
);

/**
 * 响应拦截器
 */
instance.interceptors.response.use(
  (response) => {
    console.log(
      "axios响应：",
      response.config.url,
      "code:",
      response.data.code,
      "message:",
      response.data.message
    );

    // 判断是否需要登录
    if ([40300, 40500].includes(response.data.code)) {
      // 清除可能存在的无效token
      localStorage.removeItem("accessToken");
      
      // 创建一个自定义事件，触发快速登录弹窗
      window.dispatchEvent(new CustomEvent('show-quick-login', {
        detail: {
          config: response.config, // 保存当前请求配置，用于登录后重试
          message: response.data.message || '请先登录后再操作' // 显示后端返回的错误信息
        }
      }));
      return Promise.reject(new Error(response.data.message || '需要登录'));
    }

    return response;
  },
  (error) => {
    console.log("axios响应错误：", error);
    return Promise.reject(error instanceof Error ? error : new Error(error));
  }
);

export default instance;
