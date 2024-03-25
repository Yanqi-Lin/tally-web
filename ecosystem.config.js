module.exports = {
  apps: [
    {
      name: "tally-web",
      script: "tally-web-server.js",
    },
  ],
  deploy: {
    production: {
      user: "root",
      host: "47.120.51.252",
      ref: "origin/master",
      repo: "git@github.com:Yanqi-Lin/tally-web.git",
      path: "/workspace/tally-web",
      "post-deploy":
        "git reset --hard && git checkout master && git pull && npm i --production=false && npm run build:release && pm2 startOrReload ecosystem.config.js", // -production=false 下载全量包
      env: {
        NODE_ENV: "production",
      },
    },
  },
};
