# webpack2

  + separating-css

# remark

  + 到上一个demo为止，似乎对css的处理已经很完美了，支持多种资源，又能hot-loading。但是你知道所有的css都存在哪里吗？其他他们都是通过js动态inline的。  
    也就是说，他们是打包在js文件中，在执行js时，动态在header标签中添加style标签的。  
    对于开发环境而言，没什么关系，但是在production下，有点恐怖，也有点不优雅（撞壁了），而且还有可能引起传说中的`Flash of UnStyled Content(FOUC)`
    - [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content) 是一个浏览器缺陷（或者BUG），简单的将，它会让你的页面在加载的时候卡顿，若干秒后，突然嗖的一下就，闪瞎你的眼。
    - 为此，我们的主角需要出场了，那就是[`ExtractTextPlugin`](https://www.npmjs.com/package/extract-text-webpack-plugin)

  + `ExtractTextPlugin` 就是把所有的样式资源，收集到一个样式文件里。因此它就不能热替换了。
    - 安装： `npm i -D extract-text-webpack-plugin`
    - 它也包含了一个`loader`, `ExtractTextPlugin.extract`
    - `filename` 请勿重复，否则后者会覆盖前者，另外 `filename` 有三个动态值 `[name]`,`[id]`,`[contenthash]`
    - `ExtractTextPlugin` 支持两种单实例和多实例
      + 目前，我使用的是多实例，也就是说会产生多个资源文件的，我每一个`loader`都是用了`new ExtractTextPlugin ...`
      + 单实例很简单，所有的`loader`都使用 `ExtractTextPlugin.extract`，在`plugins`中只加入一个`ExtractTextPlugin`实例即可

  + 其他推荐： `merge-files-webpack-plugin`, `extract-loader`, `glob`

  + `rimraf` 相当于 `rf -rf`，并没有整合到`build`中
  + `node-static` 提供一个简单的`host`


# engine
 -  ^6.9.1

# Thanks to

+ https://survivejs.com/webpack/styling/separating-css/
