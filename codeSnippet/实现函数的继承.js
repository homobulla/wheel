function father(name) {
    //父函数
    this.name = name | 'koro1'
    this.code = function() {
        //父类的实例方法
        console.log(this.name + 'coding')
    }
}
father.prototype.add = function(food) {
    //父类的原型方法
    console.log(this.name + 'eat' + food)
}
function son(name) {
    //子函数
    father.call(this) //将this绑定到子类，绑定父类的实例方法code（原型方法add还未绑定）
    this.name = name || 'OBKoro1'
}
son.prototype = new father() //把父类的原型方法绑定到子类，实现继承
var sonVar = new son('faker') //这里也可以传参name
son.prototype.constructor = son //修复构造函数的指向
console.log(sonVar.code())
console.log(sonVar.add()) //可以调用父类的方法了
