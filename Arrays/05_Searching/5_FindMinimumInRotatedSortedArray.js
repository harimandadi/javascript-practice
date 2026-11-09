/**
 * Find Minimum in Rotated Sorted Array   (LeetCode 153 · asked at Amazon, Microsoft, Meta, Bloomberg)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   A sorted array of DISTINCT numbers was rotated at an unknown point,
 *   e.g. [0, 1, 2, 4, 5, 6, 7] → [4, 5, 6, 7, 0, 1, 2]. Return the MINIMUM element in O(log n).
 *   (The minimum is exactly where the rotation happened: the "drop".)
 *
 * EXAMPLES
 *   Input : [3, 4, 5, 1, 2]          → Output: 1
 *   Input : [4, 5, 6, 7, 0, 1, 2]    → Output: 0
 *   Input : [11, 13, 15, 17]         → Output: 11   (not rotated, or rotated a full circle)
 *
 * OUTPUT FORMAT
 *   A single number: the smallest value.
 *
 * MEMORY: "Compare MID with the RIGHT end: bigger → the drop is to the right."
 *   STEP 1 → mid between low and high
 *   STEP 2 → nums[mid] > nums[high]  → the drop (minimum) is RIGHT of mid → low = mid + 1
 *            otherwise                → mid..high is sorted, the min is mid or LEFT → high = mid
 *            stop when low === high: that's the minimum
 *
 * WHY COMPARE WITH THE RIGHT END (not the left)?
 *   nums[mid] > nums[high] can only happen if the drop is between them. Comparing with the left
 *   end fails for an array that isn't rotated ([1, 2, 3]: nums[low] <= nums[mid] doesn't tell
 *   you which side the minimum is on).
 *
 * COST
 *   Brute force: Math.min(...nums) or a loop → O(n)
 *   Optimal    : binary search → O(log n) time, O(1) space
 *   (Related: 4_SearchInRotatedSortedArray.js finds a TARGET in the same kind of array.)
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── BRUTE FORCE: O(n) ─────────────────────────────────────────────────────────
function findMinBrute(nums) {
  return Math.min(...nums);                       // checks every element
}

// ── OPTIMAL: binary search on the drop, O(log n) ─────────────────────────────
function findMin(nums) {
  let low = 0;
  let high = nums.length - 1;

  while (low < high) {                            // stop when one element is left (low === high)
    const mid = Math.floor((low + high) / 2);     // STEP 1

    if (nums[mid] > nums[high]) {                 // STEP 2: mid is BEFORE the drop
      low = mid + 1;                              //   → the minimum is to the right of mid
    } else {                                      //   mid..high is sorted (no drop there)
      high = mid;                                 //   → the minimum is mid itself or to its left
    }                                             //     (keep mid: it might BE the minimum)
  }

  return nums[low];                               // low === high → the minimum
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY ITERATION for [4, 5, 6, 7, 0, 1, 2]
 *   index:  0  1  2  3  4  5  6
 *   nums :  4  5  6  7  0  1  2
 *
 *   step | low | high | mid (value) | nums[mid] > nums[high]? | next
 *   -----|-----|------|-------------|--------------------------|-----------
 *    1   |  0  |  6   |  3 (7)      | 7 > 2  yes               | low = 4
 *    2   |  4  |  6   |  5 (1)      | 1 > 2  no                | high = 5
 *    3   |  4  |  5   |  4 (0)      | 0 > 1  no                | high = 4
 *   low = high = 4 → nums[4] = 0  ✅
 *
 * PICTURE of step 1:
 *   [ 4  5  6  7 | 0  1  2 ]
 *              ↑mid      ↑high      7 > 2 → the drop is between them → go right
 *
 * TRAPS
 *   1. high = mid (NOT mid - 1) in the else branch: mid could be the minimum itself.
 *   2. Loop while low < high (NOT <=): with high = mid, <= would loop forever when low === high.
 *   3. Compare with nums[high], not nums[low] (see WHY above).
 *   4. Distinct values only; with duplicates (LeetCode 154), nums[mid] === nums[high] can't
 *      decide, so you do high-- and the worst case becomes O(n).
 *
 * INTERVIEW LINE
 *   "The minimum is where the sorted order drops. If nums[mid] is bigger than nums[high], the
 *    drop is to the right, so low = mid + 1; otherwise mid..high is sorted and the minimum is at
 *    mid or before it, so high = mid. When low meets high, that's the minimum. O(log n)."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(findMin([3, 4, 5, 1, 2]));          // 1
console.log(findMin([4, 5, 6, 7, 0, 1, 2]));    // 0
console.log(findMin([11, 13, 15, 17]));         // 11 (not rotated)
console.log(findMin([2, 1]));                   // 1
console.log(findMinBrute([4, 5, 6, 7, 0, 1, 2])); // 0 (brute force, same answer)
