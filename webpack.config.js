const path = require('path')
const webpack = require('webpack')
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

// production 模式下
function prodConfig() {
  return commonConfig;
}

// development 模式下
function devConfig() {
  const config = {
    devServer: {
      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that comes
      // in handy in more complicated setups.
      historyApiFallback: true,

      // Don't refresh if hot loading fails. If you want
      // refresh behavior, set hot: true instead.
      hotOnly: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env to allow customization.
      //
      // If you use Docker, Vagrant or Cloud9, set
      // host: options.host || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`.
      host: process.env.HOST, // Defaults to `localhost`
      port: process.env.PORT, // Defaults to 8080

      // Enable error/warning overlay
      overlay: {
        errors: true,
        warnings: true,
      },

    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),  // --hot 与 HMR-plugin 二选一
      new webpack.NamedModulesPlugin()  // module 不在是数字id
    ]
  }



  return Object.assign(
    {},
    commonConfig,
    config,
    {
      plugins: commonConfig.plugins.concat(config.plugins),
    }
  );
}





module.exports = function(env) {

  if(env === "production") {
    return prodConfig()
  }

  return devConfig();
}
