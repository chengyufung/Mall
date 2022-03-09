// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   configureWebpack: {
//     resolve: {
//       // 配置别名
//       alias: {
//         '@': 'src',
//         'assets': '@/assets',
//         'common': '@/common',
//         'components': '@/components',
//         'network': '@/newtwork',
//         'views': '@/views'
//       }
//     }
//   }

// const { resolve } = require("core-js/fn/promise");

// })
// const path = require('path')
// const webpack = require('webpack')
// function resolve(dir) {
//   return path.join(__dirname, dir)
// }
// module.exports = {
//   configureWebpack: {
//     resolve: {
//       // extensions: ['.js', '.vue', '.json'],
//       // 别名 修改路径../ ../
//       alias: {
//         'vue$': 'vue/dist/vue.esm.js',
//         '@': resolve('src'),//从根目录下的src文件下边开始找
//         'assets': resolve('src/assets'),
//         'components': resolve('src/components'),
//         'views': resolve('src/views'),
//         'common': resolve('src/common'),
//         'network': resolve('src/network')
//         //src="~assets/img/tabbar/home.png" 前面添加~
//         // 修改配置后，需要重新npm run dev
//       }
//     },
//   }
// }

'use strict'

const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("common", resolve("src/common"))
      .set("components", resolve("src/components"))
      .set("network", resolve("src/network"))
      .set("views", resolve("src/views"))
      // .set("base", resolve("baseConfig"))
  },
}