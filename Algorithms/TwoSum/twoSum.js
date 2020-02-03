/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    for(i in nums) {
        for (j in nums) {
            if (i < j && nums[i] + nums[j] == target) {
                return [Number(i), Number(j)];
            }
        }
    }
};