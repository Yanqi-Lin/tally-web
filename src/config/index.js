const MODE = import.meta.env.MODE; // 环境变量

export const baseUrl =
  MODE == "development" ? "/api" : "http://47.120.51.252:7001";
// export const baseUrl =
//   MODE == "development" ? "/api" : "http://api.chennick.wang";
//export const baseUrl = MODE == "development" ? "/api" : "https://tally-demo.vercel.app";
