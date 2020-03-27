async function async1() {
	console.log('async1 start'); //2
	await async2(); //这儿是宏任务还是微任务 ，按理说返回promise是个微任务 
	//  返回这步是个微任务，即往下是微任务，但await的函数本身是会执行的。
	console.log('async1 end'); // 6
}
async function async2() {
	console.log('async2'); //5
}

console.log('script start'); // 1

setTimeout(function () {
	console.log('setTimeout'); //8
}, 0)

async1();

new Promise(function (resolve) {
	console.log('promise1'); // 3
	resolve();
}).then(function () {
	console.log('promise2'); // 7
});
console.log('script end'); //4
// script strat
// async1 start
// promise1
// script end
// async2
// async1 end
// promise2
// setTimeout

// script start
// VM151:2 async1 start
// VM151:7 async2
// VM151:19 promise1
// VM151:24 script end
// VM151:4 async1 end
// VM151:22 promise2
// undefined
// VM151:13 setTimeout

async function async1() {
	console.log('async1 start');
	await async2();
	console.log('async1 end');
}
// 等价于
async function async1() {
	console.log('async1 start!');
	Promise.resolve(async2()).then(() => { console.log('async1 end') })
}