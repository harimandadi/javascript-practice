/**
 * Finds the maximum subarray sum using a Brute Force approach.
 * @param {number[]} nums - The input array of numbers.
 * @return {number} - The maximum sum of a contiguous subarray.
 */
function maxSubArrayBruteForce(nums) {
  // Step 1: Initialize maxSum with the very first element of the array.
  // We do this so we handle arrays with negative numbers properly.
  let maxSum = nums[0];

  // Step 2: Outer loop picks the STARTING index (i) of our subarray.
  for (let i = 0; i < nums.length; i++) {
    
    // Reset currentSum to 0 every time we pick a new starting point.
    let currentSum = 0;

    // Step 3: Inner loop picks the ENDING index (j) of our subarray, 
    // expanding it one element to the right at a time.
    for (let j = i; j < nums.length; j++) {
      
      // Add the current element to our running sum.
      currentSum += nums[j];

      // Step 4: Check if our new subarray sum is greater than the global maxSum found so far.
      if (currentSum > maxSum) {
        maxSum = currentSum; // Update maxSum if we found a higher sum.
      }
    }
  }

  // Step 5: Return the highest sum we found across all possible subarrays.
  return maxSum;
}

// Example Run
console.log(maxSubArrayBruteForce([-2, 1, -3, 4, -1, 2])); // Output: 5