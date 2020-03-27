/*
 * @Author: your name
 * @Date: 2020-03-26 16:39:41
 * @LastEditTime: 2020-03-27 15:28:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wheel\中级\Map&Set.js
 */

var set = new Map();
set.set({ a: 1 }, 'hhh');
console.log(set.has({ a: 1 }));

var set = new Set([ 1, 2, 3 ]);
for (let item of set.entries()) {
  console.log(item);
}
set.forEach((i) => console.log(i + 2));
console.log(set);
let a = new Set([ 1, 2, 3 ]);
let b = new Set([ 4, 3, 2 ]);
let intersect = new Set([ ...a ].filter((x) => b.has(x)));
