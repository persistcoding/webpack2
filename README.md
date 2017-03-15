# webpack2

  + composing-configuration

# remark

  + 之前的`webpack.config.js`似乎已经够用了，它能分离开发、测试环境，但是随着项目的增长，会不停的加入各种配置。于是，`webapck.config.js`会显得混乱而难以阅读。

  + 几种配置文件排版方式：
    - 多文件，可以通过 webpack cli 中的 `--config` 参数来区分，就像 [webpack/react-starter](https://github.com/webpack/react-starter)
    - 采用第三方配置库来协助管理，比如：[HenrikJoreteg/hjs-webpack](https://www.npmjs.com/package/hjs-webpack)
    - 单个文件，通过 webpack cli 中的 `--env` 参数来区分

  + 本案例使用  `webpack-merge`
    - 功能上：它就相当于 `Object.assign` 或者 `Object.concat`
    - 更多配置： [wbpack-merge](https://github.com/survivejs/webpack-merge)




# engine
 - ^4.6.0

# Thanks to

+ https://survivejs.com/webpack/developing/composing-configuration/
