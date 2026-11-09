/**
 * Find First and Last Position of an Element in a Sorted Array
 * (LeetCode 34 · asked at Meta, Amazon, Microsoft, LinkedIn, Uber)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   Given an array nums sorted in increasing order (duplicates allowed) and a target, return
 *   [first index, last index] of target, or [-1, -1] if it isn't there. Rule: O(log n).
 *
 * EXAMPLES
 *   Input : nums = [5, 7, 7, 8, 8, 10], target = 8   → Output: [3, 4]
 *   Input : nums = [5, 7, 7, 8, 8, 10], target = 6   → Output: [-1, -1]
 *   Input : nums = [],                  target = 0   → Output: [-1, -1]
 *
 * OUTPUT FORMAT
 *   An array of two numbers: [first, last], or [-1, -1].
 *
 * MEMORY: "Found it? Remember it, and KEEP SEARCHING toward the edge."
 *   STEP 1 → binary search for the FIRST: when nums[mid] === target, save mid and go LEFT
 *   STEP 2 → binary search for the LAST : when nums[mid] === target, save mid and go RIGHT
 *   (normal binary search stops at the first match it hits, which can be ANY copy)
 *
 * COST
 *   Linear scan    : O(n) (indexOf + lastIndexOf)
 *   Binary search, then walk left/right: O(n) worst case (e.g. all elements equal)
 *   Two bounded binary searches: O(log n) time, O(1) space
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── BRUTE FORCE: O(n) ─────────────────────────────────────────────────────────
function searchRangeBrute(nums, target) {
  return [nums.indexOf(target), nums.lastIndexOf(target)];   // both scan the array
}

// ── One binary search that keeps going toward the left or right edge ─────────
function findBound(nums, target, findFirst) {
  let low = 0;
  let high = nums.length - 1;
  let found = -1;                                 // last matching index seen

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (nums[mid] === target) {
      found = mid;                                // a match: remember it...
      if (findFirst) high = mid - 1;              // ...first copy: keep looking LEFT
      else low = mid + 1;                         // ...last copy : keep looking RIGHT
    } else if (nums[mid] < target) {
      low = mid + 1;                              // target is to the right
    } else {
      high = mid - 1;                             // target is to the left
    }
  }
  return found;
}

// ── OPTIMAL: two binary searches, O(log n) ────────────────────────────────────
function searchRange(nums, target) {
  const first = findBound(nums, target, true);    // STEP 1: leftmost copy
  if (first === -1) return [-1, -1];              //   not there at all → skip the second search
  const last = findBound(nums, target, false);    // STEP 2: rightmost copy
  return [first, last];
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY ITERATION for nums = [5, 7, 7, 8, 8, 10], target = 8
 *   index:  0  1  2  3  4  5
 *   nums :  5  7  7  8  8  10
 *
 * STEP 1: FIRST (on a match, go LEFT)
 *   low | high | mid (value) | compare     | found | next
 *   ----|------|-------------|-------------|-------|------------
 *    0  |  5   |  2 (7)      | 7 < 8       |  -1   | low = 3
 *    3  |  5   |  4 (8)      | match       |   4   | high = 3  (keep looking left)
 *    3  |  3   |  3 (8)      | match       |   3   | high = 2
 *   low > high → first = 3
 *
 * STEP 2: LAST (on a match, go RIGHT)
 *   low | high | mid (value) | compare     | found | next
 *   ----|------|-------------|-------------|-------|------------
 *    0  |  5   |  2 (7)      | 7 < 8       |  -1   | low = 3
 *    3  |  5   |  4 (8)      | match       |   4   | low = 5   (keep looking right)
 *    5  |  5   |  5 (10)     | 10 > 8      |   4   | high = 4
 *   low > high → last = 4
 *
 *   Answer [3, 4]  ✅
 *
 * TRAPS
 *   1. Don't stop at the first match: in [8, 8, 8, 8, 8], a normal binary search returns index 2.
 *   2. "Find it, then walk left and right" is O(n) when many copies exist; two searches stay O(log n).
 *   3. Save `found = mid` BEFORE moving on, otherwise you lose the last match you saw.
 *   4. Same pattern answers "count of target" (last - first + 1) and "insert position"
 *      (see 1_search_InsertPosition.js).
 *
 * INTERVIEW LINE
 *   "I run binary search twice. When I find the target, I record the index but keep searching:
 *    left for the first occurrence, right for the last. Each search is O(log n), even if every
 *    element equals the target."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(searchRange([5, 7, 7, 8, 8, 10], 8));    // [ 3, 4 ]
console.log(searchRange([5, 7, 7, 8, 8, 10], 6));    // [ -1, -1 ]
console.log(searchRange([], 0));                     // [ -1, -1 ]
console.log(searchRange([8, 8, 8, 8, 8], 8));        // [ 0, 4 ]
console.log(searchRangeBrute([5, 7, 7, 8, 8, 10], 8)); // [ 3, 4 ] (brute force, same answer)
