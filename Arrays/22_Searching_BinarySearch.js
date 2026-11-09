/**
 * ---------------------------------------------------------------------------
 * BINARY SEARCH ALGORITHM
 * ---------------------------------------------------------------------------
 * PURPOSE: Efficiently searches for a target value in a SORTED array 
 * by repeatedly dividing the search space in half.
 */
function binarySearch(nums, target) {
    // Step 1: Initialize two pointers representing the boundaries of our search space
    let left = 0;                  // Start of the array
    let right = nums.length - 1;   // End of the array

    // Step 2: Keep looping as long as the search space is valid (left pointer hasn't crossed right)
    while (left <= right) {
        
        // Step 3: Find the middle index. 
        // Math.floor handles odd/even array lengths by rounding down.
        let mid = Math.floor((left + right) / 2);

        // Step 4: Check if the middle element is our target
        if (nums[mid] === target) {
            return mid; // Found it! Return the index immediately.
        }

        // Step 5: If target is greater than mid element, it must be in the RIGHT half.
        // So, move the 'left' pointer past 'mid'.
        if (target > nums[mid]) {
            left = mid + 1;
        } 
        // Step 6: Otherwise, target must be in the LEFT half.
        // So, move the 'right' pointer below 'mid'.
        else {
            right = mid - 1;
        }
    }

    // Step 7: If the loop finishes and we didn't find the target, return -1
    return -1;
}

// --- TEST IN VSCODE ---
let sortedNums = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
let targetVal = 23;

console.log("Array:", sortedNums);
console.log("Target Found at Index:", binarySearch(sortedNums, targetVal)); 
// Output: 5 (since sortedNums[5] is 23)