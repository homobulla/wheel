/*
 * @Author: your name
 * @Date: 2020-05-13 17:52:04
 * @LastEditTime: 2020-05-13 17:52:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wheel\JavaScript编程精解\function.js
 */

 // 函数调用栈，压a入栈，压d入栈，d执行完，d出栈，返回c，a执行完，a出栈。

function d(){};
function a(){
	let c = d();
	c+='333';
	return c;
}
// 利用函数参数的特性：传递不同数量的参数来返回不不同的结果。
// 模拟一个减法
function minus(a,b){
	if(!b) return -a;
	return a - b;
}
console.log(minus(10,8))
