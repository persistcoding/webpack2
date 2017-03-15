const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require('webpack-merge');
const parts = require('./webpack.parts.js');


const PATHS = {
  app: path.join(__dirname, "app"),
  build: path.join(__dirname, "build")
}

const commonConfig = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: "[name]-[hash].js"
  },
  module: {

  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack demo5"
    })
  ]
}

// production 模式下
function prodConfig() {
  return merge(commonConfig, parts.lintJavaScript())
}

// development 模式下
function devConfig() {
  return merge([
    commonConfig,
    parts.devServer(),
    parts.lintJavaScript()
  ])
}





module.exports = function(env) {

  if(env === "production") {
    return prodConfig()
  }

  return devConfig()
}
