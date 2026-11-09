/**
 * Search in Rotated Sorted Array   (LeetCode 33 · asked at Amazon, Microsoft, Google, Meta, LinkedIn)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   A sorted array of DISTINCT numbers was rotated at some unknown point:
 *   [0, 1, 2, 4, 5, 6, 7] → [4, 5, 6, 7, 0, 1, 2]  (the part from 4 moved to the front)
 *   Given the rotated array nums and a target, return the INDEX of target, or -1 if it's
 *   not there. Rule: O(log n), so a plain loop over every element is not enough.
 *
 * EXAMPLES
 *   Input : nums = [4, 5, 6, 7, 0, 1, 2], target = 0
 *   Output: 4
 *
 *   Input : nums = [4, 5, 6, 7, 0, 1, 2], target = 3
 *   Output: -1
 *
 *   Input : nums = [1], target = 1
 *   Output: 0
 *
 * OUTPUT FORMAT
 *   A single number: the index of target, or -1.
 *
 * MEMORY: "One half is ALWAYS sorted: check if the target is in THAT half."
 *   STEP 1 → find mid; if nums[mid] is the target, done
 *   STEP 2 → find the SORTED half (left half if nums[low] <= nums[mid], else the right half);
 *            target inside the sorted half's range? → search there, otherwise the other half
 *
 * WHY ONE HALF IS ALWAYS SORTED
 *   The rotation point (where 7 drops to 0) can be in only ONE half, so the other half has
 *   no drop and is normally sorted. In a sorted half we can check "is target between its
 *   ends?" with two comparisons, exactly like normal binary search.
 *
 * COST
 *   Brute force: O(n) (check every element: indexOf)
 *   Optimal    : O(log n) time, O(1) space (halve the range every step)
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── BRUTE FORCE: O(n) ── ignores that the array is (almost) sorted ───────────
function searchBrute(nums, target) {
  return nums.indexOf(target);                          // checks every element
}

// ── OPTIMAL: modified binary search, O(log n) ────────────────────────────────
function search(nums, target) {
  let low = 0;
  let high = nums.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);           // STEP 1: middle of the range
    if (nums[mid] === target) return mid;               //   found it

    // STEP 2: which half is sorted?
    if (nums[low] <= nums[mid]) {                       // LEFT half [low..mid] is sorted
      if (nums[low] <= target && target < nums[mid]) {  //   target inside the left half's range?
        high = mid - 1;                                 //   → search left
      } else {
        low = mid + 1;                                  //   → otherwise it can only be on the right
      }
    } else {                                            // RIGHT half [mid..high] is sorted
      if (nums[mid] < target && target <= nums[high]) { //   target inside the right half's range?
        low = mid + 1;                                  //   → search right
      } else {
        high = mid - 1;                                 //   → otherwise it can only be on the left
      }
    }
  }

  return -1;                                            // range is empty → not found
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY ITERATION for nums = [4, 5, 6, 7, 0, 1, 2], target = 0
 *   index:  0  1  2  3  4  5  6
 *   nums :  4  5  6  7  0  1  2
 *
 *   step | low | high | mid (value) | sorted half        | target in it?        | next
 *   -----|-----|------|-------------|--------------------|----------------------|------------
 *    1   |  0  |  6   |  3 (7)      | left  [4..7]       | 4 <= 0 < 7?  no      | low = 4
 *    2   |  4  |  6   |  5 (1)      | left  [0..1]       | 0 <= 0 < 1?  yes     | high = 4
 *    3   |  4  |  4   |  4 (0)      | nums[mid] = 0 = target → return 4  ✅
 *
 *   3 steps for 7 elements (log₂ 7 ≈ 3). A plain loop could need 7.
 *
 * PICTURE of step 1:
 *     [ 4  5  6  7 ] [ 0  1  2 ]
 *       └─ sorted ─┘   └─ has the drop ┘
 *     0 is not between 4 and 7 → it must be in the other half
 *
 * TRAPS
 *   1. Use <= in nums[low] <= nums[mid]: when low === mid (two elements left), the left
 *      "half" is a single element, which counts as sorted.
 *   2. Range checks: in the LEFT half use  nums[low] <= target < nums[mid];
 *      in the RIGHT half use               nums[mid] < target <= nums[high].
 *      (mid itself was already checked, so it's excluded with < .)
 *   3. Assumes DISTINCT values. With duplicates (LeetCode 81) nums[low] === nums[mid] can't
 *      tell which half is sorted, and the worst case becomes O(n).
 *
 * INTERVIEW LINE
 *   "After a rotation, one half around mid is always sorted. I find that half by comparing
 *    nums[low] with nums[mid], check whether the target lies within its ends, and keep only the
 *    half that can contain it. That's still halving each step: O(log n) time, O(1) space."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(search([4, 5, 6, 7, 0, 1, 2], 0));   // 4
console.log(search([4, 5, 6, 7, 0, 1, 2], 3));   // -1
console.log(search([1], 1));                     // 0
console.log(search([6, 7, 1, 2, 3, 4, 5], 7));   // 1 (rotation point near the front)
console.log(search([1, 2, 3, 4, 5], 4));         // 3 (not rotated: still works)
console.log(searchBrute([4, 5, 6, 7, 0, 1, 2], 0)); // 4 (brute force, same answer)
