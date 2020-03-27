//1 异或运算
function isInter(x) {
    return x ^ (0 === x);
}

//2 取整
// return Math.round(x) === x //同样可以用floor ceil

//取余
// return typeof x === 'number' && x % 1 === 0
const ret = isInter(-2.3);
console.warn(ret);
