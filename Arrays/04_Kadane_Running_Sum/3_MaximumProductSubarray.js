/**
 * Maximum Product Subarray   (LeetCode 152 · asked at Amazon, Microsoft, Google, LinkedIn)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   Given an integer array nums, find the contiguous subarray with the LARGEST PRODUCT
 *   and return that product.
 *
 * EXAMPLES
 *   Input : nums = [2, 3, -2, 4]
 *   Output: 6               → [2, 3]
 *
 *   Input : nums = [-2, 3, -4]
 *   Output: 24              → [-2, 3, -4]: two negatives make a positive
 *
 *   Input : nums = [-2, 0, -1]
 *   Output: 0               → [0]
 *
 * OUTPUT FORMAT
 *   A single number: the largest product of any contiguous subarray.
 *
 * MEMORY: "Kadane, but keep BOTH the max AND the min (a negative flips them)."
 *   STEP 1 → if the current number is NEGATIVE, SWAP max and min
 *            (biggest × negative = smallest, smallest × negative = biggest)
 *   STEP 2 → for max and min: extend (× num) or start fresh (num), whichever is bigger / smaller;
 *            keep the best max
 *
 * WHY TRACK THE MIN?
 *   With sums (max subarray SUM) a very negative running total is useless. With products it's
 *   valuable: the smallest (most negative) product × one more negative becomes the LARGEST.
 *   In [-2, 3, -4], the min product -6 × -4 = 24 is the answer.
 *
 * COST
 *   Brute force: O(n²) (every start, extend right)
 *   Optimal    : O(n) time, O(1) space
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── BRUTE FORCE: O(n²) ── every start, extend right ──────────────────────────
function maxProductBrute(nums) {
  let best = nums[0];
  for (let i = 0; i < nums.length; i++) {
    let product = 1;
    for (let j = i; j < nums.length; j++) {
      product *= nums[j];                       // product of nums[i..j]
      best = Math.max(best, product);
    }
  }
  return best;
}

// ── OPTIMAL: Kadane with max AND min, O(n) ───────────────────────────────────
function maxProduct(nums) {
  let maxHere = nums[0];                        // largest product of a subarray ENDING here
  let minHere = nums[0];                        // smallest product of a subarray ENDING here
  let best = nums[0];                           // largest product seen anywhere

  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];

    if (num < 0) {                              // STEP 1: negative flips big ↔ small
      [maxHere, minHere] = [minHere, maxHere];  //   so swap them before multiplying
    }

    maxHere = Math.max(num, maxHere * num);     // STEP 2: extend, or start fresh at num
    minHere = Math.min(num, minHere * num);     //         (start fresh also "resets" after a 0)
    best = Math.max(best, maxHere);             //         keep the best
  }

  return best;
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY ITERATION for nums = [-2, 3, -4]
 *   start: maxHere = -2, minHere = -2, best = -2
 *
 *   i | num | negative → swap? | maxHere = max(num, maxHere×num) | minHere = min(num, minHere×num) | best
 *   --|-----|------------------|---------------------------------|---------------------------------|-----
 *   1 |  3  | no               | max(3, -2×3 = -6)   =  3        | min(3, -2×3 = -6)   = -6        |  3
 *   2 | -4  | yes → max=-6, min=3 | max(-4, -6×-4 = 24) = 24     | min(-4, 3×-4 = -12) = -12       | 24  ✅
 *
 *   Answer 24: the MIN (-6) × a negative (-4) became the MAX.
 *
 * AND for nums = [2, 3, -2, 4]
 *   i | num | swap? | maxHere | minHere | best
 *   --|-----|-------|---------|---------|-----
 *     |     | start |    2    |    2    |  2
 *   1 |  3  | no    |    6    |    3    |  6
 *   2 | -2  | yes   |   -2    |  -12    |  6
 *   3 |  4  | no    |    4    |  -48    |  6   ✅  → [2, 3]
 *
 * TRAPS
 *   1. Tracking only the max fails for [-2, 3, -4] (it would answer 3, not 24).
 *   2. Swap BEFORE multiplying, and use the OLD values for both updates (the swap handles that).
 *   3. Start from nums[0], not 1 or 0: for [-3] the answer is -3.
 *   4. A 0 resets everything: max(0, …) and min(0, …) with "start fresh at num" handle it.
 *
 * INTERVIEW LINE
 *   "Like Kadane, but a negative number turns the smallest product into the largest, so I keep
 *    both the max and the min product ending at each position, swap them on a negative, and
 *    take extend-or-restart for each. O(n) time, O(1) space."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(maxProduct([2, 3, -2, 4]));     // 6
console.log(maxProduct([-2, 3, -4]));       // 24
console.log(maxProduct([-2, 0, -1]));       // 0
console.log(maxProduct([-3]));              // -3
console.log(maxProductBrute([-2, 3, -4]));  // 24 (brute force, same answer)
