/*
 * @Description: 遍历器：遍历器是接口，提供统一的访问接口,进而执行遍历操作
 * @Author: your name
 * @Date: 2019-09-27 14:22:23
 * @LastEditTime: 2019-09-27 16:30:07
 * @LastEditors: Please set LastEditors
 */

/**
 * @description: 模拟遍历器next方法
 * @param {Array} array
 * @return: Ooject
 */

function makeIterator(array) {
    let nextIndex = 0;
    return {
        next: function() {
            return nextIndex < array.length ? { value: array[nextIndex++], down: false } : { value: undefined, down: true };
        }
    };
}

const demo = ["a", "b", "c"];
const ret = makeIterator(demo);
console.log(ret.next());
console.log(ret.next());
console.log(ret.next());
console.log(ret.next());
