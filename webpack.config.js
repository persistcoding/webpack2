const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require('webpack-merge');
const parts = require('./webpack.parts.js');


const PATHS = {
  app: path.join(__dirname, "app"),
  build: path.join(__dirname, "build")
}

const config = {
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
      title: "eliminating-unused-css Webpack"
    })
  ]
}

//commonConfig
function commonConfig() {
  return merge([
    config,
    parts.lintJavaScript()
  ])
}


// production 模式下
function prodConfig() {

  const result = merge([
    commonConfig(),
    parts.extractCSS({
      include: /app/,
      exclude: /node_modules/
    }),
    parts.extractLess({
      include: /app/,
      exclude: /node_modules/
    }),
    parts.extractSass({
      include: /app/,
      exclude: /node_modules/
    }),
    // parts.purifycss()
  ]);
  return result;
}

// development 模式下
function devConfig() {
  return merge([
    commonConfig(),
    parts.devServer(),
    parts.loadCSS({
      include: /app/,
      exclude: /node_modules/
    }),
    parts.loadLess({
      include: /app/,
      exclude: /node_modules/
    }),
    parts.loadSass({
      include: /app/,
      exclude: /node_modules/
    })
  ])
}





module.exports = function(env) {

  if(env === "production") {
    return prodConfig()
  }

  return devConfig()
}
