/**
 * Next Permutation   (LeetCode 31 · asked at Google, Amazon, Microsoft, Adobe, Uber)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   Rearrange nums into the NEXT larger arrangement in dictionary (lexicographic) order.
 *   If it's already the largest arrangement, wrap around to the smallest (sorted ascending).
 *   Do it in place with O(1) extra space.
 *
 *   All arrangements of [1, 2, 3] in order:
 *   [1,2,3] → [1,3,2] → [2,1,3] → [2,3,1] → [3,1,2] → [3,2,1] → (wraps to) [1,2,3]
 *
 * EXAMPLES
 *   Input : [1, 2, 3]          → Output: [1, 3, 2]
 *   Input : [3, 2, 1]          → Output: [1, 2, 3]     (largest → wrap around)
 *   Input : [1, 1, 5]          → Output: [1, 5, 1]
 *   Input : [1, 3, 5, 4, 2]    → Output: [1, 4, 2, 3, 5]
 *
 * OUTPUT FORMAT
 *   The same array, changed in place (this file also returns it for console.log).
 *
 * MEMORY: "Find the DIP, SWAP with the next bigger, REVERSE the tail."
 *   STEP 1 → from the right, find the first index i with nums[i] < nums[i + 1] (the DIP).
 *            Everything right of i is decreasing (already its largest arrangement).
 *   STEP 2 → from the right, find the first nums[j] > nums[i]; SWAP them;
 *            then REVERSE everything right of i (decreasing → increasing = smallest tail)
 *            (no dip at all → the whole array is decreasing → just reverse it all)
 *
 * WHY
 *   To get the very next arrangement, change the RIGHTMOST position that can still grow (i),
 *   grow it by the SMALLEST possible amount (the next bigger value from the tail), and make the
 *   rest as SMALL as possible (sorted ascending, which for a decreasing tail is a reverse).
 *
 * COST
 *   Brute force: list every permutation, sort them, find the next → O(n! · n)
 *   Optimal    : O(n) time, O(1) space
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── helper: reverse nums[start..end] in place (two pointers) ─────────────────
function reverse(nums, start, end) {
  while (start < end) {
    [nums[start], nums[end]] = [nums[end], nums[start]];
    start++;
    end--;
  }
}

function nextPermutation(nums) {
  // STEP 1: find the DIP from the right
  let i = nums.length - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) {      // still decreasing (or equal) → keep going left
    i--;
  }

  // STEP 2: swap with the next bigger value, then reverse the tail
  if (i >= 0) {                                   // a dip exists
    let j = nums.length - 1;
    while (nums[j] <= nums[i]) {                  // rightmost value that is BIGGER than nums[i]
      j--;
    }
    [nums[i], nums[j]] = [nums[j], nums[i]];      // grow position i by the smallest amount
  }
  reverse(nums, i + 1, nums.length - 1);          // tail: decreasing → increasing (smallest)
                                                  // (i = -1 → reverses the whole array: wrap-around)
  return nums;
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY STEP for [1, 3, 5, 4, 2]
 *   index:  0  1  2  3  4
 *   nums :  1  3  5  4  2
 *
 * STEP 1: find the dip (from the right)
 *   i | nums[i] >= nums[i+1] ?   | result
 *   --|---------------------------|---------------
 *   3 | 4 >= 2  yes → keep going  |
 *   2 | 5 >= 4  yes → keep going  |
 *   1 | 3 >= 5  no                | dip at i = 1 (value 3); tail [5, 4, 2] is decreasing
 *
 * STEP 2a: rightmost value bigger than 3
 *   j = 4: 2 > 3? no   ·   j = 3: 4 > 3? yes → j = 3
 *   swap nums[1] ↔ nums[3] → [1, 4, 5, 3, 2]
 *
 * STEP 2b: reverse the tail after i = 1
 *   [5, 3, 2] → [2, 3, 5]  → [1, 4, 2, 3, 5]  ✅
 *
 * PICTURE:
 *   [1, 3 | 5, 4, 2]   dip = 3, tail is decreasing (can't grow on its own)
 *   [1, 4 | 5, 3, 2]   swap 3 with 4 (the smallest value in the tail that is bigger than 3)
 *   [1, 4 | 2, 3, 5]   reverse the tail → smallest possible tail
 *
 * TRAPS
 *   1. Use >= (not >) in STEP 1 and <= in the j search, so DUPLICATES work: [1, 1, 5] → [1, 5, 1].
 *   2. Reverse the tail; don't sort it. It's already decreasing, so reversing is O(n) instead of
 *      O(n log n), and still correct.
 *   3. No dip (i = -1) means the largest arrangement: reverse(i + 1 = 0, end) wraps around to the
 *      smallest without any special case.
 *
 * INTERVIEW LINE
 *   "From the right I find the first position that's smaller than its neighbour; everything after
 *    it is decreasing. I swap it with the smallest larger value in that tail, then reverse the tail
 *    to make it as small as possible. If there's no such position, I reverse the whole array.
 *    O(n) time, O(1) space."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(nextPermutation([1, 2, 3]));         // [ 1, 3, 2 ]
console.log(nextPermutation([3, 2, 1]));         // [ 1, 2, 3 ]
console.log(nextPermutation([1, 1, 5]));         // [ 1, 5, 1 ]
console.log(nextPermutation([1, 3, 5, 4, 2]));   // [ 1, 4, 2, 3, 5 ]
console.log(nextPermutation([1]));               // [ 1 ]
