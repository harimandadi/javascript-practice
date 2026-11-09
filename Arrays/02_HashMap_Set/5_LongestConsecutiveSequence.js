/**
 * Longest Consecutive Sequence   (LeetCode 128 · asked at Google, Amazon, Microsoft, Meta)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   Given an UNSORTED array of integers nums, return the length of the longest run of
 *   consecutive numbers (like 1, 2, 3, 4) that can be formed from its values.
 *   The numbers don't have to be next to each other in the array.
 *   Rule: O(n) time, so sorting (O(n log n)) is not the intended answer.
 *
 * EXAMPLES
 *   Input : nums = [100, 4, 200, 1, 3, 2]
 *   Output: 4          → 1, 2, 3, 4
 *
 *   Input : nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
 *   Output: 9          → 0, 1, 2, 3, 4, 5, 6, 7, 8   (duplicates count once)
 *
 *   Input : nums = []
 *   Output: 0
 *
 * OUTPUT FORMAT
 *   A single number: the length of the longest consecutive run (0 for an empty array).
 *
 * MEMORY: "Only START counting at the START of a run."
 *   STEP 1 → put every number in a SET (instant "is x there?" lookups, duplicates removed)
 *   STEP 2 → for each number: if (num - 1) is NOT in the set, it STARTS a run →
 *            count up num+1, num+2, ... while they're in the set; keep the longest
 *
 * WHY IT'S O(n)
 *   A number in the middle of a run (its num - 1 exists) is skipped immediately, so each
 *   number is counted only ONCE, by the run it belongs to: about 2n steps in total.
 *
 * COST
 *   Simple way: sort, then count     → O(n log n) time
 *   Optimal   : Set + start-of-run   → O(n) time, O(n) space
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── SIMPLE WAY: sort, then count runs, O(n log n) ── a good first answer ─────
function longestConsecutiveSort(nums) {
  if (nums.length === 0) return 0;
  const sorted = [...nums].sort((a, b) => a - b);     // numeric sort (copy, input unchanged)
  let best = 1, current = 1;
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === sorted[i - 1]) continue;        // duplicate → doesn't break or extend the run
    if (sorted[i] === sorted[i - 1] + 1) current++;   // next number → run continues
    else current = 1;                                  // gap → a new run starts
    best = Math.max(best, current);
  }
  return best;
}

// ── OPTIMAL: Set, O(n) ────────────────────────────────────────────────────────
function longestConsecutive(nums) {
  const set = new Set(nums);                // STEP 1: all numbers, duplicates removed, O(1) lookups
  let best = 0;                             // longest run found so far

  for (const num of set) {                  // loop over the SET (each value once, see TRAPS)
    if (set.has(num - 1)) continue;         // STEP 2: num - 1 exists → num is NOT a start → skip

    let length = 1;                         // num starts a run
    while (set.has(num + length)) {         // count up: num+1, num+2, ... while they exist
      length++;
    }
    best = Math.max(best, length);          // keep the longest
  }

  return best;
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY ITERATION for nums = [100, 4, 200, 1, 3, 2]
 *
 * STEP 1: set = {100, 4, 200, 1, 3, 2}
 *
 * STEP 2:
 *   num | num-1 in set? | start of a run? | count up                        | length | best
 *   ----|---------------|-----------------|---------------------------------|--------|-----
 *   100 |  99  no       |  yes            | 101? no                         |   1    |  1
 *     4 |   3  yes      |  no → skip      |                                 |        |  1
 *   200 | 199  no       |  yes            | 201? no                         |   1    |  1
 *     1 |   0  no       |  yes            | 2? yes  3? yes  4? yes  5? no   |   4    |  4  ✅
 *     3 |   2  yes      |  no → skip      |                                 |        |  4
 *     2 |   1  yes      |  no → skip      |                                 |        |  4
 *
 *   Answer 4  → the run 1, 2, 3, 4
 *
 * PICTURE: only the START of each run does the counting
 *   1 → 2 → 3 → 4        (counted once, starting from 1)
 *   100                  (a run of 1)
 *   200                  (a run of 1)
 *   2, 3 and 4 are skipped as starts because 1, 2 and 3 exist before them.
 *
 * TRAPS
 *   1. Without the "num - 1 in set?" check, every number counts its own run →
 *      O(n²) on input like [1, 2, 3, ..., n].
 *   2. Loop over the SET, not the array. With many duplicates of a start value
 *      (e.g. [1, 1, 1, ..., 2, 3]) the array loop would count the same run again and again.
 *   3. Empty array → 0 (best starts at 0, not 1).
 *   4. Duplicates don't lengthen a run: [1, 2, 2, 3] → 3.
 *
 * INTERVIEW LINE
 *   "Sorting gives O(n log n). For O(n) I put everything in a Set and only start counting at
 *    numbers whose predecessor isn't in the set, the true starts of runs. Each number is then
 *    visited a constant number of times, so it's O(n) time and O(n) space."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(longestConsecutive([100, 4, 200, 1, 3, 2]));          // 4
console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]));  // 9
console.log(longestConsecutive([]));                              // 0
console.log(longestConsecutive([1, 2, 2, 3]));                    // 3 (duplicate ignored)
console.log(longestConsecutive([-2, -1, 0, 10]));                 // 3 (negatives work too)
console.log(longestConsecutiveSort([100, 4, 200, 1, 3, 2]));      // 4 (sort version, same answer)
