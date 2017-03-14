# webpack2
starter for webpack2

# remark

  + webpack的`watch`模式： webpack --watch. 如果启用，如果关联的文件有所改动，那webpack将自动重编译
  + webpack-dev-server(WDS)：基于`watch`模式，并且还有更多的其他的好处
    - running in-memory
    - HMR
  + webpack cli的参数  --env 是有效的，你可以更改配置文件来校验，将配置文件的`module.exports`改为一个方法，如下(具体可见`webpack.config.js`)：
      ```js
      module.exports = function(env) {
        console.log('env', env);
        return commonConfig;
      }
      ```
      改完配置后，再运行 `build`、`start` 即可看出区别


  + webpack2 的`watch`模式暂时不支持监视配置文件的变化，但是一个完美的开发环境应该兼顾这一点，webpack声明将来会支持，暂时使用`nodemon`来做曲线救国(在package.json)：
    ```js
      {
        ...
        "start": "nodemon --watch webpack.config.js --exec \"webpack-dev-server --env development\""
      }
    ```



# engine
 - ^4.6.0

# Thanks to

+ https://survivejs.com/webpack/developing/automatic-browser-refresh/
