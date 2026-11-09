/**
 * Subarray Sum Equals K   (LeetCode 560 · asked at Amazon, Microsoft, Google, Meta)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   Given an integer array nums (may contain NEGATIVE numbers) and an integer k,
 *   return the TOTAL NUMBER of contiguous subarrays whose sum equals k.
 *
 * EXAMPLES
 *   Input : nums = [1, 1, 1], k = 2
 *   Output: 2            → [1,1] (index 0-1) and [1,1] (index 1-2)
 *
 *   Input : nums = [3, 4, 7, 2, -3, 1, 4, 2], k = 7
 *   Output: 4            → [3,4]  [7]  [7,2,-3,1]  [1,4,2]
 *
 * OUTPUT FORMAT
 *   A single number: how many subarrays add up to k (0 if none).
 *
 * MEMORY: "Running sum; look back for (sum - k); remember the sum."
 *   STEP 1 → keep a RUNNING SUM, and ask the map: "how many times have I seen (sum - k)?"
 *            each one is a subarray ending HERE that sums to k → add to the count
 *   STEP 2 → REMEMBER this running sum in the map (seenCount + 1)
 *
 * WHY IT WORKS
 *   sum(i+1 .. j) = prefix[j] - prefix[i]
 *   We want  prefix[j] - prefix[i] = k   →   prefix[i] = prefix[j] - k
 *   So at every j, count how many earlier prefix sums equal (current sum - k).
 *
 * COST
 *   Brute force: O(n²) time, O(1) space
 *   Optimal    : O(n) time,  O(n) space (the map)
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── BRUTE FORCE: O(n²) ── try every start, extend right (like max subarray brute force) ──
function subarraySumBrute(nums, k) {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {      // pick a START
    let sum = 0;
    for (let j = i; j < nums.length; j++) {    // extend RIGHT
      sum += nums[j];                          // sum of nums[i..j]
      if (sum === k) count++;                  // found one
    }
  }
  return count;
}

// ── OPTIMAL: prefix sum + hash map, O(n) ─────────────────────────────────────
function subarraySum(nums, k) {
  const seen = new Map([[0, 1]]);              // prefix sum → how many times seen
                                               // {0: 1} = "an empty prefix before index 0",
                                               // needed for subarrays that START at index 0
  let sum = 0;                                 // running (prefix) sum
  let count = 0;                               // answer

  for (const num of nums) {
    sum += num;                                // STEP 1: running sum up to here

    const need = sum - k;                      //   an earlier prefix of (sum - k) means the
    count += seen.get(need) || 0;              //   part after it sums to k → add how many

    seen.set(sum, (seen.get(sum) || 0) + 1);   // STEP 2: remember this running sum
  }

  return count;
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY ITERATION for nums = [3, 4, 7, 2, -3, 1, 4, 2], k = 7
 *   start: sum = 0, count = 0, seen = {0:1}
 *
 *   i | num | sum | need | found? | count | subarray found  | map gets
 *   --|-----|-----|------|--------|-------|-----------------|----------
 *   0 |  3  |   3 |  -4  |  no    |   0   |                 | 3:1
 *   1 |  4  |   7 |   0  |  yes   |   1   | [3, 4]          | 7:1
 *   2 |  7  |  14 |   7  |  yes   |   2   | [7]             | 14:1
 *   3 |  2  |  16 |   9  |  no    |   2   |                 | 16:1
 *   4 | -3  |  13 |   6  |  no    |   2   |                 | 13:1
 *   5 |  1  |  14 |   7  |  yes   |   3   | [7, 2, -3, 1]   | 14:2 (seen twice)
 *   6 |  4  |  18 |  11  |  no    |   3   |                 | 18:1
 *   7 |  2  |  20 |  13  |  yes   |   4   | [1, 4, 2]       | 20:1
 *
 *   need = sum - k = sum - 7.  "found?" = is `need` already in the map (an earlier running sum)?
 *
 *   Answer 4  ✅
 *
 * HOW TO READ ONE "yes" (i = 5):
 *   running sum now = 14; earlier the running sum was 7 (after index 1).
 *   14 - 7 = 7 → the part AFTER index 1 up to index 5 sums to 7 → [7, 2, -3, 1]
 *
 *   index:   0   1 │ 2   3   4   5
 *   nums :   3   4 │ 7   2  -3   1
 *   sum  :   3   7 │              14
 *                  └── 14 - 7 = 7 ──┘
 *
 * TRAPS
 *   1. Start the map with {0: 1}. Without it, subarrays starting at index 0 are missed
 *      ([3,4] above would not be counted).
 *   2. Check `need` BEFORE storing the current sum. Otherwise, when k = 0, a sum would
 *      match itself and count an empty subarray.
 *   3. Sliding window does NOT work here: with negative numbers, growing the window can make
 *      the sum smaller, so you can't decide when to shrink. Prefix sum + map handles negatives.
 *   4. Store COUNTS, not true/false: the same prefix sum can appear many times, and each one
 *      is a different subarray (see 14:2 at i = 5).
 *
 * INTERVIEW LINE
 *   "Sum of a subarray = current prefix sum minus an earlier prefix sum. So I keep a running sum
 *    and a map of how many times each prefix sum appeared; at each step I add the count of
 *    (sum - k). Start the map with {0:1} for subarrays from index 0. O(n) time, O(n) space,
 *    and it works with negative numbers, unlike sliding window."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(subarraySum([1, 1, 1], 2));                     // 2
console.log(subarraySum([1, 2, 3], 3));                     // 2 → [1,2] and [3]
console.log(subarraySum([3, 4, 7, 2, -3, 1, 4, 2], 7));     // 4
console.log(subarraySum([1, -1, 0], 0));                    // 3 → [1,-1]  [1,-1,0]  [0]
console.log(subarraySumBrute([3, 4, 7, 2, -3, 1, 4, 2], 7)); // 4 (brute force, same answer)
