/**
 * Intersection of Two Arrays (I and II)   (LeetCode 349 / 350 · Amazon, Meta, Google, LinkedIn)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   Given two integer arrays nums1 and nums2, return the elements they have in COMMON.
 *   Version I : each common value ONCE (unique values).
 *   Version II: each common value as many times as it appears in BOTH (min of the two counts).
 *   The result can be in any order.
 *
 * EXAMPLES
 *                                         Version I      Version II
 *   nums1 = [1, 2, 2, 1], nums2 = [2, 2]  →  [2]           [2, 2]
 *   nums1 = [4, 9, 5], nums2 = [9, 4, 9, 8, 4] → [9, 4]    [9, 4]
 *   nums1 = [1, 2], nums2 = [3]           →  []            []
 *
 * OUTPUT FORMAT
 *   An array of the common values.
 *
 * MEMORY: "Put one array in a SET (or count MAP), then CHECK the other."
 *   STEP 1 → load nums1: a Set of its values (I) or a Map of value → count (II)
 *   STEP 2 → walk nums2: if the value is in the Set (I) / has count > 0 (II) → add it to the result
 *            (I: then remove it from the Set so it's added only once · II: count-- )
 *
 * COST
 *   Brute force: for each element of nums2, search nums1 (includes) → O(n · m)
 *   Set / Map  : O(n + m) time, O(n) space
 *   Both arrays already sorted? Two pointers → O(n + m) time, O(1) extra space
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── BRUTE FORCE (version I): O(n · m) ────────────────────────────────────────
function intersectionBrute(nums1, nums2) {
  const result = [];
  for (const x of nums2) {
    if (nums1.includes(x) && !result.includes(x)) result.push(x);   // includes() is itself a loop
  }
  return result;
}

// ── VERSION I: unique common values, Set ──────────────────────────────────────
function intersection(nums1, nums2) {
  const set1 = new Set(nums1);                    // STEP 1: values of nums1 (duplicates removed)
  const result = [];
  for (const x of nums2) {                        // STEP 2: check each value of nums2
    if (set1.has(x)) {
      result.push(x);                             //   common → add it
      set1.delete(x);                             //   remove so it's added only ONCE
    }
  }
  return result;
}

// ── VERSION II: keep duplicates (min count), Map ─────────────────────────────
function intersectWithCounts(nums1, nums2) {
  const count = new Map();                        // STEP 1: value → how many times in nums1
  for (const x of nums1) count.set(x, (count.get(x) || 0) + 1);

  const result = [];
  for (const x of nums2) {                        // STEP 2: use up nums1's copies
    if (count.get(x) > 0) {
      result.push(x);
      count.set(x, count.get(x) - 1);             //   one copy used
    }
  }
  return result;
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY ITERATION for nums1 = [4, 9, 5], nums2 = [9, 4, 9, 8, 4]
 *
 * VERSION I (Set)                            set1 starts as {4, 9, 5}
 *   x | in set1? | action              | result  | set1 after
 *   --|----------|---------------------|---------|-----------
 *   9 |  yes     | add, delete 9       | [9]     | {4, 5}
 *   4 |  yes     | add, delete 4       | [9, 4]  | {5}
 *   9 |  no      | (already used)      | [9, 4]  | {5}
 *   8 |  no      |                     | [9, 4]  | {5}
 *   4 |  no      | (already used)      | [9, 4]  | {5}
 *   Answer [9, 4]  ✅
 *
 * VERSION II (Map) for nums1 = [1, 2, 2, 1], nums2 = [2, 2]   count starts as {1:2, 2:2}
 *   x | count > 0? | result  | count after
 *   --|------------|---------|------------
 *   2 |  yes (2)   | [2]     | {1:2, 2:1}
 *   2 |  yes (1)   | [2, 2]  | {1:2, 2:0}
 *   Answer [2, 2]  ✅
 *
 * TRAPS
 *   1. Version I must not repeat values: delete from the Set after adding (or collect into a Set).
 *   2. Version II needs COUNTS, not a Set: a Set can't tell you nums1 has two 2s.
 *   3. Ask which version is meant ("unique" or "with duplicates") before coding.
 *   4. Build the Set/Map from the SMALLER array to save memory when sizes differ a lot.
 *
 * INTERVIEW LINE
 *   "I put one array into a Set, or a count Map if duplicates matter, then walk the other array and
 *    keep values that are still available, removing or decrementing as I use them. O(n + m) time.
 *    If both arrays were sorted I'd use two pointers instead and need no extra space."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(intersection([1, 2, 2, 1], [2, 2]));                // [ 2 ]
console.log(intersection([4, 9, 5], [9, 4, 9, 8, 4]));          // [ 9, 4 ]
console.log(intersection([1, 2], [3]));                         // []
console.log(intersectWithCounts([1, 2, 2, 1], [2, 2]));         // [ 2, 2 ]
console.log(intersectWithCounts([4, 9, 5], [9, 4, 9, 8, 4]));   // [ 9, 4 ]
console.log(intersectionBrute([4, 9, 5], [9, 4, 9, 8, 4]));     // [ 9, 4 ] (brute force, same answer)
