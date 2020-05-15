/*
 * @Author: your name
 * @Date: 2020-05-13 17:25:00
 * @LastEditTime: 2020-05-13 17:51:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wheel\JavaScript编程精解\循环.js
 */

// 编写一个循环，调用 7 次console.log函数，打印出如下的三角形：
// #
// ##
// ###
// ####
// #####
// ######
// #######
// let str = ''
// for(let i=0;i<7;i++){
// 	console.log(str+='#')
// }
let num = 0;
let str = ''
while (num < 7){
	num++;
	console.log(str+='#')

}
let j = 0;
while (j <= 100){
	if(j % 3 === 0){
		console.log("Fizz")
	} else if(j % 5 === 0 && j % 3 !== 0){
		console.log("Buzz")
	} else {
		console.log(j)
	}
	j++;
}

