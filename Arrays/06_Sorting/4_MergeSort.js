/**
 * Merge Sort   (asked everywhere: "sort without built-ins", "a stable O(n log n) sort",
 *               and as the base of Sort List, Count Inversions, external sorting)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   Sort an array of numbers in increasing order WITHOUT using .sort(), in O(n log n) time
 *   even in the worst case.
 *
 * EXAMPLES
 *   Input : [38, 27, 43, 3, 9, 82, 10]
 *   Output: [3, 9, 10, 27, 38, 43, 82]
 *
 *   Input : [5, 1, 4, 1]
 *   Output: [1, 1, 4, 5]
 *
 * OUTPUT FORMAT
 *   A NEW sorted array (the input array is not changed).
 *
 * MEMORY: "SPLIT in half until single, then MERGE back in order."
 *   STEP 1 → SPLIT: cut the array in half, again and again, until pieces have 1 element
 *            (a single element is already sorted)
 *   STEP 2 → MERGE: join two sorted pieces by repeatedly taking the SMALLER front element
 *
 * WHY O(n log n) ALWAYS?
 *   Halving n down to 1 takes log n levels, and merging at each level touches all n
 *   elements once → n × log n. Unlike quick sort, the split is ALWAYS exactly in half,
 *   so there is no bad O(n²) case.
 *
 * COST
 *   Bubble / selection sort: O(n²)
 *   Quick sort             : O(n log n) on average, O(n²) worst case, O(log n) space
 *   Merge sort             : O(n log n) ALWAYS, O(n) extra space, STABLE (equal values keep
 *                            their original order)
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── STEP 2 helper: merge two SORTED arrays into one sorted array ─────────────
function mergeTwo(left, right) {
  const result = [];
  let i = 0;                                      // front of left
  let j = 0;                                      // front of right

  while (i < left.length && j < right.length) {   // while both still have elements
    if (left[i] <= right[j]) {                    // take the SMALLER front element
      result.push(left[i]);                       // (<= keeps equal values in original order:
      i++;                                        //  that's what makes merge sort STABLE)
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // One side is used up; the other side's rest is already sorted → append it all.
  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);

  return result;
}

// ── MERGE SORT: split, sort each half, merge ──────────────────────────────────
function mergeSort(arr) {
  if (arr.length <= 1) return arr;                // BASE CASE: 0 or 1 element is already sorted

  const mid = Math.floor(arr.length / 2);         // STEP 1: SPLIT in half
  const left = mergeSort(arr.slice(0, mid));      //   sort the left half (recursion)
  const right = mergeSort(arr.slice(mid));        //   sort the right half (recursion)

  return mergeTwo(left, right);                   // STEP 2: MERGE the two sorted halves
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY STEP for [38, 27, 43, 3, 9, 82, 10]
 *
 * STEP 1: SPLIT (top → down)                      STEP 2: MERGE (bottom → up)
 *
 *            [38, 27, 43, 3, 9, 82, 10]                  [3, 9, 10, 27, 38, 43, 82]   ✅
 *             /                    \                       ↑ merge
 *     [38, 27, 43]            [3, 9, 82, 10]        [27, 38, 43]      [3, 9, 10, 82]
 *       /      \                /        \            ↑ merge            ↑ merge
 *    [38]    [27, 43]       [3, 9]    [82, 10]     [38] [27, 43]     [3, 9] [10, 82]
 *             /   \          /  \       /   \             ↑ merge      ↑        ↑ merge
 *          [27]  [43]      [3]  [9]   [82]  [10]       [27] [43]   [3] [9]  [82] [10]
 *
 *   Splitting:  7 → 3 + 4 → 1 + 2 and 2 + 2 → single elements   (about log₂ 7 ≈ 3 levels)
 *
 * THE LAST MERGE in detail: left = [27, 38, 43], right = [3, 9, 10, 82]
 *   i (left[i]) | j (right[j]) | smaller | result
 *   ------------|--------------|---------|-----------------------------
 *   0 (27)      | 0 (3)        |    3    | [3]
 *   0 (27)      | 1 (9)        |    9    | [3, 9]
 *   0 (27)      | 2 (10)       |   10    | [3, 9, 10]
 *   0 (27)      | 3 (82)       |   27    | [3, 9, 10, 27]
 *   1 (38)      | 3 (82)       |   38    | [3, 9, 10, 27, 38]
 *   2 (43)      | 3 (82)       |   43    | [3, 9, 10, 27, 38, 43]
 *   left used up → append the rest of right: 82 → [3, 9, 10, 27, 38, 43, 82]
 *
 * TRAPS
 *   1. Base case `arr.length <= 1`: without it the recursion never stops.
 *   2. Don't forget the "append the rest" loops after the main while; one side always
 *      has leftovers.
 *   3. Use <= (not <) in mergeTwo to keep the sort STABLE (equal values stay in order),
 *      which matters when sorting objects, e.g. orders by date then by price.
 *   4. slice() copies, so this uses O(n) extra memory; that's the price of merge sort.
 *      Quick sort sorts in place but has an O(n²) worst case.
 *
 * INTERVIEW LINE
 *   "Divide and conquer: split the array in half recursively until single elements, then merge
 *    pairs of sorted halves by repeatedly taking the smaller front element. log n levels of
 *    splitting × n work per level = O(n log n) in every case, it's stable, and it needs O(n)
 *    extra space. I'd pick it over quick sort when I need guaranteed performance or stability,
 *    for example for linked lists or for data that doesn't fit in memory."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]));   // [ 3, 9, 10, 27, 38, 43, 82 ]
console.log(mergeSort([5, 1, 4, 1]));                 // [ 1, 1, 4, 5 ]
console.log(mergeSort([]));                           // []
console.log(mergeSort([-3, 10, -1, 0]));              // [ -3, -1, 0, 10 ]
console.log(mergeTwo([27, 38, 43], [3, 9, 10, 82]));  // [ 3, 9, 10, 27, 38, 43, 82 ] (the last merge)
