/**
 * Top K Frequent Elements   (LeetCode 347 · asked at Amazon, Meta, Google, Microsoft, Uber)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   Given an integer array nums and an integer k, return the k MOST FREQUENT elements.
 *   The answer may be in any order. Rule: better than O(n log n).
 *
 * EXAMPLES
 *   Input : nums = [1, 1, 1, 2, 2, 3], k = 2
 *   Output: [1, 2]        → 1 appears 3 times, 2 appears 2 times, 3 only once
 *
 *   Input : nums = [4, 4, 5, 6, 6, 6, 7], k = 1
 *   Output: [6]           → 6 appears 3 times
 *
 * OUTPUT FORMAT
 *   An array of k numbers (any order; this code returns the most frequent first).
 *
 * MEMORY: "COUNT them, BUCKET them by count, read from the TOP."
 *   STEP 1 → COUNT: a Map of number → how many times it appears
 *   STEP 2 → BUCKET: buckets[c] = numbers that appear exactly c times;
 *            read buckets from the highest count down until you have k numbers
 *
 * WHY BUCKETS?
 *   A count can never be bigger than n (the array length), so an array of n + 1 buckets
 *   holds every possible count. Reading it from the top gives the most frequent first,
 *   with no sorting → O(n).
 *
 * COST
 *   Simple way: count, then SORT by count   → O(n log n)
 *   Heap way  : count, keep a min-heap of k → O(n log k) (JavaScript has no built-in heap)
 *   Optimal   : count + bucket              → O(n) time, O(n) space
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── SIMPLE WAY: count, then sort by count, O(n log n) ── a good first answer ──
function topKFrequentSort(nums, k) {
  const count = new Map();
  for (const num of nums) count.set(num, (count.get(num) || 0) + 1);
  return [...count.entries()]               // [[number, count], ...]
    .sort((a, b) => b[1] - a[1])            // highest count first
    .slice(0, k)                            // keep the first k
    .map(([num]) => num);                   // just the numbers
}

// ── OPTIMAL: count + bucket, O(n) ─────────────────────────────────────────────
function topKFrequent(nums, k) {
  // STEP 1: COUNT
  const count = new Map();                              // number → how many times
  for (const num of nums) {
    count.set(num, (count.get(num) || 0) + 1);          // 0 the first time, then +1
  }

  // STEP 2: BUCKET by count, then read from the top
  const buckets = Array.from({ length: nums.length + 1 }, () => []);  // buckets[0..n], each an empty list
  for (const [num, c] of count) {
    buckets[c].push(num);                               // put the number in the bucket for its count
  }

  const result = [];
  for (let c = buckets.length - 1; c >= 1 && result.length < k; c--) { // highest count first
    for (const num of buckets[c]) {
      result.push(num);                                 // take numbers from this bucket...
      if (result.length === k) break;                   // ...until we have k
    }
  }
  return result;
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY ITERATION for nums = [1, 1, 1, 2, 2, 3], k = 2
 *
 * STEP 1: COUNT
 *   num | count map after it
 *   ----|----------------------
 *    1  | {1:1}
 *    1  | {1:2}
 *    1  | {1:3}
 *    2  | {1:3, 2:1}
 *    2  | {1:3, 2:2}
 *    3  | {1:3, 2:2, 3:1}
 *
 * STEP 2: BUCKET (n = 6 → buckets 0..6)
 *   count:   0    1     2     3    4    5    6
 *   bucket: []   [3]   [2]   [1]   []   []   []
 *
 *   read from the TOP (c = 6 → 1) until we have k = 2:
 *   c | bucket | result
 *   --|--------|--------
 *   6 |  []    | []
 *   5 |  []    | []
 *   4 |  []    | []
 *   3 |  [1]   | [1]
 *   2 |  [2]   | [1, 2]   ← k reached, stop
 *
 *   Answer [1, 2]  ✅
 *
 * TRAPS
 *   1. Buckets need length n + 1 (counts go from 0 to n). Length n misses "every element
 *      is the same" (count = n).
 *   2. Use a Map, not a plain object, for counts: object keys become STRINGS, so you'd return
 *      ["1", "2"] instead of [1, 2] unless you convert back.
 *   3. Stop as soon as you have k numbers: one bucket can hold several numbers
 *      (ties), so check inside the inner loop too.
 *   4. Ties: if two numbers have the same count at the k-th place, either is a valid answer.
 *
 * INTERVIEW LINE
 *   "Count with a hash map, O(n). Sorting the counts would be O(n log n), so instead I bucket
 *    numbers by count, since a count is at most n, and read the buckets from the highest
 *    count down until I have k. O(n) time and space. A min-heap of size k is the O(n log k)
 *    alternative, useful when k is much smaller than n or the data is streaming."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2));        // [ 1, 2 ]
console.log(topKFrequent([4, 4, 5, 6, 6, 6, 7], 1));     // [ 6 ]
console.log(topKFrequent([1], 1));                       // [ 1 ]
console.log(topKFrequent([5, 5, 5, 5], 1));              // [ 5 ]  (count = n, why buckets need n + 1)
console.log(topKFrequent([-1, -1, 2, 2, 2, 3], 2));      // [ 2, -1 ]  (negatives work)
console.log(topKFrequentSort([1, 1, 1, 2, 2, 3], 2));    // [ 1, 2 ]  (sort version, same answer)
