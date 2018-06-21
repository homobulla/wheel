/* 
 几种排序方式
 · 冒泡排序
*/

function bubbleSort(arr) {
    console.time('泡排序耗时');
    let nLen = arr.length;
    
	for (let i=0; i<nLen; i++) {
   	 for (let j=0; j<nLen; j++) {
     	   let a = arr[j];
     	   let b = arr[j+1];
     	   if (a < b) {
     	       arr[j] = b;
      	      arr[j+1] = a;
     	   }
  	  }
    }
    console.timeEnd('泡排序耗时');
  return arr;
}

// 改进
function bubbleSort2(arr) {
    console.time('改进后冒泡排序耗时');
    var i = arr.length-1;  //初始时,最后位置保持不变
    while ( i> 0) {
        var pos= 0; //每趟开始时,无记录交换
        for (var j= 0; j< i; j++)
            if (arr[j]> arr[j+1]) {
                pos= j; //记录交换的位置
               
                //var tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
                [ arr[j],arr[j+1]] = [arr[j+1],arr[j]]
            }
        i= pos; //为下一趟排序作准备
     }
     console.timeEnd('改进后冒泡排序耗时');
     return arr;
}

//console.log(bubbleSort([1,34,3,0,-44,1212,43,4,33333,44444,232,23,-34,-34,-32423424,242423]))
//console.log(bubbleSort2([1,34,3,0,-44,1212,43,4,33333,44444,232,23,-34,-34,-32423424,242423]))
// 选择排序
function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     // 寻找最小的数
                minIndex = j;                 // 将最小数的索引保存
            }
        }
        [arr[i],arr[minIndex]] = [arr[minIndex],arr[i]];
    }
    return arr;
}

//console.log(selectionSort([1,34,3,0,-44,1212,43,4,33333,44444,232,23,-34,-34,-32423424,242423]))

// 插入排序 -》扑克牌整理牌
 
function insertionSort(arr) {
    var len = arr.length;
    //preIndex 循环的前一个下标 current当前循环元素
    var preIndex, current;
    for (var i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while(preIndex >= 0 && arr[preIndex] > current) {
            console.log('arr[preIndex] is '+arr[preIndex],' current is '+current)
            arr[preIndex+1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex+1] = current;
    }
    return arr;
}

console.log(insertionSort([1,34,3,0,-44,1212,43,4,33333,44444,232,23,-34,-34,-32423424,242423]),'插入')
