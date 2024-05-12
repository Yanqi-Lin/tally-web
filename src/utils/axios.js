// src/utils/axios.js
import axios from "axios";
import { Toast } from "zarm";

const MODE = import.meta.env.MODE; // 环境变量,判断当前代码运行在开发环境还是生产环境。

axios.defaults.baseURL =
  MODE == "development" ? "/api" : "http://47.120.51.252:7001"; //设置请求的基础路径

//MODE == "development" ? "/api" : "http://api.chennick.wang";

//是否该使用类似 cookie、Authorization 标头或者 TLS 客户端证书等凭据进行跨站点访问控制（Access-Control）请求
axios.defaults.withCredentials = true;

axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest"; // 请求头设置，表明是ajax请求
// axios.defaults.headers["Authorization"] = `${
//   localStorage.getItem("token") || null
// }`;
axios.defaults.headers.post["Content-Type"] = "application/json"; // post请求使用的请求体

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每个请求都重新获取最新的 token 设置到请求头中
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//响应拦截器
axios.interceptors.response.use(res => {
  if (typeof res.data !== "object") {
    Toast.show({
      icon: "fail",
      content: "服务端异常！",
    });
    return Promise.reject(res);
  }
  // 200 成功，报文已经收到并被正确处理
  if (res.data.code != 200) {
    if (res.data.msg) Toast.show(res.data.msg);
    // 4xx 客户端错误，请求报文有误，服务器无法处理
    if (res.data.code == 401) {
      //没有登录的用户，返回登录页面
      window.location.href = "/login";
    }
    return Promise.reject(res.data);
  }

  return res.data;
});

export default axios;
