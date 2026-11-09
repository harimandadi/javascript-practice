/**
 * LeetCode 35: Search Insert Position
 * Given a sorted array of distinct integers and a target value, return the index 
 * if the target is found. If not, return the index where it would be if it were inserted in order.
 * 
 * EXAMPLE TRACE FOR INPUT: nums = [1, 3, 5, 6], target = 2
 * ------------------------------------------------------------
 * - left = 0, right = 3
 * - Iteration 1:
 *   - mid = Math.floor((0 + 3) / 2) = 1
 *   - nums[1] is 3. Is 3 === 2? No.
 *   - Is 3 > 2? Yes, target is smaller, so search left half: right = mid - 1 = 0
 * - Iteration 2:
 *   - left = 0, right = 0
 *   - mid = Math.floor((0 + 0) / 2) = 0
 *   - nums[0] is 1. Is 1 === 2? No.
 *   - Is 1 > 2? No, target is larger, so search right half: left = mid + 1 = 1
 * - Loop ends because left (1) > right (0).
 * - Returns left (1), which is the correct insertion index for 2!
 * ------------------------------------------------------------
 */

function searchInsert(nums, target) {
    // Step 1: Initialize two pointers for our search range
    let left = 0;
    let right = nums.length - 1;

    // Step 2: Loop while our search space is valid
    while (left <= right) {
        
        // Find the middle index of the current window
        let mid = Math.floor((left + right) / 2);

        // Step 3: Check if target matches the middle element
        if (nums[mid] === target) {
            return mid; // Target found, return its index!
        } 
        
        // Step 4: If target is smaller than the middle element, it must be in the LEFT half
        else if (nums[mid] > target) {
            right = mid - 1; // Move 'right' pointer to shrink window to the left
        } 
        
        // Step 5: If target is larger than the middle element, it must be in the RIGHT half
        else {
            left = mid + 1; // Move 'left' pointer to shrink window to the right
        }
    }

    // Step 6: If the loop finishes without finding the target, 
    // the 'left' pointer will naturally point to the exact index where the target should be inserted!
    return left;
}

// --- TEST IT IN VSCODE ---
let nums = [1, 3, 5, 6];

console.log("Target 5 (Found):    Index", searchInsert(nums, 5)); // Output: 2
console.log("Target 2 (Insert):   Index", searchInsert(nums, 2)); // Output: 1 (between 1 and 3)
console.log("Target 7 (Insert End): Index", searchInsert(nums, 7)); // Output: 4 (at the end)
console.log("Target 0 (Insert Beg): Index", searchInsert(nums, 0)); // Output: 0 (at the beginning)