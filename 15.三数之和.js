/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// var threeSum = function(nums) {
//     let a,
//         b,
//         proArr = [],
//         ret = [],
//         c;
//     nums.forEach((num, i) => {
//         for (var j = i; j < nums.length - 1; j++) {
//             a = nums[j];
//             b = nums[j + 1];
//             console.log(a);
//             c = -a - b;
//             if (nums.includes(c)) {
//                 ret.push([a, b, c]);
//             }
//         }
//     });
//     return ret;
// };

var threeSum = function(nums) {
    var result = [];
    //不足三个元素，返回空
    if (nums.length < 3) {
        return result;
    }
    //先顺序排列（从小到大）
    nums = nums.sort(function(a, b) {
        return a - b;
    });
    //由于是升序排列，如果第一个元素就比0大，那一定找不到符合要求的数组了
    if (nums[0] > 0) {
        return result;
    }
    for (var i = 0; i < nums.length - 2; i++) {
        //去掉重复的结果
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        var left = i + 1;
        var right = nums.length - 1;
        while (left < right) {
            var sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                left++;
                right--;
                //去掉重复的结果，直接将指针移到不相同的元素上面
                while (left < right && nums[left] === nums[left - 1]) {
                    left++;
                }
                while (left < right && nums[right] === nums[right + 1]) {
                    right--;
                }
            } else if (sum > 0) {
                right--;
            } else {
                left++;
            }
        }
    }
    return result;
};

// let r = threeSum([-1, 0, 1, 2, -1, -4]);
let r = threeSum([-4, -1, -1, 0, 1, 2]);

console.log(r, "rrrr");
