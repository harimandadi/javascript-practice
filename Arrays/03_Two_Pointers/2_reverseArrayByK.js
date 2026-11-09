/**
 * Rotates an array to the right by k steps in-place.
 * 
 * @param {number[]} nums - The array of numbers to rotate.
 * @param {number} k - The number of steps to rotate to the right.
 * @returns {number[]} The modified array rotated in-place.
 */
function rotateArray(nums, k) {
    // Step 1: Edge case safety checks.
    if (!nums || nums.length <= 1 || k === 0) {
        return nums;
    }
    
    const n = nums.length;
    // Handle cases where k is greater than the array length13
    k = k % n; 

    // Helper function to reverse a portion of the array in-place using destructuring swap
    function reverse(start, end) {
        while (start < end) {
            [nums[start], nums[end]] = [nums[end], nums[start]];
            start++;
            end--;
        }
    }

    // Step 2: Apply the 3-step reversal algorithm
    reverse(0, n - 1);     // Step A: Reverse the entire array
    reverse(0, k - 1);     // Step B: Reverse the first k elements
    reverse(k, n - 1);     // Step C: Reverse the remaining n - k elements

    return nums;
}

// ==========================================
// Example Function Call & Execution:
// ==========================================
const inputNums = [1, 2, 3, 4, 5, 6, 7];
const k = 3;

console.log("Original Array:", [...inputNums]); // Spread operator used just for printing clean state
const result = rotateArray(inputNums, k);
console.log("Rotated Array:", result); 
// Output: [5, 6, 7, 1, 2, 3, 4]