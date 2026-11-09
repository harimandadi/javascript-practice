/**
 * Merge Sorted Array   (LeetCode 88 · asked at Microsoft, Amazon, Meta, Apple, Bloomberg)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   You get two arrays sorted in increasing order, nums1 and nums2, and two numbers m and n:
 *   - nums1 has length m + n: its first m values are real, the last n are 0 placeholders
 *   - nums2 has n values
 *   Merge nums2 INTO nums1 (in place, don't return a new array) so nums1 is fully sorted.
 *
 * EXAMPLES
 *   Input : nums1 = [1, 2, 3, 0, 0, 0], m = 3,  nums2 = [2, 5, 6], n = 3
 *   Output: nums1 = [1, 2, 2, 3, 5, 6]
 *
 *   Input : nums1 = [0], m = 0,  nums2 = [1], n = 1
 *   Output: nums1 = [1]
 *
 * OUTPUT FORMAT
 *   Nothing is returned; nums1 itself is changed to hold all m + n values in sorted order.
 *   (This file also returns nums1 so console.log can show it.)
 *
 * MEMORY: "Fill from the BACK with the BIGGER one."
 *   STEP 1 → three pointers at the ENDS: i = last real value of nums1, j = last of nums2,
 *            write = last slot of nums1
 *   STEP 2 → put the BIGGER of nums1[i] and nums2[j] at `write`, move that pointer and `write`
 *            left; repeat until nums2 is used up
 *
 * WHY FROM THE BACK?
 *   The empty space (the 0 placeholders) is at the END of nums1. Filling from the back writes
 *   into empty slots first, so no real value of nums1 is overwritten before it's used.
 *   Filling from the front would overwrite nums1's values and force shifting: O(m·n).
 *
 * COST
 *   Simple way: copy nums2 into the end, then sort → O((m+n) log(m+n))
 *   Optimal   : three pointers from the back → O(m + n) time, O(1) space
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── SIMPLE WAY: copy then sort ─────────────────────────────────────────────────
function mergeSimple(nums1, m, nums2, n) {
  for (let k = 0; k < n; k++) nums1[m + k] = nums2[k];  // put nums2 into the placeholder slots
  nums1.sort((a, b) => a - b);                          // numeric sort (plain .sort() compares as text)
  return nums1;
}

// ── OPTIMAL: three pointers from the back, O(m + n) ──────────────────────────
function merge(nums1, m, nums2, n) {
  let i = m - 1;                    // STEP 1: last REAL value in nums1
  let j = n - 1;                    //         last value in nums2
  let write = m + n - 1;            //         last slot of nums1 (where the biggest goes)

  while (j >= 0) {                  // STEP 2: until every value of nums2 is placed
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[write] = nums1[i];      // nums1's value is bigger → move it to the back
      i--;
    } else {
      nums1[write] = nums2[j];      // nums2's value is bigger (or nums1 is used up)
      j--;
    }
    write--;                        // next slot to the left
  }
  // If nums2 runs out first, nums1's remaining values are already in the right place.

  return nums1;
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY ITERATION for nums1 = [1, 2, 3, 0, 0, 0], m = 3, nums2 = [2, 5, 6], n = 3
 *
 *   step | i (nums1[i]) | j (nums2[j]) | bigger      | write | nums1 after
 *   -----|--------------|--------------|-------------|-------|---------------------
 *    1   |  2 (3)       |  2 (6)       | 6 (nums2)   |   5   | [1, 2, 3, 0, 0, 6]
 *    2   |  2 (3)       |  1 (5)       | 5 (nums2)   |   4   | [1, 2, 3, 0, 5, 6]
 *    3   |  2 (3)       |  0 (2)       | 3 (nums1)   |   3   | [1, 2, 3, 3, 5, 6]
 *    4   |  1 (2)       |  0 (2)       | 2 (nums2)*  |   2   | [1, 2, 2, 3, 5, 6]
 *   j = -1 → nums2 is used up → stop
 *
 *   * equal values: nums1[i] > nums2[j] is false, so nums2's 2 is taken; either is fine.
 *   Answer [1, 2, 2, 3, 5, 6]  ✅  (4 steps; nums1's leading 1, 2 never had to move)
 *
 * PICTURE of step 1:
 *   nums1: [ 1  2  3 | 0  0  0 ]      nums2: [ 2  5  6 ]
 *                  ↑i          ↑write                 ↑j
 *   6 > 3 → write 6 at the back
 *
 * TRAPS
 *   1. Loop while j >= 0 (nums2 has values left), NOT while i >= 0: if nums1 runs out first,
 *      the rest of nums2 still has to be copied.
 *   2. Check i >= 0 before reading nums1[i]: when m = 0, i starts at -1.
 *   3. Plain nums1.sort() compares as text ([10, 9] → [10, 9]); always pass (a, b) => a - b.
 *   4. The problem wants nums1 changed IN PLACE; returning a new array is a wrong answer
 *      on LeetCode.
 *
 * INTERVIEW LINE
 *   "Both arrays are sorted and nums1 has free space at the end, so I fill from the back:
 *    compare the last values, put the bigger one in the last free slot, and move left.
 *    No value is overwritten before it's used. O(m + n) time, O(1) extra space."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3));   // [ 1, 2, 2, 3, 5, 6 ]
console.log(merge([0], 0, [1], 1));                        // [ 1 ]  (nums1 empty: i starts at -1)
console.log(merge([1], 1, [], 0));                         // [ 1 ]  (nums2 empty: nothing to do)
console.log(merge([4, 5, 6, 0, 0, 0], 3, [1, 2, 3], 3));   // [ 1, 2, 3, 4, 5, 6 ]  (all of nums2 is smaller)
console.log(mergeSimple([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3)); // same answer (simple way)
