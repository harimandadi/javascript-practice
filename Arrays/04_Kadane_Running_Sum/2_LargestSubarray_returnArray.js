/**
 * Finds and returns the actual maximum subarray elements using Kadane's Algorithm.
 * @param {number[]} nums - The input array of numbers.
 * @return {number[]} - The contiguous subarray with the largest sum.
 */
function findMaxSubarray(nums) {
  // Step 1: Initialize currentSum and maxSum with the first element.
  let currentSum = nums[0];
  let maxSum = nums[0];
  
  // Step 2: Pointers to track the boundaries of the maximum subarray
  let start = 0;       // Final start index of the max subarray
  let end = 0;         // Final end index of the max subarray
  let tempStart = 0;   // Temporary start index for a potential new subarray

  // Step 3: Loop through the array starting from the second element (index 1)
  for (let i = 1; i < nums.length; i++) {
    
    // Decision 1: Should we start fresh at nums[i], or extend the previous running sum?
    if (nums[i] > currentSum + nums[i]) {
      // Starting fresh is better because the previous sum dragged us down too much.
      currentSum = nums[i];
      tempStart = i; // Mark this index as the potential start of a new subarray
    } else {
      // Extending the previous sum is better.
      currentSum += nums[i];
    }

    // Decision 2: Did our new running sum beat our global record (maxSum)?
    if (currentSum > maxSum) {
      maxSum = currentSum; // Update global max sum
      start = tempStart;   // Lock in the official start index
      end = i;             // Lock in the official end index
    }
  }

  // Step 4: Slice and return the actual subarray elements using our tracked pointers
  return nums.slice(start, end + 1);
}

// --- Test Example ---
let nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log("Max Subarray Elements:", findMaxSubarray(nums)); 
// Output: [4, -1, 2, 1]