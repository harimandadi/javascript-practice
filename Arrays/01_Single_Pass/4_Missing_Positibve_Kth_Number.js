// ============================================================================
// FIND THE KTH POSITIVE MISSING NUMBER: LINEAR SCAN SOLUTION
// ============================================================================
// Given an array arr of positive integers sorted in a strictly increasing order,
// and an integer k. Return the kth positive integer that is missing from this array.
//
// MEMORY: "Start at k. Each number in the way pushes the answer up by one."
//   k + count = the current GUESS for the answer
//   an array number <= the guess is PRESENT (not missing) → the answer moves one step → count++
//
// Time: O(n)   Space: O(1)
// ============================================================================

function findKthPositive(arr, k) {
    // Initialize count to track how many numbers from the array 
    // fall within the range up to our shifting threshold (k + count).
    let count = 0;

    // Traverse through the sorted array from left to right
    for (let i = 0; i < arr.length; i++) {
        
        // If the current array element is less than or equal to (k + count),
        // it sits INSIDE 1..(k + count), so it is PRESENT, not missing.
        // That leaves one fewer missing number in that range → the answer moves
        // one step further → count++.
        if (arr[i] <= k + count) {
            count++;
        }
    }

    // Return the final kth positive missing integer by adding the offset count to k.
    return k + count;
}

// --- Method Call & Execution ---
const arr = [2, 3, 4, 5, 7, 11, 12];
const k = 5;
const result = findKthPositive(arr, k);

console.log("The 5th missing positive integer is:", result);
// Output: 10

/*
 * ============================================================================
 * EVERY ITERATION for arr = [2, 3, 4, 5, 7, 11, 12], k = 5
 *   start: count = 0 → guess = k + count = 5
 *
 *   i | arr[i] | guess (k + count) before | arr[i] <= guess ? | count after | new guess
 *   --|--------|--------------------------|-------------------|-------------|----------
 *   0 |    2   |            5             | 2 <= 5   yes      |      1      |    6
 *   1 |    3   |            6             | 3 <= 6   yes      |      2      |    7
 *   2 |    4   |            7             | 4 <= 7   yes      |      3      |    8
 *   3 |    5   |            8             | 5 <= 8   yes      |      4      |    9
 *   4 |    7   |            9             | 7 <= 9   yes      |      5      |   10
 *   5 |   11   |           10             | 11 <= 10 no       |      5      |   10
 *   6 |   12   |           10             | 12 <= 10 no       |      5      |   10
 *
 *   return k + count = 5 + 5 = 10  ✅
 *
 * CHECK BY LISTING THE MISSING NUMBERS
 *   positive : 1  2  3  4  5  6  7  8  9  10  11  12
 *   in arr   :    2  3  4  5     7               11  12
 *   missing  : 1              6     8  9  10
 *              1st           2nd   3rd 4th 5th  → the 5th missing number is 10
 *
 * NOTE: for the other common example [2, 3, 4, 7, 11] with k = 5 the answer is 9.
 *       This array also contains 5 (one more number in the way), so the answer is one higher: 10.
 *
 * SPEED-UP: the array is sorted, so once arr[i] > guess every later value is bigger too;
 *           you can `break` at the first "no" (i = 5). Still O(n) in the worst case.
 * ============================================================================
 */
console.log("Other example [2, 3, 4, 7, 11], k = 5:", findKthPositive([2, 3, 4, 7, 11], 5));
// Output: 9