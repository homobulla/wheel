let str = "--105..44.1";
let ret = str.replace(/(?=^[.\d]+$)(?=^.*\.)(?!^\d*\.\d*\.)[.\d]/, "");

// console.log(ret);
function format(value = ``) {
    return value.replace(/(\D)\1+/gu, `$1`);
}
// console.log(format(`--150`));
// > "-150"
format(`--150..55`);
// > "-150.55"
format(`150..15`);
// > "150.15"

let num = "--150.-.55 ";
let re = /\-?\d+\.?/;
//获取开头
let result = re.exec(num)[0];
console.log(result);
// 将开头替换成#
num = num.replace(/\-?\d+\.?/g, "#");
console.log(num);
//将所有非数字替换成空
num = num.replace(/[^\d]/g, "");
console.log(num);
// 把开头拼接进去
result = result + num;
console.log(result, "ret");

//

// Reflect.set(1);
