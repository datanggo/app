const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // 关闭eslint校验工具
  lintOnSave: false,

  // 配置代理跨域
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
        // pathRewrite: { '^/api': '' }
      }
    }
  },

  // 配置打包之后生成的引用的路径
  publicPath: "./",
  assetsDir: "./",
  // 配置打包时不生成map文件
  productionSourceMap: false
})
