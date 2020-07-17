#### DOM Tree是如何构建的

1. 转码: 浏览器将接收到的二进制数据按照指定编码格式转化为HTML字符串
2. 生成Tokens: 之后开始parser，浏览器会将HTML字符串解析成Tokens
3. 构建Nodes: 对Node添加特定的属性，通过指针确定 Node 的父、子、兄弟关系和所属 treeScope
4. 生成DOM Tree: 通过node包含的指针确定的关系构建出DOM Tree

#### DOCTYPE 有什么用

告知浏览器用什么标准来解析文档。`<!DOCTYPE html>`为符合w3c的标准模式，还有怪异模式（兼容模式）以前旧的页面，会模拟更旧的浏览器的行为。

#### 如何做到响应式图片，即如何根据设备的分辨率调用合适的图像

1. `<picture>`元素
2. `<img>`元素的`srcset`属性

#### sciprt标签中defer和async的区别

- `defer`:在HTML解析期间异步下载，在HTML解析完成后才**按顺序**执行，在document的`DOMContentLoaded`之前执行。
- `async`:属性会在 HTML 解析期间异步下载文件，并在完成下载后立即暂停 HTML 解析器去执行 script 中的代码,会在 window 的 load 事件之前执行。在执行过程中浏览器处于阻塞状态，响应不了任何需求。**如果 `js` 前后有依赖性，用 `async`，就很有可能出错。**

两者只对`src`引入的外链`js`有效，加载文件时也不会阻塞页面渲染。

#### 页面的生命周期

`HTML`页面的生命周期有以下三个重要事件：

- `DOMContentLoaded` — 浏览器已经完全加载了`HTML`，`DOM`树已经构建完毕，但是像是 `<img>`和样式表等外部资源可能并没有下载完毕。
- `load` — 浏览器已经加载了所有的资源（图像，样式表等）。
- `beforeunload/unload` – 当用户离开页面的时候触发。

#### 前端存储方式

- `cookies`: 请求头自带cookies,会浪费流量且大小4k,每个`domian`限制20个cookie。
- `localStorage`: 键值对永久性存储，5M。
- `sessionStorage`:页面关闭即清除，且不能在窗口间共享。
- `Web SQL`:废弃
- `IndexedDB`:`NoSQL`数据库，用键值对进行储存

