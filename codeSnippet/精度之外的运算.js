/**https://zhuanlan.zhihu.com/p/48528621
 * 方法说明
 * @method add
 * @param {tring} num1 num2
 * @return {string} result
 */
function add(num1, num2) {
    let len = Math.max(num1.length, num2.length);
    num1 = num1.padStart(len, 0);
    num2 = num2.padStart(len, 0);
    let flag = 0; // j进位
    let result = "";
    let temp = 0;
    //逐位相加
    for (let i = len - 1; i >= 0; i--) {
        temp = flag + parseInt(num1[i]) + parseInt(num2[i]);
        result = temp % 10 + result;
        flag = parseInt(temp / 10);
    }
    //最后的进位
    result = (flag === 1 ? "1" : "") + result;
    return result;
}

/**
 * 方法说明
 * @method lt 比较num1 / num2的大小
 * @param {tring} num1 num2
 * @return {string} result
 */
function lt(num1, num2) {
    if (num1.length < num2.length) {
        return true;
    } else if (num1.length === num2.length) {
        return num1 < num2;
    } else {
        return false;
    }
}
/**
 * 方法说明
 * @method sub
 * @param {tring} num1 num2
 * @return {string} result
 */
function sub(num1, num2) {
    if (num1 === num2) return "0";
    let isMinus = false;
    if (lt(num1, num2)) {
        [ num1, num2 ] = [ num2, num1 ]; // num1 为其中最大的值
        isMinus = true;
    }
    let len = num1.length;
    num1 = num1.padStart(len, 0);
    num2 = num2.padStart(len, 0);

    let flag = 0,
        result = "",
        temp;
    for (let i = len - 1; i >= 0; i--) {
        temp = parseInt(num1[i]) - flag - parseInt(num2[i]);
        if (temp < 0) {
            result = 10 + temp + result;
            flag = 1;
        } else {
            result = temp + result;
            flag = 0;
        }
    }
    result = (isMinus ? "-" : "") + result.replace(/^0+/, ""); //去掉前面多余的0，如"1324"-"1315"
    return result;
}

let num1 = "9007199254740991";
let num2 = "1229007199254740993443";
console.log(mul(num1, num2), num1 * num2); // "-1228998192055486252452"

// 乘法
function mul(num1, num2) {
    if (num1 === "0" || num2 === "0") return "0";
    let flag = 0,
        result = "0",
        tempResult = "",
        temp = 0;
    for (let i = num2.length - 1; i >= 0; i--) {
        flag = 0;
        tempResult = "";
        temp = 0;
        for (let j = num1.length - 1; j >= 0; j--) {
            temp = parseInt(num2[i]) * parseInt(num1[j]) + flag;
            tempResult = temp % 10 + tempResult;
            flag = parseInt(temp / 10);
        }
        tempResult = (flag > 0 ? flag : "") + tempResult;
        result = add(result, tempResult + "0".repeat(num2.length - 1 - i));
    }
    return result;
}
