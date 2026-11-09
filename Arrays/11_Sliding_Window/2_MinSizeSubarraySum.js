/**
 * Minimum Size Subarray Sum   (LeetCode 209 · the classic VARIABLE-size sliding window;
 *                               asked at Amazon, Meta, Google, Goldman Sachs)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   Given an array of POSITIVE integers nums and a positive integer target, return the
 *   minimal LENGTH of a contiguous subarray whose sum is GREATER THAN OR EQUAL to target.
 *   If there is no such subarray, return 0.
 *
 * EXAMPLES
 *   Input : target = 7,  nums = [2, 3, 1, 2, 4, 3]     → Output: 2   ([4, 3])
 *   Input : target = 4,  nums = [1, 4, 4]              → Output: 1   ([4])
 *   Input : target = 11, nums = [1, 1, 1, 1, 1, 1]     → Output: 0   (total is only 6)
 *
 * OUTPUT FORMAT
 *   A single number: the smallest window length, or 0.
 *
 * MEMORY: "GROW the right until it's enough, then SHRINK the left while it stays enough."
 *   STEP 1 → GROW: move `right` forward, adding nums[right] to the window sum
 *   STEP 2 → SHRINK: while sum >= target, record the length, then remove nums[left] and left++
 *
 * WHY IT WORKS (and why the numbers must be POSITIVE)
 *   With positive numbers, adding makes the sum bigger and removing makes it smaller, so you
 *   always know which way to move. Each element enters once and leaves once → O(n).
 *   With negatives this breaks; use prefix sums (see 09_Prefix_Sum) instead.
 *
 * COST
 *   Brute force   : every start, extend until >= target → O(n²)
 *   Sliding window: O(n) time, O(1) space
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── BRUTE FORCE: O(n²) ────────────────────────────────────────────────────────
function minSubArrayLenBrute(target, nums) {
  let best = Infinity;
  for (let i = 0; i < nums.length; i++) {         // every start
    let sum = 0;
    for (let j = i; j < nums.length; j++) {       // extend right
      sum += nums[j];
      if (sum >= target) {                        // enough → this start can't do better
        best = Math.min(best, j - i + 1);
        break;
      }
    }
  }
  return best === Infinity ? 0 : best;
}

// ── OPTIMAL: variable sliding window, O(n) ───────────────────────────────────
function minSubArrayLen(target, nums) {
  let left = 0;                                   // window = nums[left .. right]
  let sum = 0;                                    // sum of the current window
  let best = Infinity;                            // smallest length found (Infinity = none yet)

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];                           // STEP 1: GROW the window to the right

    while (sum >= target) {                       // STEP 2: enough → try to SHRINK
      best = Math.min(best, right - left + 1);    //   record this window's length
      sum -= nums[left];                          //   remove the leftmost element
      left++;
    }
  }

  return best === Infinity ? 0 : best;            // never reached the target → 0
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY ITERATION for target = 7, nums = [2, 3, 1, 2, 4, 3]
 *   index:  0  1  2  3  4  5
 *   nums :  2  3  1  2  4  3
 *
 *   right | add | sum | sum >= 7 ? → shrink                                   | best
 *   ------|-----|-----|--------------------------------------------------------|-----
 *     0   |  2  |  2  | no                                                     |  ∞
 *     1   |  3  |  5  | no                                                     |  ∞
 *     2   |  1  |  6  | no                                                     |  ∞
 *     3   |  2  |  8  | yes: [2,3,1,2] len 4 → remove 2 → sum 6, left = 1     |  4
 *     4   |  4  | 10  | yes: [3,1,2,4] len 4 → remove 3 → sum 7, left = 2     |  4
 *         |     |     | yes: [1,2,4]   len 3 → remove 1 → sum 6, left = 3     |  3
 *     5   |  3  |  9  | yes: [2,4,3]   len 3 → remove 2 → sum 7, left = 4     |  3
 *         |     |     | yes: [4,3]     len 2 → remove 4 → sum 3, left = 5     |  2  ✅
 *
 *   Answer 2 → [4, 3]
 *
 * TRAPS
 *   1. Use WHILE (not if) for shrinking: one new element can allow several shrinks (right = 4 and 5).
 *   2. Record the length BEFORE removing nums[left].
 *   3. Length is right - left + 1 (both ends included).
 *   4. Return 0 when nothing was found (best stayed Infinity).
 *   5. Only for POSITIVE numbers (see WHY above).
 *
 * INTERVIEW LINE
 *   "Variable sliding window: extend the right end until the sum reaches the target, then shrink
 *    from the left as long as it still does, recording the length each time. Each element is
 *    added and removed at most once, so it's O(n) time and O(1) space. It relies on all numbers
 *    being positive."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]));       // 2
console.log(minSubArrayLen(4, [1, 4, 4]));                // 1
console.log(minSubArrayLen(11, [1, 1, 1, 1, 1, 1]));      // 0
console.log(minSubArrayLen(15, [1, 2, 3, 4, 5]));         // 5 (needs the whole array)
console.log(minSubArrayLenBrute(7, [2, 3, 1, 2, 4, 3]));  // 2 (brute force, same answer)
