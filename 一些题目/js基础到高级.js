// foo(); // undefined:not a function.
// console.log(b);
// var a = true;
// if (a) {
//     var b = 111;
//     function foo() {
//         console.log("a");
//     }
// } else {
//     function foo() {
//         console.log("b");
//     }
// }

// // 闭包
// var fn;
// function foo(params) {
//     var a = 111;
//     function bar() {
//         console.log(a);
//     }
//     fn = bar;
// }

// function baz() {
//     fn();
// }
// // foo();
// baz();
// for (var i = 1; i <= 5; i++) {
//     (function(i) {
//         setTimeout(function timer() {
//             console.log(i);
//         }, i * 1000);
//     })(i);
// }
function foo() {
    console.log(a); // 2
}
function bar() {
    var a = 3;
    // console.log(this);
    foo();
}
var a = 2;
bar();
var obj = {
    id: "awesome",
    cool: function coolFn() {
        console.log(this.id);
    }
};
var id = "not awesome";
obj.cool(); // 酷
setTimeout(obj.cool, 100); // 不酷
