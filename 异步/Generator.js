/*
 * @Description: Generator 为了理解async
 一个状态机，内部封装了多种状态
 执行generator函数会返回一个遍历器对象，通过这个对象来操作每一层状态
 * @Author: your name
 * @Date: 2019-09-27 14:30:57
 * @LastEditTime: 2019-09-27 16:07:11
 * @LastEditors: Please set LastEditors
 */

// function* demo() {
//     yield "1";
//     yield "2";
//     yield 3;
//     yield 4;
//     yield "99";
// }
// const it = demo();
// it.next();

// //  generator给了我们暂停与继续函数的能力，即我们可以控制函数的执行。
// function* con() {
//     console.log("console.log()");
// }

// const c = con();
// setTimeout(() => {
//     c.next();
// }, 2000);

// function* f() {
//     for (var i = 0; true; i++) {
//         var reset = yield i;
//         if (reset) {
//             i = -1;
//         }
//     }
// }

// var g = f();

// g.next(); // { value: 0, done: false }
// g.next(); // { value: 1, done: false }
// g.next(33); // { value: 0, done: false }

// // 异步操作同步化写法
// function* main() {
//     var result = yield request("http://some.url");
//     var resp = JSON.parse(result);
//     console.log(resp.value);
// }

// function request(url) {
//     makeAjaxCall(url, function(response) {
//         it.next(response);
//     });
// }

// var it = main();
// it.next();

// function* main() {
//     let ret = yield 333;
//     console.log(ret);
// }
// let its = main();
// its.next();
// its.next(222);

/**
 * @description: 自动执行generator
 * @param {type}
 * @return:
 */

// function co(gen) {
//     let g = gen();

//     function next(data) {
//         let ret = g.next(data);

//         if (ret.done) {
//             console.log(ret, "d");
//             return data.value;
//         }
//         ret.value.then(data => {
//             next(data);
//         });
//     }
//     next();
// }
const co = require("co");
const calculat = num => {
	return new Promise((resolve, reject) => {
		resolve(num);
	});
};

function* gen() {
	var a = yield calculat(222);
	var b = yield calculat(a * 10);
	return b;
}

co(gen).then(res => {
	console.log(res, "rrrrrrrr");
});
