/**
 * ============================================================================
 * 3SUM: OPTIMIZED ANCHOR + TWO-POINTER PATTERN
 * ============================================================================
 * TIME COMPLEXITY: O(n^2) - Fast enough to pass large test cases without timing out.
 * SPACE COMPLEXITY: O(1) auxiliary space (ignoring the output array).
 * 
 * THE STRATEGY (HOW TO MEMORIZE THE APPROACH):
 * 1. SORTING: We sort the array first. This groups identical numbers together 
 *    (making duplicate skipping easy) and allows inward-moving pointers.
 * 2. THE ANCHOR: We pick one number as a fixed anchor (`nums[i]`).
 * 3. TWO POINTERS: With the anchor locked, the problem instantly transforms into 
 *    a classic Two-Sum style search using a `left` and `right` pointer.
 * ============================================================================
 */

function threeSum(nums) {
    // ========================================================================
    // WHY THIS VARIABLE?
    // Creates an empty array to collect all unique triplet sub-arrays that sum to 0.
    // ========================================================================
    const result = [];

    // ========================================================================
    // WHY SORT THE ARRAY?
    // Sorting in ascending order is mandatory. It enables our two pointers to 
    // navigate smartly (moving left if sum is too small, right if too big) 
    // and groups duplicate numbers together so we can skip them easily.
    // ========================================================================
    nums.sort((a, b) => a - b);

    // ========================================================================
    // WHY STOP 2 ELEMENTS SHORT (`nums.length - 2`)?
    // Our anchor 'i' needs to leave room for at least two other numbers 
    // ('left' and 'right') to exist behind/around it.
    // ========================================================================
    for (let i = 0; i < nums.length - 2; i++) {

        // ========================================================================
        // WHY SKIP DUPLICATE ANCHORS?
        // If our current anchor number is identical to the previous anchor number, 
        // it would generate duplicate triplet groups. Skipping it saves time and 
        // ensures all returned triplets are 100% unique.
        // ========================================================================
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue; // Skip this iteration, jump to the next anchor
        }

        // ========================================================================
        // WHY DECLARE 'left' AT `i + 1`?
        // Defines the starting lower boundary of our search window, 
        // positioned immediately to the right of our current anchor.
        // ========================================================================
        let left = i + 1;

        // ========================================================================
        // WHY DECLARE 'right' AT `nums.length - 1`?
        // Defines the starting upper boundary of our search window, 
        // positioned at the very end of the array.
        // ========================================================================
        let right = nums.length - 1;

        // ========================================================================
        // WHY THIS WHILE LOOP?
        // Runs as long as our pointers haven't crossed over, ensuring our search 
        // window remains active and valid.
        // ========================================================================
        while (left < right) {

            // ========================================================================
            // WHY THIS VARIABLE?
            // Adds our anchor plus both boundary values to check if they equal 0.
            // ========================================================================
            const sum = nums[i] + nums[left] + nums[right];

            // ========================================================================
            // CONDITION 1: EXACT MATCH (SUM = 0)
            // ========================================================================
            if (sum === 0) {
                // Save the valid triplet into our result container.
                result.push([nums[i], nums[left], nums[right]]);

                // Move both pointers inward to look for alternative combinations.
                left++;
                right--;

                // Skip duplicate values on the left side to avoid duplicate entries.
                while (left < right && nums[left] === nums[left - 1]) {
                    left++;
                }
                
                // Skip duplicate values on the right side.
                while (left < right && nums[right] === nums[right + 1]) {
                    right--;
                }
            } 
            
            // ========================================================================
            // CONDITION 2: SUM IS TOO SMALL (< 0)
            // Because the array is sorted, moving 'left' forward increases the sum.
            // ========================================================================
            else if (sum < 0) {
                left++;
            } 
            
            // ========================================================================
            // CONDITION 3: SUM IS TOO LARGE (> 0)
            // Moving 'right' backward decreases the sum.
            // ========================================================================
            else {
                right--;
            }
        }
    }

    // Returns the fully compiled list of unique triplets.
    return result;
}

// ============================================================================
// TESTING AND EXECUTION IN VS CODE
// ============================================================================
const inputNums = [-1, 0, 1, 2, -1, -4];

console.log("Input Array:   ", inputNums);
console.log("Unique Triplets:", threeSum(inputNums)); 
// Output: [ [ -1, -1, 2 ], [ -1, 0, 1 ] ]