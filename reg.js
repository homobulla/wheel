let html = "12<html><span>demo <input/></span>测试</html>";
const reg = /<[^<>]+>/g;
let ret = html.replace(reg, "");
// console.log(ret); //12demo 测试

//  WeakSet 没有size，不能迭代。
//  内部每一项都是对象，该对象都是弱引用。
//
let ws = new WeakSet();
class Foo {
    constructor() {
        ws.add(this);
    }

    method() {
        if (!ws.has(this)) {
            throw new Error("ws.prototype.method 只能在Foo的实例上使用.");
        }
    }
}
lg = console.log;
let ww = new Map();
const mm = { x: 1 };
ww.set(mm, "b");
// lg(ww)

var a = new Set([ 1, 2, 3, 4, 10 ]);
var b = new Set([ 2, 3, 4, 5, 6 ]);

// 差集
lg(new Set([ ...a ].filter((i) => !b.has(i))));
// 并集
lg(new Set([ ...a ].filter((i) => b.has(i))));

// WeakSet
lg(Array.from([ 1, 2, 3 ], (x) => x * 3));

var wss = new WeakSet();
wss.add({});
var f = { x: 1 };
var d = {};
wss.add(f);
wss.add(d);

// Map 数组每一项也是数组，每一项是由一前一后两个人
// Map的键和内存地址绑定
const map = new Map([ [ "name", "homobulla" ], [ "age", 20 ] ]);
lg(map);
lg(map.has("name"));
lg(map.get("name"));
