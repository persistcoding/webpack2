const  webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')
const glob = require('glob')
const path = require("path")


exports.devServer = function() {
    return {
        devServer: {
            // Enable history API fallback so HTML5 History API based
            // routing works. This is a good default that comes
            // in handy in more complicated setups.
            historyApiFallback: true,

            // Don't refresh if hot loading fails. If you want
            // refresh behavior, set hot: true instead.
            // The configuration was changed to use hot: true over hotOnly: true as then the browser refreshes regardless of a possible error during processing. The latter option is valuable for debugging HMR when you are implementing the client side interface.
            hot: true,

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

exports.loadCSS = function({include, exclude}) {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,
          use: [
            {loader: 'style-loader'},
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => ([
                  require('autoprefixer'),
                  require('precss')
                ])
              }
            }
          ]
        }
      ]
    }
  }
}


exports.loadLess = function({include, exclude}) {
  return {
    module: {
      rules: [
        {
          test: /\.less$/,
          include,
          exclude,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                importLoaders:2
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => ([
                  require('autoprefixer'),
                  require('precss')
                ])
              }
            },
            'less-loader'
          ]
        }
      ]
    }
  }
}


exports.loadSass = function({include, exclude}) {
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          include,
          exclude,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                importLoaders: 2
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => ([
                  require('autoprefixer'),
                  require('precss')
                ])
              }
            },
            'sass-loader'
          ]
        }
      ]
    }
  }
}

exports.extractCSS = function({ include, exclude }) {
  const plugin = new ExtractTextPlugin({
    filename: '[name]-[contenthash].css'
  })

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,
          use: plugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[path][name]__[local]--[hash:base64:5]',
                  importLoaders: 1
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: () => ([
                    require('autoprefixer'),
                    require('precss')
                  ])
                }
              }
            ],
            fallback: 'style-loader'
          })
        }
      ]
    },
    plugins: [ plugin ]
  }
}

exports.extractLess = function({ include, exclude }) {
  const plugin = new ExtractTextPlugin({
    filename: '[name]-[contenthash].css'
  })
  return {
    module: {
      rules: [
        {
          test: /\.less$/,
          include,
          exclude,
          use: plugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[path][name]__[local]--[hash:base64:5]',
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: () => ([
                    require('autoprefixer'),
                    require('precss')
                  ])
                }
              },
              'less-loader'
            ],
            fallback: 'style-loader'
          })
        }
      ]
    },
    plugins: [ plugin ]
  }
}

exports.extractSass = function({ include, exclude }) {
  const plugin = new ExtractTextPlugin({
    filename: '[name]-[contenthash].css'
  })
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          include,
          exclude,
          use: plugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[path][name]__[local]--[hash:base64:5]',
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: () => ([
                    require('autoprefixer'),
                    require('precss')
                  ])
                }
              },
              'sass-loader'
            ],
            fallback: 'style-loader'
          })
        }
      ]
    },
    plugins: [ plugin ]
  }
}


// purifycss-webpack, 运用的场景太过于简单，不能同时和css modules同时使用，他们之间需要桥梁
// exports.purifycss = function() {
//   return {
//     plugins: [
//       new PurifyCSSPlugin({
//         paths: glob.sync(path.join(__dirname, 'app/*.js')),
//       })
//     ]
//   }
// }
