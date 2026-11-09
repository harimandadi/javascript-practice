/**
 * Merge Intervals   (LeetCode 56 · asked at Amazon, Google, Microsoft, Meta, Bloomberg)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   Given an array of intervals where intervals[i] = [start, end], merge ALL overlapping
 *   intervals and return the non-overlapping intervals that cover the same ranges.
 *   Intervals that only TOUCH (one ends where the next starts) also merge: [1,4] + [4,5] = [1,5].
 *   (Real-world: merge meeting times, booking slots, date ranges.)
 *
 * EXAMPLES
 *   Input : [[1, 3], [2, 6], [8, 10], [15, 18]]
 *   Output: [[1, 6], [8, 10], [15, 18]]      → [1,3] and [2,6] overlap → [1,6]
 *
 *   Input : [[1, 4], [4, 5]]
 *   Output: [[1, 5]]                         → touching counts as overlapping
 *
 *   Input : [[8, 10], [1, 3], [2, 6]]        → input may be UNSORTED
 *   Output: [[1, 6], [8, 10]]
 *
 * OUTPUT FORMAT
 *   An array of [start, end] pairs, sorted by start, with no two overlapping.
 *
 * MEMORY: "Sort by start, then glue or start new."
 *   STEP 1 → SORT by start, so anything that can overlap ends up next to each other
 *   STEP 2 → for each interval: overlaps the LAST merged one? → GLUE (extend its end)
 *                               otherwise                     → START a new merged interval
 *
 * WHY SORT?
 *   After sorting by start, an interval can only overlap the LAST merged interval, so one
 *   pass is enough. Without sorting, [8,10] and [9,12] could be far apart in the array.
 *
 * COST
 *   Brute force: O(n²) or worse (compare every pair, repeat until nothing merges)
 *   Optimal    : O(n log n) time for the sort + O(n) for the pass; O(n) space for the result
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── BRUTE FORCE: keep merging any overlapping pair until none are left ───────
function mergeBrute(intervals) {
  let list = intervals.map(([s, e]) => [s, e]);      // copy, don't change the input
  let merged = true;
  while (merged) {                                   // repeat until a full round merges nothing
    merged = false;
    for (let i = 0; i < list.length && !merged; i++) {
      for (let j = i + 1; j < list.length && !merged; j++) {
        const [a, b] = [list[i], list[j]];
        if (a[0] <= b[1] && b[0] <= a[1]) {          // the two overlap (or touch)
          list[i] = [Math.min(a[0], b[0]), Math.max(a[1], b[1])];
          list.splice(j, 1);                         // remove the one that was absorbed
          merged = true;
        }
      }
    }
  }
  return list.sort((x, y) => x[0] - y[0]);
}

// ── OPTIMAL: sort, then one pass ──────────────────────────────────────────────
function merge(intervals) {
  if (intervals.length === 0) return [];

  // STEP 1: SORT by start (a COPY, so the caller's array isn't changed)
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);   // numeric compare, see TRAPS

  const result = [[...sorted[0]]];                   // the first interval starts the result

  // STEP 2: glue or start new
  for (let i = 1; i < sorted.length; i++) {
    const [start, end] = sorted[i];                  // the interval we're looking at
    const last = result[result.length - 1];          // the last MERGED interval

    if (start <= last[1]) {                          // starts before (or when) the last one ends?
      last[1] = Math.max(last[1], end);              //   → GLUE: extend the end (Math.max, see TRAPS)
    } else {
      result.push([start, end]);                     //   → gap: START a new merged interval
    }
  }

  return result;
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY ITERATION for [[8, 10], [1, 3], [15, 18], [2, 6]]
 *
 * STEP 1: sort by start
 *   [[1, 3], [2, 6], [8, 10], [15, 18]]
 *   result = [[1, 3]]       (the first interval)
 *
 * STEP 2: glue or start new
 *   i | current  | last merged | start <= last end? | action                      | result
 *   --|----------|-------------|--------------------|-----------------------------|------------------------------
 *   1 | [2, 6]   | [1, 3]      | 2 <= 3  yes        | GLUE: end = max(3, 6) = 6   | [[1,6]]
 *   2 | [8, 10]  | [1, 6]      | 8 <= 6  no         | START new                   | [[1,6], [8,10]]
 *   3 | [15, 18] | [8, 10]     | 15 <= 10 no        | START new                   | [[1,6], [8,10], [15,18]]
 *
 *   Answer [[1, 6], [8, 10], [15, 18]]  ✅
 *
 * PICTURE on a number line:
 *   1───3                         [1,3]
 *     2───────6                   [2,6]      overlap → [1,6]
 *                 8───10          [8,10]
 *                           15──18 [15,18]
 *   1─────────6   8───10    15──18          ← merged
 *
 * TRAPS
 *   1. Sort with (a, b) => a[0] - b[0]. Plain .sort() compares as TEXT: [10,...] comes before
 *      [2,...] because "10" < "2".
 *   2. Use Math.max for the new end: [1, 10] then [2, 3] → the end must stay 10, not become 3.
 *   3. Use <= (not <) if touching intervals should merge: [1,4] and [4,5] → [1,5].
 *   4. Copy the intervals instead of changing the caller's array (sorting in place and
 *      editing `last[1]` would modify the input).
 *
 * INTERVIEW LINE
 *   "Sort by start so overlapping intervals are next to each other. Then one pass: if the
 *    current interval starts before the last merged one ends, extend that end with Math.max;
 *    otherwise start a new interval. O(n log n) because of the sort, O(n) for the result."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]]));   // [ [ 1, 6 ], [ 8, 10 ], [ 15, 18 ] ]
console.log(merge([[1, 4], [4, 5]]));                      // [ [ 1, 5 ] ]
console.log(merge([[8, 10], [1, 3], [15, 18], [2, 6]]));   // [ [ 1, 6 ], [ 8, 10 ], [ 15, 18 ] ]
console.log(merge([[1, 10], [2, 3], [4, 5]]));             // [ [ 1, 10 ] ]  (one contains the others)
console.log(merge([[2, 3], [10, 12]]));                    // [ [ 2, 3 ], [ 10, 12 ] ]  (numeric sort)
console.log(mergeBrute([[1, 3], [2, 6], [8, 10], [15, 18]])); // same answer (brute force)
