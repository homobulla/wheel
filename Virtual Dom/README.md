## Virtual Dom

旨在探究react和vue中的虚拟dom思想。

### 为什么要使用虚拟dom?

我们知道，DOM对象很大很重DOM操作会引发restyle/reflow/repaint。所以说操作dom的成本的高昂的。这种场景下，先通过虚拟的dom来进行比较，最后一次性的将所有变化反应到真实dom上。通过这种方法，极大减少的频繁的操作dom的成本。

引入虚拟DOM实际上有优点也缺点。

- 尺寸

  更多的功能意味着更多的代码。幸运的是Vue.js 2.0仍然是相当小的（21.4kb当前版本）。
- 内存

  虚拟DOM需要在内存中的维护一份DOM的副本。在DOM更新速度和使用内存空间之间取得平衡。
- 不是适合所有情况

  如果虚拟DOM大量更改，这是合适的。但是单一的，频繁的更新的话，虚拟DOM将会花费更多的时间处理计算的工作。
所以，如果你有一个DOM节点相对较少页面，用虚拟DOM，它实际上有可能会更慢。
但对于大多数单页面应用，这应该都会更快。

### Virtual Dom 原理

  > UI = f(status)

  让视图和状态相互绑定是我们引入框架的目的，这就是MVVM模式。只要在模版中声明视图组件是和什么状态进行绑定的，双向绑定引擎就会在状态更新的时候自动更新视图。

  而Virtual DOM是一旦状态发生了变化，就用模版引擎重新渲染整个视图，然后用新的视图更换掉旧的视图。当然，如果只要发生了一点很小的变化就重新渲染整个视图的话，这样的开销是极大的，所以Virtual DOM引入了diff算法。

  Virtual DOM 算法包括以下几个步骤：

  1. 用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中
  2. 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
  3. 把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了。
  
  Virtual DOM 本质上就是在 JS 和 DOM 之间做了一个缓存。可以类比 CPU 和硬盘，既然硬盘这么慢，我们就在它们之间加个缓存：既然 DOM 这么慢，我们就在它们 JS 和 DOM 之间加个缓存。CPU（JS）只操作内存（Virtual DOM），最后的时候再把变更写入硬盘（DOM）。

相对于 DOM 对象，原生的 JavaScript 对象处理起来更快，而且更简单。DOM 树上的结构、属性信息我们都可以很容易地用 JavaScript 对象表示出来：

```js
var element = {
  tagName: 'ul', // 节点标签名
  props: { // DOM的属性，用一个对象存储键值对
    id: 'list'
  },
  children: [ // 该节点的子节点
    {tagName: 'li', props: {class: 'item'}, children: ["Item 1"]},
    {tagName: 'li', props: {class: 'item'}, children: ["Item 2"]},
    {tagName: 'li', props: {class: 'item'}, children: ["Item 3"]},
  ]
}
```
上面对应的HTML写法是：

```js 
<ul id='list'>
  <li class='item'>Item 1</li>
  <li class='item'>Item 2</li>
  <li class='item'>Item 3</li>
</ul>
```

