/**
 * Majority Element II (more than n/3 times)   (LeetCode 229 · Amazon, Microsoft, Google, Flipkart)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   Given an integer array of size n, return ALL elements that appear MORE THAN ⌊n/3⌋ times.
 *   Follow-up: O(n) time and O(1) space.
 *
 * EXAMPLES
 *   Input : [3, 2, 3]                   → Output: [3]       (n = 3, needs more than 1)
 *   Input : [1, 2]                      → Output: [1, 2]    (n = 2, needs more than 0)
 *   Input : [1, 1, 1, 3, 3, 2, 2, 2]    → Output: [1, 2]    (n = 8, needs more than 2)
 *
 * OUTPUT FORMAT
 *   An array with 0, 1 or 2 numbers (any order).
 *
 * KEY FACT: at most TWO numbers can appear more than n/3 times
 *   (three of them would need more than 3 × n/3 = n elements).
 *
 * MEMORY: "Two candidates vote; a third number cancels one vote from EACH. Then VERIFY."
 *   STEP 1 → VOTE: keep 2 candidates with counts.
 *            same as a candidate → its count++ · an empty slot → take it ·
 *            otherwise → BOTH counts-- (this number cancels one of each)
 *   STEP 2 → VERIFY: count the two candidates again and keep those above n/3
 *            (the vote only finds POSSIBLE winners)
 *
 * (Same idea as 5_MajorityElement.js, which finds the element above n/2 with ONE candidate.)
 *
 * COST
 *   Hash map counting: O(n) time, O(n) space
 *   Voting (Boyer-Moore with 2 candidates): O(n) time, O(1) space
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── SIMPLE WAY: count everything in a Map, O(n) space ────────────────────────
function majorityElementMap(nums) {
  const count = new Map();
  for (const x of nums) count.set(x, (count.get(x) || 0) + 1);
  return [...count].filter(([, c]) => c > Math.floor(nums.length / 3)).map(([x]) => x);
}

// ── OPTIMAL: voting with 2 candidates, O(1) space ────────────────────────────
function majorityElement(nums) {
  let cand1 = null, count1 = 0;                   // two candidate slots
  let cand2 = null, count2 = 0;

  // STEP 1: VOTE
  for (const x of nums) {
    if (x === cand1) {
      count1++;                                   // a vote for candidate 1
    } else if (x === cand2) {
      count2++;                                   // a vote for candidate 2
    } else if (count1 === 0) {
      cand1 = x; count1 = 1;                      // slot 1 is empty → x takes it
    } else if (count2 === 0) {
      cand2 = x; count2 = 1;                      // slot 2 is empty → x takes it
    } else {
      count1--; count2--;                         // a third number cancels one vote from each
    }
  }

  // STEP 2: VERIFY (the vote can leave a candidate that isn't really above n/3)
  const limit = Math.floor(nums.length / 3);
  const result = [];
  for (const cand of [cand1, cand2]) {
    if (cand === null) continue;
    const real = nums.filter((x) => x === cand).length;   // actual count
    if (real > limit) result.push(cand);
  }
  return result;
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY ITERATION for [1, 1, 1, 3, 3, 2, 2, 2]   (n = 8, limit = ⌊8/3⌋ = 2 → need 3 or more)
 *
 * STEP 1: VOTE
 *   x | rule that applies          | cand1 (count1) | cand2 (count2)
 *   --|----------------------------|----------------|---------------
 *   1 | slot 1 empty → take it     |   1 (1)        |   -  (0)
 *   1 | same as cand1              |   1 (2)        |   -  (0)
 *   1 | same as cand1              |   1 (3)        |   -  (0)
 *   3 | slot 2 empty → take it     |   1 (3)        |   3  (1)
 *   3 | same as cand2              |   1 (3)        |   3  (2)
 *   2 | third number → both --     |   1 (2)        |   3  (1)
 *   2 | third number → both --     |   1 (1)        |   3  (0)
 *   2 | slot 2 empty → take it     |   1 (1)        |   2  (1)
 *
 * STEP 2: VERIFY
 *   cand 1 → appears 3 times > 2 ✅
 *   cand 2 → appears 3 times > 2 ✅
 *
 *   Answer [1, 2]
 *
 * TRAPS
 *   1. Check "same as cand1 / cand2" BEFORE "empty slot". Otherwise a number equal to cand2 could
 *      take empty slot 1 and both slots end up holding the same value.
 *   2. Always VERIFY. For [1, 2, 3] the vote leaves candidates, but none appears more than once.
 *   3. More than ⌊n/3⌋ means strictly greater: in [1, 2] each appears once and ⌊2/3⌋ = 0 → both count.
 *
 * INTERVIEW LINE
 *   "At most two values can appear more than n/3 times, so I run Boyer-Moore voting with two
 *    candidates: matching votes add, empty slots get filled, and any other value cancels one vote
 *    from each. A second pass verifies the real counts. O(n) time, O(1) space."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(majorityElement([3, 2, 3]));                    // [ 3 ]
console.log(majorityElement([1, 2]));                       // [ 1, 2 ]
console.log(majorityElement([1, 1, 1, 3, 3, 2, 2, 2]));     // [ 1, 2 ]
console.log(majorityElement([1, 2, 3]));                    // [] (no element appears more than once)
console.log(majorityElementMap([1, 1, 1, 3, 3, 2, 2, 2]));  // [ 1, 2 ] (map version, same answer)
