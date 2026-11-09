/**
 * ============================================================================
 * MOVE ZEROES: TWO-POINTER SWAP PATTERN
 * ============================================================================
 * TIME COMPLEXITY: O(n) - We loop through the array exactly once.
 * SPACE COMPLEXITY: O(1) - We mutate the array in-place without extra storage.
 * 
 * THE MENTAL MODEL:
 * Imagine you are sorting a row of blocks where some blocks are zeros (blank spaces) 
 * and others have numbers. You walk through with a pointer (`nonZeroIndex`) marking 
 * where the next valid number should land. Whenever you find a non-zero number, 
 * you swap it into that slot and advance your pointer. By the end, all non-zero 
 * numbers are neatly stacked at the front, and zeros are naturally pushed to the back.
 * ============================================================================
 */

function moveZeroes(nums) {
    
    // Step 1: Edge case safety check.
    if (!nums || nums.length <= 1) {
        return nums;
    }

    // Step 2: Initialize a pointer to track the position to place the next non-zero element.
    let nonZeroIndex = 0; 

    // Step 3: Traverse the array; if an element is non-zero, swap it into the front position.
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            [nums[nonZeroIndex], nums[i]] = [nums[i], nums[nonZeroIndex]];
            nonZeroIndex++;
        }
    }

    // Step 4: Return the modified array.
    return nums;
}

// ============================================================================
// TESTING AND EXECUTION IN VS CODE
// ============================================================================
console.log("Normal Array [0, 1, 0, 3, 12]:  ", moveZeroes([0, 1, 0, 3, 12]));  // Output: [1, 3, 12, 0, 0]
console.log("All Zeros [0, 0, 0]:           ", moveZeroes([0, 0, 0]));           // Output: [0, 0, 0]
console.log("No Zeros [1, 2, 3]:            ", moveZeroes([1, 2, 3]));           // Output: [1, 2, 3]
console.log("Single Element [0]:            ", moveZeroes([0]));                 // Output: [0]