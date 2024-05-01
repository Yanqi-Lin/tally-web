import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import removeConsole from "vite-plugin-remove-console";
import { createStyleImportPlugin } from "vite-plugin-style-import";
import postCssPxToRem from "postcss-pxtorem";
import path from "path";

const __dirname = path.resolve();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    removeConsole(),
    createStyleImportPlugin({
      libs: [
        {
          libraryName: "zarm",
          esModule: true,
          resolveStyle: name => {
            return `zarm/es/${name}/style/css`;
          },
        },
      ],
    }),
  ],
  css: {
    modules: {
      //Dashes in class names will be camelized, the original class name will be removed from the locals
      localsConvention: "dashesOnly",
    },
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      },
    },
    postcss: {
      plugins: [
        postCssPxToRem({
          // 自适应，px>rem转换
          rootValue: 37.5, // 75表示750设计稿，37.5表示375设计稿
          propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
          selectorBlackList: [".norem"], // 过滤掉van-开头的class，不进行rem转换
          exclude: "/node_modules", // 忽略包文件转换rem
        }),
      ],
    },
  },
  server: {
    proxy: {
      "/api": {
        // 当遇到 /api 路径时，将其转换成 target 的值
        target: "http://47.120.51.252:7001",
        //target: "http://api.chennick.wang",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ""), // 将 /api 重写为空
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // src 路径
      utils: path.resolve(__dirname, "src/utils"), // src 路径
      config: path.resolve(__dirname, "src/config"), // src 路径
    },
  },
});
