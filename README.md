# webpack2

  + styleing-loading

# remark

  + webpack 不会处理 外部引入的样式文件。因此，你必须通过配置`loaders`和`plugins`来达到目的。
  + Loading CSS，加载css可以通过`css-loader`和`style-loader`引入
    - `css-loader` 会处理掉 `@import` 和 `url()`，除非还有其他的loader处理，比如：`file-loader`，`url-loader`
    - `style-loader` 通过`css-loader`的处理后，再由`style-loader`处理，它会将处理好的样式导入到`bundle`中，导入的样式，默认情况先是行内样式(`inline-style`)

    - `loader` 就是从右至左将原文件（源码）进行转换, 并且他们是链式的，就像是`Unix`中的`pipe`一样

    - 对于 `css-loader`，你可以传递参数来空置，是否对`url`,`@import` 进行转换，比如：`url: false` 或者 `import: false`

      + 特别指出：`importLoaders` 参数，后跟数字，比如（n）其意为：如果所处理的资源文件中包含通过`@import`引入的其他资源（如 A.css）,则本引用的资源文件（A.css）也必须预先通过其后的（n）个loader(s)来处理

      + `localIdentName`: `'[path][name]__[local]--[hash:base64:5]'`


  + 安装: `npm i -D css-loader style-loader`

  + [eslint-plugin-css-modules](https://www.npmjs.com/package/eslint-plugin-css-modules) 提供了css的lint

  + Loading Less，是一个CSS 处理器，需要`less-loader`来处理，`less-loader`需要安装`less`
    - `npm i -D less less-loader`
    - 配置
      ```js
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          { loader: 'less-loader' }
        ]
      }
      ```
  + Loading Sass，是一个运用广泛的CSS 预处理器，需要`sass-loader`来处理，`sass-loader`需要安装`node-sass`
    - `npm i -D node-sass sass-loader`
    - 配置
      ```js
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          { loader: 'sass-loader' }
        ]
      }
      ```
  + Loading Stylus and Yeticss，这也是一个CSS 处理器，需要`stylus-loader`
    - `npm i -D stylus-loader yeticss`
    - 配置
    ```js
    {
      ...
      module: {
        rules: [
          {
            test: /\.styl$/,
            use: ['style-loader', 'css-loader', 'stylus-loader'],
          },
        ],
      },
      plugins: [
        new webpack.LoaderOptionsPlugin({
          options: {
            // yeticss
            stylus: {
              use: [require('yeticss')],
            },
          },
        }),
      ],
    }
    ```

  + PostCSS，提供了转换处理CSS的JS插件库，就像是样式的 `Bable`，需要`postcss-loader`
    - 提供了类似`Sass`的特性
    - 配置示范：本例（`autoprefix`），需要安装`precss`
      ```js
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
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
      ```
      - 注意 `autoprefixer` 和 `precss` 以及 `postcss-cssnext`


  + 加载`node_modules`文件夹中的资源
    - 我们可以直接加载`node_modules`中的资源文件，比如`Bootstrap`: `@import "~bootstrap/less/bootstrap";`
    - 波浪号(~)指示webpack，import将不使用默认的导入模式，而是直接指向`node_modules`目录下进行查找

  + 引入[bootstrap](https://www.npmjs.com/package/bootstrap)  ,可通过 `sass`,`sass-loader`,`bootstrap-sass`,`bootstrap-loader`等实现


  + `css`,`less`,`sass` 都支持了，是不是很酷


  + 之前的dmeo有遗漏，请将 `webpack.parts.js` 的`hotOnly` 改为 `hot`




# engine
 -  ^6.9.1
 -  ~~^4.6.0~~ (因为一些新特性不支持，所以升级了NODE)

# Thanks to

+ https://survivejs.com/webpack/styling/loading/
