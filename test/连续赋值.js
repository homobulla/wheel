var a = { n: 1 };
var b = a; // b = {n:1}
a.x = a = { n: 2 };
// a.x = undefined a = {n:2} b = {n:2}
console.log(a.x);
console.log(b.x);

const obj = new Proxy(
    {},
    {
        set(target, key, value, r) {
            console.log(key, value);
            if (key === "a") Reflect.set(target, key, "isA", r);
            else Reflect.set(target, key, value, r);
        }
    }
);

obj.b = obj.a = { n: 1 };
// 输出:
// "a" {n: 1}
// "b" {n: 1}

obj.a; // isA
obj.b; // {n: 1}
