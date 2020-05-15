/*
 * @Author: your name
 * @Date: 2020-05-14 16:33:32
 * @LastEditTime: 2020-05-15 10:22:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wheel\JavaScript编程精解\4数据结构.js
 */

function range(start,end){
	let ret = 0;
	while(start <= end){
		ret += start;
		start++;
	}
	return ret
}
// console.log(range(1,1))

function sum(arr){
	return arr.reduce((prev,cur)=>prev + cur)
}
// console.log( sum([1,2,3]))

function reverseArray(arr){
	return arr.map((i,index)=> i = arr[arr.length-1-index])
}
console.log(reverseArray([1,2,3,4,5,6,7,8,9,10]))

// 数组转链表
// 这是我的错误
function arrToList(arr){
	let obj = {}
	let index = 0;
	while(index++ < arr.length){
		obj.value = index;
		obj.rest = obj;
	}
	console.log(obj)
}
// 这是答案
function arrayToList(arr) {
	let list = null;
	for(let i=arr.length-1;i>=0;i--){
		let list_t = {value:arr[i],rest:list};
		list = list_t;
	}
	return list;
}
// list 转 arr
function listToArr(list){
	let arr = [];
	while(list.rest){
		arr.push(list.value);
		list = list.rest;
	}	
	arr.push(list.value)
	return arr;
}
// console.log('listToArr' ,arrayToList([1,2,3,4,3,44]),listToArr(arrayToList([1,2,3,4,3,44])))

// 再编写一个工具函数prepend，接受一个元素和一个列表，然后创建一个新的列表，将元素添加到输入列表的开头。
function prepend (node,list){
	return {
		value:node,
		rest:list
	}
}

// console.log(prepend(10,arrayToList([1,2])))


// 函数nth，接受一个列表和一个数，并返回列表中指定位置的元素，如果该元素不存在则返回undefined
function nth(list,node,index=0){
	if(list==null)
		return undefined;
	if(node === index) return list.value;
	return  nth(list.rest,node,++index)
} 

console.log('这是nth', nth(arrayToList([10, 20, 30]),1));

// 深层比较
