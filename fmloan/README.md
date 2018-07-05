

> 

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# 可视化文件
npm run build --report
```

## 开启 gzip 压缩代码 -> 前端

```bash
npm i compression-webpack-plugin

config/index.js中：
 build: {
    ………………
    productionGzip: true, // false不开启gizp，true开启
    ………………
}
```
