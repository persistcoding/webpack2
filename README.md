# webpack2
starter for webpack2

# remark

  + `HMR`有两种方式：  
    - cli: webpack-dev-server --hot
    - config: HotModuleReplacementPlugin  

  其中两种方式不能同时使用，否则会引起Issue：[`Uncaught RangeError: Maximum call stack size exceeded`](https://github.com/webpack/webpack-dev-server/issues/87)

  + 使用`HotModuleReplacementPlugin` 配置更为灵活，有很多高级的配置项可以帮助你搭建出一个完美的开发环境




# engine
 - ^4.6.0

# Thanks to

+ https://survivejs.com/webpack/developing/configuring-hmr/
