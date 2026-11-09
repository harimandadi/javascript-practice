/**
 * Sort Colors: 0s, 1s and 2s (Dutch National Flag)   (LeetCode 75 · Microsoft, Amazon, Adobe, Meta)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   An array nums contains only 0, 1 and 2 (red, white, blue). Sort it IN PLACE so all 0s come
 *   first, then 1s, then 2s. Rules: no library sort, ONE pass, O(1) extra space.
 *
 * EXAMPLES
 *   Input : [2, 0, 2, 1, 1, 0]
 *   Output: [0, 0, 1, 1, 2, 2]
 *
 *   Input : [2, 0, 1]
 *   Output: [0, 1, 2]
 *
 * OUTPUT FORMAT
 *   The same array, changed in place (this file also returns it for console.log).
 *
 * MEMORY: "0 goes LEFT, 2 goes RIGHT, 1 stays in the MIDDLE."
 *   STEP 1 → three pointers: low (next spot for a 0), mid (current), high (next spot for a 2)
 *   STEP 2 → look at nums[mid]:
 *            0 → swap with low,  low++ and mid++
 *            1 → already in the middle, mid++
 *            2 → swap with high, high--   (DON'T move mid: the swapped-in value is unchecked)
 *
 * THE THREE ZONES while it runs:
 *   [ 0 0 0 | 1 1 1 | ? ? ? ? | 2 2 2 ]
 *     0..low-1  low..mid-1  mid..high  high+1..end
 *
 * COST
 *   Simple way: count the 0s, 1s and 2s, then rewrite → O(n), but TWO passes
 *   Optimal   : Dutch flag → O(n), ONE pass, O(1) space
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── SIMPLE WAY: counting, two passes ─────────────────────────────────────────
function sortColorsCount(nums) {
  const count = [0, 0, 0];
  for (const x of nums) count[x]++;                 // pass 1: how many 0s, 1s, 2s
  let i = 0;
  for (let color = 0; color <= 2; color++) {        // pass 2: rewrite in order
    for (let c = 0; c < count[color]; c++) nums[i++] = color;
  }
  return nums;
}

// ── OPTIMAL: Dutch National Flag, one pass ───────────────────────────────────
function sortColors(nums) {
  let low = 0;                                      // STEP 1: next position for a 0
  let mid = 0;                                      //         the element being checked
  let high = nums.length - 1;                       //         next position for a 2

  while (mid <= high) {                             // until every element is checked
    if (nums[mid] === 0) {                          // STEP 2: a 0 → send it LEFT
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;                                        //   the value swapped in from low is a 1 (already checked)
    } else if (nums[mid] === 1) {                   //   a 1 → leave it in the middle
      mid++;
    } else {                                        //   a 2 → send it RIGHT
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;                                       //   mid stays: the value swapped in is NOT checked yet
    }
  }
  return nums;
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY ITERATION for [2, 0, 2, 1, 1, 0]
 *
 *   step | low | mid | high | nums[mid] | action                      | array after
 *   -----|-----|-----|------|-----------|-----------------------------|---------------------
 *    1   |  0  |  0  |  5   |     2     | swap mid↔high, high--       | [0, 0, 2, 1, 1, 2]
 *    2   |  0  |  0  |  4   |     0     | swap low↔mid, low++, mid++  | [0, 0, 2, 1, 1, 2]
 *    3   |  1  |  1  |  4   |     0     | swap low↔mid, low++, mid++  | [0, 0, 2, 1, 1, 2]
 *    4   |  2  |  2  |  4   |     2     | swap mid↔high, high--       | [0, 0, 1, 1, 2, 2]
 *    5   |  2  |  2  |  3   |     1     | mid++                       | [0, 0, 1, 1, 2, 2]
 *    6   |  2  |  3  |  3   |     1     | mid++                       | [0, 0, 1, 1, 2, 2]
 *   mid = 4 > high = 3 → stop
 *
 *   Answer [0, 0, 1, 1, 2, 2]  ✅  (6 steps, one pass)
 *
 * TRAPS
 *   1. After swapping a 2 to the right, do NOT increase mid: the value that came from high
 *      hasn't been checked yet (it could be a 0 or a 2).
 *   2. Loop while mid <= high (not mid < high): the element at high still needs checking.
 *   3. After swapping a 0 to the left you CAN increase mid: everything between low and mid
 *      is a 1 that was already checked.
 *
 * INTERVIEW LINE
 *   "Three pointers keep three zones: 0s before low, 1s between low and mid, 2s after high.
 *    A 0 is swapped to low, a 2 to high, a 1 is left alone. One pass, in place, O(n) time and
 *    O(1) space. The counting version is also O(n) but needs two passes."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(sortColors([2, 0, 2, 1, 1, 0]));        // [ 0, 0, 1, 1, 2, 2 ]
console.log(sortColors([2, 0, 1]));                 // [ 0, 1, 2 ]
console.log(sortColors([1]));                       // [ 1 ]
console.log(sortColors([2, 2, 0, 0]));              // [ 0, 0, 2, 2 ]
console.log(sortColorsCount([2, 0, 2, 1, 1, 0]));   // [ 0, 0, 1, 1, 2, 2 ] (counting version)
