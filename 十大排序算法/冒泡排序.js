// 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
// 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。
// 针对所有的元素重复以上的步骤，除了最后一个。
// 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

function bubbleSort(arr) {
    console.time();
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            // len-1-i 减去每次循环后最后已经确认的顺序
            if (arr[j] > arr[j + 1]) {
                // 相邻元素两两对比
                [ arr[j + 1], arr[j] ] = [ arr[j], arr[j + 1] ]; //交换位置
            }
        }
    }
    console.timeEnd();
    return arr;
}
var a = [ -3, 1, 8, 22, 34, 65, 343, 878, 5675 ];
var b = a.reverse();
console.log(b);
var arr = [ 1, 343, -3, 34, 22, 65, 878, 8, 5675 ];
// console.log(bubbleSort(b));

function test() {
    console.time();
}

test();
