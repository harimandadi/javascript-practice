/**
 * Maximum Product Subarray   (LeetCode 152 · asked at Amazon, Microsoft, Google, LinkedIn)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   Given an integer array nums, find the contiguous (side-by-side) subarray with the
 *   LARGEST PRODUCT and return that product.
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
 * WHY IT IS TRICKY (compared with maximum SUM)
 *   - A NEGATIVE number flips the sign: a very small product can suddenly become the biggest.
 *   - A ZERO wipes the product out: everything after it has to start again.
 *
 * MEMORY: "Multiply from the LEFT, multiply from the RIGHT, RESTART after a 0, keep the BIGGEST."
 *   STEP 1 → keep two running products: one reading left → right, one reading right → left
 *   STEP 2 → after each multiply, keep the biggest number you have seen
 *   STEP 3 → if a running product becomes 0, restart it at 1
 *
 * WHY THAT WORKS (the one trick)
 *   Zeros cut the array into pieces. Inside one piece (no zeros):
 *     - EVEN number of negatives → they cancel out: the whole piece is the best (a run from the LEFT)
 *     - ODD number of negatives  → one negative must be left out: either the FIRST one
 *       (best run ends at the RIGHT edge) or the LAST one (best run starts at the LEFT edge)
 *   So the answer always starts at the left edge or ends at the right edge of a piece,
 *   and scanning from both sides checks every one of those runs.
 *
 * COST
 *   Brute force          : O(n²) time (every start, extend right)
 *   Left + right (easy)  : O(n) time, O(1) space   ← easiest to remember
 *   Max + min (classic)  : O(n) time, O(1) space   ← the version most interviewers expect
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── BRUTE FORCE: O(n²) ── every start, extend right ──────────────────────────
function maxProductBrute(nums) {
  let best = -Infinity;                         // nothing seen yet
  for (let start = 0; start < nums.length; start++) {
    let product = 1;                            // product of nums[start..end]
    for (let end = start; end < nums.length; end++) {
      product *= nums[end];                     // grow the subarray one step to the right
      best = Math.max(best, product);           // remember the biggest
    }
  }
  return best;
}

// ── OPTIMAL (EASY): multiply from the left AND from the right, O(n) ──────────
function maxProduct(nums) {
  const n = nums.length;
  let fromLeft = 1;                             // STEP 1: running product, left → right
  let fromRight = 1;                            //         running product, right → left
  let best = -Infinity;                         //         biggest product seen so far

  for (let i = 0; i < n; i++) {
    fromLeft *= nums[i];                        // next number from the left
    fromRight *= nums[n - 1 - i];               // next number from the right

    best = Math.max(best, fromLeft, fromRight); // STEP 2: keep the biggest

    if (fromLeft === 0) fromLeft = 1;           // STEP 3: hit a 0 → restart (AFTER updating best,
    if (fromRight === 0) fromRight = 1;         //         so a lone 0 can still be the answer)
  }

  return best || 0;                             // -2 × 0 gives -0 in JS: turn it into a plain 0
}

// ── OPTIMAL (CLASSIC): keep the biggest AND smallest product ending here, O(n) ─
//    Same idea as Kadane, but no swap to remember: just pick from the three options.
function maxProductMinMax(nums) {
  let maxHere = nums[0];                        // biggest product of a subarray ENDING here
  let minHere = nums[0];                        // smallest (most negative) one ENDING here
  let best = nums[0];                           // biggest product anywhere

  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];

    const startFresh = num;                     // a) start again at this number (also handles a 0)
    const extendMax = maxHere * num;            // b) extend the biggest  (wins when num > 0)
    const extendMin = minHere * num;            // c) extend the smallest (wins when num < 0: − × − = +)

    maxHere = Math.max(startFresh, extendMax, extendMin);   // the new biggest
    minHere = Math.min(startFresh, extendMax, extendMin);   // the new smallest
    best = Math.max(best, maxHere);                         // remember the overall best
  }

  return best;
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY ITERATION of maxProduct for nums = [2, 3, -2, 4]
 *
 *   i | from left | fromLeft | from right | fromRight | best
 *   --|-----------|----------|------------|-----------|-----
 *   0 |     2     |    2     |      4     |     4     |  4
 *   1 |     3     |    6     |     -2     |    -8     |  6   ← [2, 3]
 *   2 |    -2     |   -12    |      3     |   -24     |  6
 *   3 |     4     |   -48    |      2     |   -48     |  6
 *
 *   Answer 6 ✅
 *
 * AND for nums = [-2, 0, -1]   (the 0 restarts both running products)
 *
 *   i | from left | fromLeft          | from right | fromRight         | best
 *   --|-----------|-------------------|------------|-------------------|-----
 *   0 |    -2     |  -2               |     -1     |  -1               | -1
 *   1 |     0     |   0 → restart at 1|      0     |   0 → restart at 1|  0
 *   2 |    -1     |  -1               |     -2     |  -2               |  0
 *
 *   Answer 0 ✅
 *
 * EVERY ITERATION of maxProductMinMax for nums = [-2, 3, -4]
 *   start: maxHere = -2, minHere = -2, best = -2
 *
 *   i | num | startFresh | maxHere × num | minHere × num | new maxHere | new minHere | best
 *   --|-----|------------|---------------|---------------|-------------|-------------|-----
 *   1 |  3  |     3      |      -6       |      -6       |      3      |     -6      |  3
 *   2 | -4  |    -4      |     -12       |      24       |     24      |    -12      | 24  ✅
 *
 *   Answer 24: the smallest product (-6) × a negative (-4) became the biggest.
 *
 * TRAPS
 *   1. Start best at -Infinity (or nums[0]), NOT 0: for [-3] the answer is -3.
 *   2. Update best BEFORE restarting after a 0, so [-2, 0, -1] correctly returns 0.
 *   3. Tracking only the max fails for [-2, 3, -4] (it would answer 3, not 24).
 *   4. In the classic version, compute BOTH products from the OLD maxHere / minHere
 *      (that's why extendMax and extendMin are saved first).
 *   5. JavaScript has a NEGATIVE ZERO: -2 × 0 = -0, which prints as "-0".
 *      `return best || 0` turns it into 0 (-0 is falsy, every other answer is unchanged).
 *
 * INTERVIEW LINE
 *   "Zeros split the array, and inside each piece the best product always starts at the left
 *    edge or ends at the right edge, because with an odd number of negatives I drop the first
 *    or the last one. So I multiply from both ends, restart after a zero and keep the maximum:
 *    O(n) time, O(1) space. The classic alternative keeps the max and min product ending at each
 *    index, because a negative number turns the smallest product into the largest."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(maxProduct([2, 3, -2, 4]));          // 6
console.log(maxProduct([-2, 3, -4]));            // 24
console.log(maxProduct([-2, 0, -1]));            // 0
console.log(maxProduct([-3]));                   // -3
console.log(maxProduct([2, -5, -2, -4, 3]));     // 24  → [-2, -4, 3]
console.log(maxProductMinMax([-2, 3, -4]));      // 24  (classic version, same answer)
console.log(maxProductBrute([-2, 3, -4]));       // 24  (brute force, same answer)
