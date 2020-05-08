/*
 * @Author: your name
 * @Date: 2020-05-07 10:33:14
 * @LastEditTime: 2020-05-07 11:22:10
 * @LastEditors: Please set LastEditors
 * @Description: Stack  Last in first out (先进后出)
 * @FilePath: \wheel\数据结构\栈.js
   @参考资料: https://www.bilibili.com/video/BV1x7411L7Q7?from=search&seid=3912456004602554239
 * 
 */

function Stack(){
    this.items = []
    Stack.prototype.push = item=>{
        this.items.push(item)
    }
    Stack.prototype.pop = _=>{
        this.items.pop();
    }
    // 查看栈顶元素
    Stack.prototype.peek = _=>{
        return this.items[this.items.length - 1]
    }
    Stack.prototype.isEmpty = _=>{
        return this.items.length === 0
    }
    Stack.prototype.size = _=>{
        return this.items.length
    }
    // 栈内元素序列化
    Stack.prototype.toString = _=>{
        return this.items.length !== 0 ? this.items.reduce((p,n)=>p + ''+ n) : ''
    }

}
let booklist = new Stack();
booklist.push('编程范式');
booklist.push('语文书');
booklist.push('数学书');
booklist.pop();
booklist.pop();
booklist.pop();
console.log(booklist.toString(),booklist.isEmpty(),booklist.size(),booklist.peek())
