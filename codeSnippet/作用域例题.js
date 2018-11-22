var opt = {
    name: 'Amy',
    name2: this.name,
    say: function() {
        return this.name
    },
    say2: function() {
        setTimeout(function() {
            console.log('test:', this.name)
        })
    },
    say3: function() {
        setTimeout(() => {
            console.log(this.name)
            //当前作用域
        })
    }
}

console.log(opt.name2) //1. 这里打印出什么？ // "" this 指向 window 而 window 上有 name 属性为空字符串
console.log(opt.say) //2. 这里打印出什么？ // function
opt.say2() //3. 这里打印出什么？ // "" this 指向 window 而 window 上有 name 属性为空字符串
opt.say3() //4. 这里打印出什么？// AMY
