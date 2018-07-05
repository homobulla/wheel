// immutable 是什么？不变的、一成不变的。在 Javascript 中一般指一个变量在经过一个 function 处理之后，可以保持入参数据不变。

/**
 * 求取数组中的中位数
 * [1, 2, 3, 4, 4] -> 3
 * [1, 2, 3, 4, 5, 6] -> 3.5
 */
function calculateMedian(arr) {
    //1. 排序
    arr.sort((a,b) => a-b );
    //2. 中位数定义
    const half = Math.floor(arr.length / 2);
    console.log(half,'half')
    return arr.length % 2 !== 0 ?
        arr[half] :
        (arr[half-1] + arr[half]) / 2
   }
   
console.log(calculateMedian([1,3,4,56]),1111)