/*
 * @Author: your name
 * @Date: 2020-05-15 16:32:07
 * @LastEditTime: 2020-05-15 17:28:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wheel\JavaScript编程精解\高阶函数.js
 */


function nosiy(f){
	return (...args)=>{
		let ret = f(...args);
		return ret;
	}
}
// console.log(nosiy(Math.max)(1,10,111))
function myreduce(array,combine,start){
	let current = start ? start : array[0];
	for(let i= start ? 0 : 1;i<array.length;i++){
		current = combine(current,array[i])
	}
	return current;
}

let data = myreduce([10,2,3,4],(a,b)=>a+b);
console.log(data,'data');

// 数组降维
let arrays = [[1, 2, 3], [4, 5], [6]];
function flat(arr){
	return arr.reduce((a,b)=>a.concat(b))
}
console.log(flat(arrays))

// 编写一个高阶函数loop，提供类似for循环语句的东西。 
// 它接受一个值，一个测试函数，一个更新函数和一个主体函数。 
// 每次迭代中，它首先在当前循环值上运行测试函数，并在返回false时停止。 
// 然后它调用主体函数，向其提供当前值。 最后，它调用update函数来创建一个新的值，并从头开始。

loop(3,n=n=>n>0,n=>n-1,console.log); //3,2,1
function loop(value,test,updata,fn){
	for(let i=value;test(i);i--) {
		updata(i);
		fn(i);
	}
}

// 实现一个every方法
function every(array, test) {
	for(var i=0;i<array.length;i++){
		if(!test(array[i])) return false;
		return true;
	}
}
//  实现一个every方法
function some(arr,f){
	for(var i=0;i<arr.length;i++){
		if(f(arr[i]))
			return true;
	}
	return false;
}

console.log(every([1, 3, 5], n => n < 10));