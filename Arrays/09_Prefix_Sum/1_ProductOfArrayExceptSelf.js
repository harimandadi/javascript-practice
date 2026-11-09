/**
 * Product of Array Except Self   (LeetCode 238 · asked at Amazon, Microsoft, Google, Meta)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   Given an integer array nums, return an array answer where answer[i] is the
 *   product of ALL elements of nums EXCEPT nums[i].
 *   Rules: do it WITHOUT division, in O(n) time.
 *
 * EXAMPLES
 *   Input : nums = [1, 2, 3, 4]
 *   Output: [24, 12, 8, 6]
 *           24 = 2*3*4   12 = 1*3*4   8 = 1*2*4   6 = 1*2*3
 *
 *   Input : nums = [-1, 1, 0, -3, 3]
 *   Output: [0, 0, 9, 0, 0]       (only the 0's own position skips the 0)
 *
 * OUTPUT FORMAT
 *   An array of the SAME length as nums; answer[i] = product of everything except nums[i].
 *
 * MEMORY: "Everything LEFT of me × everything RIGHT of me."
 *   STEP 1 → LEFT pass : answer[i] = product of everything to the LEFT of i
 *   STEP 2 → RIGHT pass: multiply answer[i] by the product of everything to the RIGHT of i
 *
 * COST
 *   Brute force: O(n²) time  (for each i, multiply all the others)
 *   Optimal    : O(n) time, O(1) extra space (the answer array doesn't count)
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── BRUTE FORCE: O(n²) ── say this first in an interview, then optimize ──────
function productExceptSelfBrute(nums) {
  const answer = [];
  for (let i = 0; i < nums.length; i++) {      // for every position i...
    let product = 1;
    for (let j = 0; j < nums.length; j++) {    // ...multiply every OTHER element
      if (j !== i) product *= nums[j];
    }
    answer.push(product || 0);                 // `|| 0` turns -0 into 0 (see TRAPS)
  }
  return answer;
}

// ── OPTIMAL: two passes, O(n) ─────────────────────────────────────────────────
function productExceptSelf(nums) {
  const n = nums.length;
  const answer = new Array(n);                 // the result array, filled in two passes

  // STEP 1: LEFT pass → answer[i] = product of everything LEFT of i
  let prefix = 1;                              // nothing is left of index 0 → start with 1
  for (let i = 0; i < n; i++) {
    answer[i] = prefix;                        // store the product of nums[0..i-1]
    prefix *= nums[i];                         // then include nums[i] for the NEXT index
  }

  // STEP 2: RIGHT pass → multiply by the product of everything RIGHT of i
  let suffix = 1;                              // nothing is right of the last index → 1
  for (let i = n - 1; i >= 0; i--) {           // walk BACKWARDS
    answer[i] = answer[i] * suffix || 0;       // left product × right product (`|| 0`: -0 → 0)
    suffix *= nums[i];                         // include nums[i] for the index to its LEFT
  }

  return answer;
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY ITERATION for nums = [1, 2, 3, 4]
 *
 * STEP 1: LEFT pass (i goes 0 → 3)                prefix starts at 1
 *   i | answer[i] = prefix | then prefix *= nums[i]
 *   --|--------------------|-----------------------
 *   0 |        1           |   1 * 1 = 1
 *   1 |        1           |   1 * 2 = 2
 *   2 |        2           |   2 * 3 = 6
 *   3 |        6           |   6 * 4 = 24
 *   answer after STEP 1 = [1, 1, 2, 6]   ← product of everything LEFT of each index
 *
 * STEP 2: RIGHT pass (i goes 3 → 0)               suffix starts at 1
 *   i | answer[i] = answer[i] * suffix | then suffix *= nums[i]
 *   --|--------------------------------|-----------------------
 *   3 |        6 * 1  = 6              |   1 * 4 = 4
 *   2 |        2 * 4  = 8              |   4 * 3 = 12
 *   1 |        1 * 12 = 12             |  12 * 2 = 24
 *   0 |        1 * 24 = 24             |  24 * 1 = 24
 *   answer after STEP 2 = [24, 12, 8, 6]  ✅
 *
 * PICTURE for i = 2 (value 3):
 *      [ 1   2 ]  3  [ 4 ]
 *        left = 2    right = 4   →  2 × 4 = 8
 *
 * TRAPS
 *   1. Why not divide? total / nums[i] breaks when nums contains 0 (division by zero),
 *      and the problem forbids division anyway.
 *   2. Store prefix BEFORE multiplying by nums[i] → answer[i] must NOT include nums[i] itself.
 *   3. JavaScript -0: e.g. 0 × -3 gives -0, which prints as "-0". `x || 0` turns it into 0.
 *
 * INTERVIEW LINE
 *   "For each index the answer is (product on the left) × (product on the right). One pass
 *    left-to-right stores the left products, one pass right-to-left multiplies in the right
 *    products with a running variable: O(n) time, no division, O(1) extra space."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(productExceptSelf([1, 2, 3, 4]));        // [ 24, 12, 8, 6 ]
console.log(productExceptSelf([-1, 1, 0, -3, 3]));   // [ 0, 0, 9, 0, 0 ]
console.log(productExceptSelf([2, 3]));              // [ 3, 2 ]
console.log(productExceptSelfBrute([1, 2, 3, 4]));   // [ 24, 12, 8, 6 ]  (brute force, same answer)
