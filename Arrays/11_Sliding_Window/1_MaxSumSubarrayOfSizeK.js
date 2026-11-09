/**
 * Maximum Sum Subarray of Size K   (the classic FIXED-size sliding window;
 *                                    asked at Amazon, Microsoft, Flipkart, Walmart)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   Given an array of integers and a number k, find the MAXIMUM SUM of any contiguous
 *   subarray of EXACTLY k elements.
 *
 * EXAMPLES
 *   Input : arr = [2, 1, 5, 1, 3, 2], k = 3
 *   Output: 9            → [5, 1, 3]
 *
 *   Input : arr = [2, 3, 4, 1, 5], k = 2
 *   Output: 7            → [3, 4]
 *
 * OUTPUT FORMAT
 *   A single number: the largest sum of k consecutive elements (null if the array is shorter than k).
 *
 * MEMORY: "Add the one coming IN, remove the one going OUT."
 *   STEP 1 → sum the FIRST k elements (the first window)
 *   STEP 2 → slide right one step at a time: sum += arr[i] - arr[i - k]; keep the best
 *
 * WHY IT'S FASTER
 *   Neighbouring windows share k - 1 elements. Instead of re-adding all k (O(k) per window),
 *   update the sum with one addition and one subtraction (O(1) per window).
 *
 * COST
 *   Brute force   : recompute every window → O(n·k)
 *   Sliding window: O(n) time, O(1) space
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── BRUTE FORCE: O(n·k) ── add up every window from scratch ──────────────────
function maxSumBrute(arr, k) {
  if (arr.length < k) return null;
  let best = -Infinity;
  for (let start = 0; start + k <= arr.length; start++) {
    let sum = 0;
    for (let i = start; i < start + k; i++) sum += arr[i];
    best = Math.max(best, sum);
  }
  return best;
}

// ── OPTIMAL: fixed sliding window, O(n) ──────────────────────────────────────
function maxSumOfSizeK(arr, k) {
  if (arr.length < k) return null;                // no window of size k exists

  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += arr[i]; // STEP 1: the first window [0 .. k-1]
  let best = windowSum;

  for (let i = k; i < arr.length; i++) {          // STEP 2: slide right
    windowSum += arr[i] - arr[i - k];             //   + the element coming IN, - the one going OUT
    best = Math.max(best, windowSum);
  }

  return best;
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY ITERATION for arr = [2, 1, 5, 1, 3, 2], k = 3
 *   index:  0  1  2  3  4  5
 *   arr  :  2  1  5  1  3  2
 *
 * STEP 1: first window [2, 1, 5] → sum 8, best 8
 *
 * STEP 2: slide
 *   i | IN  arr[i] | OUT arr[i-k] | window       | sum            | best
 *   --|------------|--------------|--------------|----------------|-----
 *   3 |     1      |      2       | [1, 5, 1]    | 8 + 1 - 2 = 7  |  8
 *   4 |     3      |      1       | [5, 1, 3]    | 7 + 3 - 1 = 9  |  9  ✅
 *   5 |     2      |      5       | [1, 3, 2]    | 9 + 2 - 5 = 6  |  9
 *
 *   Answer 9
 *
 * PICTURE (the window slides one step right each time):
 *   [ 2  1  5 ] 1  3  2      sum 8
 *     2 [ 1  5  1 ] 3  2     sum 7
 *     2  1 [ 5  1  3 ] 2     sum 9  ← best
 *     2  1  5 [ 1  3  2 ]    sum 6
 *
 * TRAPS
 *   1. The element going out is arr[i - k] (not arr[i - k + 1]).
 *   2. Start best from the FIRST window's sum, not 0: all-negative arrays have negative answers.
 *   3. Check arr.length < k first.
 *   4. FIXED size here. When the size depends on a condition ("smallest window with sum >= target"),
 *      use the VARIABLE window in 2_MinSizeSubarraySum.js.
 *
 * INTERVIEW LINE
 *   "Consecutive windows overlap in k - 1 elements, so I compute the first window once and then
 *    slide: add the new element, subtract the one that left. That turns O(n·k) into O(n) with
 *    O(1) space."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(maxSumOfSizeK([2, 1, 5, 1, 3, 2], 3));   // 9
console.log(maxSumOfSizeK([2, 3, 4, 1, 5], 2));      // 7
console.log(maxSumOfSizeK([-3, -1, -2], 2));         // -3 (all negative)
console.log(maxSumOfSizeK([1, 2], 3));               // null (array shorter than k)
console.log(maxSumBrute([2, 1, 5, 1, 3, 2], 3));     // 9 (brute force, same answer)
