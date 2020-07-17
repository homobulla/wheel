#### 浏览器如何解析css

选择器从右到左进行解析

#### 浏览器重绘和重排

- 重排：对应渲染树需要重新分析且节点尺寸位置需要重新计算，表现为重新生成布局，重新排列元素
- 重绘：节点的几何属性或样式发生改变，表现为某些元素外观发生变化

单单改变元素的外观，肯定不会引起网页重新生成布局，但当浏览器完成重排之后，将会重新绘制受到此次重排影响的部分。『重绘』不一定会出现『重排』，『重排』必然会出现『重绘』。

减少重绘重排：

一次性更改所有样式，即通过操作`className`；

使用文档片段接口**`DocumentFragment`**,与document相比，最大的区别是`DocumentFragment` 不是真实 DOM 树的一部分，它的变化不会触发 DOM 树的[重新渲染](https://developer.mozilla.org/zh-CN/docs/Glossary/Reflow)，且不会导致性能等问题。通过`document.createDocumentFragment()`来创建一个空的`DocumentFragment`对象。

[提升为合成层](<https://fed.taobao.org/blog/2016/04/26/performance-composite/>)

将元素提升为合成层有以下优点：

- 合成层的位图，会交由 GPU 合成，比 CPU 处理要快
- 当需要 repaint 时，只需要 repaint 本身，不会影响到其他的层
- 对于 transform 和 opacity 效果，不会触发 layout 和 paint

提升合成层的最好方式是使用 CSS 的 will-change 属性：

```css
#target{will-change: transform;}
```

