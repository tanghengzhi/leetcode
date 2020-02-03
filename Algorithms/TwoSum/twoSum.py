class Solution:
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        dict = {}
        
        for i, v in enumerate(nums):
            if target - v in dict:
                return [dict[target - v], i]
            dict[v] = i
