> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 https://juejin.im/post/5bf5610be51d452a1353b08d?utm_source=gold_browser_extension 原文作者：Harshal PatilFollow 译者：UC 国际研发 Jothy

> 写在最前：欢迎你来到 “UC 国际技术” 公众号，我们将为大家提供与客户端、服务端、算法、测试、数据、前端等相关的高质量技术文章，不限于原创与翻译。

JavaScript ES2015 规范出现后，一切都大变样啦。 该规范很大——随着对 modules（模块）原生支持以及不断发展的函数式编程，新的 JavaScript 语言重焕新生。并且每年持续推出 ES2016，ES2017 ...然而在面试或招聘前端开发时，期望、现实和需求之间存在巨大差距。 正如 Laurie Voss 在 NPM 视频中所说的：

> 现在的 Web App 97% 的代码都来自 NPM。

视频地址：https://www.youtube.com/watch?time_continue=238&v=Qa4dxW-Qi2s我们是真的在写代码还是只是把代码像乐高积木一样叠起来？
在 2018 年底，仍有大多数面试者在被问到 AJAX 的问题时，回答依然是使用 jQuery。这里举一些能说明这种差距的典型例子：
CSS Grid 和 Flexbox 已经得到广泛支持。然而，在面试的时候，仍然在讨论 CSS 中如何使浮动实现多列布局和行内块级元素居中。
模块打包器（Module bundler）是为大规模（ large-scale）应用而设计的规范。然而，当谈到架构时，我们讨论的又是 minification 和 concatenation。在面试中我们有几次真正讨论过 Webpack？
如果 97％ 的代码来自 NPM，但面试的重点是排序数组或迭代对象。更有甚者，对于找出 typeof null 的值仍然很感兴趣。为什么不能在选择合适的库、框架或工具这件事上采用理性点的方法呢？
我们仍会让面试者在原型之上进行经典继承，但并不是要验证对这些错误想法的需要。我们有更多的方法模式。当然，JavaScript 类、新引入的私有和静态属性也值得讨论。这能帮助我们更好地理解面试者的想法，对关键决策的思考等。
对缓存的讨论仍局限于 Cache control headers 和 CDN。像 IndexDB，HTTP/2 或 Service Workers 这些技术只是路人而已。
面试者数不胜数，但面试评估与实际工作需要之间又相去甚远。一方面，我们的前端技术取得了巨大的飞跃，另一方面，我们庞大的社区又还没拥抱这些新技术。残破的社区永远不是一个好兆头。这是一条灾难之路。差距总会催生一些新的东西，它强大到足以摧毁我们迄今所创造的一切。我无法想象 Java 开发者使用 GWT 编写另一个 Facebook。
面试是催生变革和汇聚人才的好方式。作为面试官的你，如果仅仅把面试当成「面试」，那么你只能自我膨胀，最终一无所获。

> 要使一场面试成功，必须对其进行讨论。 它必须是一个交换思想的地方。 它应该引发人们思考并客观地分析给定的问题。 它要能帮助我们理解人们做决策的过程。 它要能帮助我们了解一个人对技术和解决问题的热情。 它意味着要了解未来可能的同事。 所有那些谜题，tricks 或 typeof null 都不能真正称为面试。

以下是我们在面试讨论中提出的一些问题。我们希望它可以帮助面试官和面试者准确地看清期望，需求和现实。

> 太长不看版：我们要先把自己当成面试官。

### ![](https://user-gold-cdn.xitu.io/2018/11/21/167368308fb56bf5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)基本的 JavaScript 问题

1、使以下代码正常运行：![](https://user-gold-cdn.xitu.io/2018/11/21/167368308fa4cf2c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
2、以下代码在 JavaScript 中返回 `false`。 请说明为什么：![](https://user-gold-cdn.xitu.io/2018/11/21/167368308fa8a65c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

3、JavaScript 中有哪些不同的数据类型？

> 提示：只有两种类型 - 主要数据类型和引用类型（对象）。 有六种主要类型。

4、解决以下异步代码问题。 检索并计算属于同一教室中每个学生的平均分数，例子中教室 ID 为 75。每个学生可以在一年内参加一门或多门课程。以下 API 可用于检索所需数据。
![](https://user-gold-cdn.xitu.io/2018/11/21/167368308fc8c4f2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
编写一个接受教室 ID 的函数，并根据该函数计算该教室中每个学生的平均值。 该函数的最终输出应该是带有平均分数的学生列表：

```
[
  { "id": 1, "name": "John", "average": 70.5 },
  { "id": 3, "name": "Lois", "average": 67 },
}复制代码
```

使用普通回调，promises，observables，generator 或 async-wait 编写所需的函数。 尝试使用至少 3 种不同的技术解决这个问题。
5、使用 JavaScript Proxy 实现简单的数据绑定提示：ES Proxy 允许你拦截对任何对象属性或方法的调用。 首先，每当更改底层绑定对象时，都应更新 DOM。
6、解释 JavaScript 并发模型 您是否熟悉 Elixir，Clojure，Java 等其他编程语言中使用的任何其他并发模型？提示：事件循环，任务队列，调用栈，堆等。
7、“new” 关键字在 JavaScript 中有什么作用？提示：在 JavaScript 中，new 是用于实例化对象的运算符。 这里的目的是了解知识广度和记忆情况。另外，请注意 [[Construct]] 和 [[Call]]。
8、JavaScript 中有哪些不同的函数调用模式？ 详细解释。 提示：有四种模式，函数调用，方法调用，.call() 和 .apply()。
9、解释即将发布的任一新 ECMAScript 提案。提示：比如 2018 的 BigInt，partial function，pipeline operator 等。
10、JavaScript 中的迭代器（iterators）和迭代（iterables）是什么？ 你知道什么是内置迭代器吗？
11、如何在 JSON 中序列化以下对象？如果我们将以下对象转换为 JSON 字符串，会发生什么？
![](https://user-gold-cdn.xitu.io/2018/11/21/167368309277407e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

12、你熟悉 Typed Arrays 吗？ 如果熟悉，请解释他们与 JavaScript 中的传统数组相比的异同？
13\. 默认参数如何工作？如果我们在调用 makeAPIRequest 函数时必须使用 timeout 的默认值，那么正确的语法是什么？
![](https://user-gold-cdn.xitu.io/2018/11/21/167368309190726f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
14、解释 TCO - 尾调用优化（Tail Call Optimization）。 有没有支持尾调用优化的 JavaScript 引擎？提示：截至 2018 年，没有。

### ![](https://user-gold-cdn.xitu.io/2018/11/21/167368308fb56bf5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)JavaScript 前端应用设计问题

1、解释单向数据流和双向数据绑定。Angular 1.x 基于双向数据绑定，而 React，Vue，Elm 等基于单向数据流架构。
2、单向数据流架构在哪些方面适合 MVC？MVC 拥有大约 50 年的悠久历史，并已演变为 MVP，MVVM 和 MV *。两者之间的相互关系是什么？如果 MVC 是架构模式，那么单向数据流是什么？这些竞争模式是否能解决同样的问题？
3、客户端 MVC 与服务器端或经典 MVC 有何不同？提示：经典 MVC 是适用于桌面应用程序的 Smalltalk MVC。在 Web 应用中，至少有两个不同的数据 MVC 周期。
4、使函数式编程与面向对象或命令式编程不同的关键因素是什么？提示：Currying（柯里化），point-free 函数，partial function 应用，高阶函数，纯函数，独立副作用，record 类型（联合，代数数据类型）等。
5、在 JavaScript 和前端的上下文中，函数式编程与响应式编程有什么关系？提示：没有正确答案。但粗略地说，函数式编程是关于小型编码，编写纯函数和响应式编程是大型编码，即模块之间的数据流，连接以 FP 风格编写的组件。 FRP - 功能响应式编程（ Functional Reactive Programming）是另一个不同但相关的概念。
6、不可变数据结构（immutable data structures）解决了哪些问题？不可变结构是否有任何性能影响？ JS 生态系统中哪些库提供了不可变的数据结构？这些库的优点和缺点是什么？
提示：线程安全（我们真的需要在浏览器 JavaScript 中担心吗？），无副作用的函数，更好的状态管理等。
7、大型应用程序是否应使用静态类型？如何比较 TypeScript/Flow 与 Elm/ReasonML/PureScript 等 JS 转换语言？这些方法的优缺点是什么？
选择特定类型系统的主要标准应该是什么？
什么是类型推断（type inference）？
静态类型语言和强类型语言有什么区别？在这方面 JavaScript 的本质是什么？
有你知道的弱类型但静态类型的语言吗？有你知道的动态类型但强类型的语言吗？举例一二。
提示：Structural 与 Nominal 类型系统，类型稳健性，工具 / 生态系统支持，正确性超过方便。
8、JavaScript 中有哪些突出的模块系统（module systems ）？评价 ES 模块系统。列出在实现不同模块系统之间互操作所涉及的一些复杂性问题（主要对 ES 模块和 CommonJS 互操作感兴趣）
9、HTTP/2 将如何影响 JavaScript 应用程序打包？列出 HTTP/2 与其上一个版本的基本区别。
10、Fetch API 相对于传统的 Ajax 有哪些改进？使用 Fetch API 有那些缺点 / 难点吗？那些是 Ajax 可以做的，而 fetch 不能做的？
11、讨论与 Promise 相关的问题。提示：及早求值（eager evaluation），尴尬的取消机制，用 then() 方法伪装 map() 和 flatMap() 等。

### ![](https://user-gold-cdn.xitu.io/2018/11/21/16736830e12248a6?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)前端基础和理论问题

1、HTML 中 Doctype 的用途是什么？具体谈谈，以下每种情况下会发生什么：

*   Doctype 不存在。
*   使用了 HTML4 Doctype，但 HTML 页面使用了 HTML5 的标签，如 <audio> 或 <video>。它会导致任何错误吗？
*   使用了无效的 Doctype。

2、 DOM 和 BOM 有什么区别？提示：BOM，DOM，ECMAScript 和 JavaScript 都是不同的东西。
3、JavaScript 中的事件处理如何运行？如下图所示，我们有三个 div 元素。每个 div 都有一个与之关联的点击处理程序。处理程序执行以下任务：

*   Outer div click 处理程序将 hello outer 打印到控制台。
*   Inner div click 处理程序将 hello inner 打印到控制台。
*   Innermost div click 处理程序将 hello innermost 打印到控制台。

编写一段代码来分配这些任务，以便在单击 innermost div 时始终打印以下序列？
hello inner → hello innermost → hello outer
![](https://user-gold-cdn.xitu.io/2018/11/21/16736830e3364037?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
事件冒泡和捕获提示：事件捕获和事件冒泡
4、使用单页应用将文件上传到服务器的有哪些方法？提示：XMLHttpRequest2（streaming），fetch（non-streaming），File API
5、CSS 重排和重绘之间有什么区别？哪些 CSS 属性会导致重排及重绘？
6\. 什么是 CSS 选择器权重以及它如何工作？
7、CSS 中的 pixel 与硬件 / 物理中的 pixel 有何不同？提示：像素不是像素不是像素 - ppk。
8、什么是 sectioning 算法？提示：它也被称为 HTML5 大纲算法。特别是在构建具有语义结构的网站时非常重要。
9、如果你用过 CSS Flex / CSS Grid（网格）布局，请说明你为什么要使用它？它为你解决了什么问题？
使用 CSS Grid，百分比％和 fr 单位有何不同？使用 CSS flexbox，有时 flex-items/children 会不考虑 flex 容器设置的宽度 / 高度？为什么会这样？可以使用 CSS Grid 创建 Masonry layout（瀑布流布局）吗？如果可以，怎么做？解释 CSS Grid 和 CSS flexbox 术语？浮动元素（float：left | right;）如何在 CSS Grid 和 flexbox 中渲染？
提示：等高的列，垂直居中，复杂网格等。
10、什么时候应该使用 CSS animations 而不是 CSS transitions？你做出这个决定标准是什么？
11、如果你正在 Review CSS 代码，那么你在代码中经常遇到的问题是什么？示例：使用魔性数字，如 width: 67px; 或使用 em 代替 rem 单位，在通用代码之前编写 media queries（媒体查询），滥用 ID 和类等。
12、如何在 JavaScript 中检测触摸事件？你是否不看好检测设备对触摸事件的支持？如果是，为什么？比较触摸事件和点击事件。当设备同时支持触摸和鼠标事件时，你认为这些事件的正确事件顺序是什么或应该是什么？
13、为 script tag 定义的 `async` 和 `defer` 属性有什么用？现在我们有 HTTP/2 和 ES 模块，它们真的很有用吗？
列出的清单只是我们在面试中可能讨论的无限点的一瞥。 有很多东西，比如 Web Components，CORS，Security，Cookies，CSS transform，Web Assembly，Service Workers，PWA，CSS 架构等，我们没有考虑过。 我们也没有涉及框架或库的特定问题。
希望本指南能帮助社区在面试的朋友们找准自己的方向。
英文原文：https://blog.webf.zone/front-end-javascript-interviews-in-2018-19-e17b0b10514
“UC 国际技术” 致力于与你共享高质量的技术文章欢迎关注我们的公众号、将文章分享给你的好友
![](https://user-gold-cdn.xitu.io/2018/11/21/16736840cecd7bc3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)