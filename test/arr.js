/**
 * 输出数组中出现次数最多的元素以及次数
 * date:2019-05-24
 */

var arr = [1, 2, 3, 3, 4, 4, 4, 5, 6, 7, 8, 8];
var newArr = [...new Set(arr)];
console.log(newArr);
function f(arr) {
    class num {
        constructor(value) {
            this.value = value;
            this.index = 1;
        }
        add() {
            this.index++;
        }
    }
    arr.sort();
    let temp = [];
    temp[0] = new num(arr[0]);
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] == arr[i - 1]) {
            temp[temp.length - 1].add();
        } else {
            temp.push(new num(arr[i]));
        }
    }
    temp.sort(function(a, b) {
        return a.index < b.index;
    });
    console.log(temp);
    let max = temp[0].index;
    let maxV = temp[0].value;
    let second = temp[1].index;
    let secondV = temp[1].value;
    return { max, maxV, second, secondV };
}
var arr = ["a", "b", "a", "b", "a", "c", "d", "d", "d", "d"];
var { max, maxV, second, secondV } = f(arr);
console.log(max, maxV, second, secondV);
