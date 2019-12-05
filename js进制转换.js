// js的精度问题
// 0.1 + 0.2 = 0.3000000000000004;
// 内部是如何计算的,两个数字二进制化然后相加得到一个二进制的结果，最后把结果10进制化输出。
// 10进制转其他进制
var a = (0.1).toString(2);
var b = (0.2).toString(2);

// 其他进制转
// console.log(parseInt("10", 16));
// js中的计算
// url:http://zouyang1230.com/blog/archives/805
function Add(nNum1, nNum2) {
    //如果其中一个相加参数数为 0，则返回另一参数；
    if (nNum1 == 0 || nNum2 == 0) return nNum1 || nNum2;
    var ntempNum;
    while (nNum2 != 0) {
        ntempNum = nNum1 ^ nNum2;
        nNum2 = (nNum1 & nNum2) << 1;
        nNum1 = ntempNum;
    }
    return nNum1;
}
console.log(Add(1, 222));
