// 显式混入
function mixin(sourceObj, targetObj) {
    for (var key in sourceObj) {
        if (!(key in targetObj)) {
            targetObj[key] = sourceObj[key];
        }
    }

    return targetObj;
}

var a = '全局a'
var obj = {
    a: 'aaa',
    b: 'bbbb',
    c: function () {
        console.log(this.a)
    }
}

var target = {
    b: function () {}
}
var result = mixin(obj, target);
//console.log(result)
//result.c()   // aaa
var d = result.c; //别名丢失隐式绑定别名丢失this隐式绑定
//d()   //全局a


// 隐式混入
var obj = {
    add: function () {
        this.count = this.count ? this.count + 1 : 1
    }
}

var child = {
    add: function () {
        obj.add.call(this)
    }
}

obj.add()
console.log(obj.count) // 1
child.add()
console.log(child.count) // 1 隐式混入赋值操作在child而不是obj


function foo() {
    this.a = 1
}
foo.prototype.b = 2

function bar() {}
bar.prototype = Object.create(foo.prototype) // bar.prototype: object {}
var b = new bar()
console.log(b.a) // undefined
console.log(b.b) // 2


// Shape - 父类(superclass)
function Shape() {
    this.x = 0;
    this.y = 0;
  }
  
  // 父类的方法
  Shape.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    console.info('Shape moved.');
  };
  
  // 子类
  function Rectangle(){
      Shape.call(this)  // call super constructor
  }
  
  // 子类续承父类 
  Rectangle.prototype = Object.create(Shape.prototype);     //Object.create 实现类式继承
  Rectangle.prototype.constructor = Rectangle;      // 重定向 constructor
  
  var rect = new Rectangle();
  
  console.log('Is rect an instance of Rectangle?',rect instanceof Rectangle); // true
  console.log('Is rect an instance of Shape?',rect instanceof Shape); // true
  rect.move(1, 1); // Outputs, 'Shape moved.




  // 混入 -> 继承到多个对象
  function MyClass() {
      SuperClass.call(this);
      OtherSuperClass.call(this);
  }

  // 继承一个类
  MyClass.prototype = Object.create(SuperClass.prototype);

  // 混合其他  Object.assign 会把  OtherSuperClass原型上的函数拷贝到 MyClass原型上，使 MyClass 的所有实例都可用 OtherSuperClass 的方法。
  Object.assign(MyClass.prototype, OtherSuperClass.prototype); 

  // 重新置顶construtor
  MyClass.prototype.constructor = MyClass;

  MyClass.prototype.myMethod = function() {
      // do some thing
  }