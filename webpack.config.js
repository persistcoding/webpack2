const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
}

const commonConfig = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: '[name]-[hash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack demo1'
    })
  ]
}

module.exports = function(env) {
  console.log('env', env);
  return commonConfig;
}
