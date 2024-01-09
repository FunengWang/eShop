# 项目开始前的准备
## package.json
项目启动之后，浏览器自动打开
``` json
 "scripts": {
    "serve": "vue-cli-service serve --open",
  },
```

## vue.config.js
关闭语法检查
``` javascript
module.exports = defineConfig({
  lintOnSave:false
})
```

## jsconfig.json
jsconfig.json配置别名@提示，@代表的是src文件夹
```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
  },
  "exclude": ["node_modules","dist"]
}
```

# 项目路由的分析
vue-router
根据项目结构拆分成
路由组件: Home首页组件,Search组件,Login登录组件,Register注册组件
非路由组件: Header组件, Footer组件






















