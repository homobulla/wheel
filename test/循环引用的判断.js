/**
 *
 * 关于js中对象的循环引用问题
 * date:2019-05-24
 */

/**
 * https://github.com/douglascrockford
 * /JSON-js
 * 关于循环引用的JSON.stringify问题的JSON扩展
 */
require("./cycle"); // ES6 WeakMap

/**
 *
 * @param {Object} obj
 * @return {Boolean} 是否为循环引用对象
 * @description 递归对象，属性值中是否存在和自身相同的项
 */
function isCircularObj(obj) {
    let stack = [];
    let flag = false;
    (function circul(obj) {
        for (var len, len = stack.length; len--; ) {
            if (stack[len] === obj) {
                flag = true;
                return;
            }
        }
        stack.push(obj);
        for (let k in obj) {
            const value = obj[k];
            if (typeof value === "object") circul(value);
        }
    })(obj);
    return flag;
}

/**
 * 重写JSON.stringify 修改无法序列化循环引用对象的问题
 */
var handleCircular = function() {
    var cache = [];
    var keyCache = [];
    return function(key, value) {
        if (typeof value === "object" && value !== null) {
            var index = cache.indexOf(value);
            if (index !== -1) {
                return "[Circular " + keyCache[index] + "]";
            }
            cache.push(value);
            keyCache.push(key || "root");
        }
        return value;
    };
};

var tmp = JSON.stringify;
JSON.stringify = function(value, replacer, space) {
    replacer = replacer || handleCircular();
    return tmp(value, replacer, space);
};

var a = {
    b: "foo",
    c: {}
};

a.d = a;
a.c.e = a.c;

var ret = isCircularObj(a);
console.log(ret);
console.log(JSON.stringify(a));
console.log(JSON.retrocycle(JSON.stringify(a)));
// 在node中
var util = require("util");
console.log(JSON.stringify(util.inspect(a)));
