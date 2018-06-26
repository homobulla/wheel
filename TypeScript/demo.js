function greetsw(person) {
    return "Hello, " + person;
}
greetsw('1');
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new Student("Jane", "M.", "User");
var isDown = false;
var isNum = 275;
var arr = ['1', '2', '3'];
var arr2 = [1, 2, 3];
var list = [1, 2, 3];
// 元组
var x;
x = [2, '3'];
// 枚举
var Name;
(function (Name) {
    Name[Name["xiaoming"] = 0] = "xiaoming";
    Name[Name["xhong"] = 1] = "xhong";
    Name[Name["xlv"] = 2] = "xlv";
})(Name || (Name = {}));
;
var demo = Name[1];
console.log(demo);
