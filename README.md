# webpack2
starter for webpack2

# engine
 - 4.6.0





Thanks to
=========

+ https://survivejs.com/webpack/developing/getting-started/#executing-webpack


build
=====
`npm run build`

```
Hash: 95d14bb0031db566529d
Version: webpack 2.2.1
Time: 559ms
     Asset       Size  Chunks             Chunk Names
    app.js    3.25 kB       0  [emitted]  app
index.html  182 bytes          [emitted]  
   [0] ./app/component.js 151 bytes {0} [built]
   [1] ./app/index.js 76 bytes {0} [built]
Child html-webpack-plugin for "index.html":
       [0] ./~/lodash/lodash.js 540 kB {0} [built]
       [1] (webpack)/buildin/global.js 509 bytes {0} [built]
       [2] (webpack)/buildin/module.js 517 bytes {0} [built]
       [3] ./~/html-webpack-plugin/lib/loader.js!./~/html-webpack-plugin/default_index.ejs 538 bytes {0} [built]
```

remark
======

+ `nodemon` 和 `webpack-dev-server` 可以删除

+ `node_modules/.bin/webpack` 也可以编译

+ webpack拥有丰富的插件生态系统，很多插件可以帮助我们开发：

  - `case-sensitive-paths-webpack-plugin`  
  - `npm-install-webpack-plugin`  
  - `system-bell-webpack-plugin`  
  - `friendly-errors-webpack-plugin`  
  - `nyan-progress-webpack-plugin`  
  - `react-dev-utils`  
  - `webpack-dashboard`  
