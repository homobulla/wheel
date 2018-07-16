/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var ret;
    for(let i=0;i<nums.length;i++) {
        for (let j=0;j<nums.length;j++) {
            if (nums[i] + nums[j] == target && i != j) { 
                return ret = [i,j]
            } 
        }
    }
    return ret = ret ? ret :  '没有合适的两个数'
};
var nums = [3, 3, 3, 15], 
   target = 6;

var result = twoSum(nums,target);
console.log(result)
