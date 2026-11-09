/**
 * Jump Game   (LeetCode 55 · asked at Amazon, Microsoft, Google, Adobe, Flipkart)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   You start at index 0. nums[i] is the MAXIMUM jump length from index i (you may jump fewer).
 *   Return true if you can reach the LAST index, otherwise false.
 *
 * EXAMPLES
 *   Input : [2, 3, 1, 1, 4]    → Output: true    (0 → 1 → 4)
 *   Input : [3, 2, 1, 0, 4]    → Output: false   (every route lands on index 3, whose jump is 0)
 *   Input : [0]                → Output: true    (already at the last index)
 *
 * OUTPUT FORMAT
 *   true or false.
 *
 * MEMORY: "Track the FARTHEST you can reach; if you ever stand beyond it, you're stuck."
 *   STEP 1 → farthest = 0 (the farthest index reachable so far)
 *   STEP 2 → walk i = 0, 1, 2, ...:
 *            i > farthest → this index can't be reached → false
 *            otherwise    → farthest = max(farthest, i + nums[i]);
 *                           farthest >= last index → true
 *
 * WHY GREEDY WORKS
 *   You never need to know WHICH jumps you take, only how far you could get. If index i is
 *   reachable, every index before it is reachable too (you can always jump shorter), so one
 *   "farthest reach" number describes everything.
 *
 * COST
 *   Brute force (try every jump, recursion): exponential
 *   DP (reachable[i] for each i)           : O(n²) time, O(n) space
 *   Greedy                                  : O(n) time, O(1) space
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── DP: mark every reachable index, O(n²) ────────────────────────────────────
function canJumpDP(nums) {
  const reachable = new Array(nums.length).fill(false);
  reachable[0] = true;                                       // we start here
  for (let i = 0; i < nums.length; i++) {
    if (!reachable[i]) continue;                             // can't stand here → skip
    for (let step = 1; step <= nums[i] && i + step < nums.length; step++) {
      reachable[i + step] = true;                            // every jump length from i
    }
  }
  return reachable[nums.length - 1];
}

// ── OPTIMAL: greedy farthest reach, O(n) ─────────────────────────────────────
function canJump(nums) {
  let farthest = 0;                                          // STEP 1
  const last = nums.length - 1;

  for (let i = 0; i < nums.length; i++) {                    // STEP 2
    if (i > farthest) return false;                          // can't even reach index i → stuck
    farthest = Math.max(farthest, i + nums[i]);              // best reach using index i
    if (farthest >= last) return true;                       // the end is within reach
  }
  return true;                                               // (only reached for an empty array)
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY ITERATION for [2, 3, 1, 1, 4]   (last index = 4)
 *   i | nums[i] | i > farthest? | farthest = max(farthest, i + nums[i]) | >= 4 ?
 *   --|---------|---------------|-----------------------------------------|-------
 *   0 |    2    | 0 > 0  no     | max(0, 0 + 2) = 2                       | no
 *   1 |    3    | 1 > 2  no     | max(2, 1 + 3) = 4                       | yes → true  ✅
 *
 * AND for [3, 2, 1, 0, 4]   (last index = 4)
 *   i | nums[i] | i > farthest? | farthest                                | >= 4 ?
 *   --|---------|---------------|-----------------------------------------|-------
 *   0 |    3    | no            | max(0, 3) = 3                           | no
 *   1 |    2    | no            | max(3, 3) = 3                           | no
 *   2 |    1    | no            | max(3, 3) = 3                           | no
 *   3 |    0    | no            | max(3, 3) = 3                           | no
 *   4 |    4    | 4 > 3  YES    | → false  ✅  (index 4 can never be reached)
 *
 * PICTURE of the second example (the 0 is a wall):
 *   index:  0  1  2  3  4
 *   nums :  3  2  1  0  4
 *           └─────────┘        every route ends on index 3, which jumps 0
 *
 * TRAPS
 *   1. Check i > farthest BEFORE updating farthest; otherwise an unreachable index could "help".
 *   2. Compare with the LAST INDEX (nums.length - 1), not nums.length.
 *   3. A 1-element array is already at the end → true.
 *   4. Follow-up "Jump Game II" (minimum number of jumps) is also greedy: count how many times
 *      you must extend the current reach (a BFS by levels).
 *
 * INTERVIEW LINE
 *   "I keep the farthest index reachable so far. Walking left to right, if I'm ever at an index
 *    beyond that, it's unreachable and I return false; otherwise I extend the reach with
 *    i + nums[i], and return true once it covers the last index. One pass, O(n) time, O(1) space.
 *    Greedy is enough because reachable indexes always form one continuous range from 0."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(canJump([2, 3, 1, 1, 4]));    // true
console.log(canJump([3, 2, 1, 0, 4]));    // false
console.log(canJump([0]));                // true
console.log(canJump([2, 0, 0]));          // true
console.log(canJumpDP([3, 2, 1, 0, 4]));  // false (DP version, same answer)
