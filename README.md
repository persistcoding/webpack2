# webpack2

  + LINT


# remark

  + `ESLint`
    - 安装： `npm i -D eslint`
    - 初始化： `node_modules/.bin/eslint --init`
    - 配置文件： `.eslintrc.*`
    - 其他配置文件：
      + `.eslintignore` 用于配置`eslint`忽略的文件
        - 可以通过  `--ignore-path <pattern>` 来配置具体的文件，如：`--ignore-path .gitignore`
      + `.eslintcache`  是`--cache` 用于缓存的文件，在`.gitignore`请禁用这个文件
      + `.editorconfig` `IDEs` 用来检查的
    - 简单的规则：
      + 规则等级：  
        - 0 `or` "off"：禁用规则
        - 1 `or` "warn"：触发警告
        - 2 `or` "error"：触发错误
    - 简单的命令参数
      + `--fix`: 自动修复不符合规则的代码，`npm run lint -- --fix`

    - [ESLint rules documentation](http://eslint.org/docs/rules/)

  + `webpack` 接入 `ESLint`  
    - 使用 `ESLint-loader`： npm i -D eslint-loader
    - 配置：  
     ```js
     ...
     function developmentConfig() {
       const config = {
         devServer: {
           ...
         },

         module: {
           rules: [{
             test: /\.(js|jsx)$/,
             enforce: 'pre',  // 在其他loader之前
             exclude: /node_modules/,
             use: 'eslint-loader',
             options: {
               emitWarning: true,
             },
           }],
        },
        plugins: [
        ...
        ],
      };
      ...
    }
    ...
    ```

    - 由于`webpack2` 不允许随意的添加节点；为此，`webpack2`提供了 `LoaderOptionsPlugin` 来解决  
    ```js  
    {
      plugins: [
        new webpack.LoaderOptionsPlugin({
          options: {
            eslint: {
              // Fail only on errors
              failOnWarning: false,
              failOnError: true,
              // Disable/enable autofix
              fix: false,
              // output to Jekins compatible XML
              outputReport: {
                filePath: 'checkstyle.xml',
                formatter: require('eslint/lib/formatters/checkstyle')
              }
            }
          }
        })
      ]
    }  
    ```
    -  更多配置  [ESLint-loader](https://github.com/MoOx/eslint-loader)

  + [EditorConfig](http://editorconfig.org/)
    - 很多IDE都支持EditorConfig，ATOM  需要插件  [atom-editorconfig](https://atom.io/packages/editorconfig)




# engine
 - ^4.6.0

# Thanks to

+ https://survivejs.com/webpack/developing/linting/
