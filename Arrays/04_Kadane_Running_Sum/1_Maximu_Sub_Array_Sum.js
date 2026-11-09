/**
 * Maximum Subarray Sum: Brute Force
 * ─────────────────────────────────────────────────────────────
 * Question : the biggest sum of a CONTIGUOUS part of the array (elements side by side)
 *
 * Memory   : "Every start, every end, keep the best."
 *   STEP 1 → pick a START                                  (outer loop i)
 *   STEP 2 → extend RIGHT, add as you go, keep the BEST    (inner loop j)
 *
 * Time     : O(n²)  (n starts × up to n ends = n(n+1)/2 subarrays)
 * Space    : O(1)   (only 2 variables, no extra array)
 *
 * @param {number[]} nums - The input array of numbers.
 * @return {number} - The maximum sum of a contiguous subarray.
 */
function maxSubArrayBruteForce(nums) {
  let maxSum = nums[0];               // best so far = the first element (NOT 0: if all numbers are
                                      // negative, e.g. [-3, -1], the answer must be -1, not 0)

  // STEP 1: pick a START
  for (let i = 0; i < nums.length; i++) {
    let currentSum = 0;               // new start → begin counting from zero

    // STEP 2: extend RIGHT, add as you go, keep the BEST
    for (let j = i; j < nums.length; j++) {
      currentSum += nums[j];          // add the next element: currentSum = sum of nums[i..j]
                                      // (reusing the previous sum makes this O(n²), not O(n³))
      if (currentSum > maxSum) {      // better than the best so far?
        maxSum = currentSum;          //   → remember it
      }
    }
  }

  return maxSum;                      // the best of every start-to-end window
}

/*
 * ─────────────────────────────────────────────────────────────
 * EVERY ITERATION for [-2, 1, -3, 4, -1, 2]
 * index:  0:-2   1:1   2:-3   3:4   4:-1   5:2
 * start:  maxSum = -2
 *
 *  START i | running sums as j moves right   | best after this start
 *  --------|----------------------------------|----------------------
 *   0 (-2) | -2 → -1* → -4 → 0* → -1 → 1*     |  1
 *   1 (1)  |  1 → -2  →  2* → 1  →  3*        |  3
 *   2 (-3) | -3 →  1  →  0  → 2               |  3   (no new best)
 *   3 (4)  |  4* → 3  →  5*                   |  5   ✅
 *   4 (-1) | -1 →  1                          |  5
 *   5 (2)  |  2                               |  5
 *
 *   * = new best (maxSum updated)
 *   Answer 5 = start 3 to end 5 → [4, -1, 2]
 *   Count: 6 + 5 + 4 + 3 + 2 + 1 = 21 subarrays checked → O(n²)
 *
 * ONE ROW IN DETAIL (start i = 3):
 *   j=3: currentSum = 0 + 4  = 4 → 4 > 3? yes → maxSum = 4
 *   j=4: currentSum = 4 + -1 = 3 → 3 > 4? no
 *   j=5: currentSum = 3 + 2  = 5 → 5 > 4? yes → maxSum = 5
 *
 * TWO TRAPS
 *   1. maxSum = nums[0], not 0 → with all negatives, 0 would be a wrong answer
 *   2. reset currentSum = 0 for EACH start → otherwise the previous start's sum leaks in
 *
 * INTERVIEW FOLLOW-UP
 *   Optimal = Kadane's algorithm, O(n): at each element, extend or start fresh, whichever is bigger:
 *   current = Math.max(nums[i], current + nums[i])
 * ─────────────────────────────────────────────────────────────
 */

// Example Run
console.log(maxSubArrayBruteForce([-2, 1, -3, 4, -1, 2])); // 5  → [4, -1, 2]
console.log(maxSubArrayBruteForce([-3, -1, -2]));          // -1 → [-1]  (why maxSum starts at nums[0])
console.log(maxSubArrayBruteForce([5]));                   // 5
