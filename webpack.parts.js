const  webpack = require('webpack')
// const exports = module.exports;

exports.devServer = function() {
    return {
        devServer: {
            // Enable history API fallback so HTML5 History API based
            // routing works. This is a good default that comes
            // in handy in more complicated setups.
            historyApiFallback: true,

            // Don't refresh if hot loading fails. If you want
            // refresh behavior, set hot: true instead.
            hotOnly: true,

            // Display only errors to reduce the amount of output.
            stats: "errors-only",

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
          new webpack.NamedModulesPlugin(),  // module 不在是数字id
        ]
    }
}



exports.lintJavaScript = function() {
    return {
        module: {
          rules: [
            {
              test: /\.(js|jsx)$/,
              enforce: 'pre',
              exclude: /node_modules/,
              use: 'eslint-loader'
            }
          ]
       },
       plugins: [
         new webpack.LoaderOptionsPlugin({
           options: {
             eslint: {
               // Fail only on errors
               failOnWarning: false,
               failOnError: true,
               // Disable/enable autofixlint
               fix: false,
               // output to Jekins compatible xml
               outputReport: {
                 filePath: 'checkstyle.xml',
                 formatter: require('eslint/lib/formatters/checkstyle')
               }
             }
           }
         })
       ]
    }
}
