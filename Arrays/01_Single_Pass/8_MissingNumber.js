/**
 * Missing Number (0 to n)   (LeetCode 268 · asked at Amazon, Microsoft, Meta, Apple)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   An array nums holds n DISTINCT numbers taken from the range 0, 1, 2, ..., n.
 *   Exactly ONE number from that range is missing. Return it.
 *   Rule: O(n) time and O(1) extra space.
 *
 * EXAMPLES
 *   Input : nums = [3, 0, 1]
 *   Output: 2               → n = 3, range 0..3, 2 is missing
 *
 *   Input : nums = [0, 1]
 *   Output: 2               → n = 2, range 0..2, the LAST number is missing
 *
 *   Input : nums = [9, 6, 4, 2, 3, 5, 7, 0, 1]
 *   Output: 8
 *
 * OUTPUT FORMAT
 *   A single number: the one value from 0..n that isn't in nums.
 *
 * MEMORY: "EXPECTED total minus ACTUAL total."
 *   STEP 1 → EXPECTED: the sum of 0..n = n × (n + 1) / 2   (n = nums.length)
 *   STEP 2 → ACTUAL: add up the array in one pass; the difference is the missing number
 *
 *   XOR version (same idea, no big sums): x ^ x = 0 and x ^ 0 = x, so XOR-ing every index
 *   0..n with every value cancels each pair and leaves only the missing number.
 *   (The same XOR trick as 08_Bit_Manipulation/1_Hammingdistance_Bits.js.)
 *
 * COST
 *   Brute force: for each 0..n, search the array (includes) → O(n²)
 *   Sorting    : sort, then find the first index i where nums[i] !== i → O(n log n)
 *   Optimal    : sum formula or XOR → O(n) time, O(1) space
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── BRUTE FORCE: O(n²) ────────────────────────────────────────────────────────
function missingNumberBrute(nums) {
  for (let x = 0; x <= nums.length; x++) {      // try every number in 0..n
    if (!nums.includes(x)) return x;            // includes() is itself a loop → O(n²)
  }
  return -1;                                    // can't happen for valid input
}

// ── OPTIMAL 1: sum formula, O(n) ─────────────────────────────────────────────
function missingNumber(nums) {
  const n = nums.length;                        // range is 0..n (n + 1 numbers, one missing)
  const expected = (n * (n + 1)) / 2;           // STEP 1: 0 + 1 + ... + n  (Gauss formula)

  let actual = 0;
  for (const num of nums) actual += num;        // STEP 2: what the array really adds up to

  return expected - actual;                     // the gap = the missing number
}

// ── OPTIMAL 2: XOR, O(n) ── no risk of very large sums ───────────────────────
function missingNumberXor(nums) {
  let xor = nums.length;                        // start with n (the index loop below stops at n - 1)
  for (let i = 0; i < nums.length; i++) {
    xor ^= i ^ nums[i];                         // XOR in the index AND the value
  }
  return xor;                                   // every pair cancelled; the missing one is left
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY ITERATION for nums = [3, 0, 1]   (n = 3)
 *
 * SUM FORMULA
 *   STEP 1: expected = 3 × 4 / 2 = 6        (0 + 1 + 2 + 3)
 *   STEP 2:
 *     num | actual
 *     ----|--------
 *      3  |   3
 *      0  |   3
 *      1  |   4
 *   missing = 6 - 4 = 2  ✅
 *
 * XOR (start xor = n = 3)
 *     i | nums[i] | xor ^= i ^ nums[i]           | xor
 *     --|---------|-------------------------------|-----
 *       |         | start                         |  3
 *     0 |    3    | 3 ^ 0 ^ 3                     |  0
 *     1 |    0    | 0 ^ 1 ^ 0                     |  1
 *     2 |    1    | 1 ^ 2 ^ 1                     |  2
 *   missing = 2  ✅
 *
 *   Why: all the numbers XOR-ed together are  (0 ^ 1 ^ 2 ^ 3)  ^  (3 ^ 0 ^ 1)
 *        pairs cancel: 0^0 = 0, 1^1 = 0, 3^3 = 0 → only 2 is left
 *
 * TRAPS
 *   1. n is nums.length, NOT the biggest value: for [0, 1] the answer is 2 (the last one).
 *   2. Start the XOR at n: the loop only XORs indexes 0..n-1, so n itself must be added.
 *   3. Very large inputs: the sum can exceed the safe integer range in some languages
 *      (in JavaScript only above 2^53); XOR never grows, so it's the safer version.
 *   4. Only ONE number is missing and values are DISTINCT; with duplicates or several missing
 *      numbers, use a Set or a boolean array instead.
 *
 * INTERVIEW LINE
 *   "The numbers 0..n should add up to n(n+1)/2; subtract the array's actual sum and the
 *    difference is the missing number. O(n) time, O(1) space. The XOR version does the same
 *    without large sums, because every number that appears both as an index and as a value
 *    cancels out."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(missingNumber([3, 0, 1]));                      // 2
console.log(missingNumber([0, 1]));                         // 2  (the last number is missing)
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]));    // 8
console.log(missingNumber([1]));                            // 0  (the first number is missing)
console.log(missingNumberXor([3, 0, 1]));                   // 2  (XOR version)
console.log(missingNumberBrute([9, 6, 4, 2, 3, 5, 7, 0, 1])); // 8 (brute force, same answer)
