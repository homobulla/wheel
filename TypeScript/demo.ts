function greetsw(person: string) {
    return "Hello, " + person;
}
greetsw('1')

class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

let isDown: boolean  = false;
let isNum: number = 0o423;

let arr:string[] = ['1','2','3'];
let arr2:number[] = [1,2,3]
let list: Array<number> = [1, 2, 3];

// 元组
let x:[number,string];
x = [2,'3']

// 枚举
enum Name {'xiaoming','xhong','xlv'};
let demo:string = Name[1];

//Any 不确定的数据类型
let notSure:any = 4;
let notSureArr: Array<any> = [1,'3',Object,null]

// null undefined
let n:undefined = undefined;
let m:null = null;


