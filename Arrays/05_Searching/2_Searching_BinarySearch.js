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

console.log("Target 7 Found at Index:", binarySearch(sortedNums, 7));
// Output: -1 (7 is not in the array)



/**
 * ---------------------------------------------------------------------------
 * EACH ITERATION, STEP BY STEP
 * ---------------------------------------------------------------------------
 * Memory hook: "look in the MIDDLE → too small? go RIGHT → too big? go LEFT →
 *               repeat on the half that's left"
 *
 * index:   0   1   2   3    4    5    6    7    8    9
 * value: [ 2,  5,  8,  12,  16,  23,  38,  56,  72,  91 ]
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EXAMPLE 1: binarySearch(sortedNums, 23)  →  FOUND at index 5
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Iteration 1:  left = 0, right = 9
 *   mid = Math.floor((0 + 9) / 2) = Math.floor(4.5) = 4
 *   nums[4] = 16
 *   Searching in: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
 *                               ↑ mid
 *   23 === 16?  No.
 *   23 > 16  →  target is in the RIGHT half  →  left = mid + 1 = 5
 *
 * Iteration 2:  left = 5, right = 9
 *   mid = Math.floor((5 + 9) / 2) = 7
 *   nums[7] = 56
 *   Searching in: [23, 38, 56, 72, 91]
 *                          ↑ mid
 *   23 === 56?  No.
 *   23 < 56  →  target is in the LEFT half  →  right = mid - 1 = 6
 *
 * Iteration 3:  left = 5, right = 6
 *   mid = Math.floor((5 + 6) / 2) = Math.floor(5.5) = 5
 *   nums[5] = 23
 *   Searching in: [23, 38]
 *                  ↑ mid
 *   23 === 23?  YES  →  return 5   ✅
 *
 *   Result: 3 checks instead of up to 10 with linear search.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EXAMPLE 2: binarySearch(sortedNums, 7)  →  NOT FOUND, returns -1
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Iteration 1:  left = 0, right = 9
 *   mid = 4, nums[4] = 16
 *   Searching in: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
 *   7 < 16  →  go LEFT  →  right = 3
 *
 * Iteration 2:  left = 0, right = 3
 *   mid = Math.floor((0 + 3) / 2) = 1, nums[1] = 5
 *   Searching in: [2, 5, 8, 12]
 *   7 > 5  →  go RIGHT  →  left = 2
 *
 * Iteration 3:  left = 2, right = 3
 *   mid = Math.floor((2 + 3) / 2) = 2, nums[2] = 8
 *   Searching in: [8, 12]
 *   7 < 8  →  go LEFT  →  right = 1
 *
 * Loop check:  left = 2, right = 1  →  is 2 <= 1?  NO  →  the loop stops.
 *   left has crossed right, so there is nothing left to search  →  return -1   ❌
 *   (7 would have to sit between 5 and 8, and there is no such element.)
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * SUMMARY TABLE (target 23)
 * ═══════════════════════════════════════════════════════════════════════════
 *  Iter | left | right | mid | nums[mid] | compare   | action
 *  -----|------|-------|-----|-----------|-----------|----------------------
 *   1   |  0   |   9   |  4  |    16     | 23 > 16   | left  = 5 (go right)
 *   2   |  5   |   9   |  7  |    56     | 23 < 56   | right = 6 (go left)
 *   3   |  5   |   6   |  5  |    23     | 23 === 23 | return 5 ✅
 *
 * SUMMARY TABLE (target 7)
 *  Iter | left | right | mid | nums[mid] | compare   | action
 *  -----|------|-------|-----|-----------|-----------|----------------------
 *   1   |  0   |   9   |  4  |    16     | 7 < 16    | right = 3 (go left)
 *   2   |  0   |   3   |  1  |     5     | 7 > 5     | left  = 2 (go right)
 *   3   |  2   |   3   |  2  |     8     | 7 < 8     | right = 1 (go left)
 *   -   |  2   |   1   |  -  |     -     | 2 <= 1? no| loop ends → return -1 ❌
 *
 * ---------------------------------------------------------------------------
 * KEY POINTS
 * ---------------------------------------------------------------------------
 * - The array MUST be sorted. On an unsorted array the "go left / go right"
 *   decision is meaningless and the answer can be wrong.
 * - Every iteration throws away HALF of what's left: 10 → 5 → 2 → 1 items.
 * - mid + 1 / mid - 1 (not mid): mid was already checked, so skip it.
 *   Using left = mid could loop forever.
 * - Time Complexity  - O(log n): 10 items need at most 4 checks,
 *                      1,000,000 items need at most 20.
 * - Space Complexity - O(1): only three variables (left, right, mid).
 */