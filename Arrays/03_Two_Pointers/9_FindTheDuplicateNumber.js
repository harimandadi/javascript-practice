/**
 * Find the Duplicate Number   (LeetCode 287 · asked at Amazon, Microsoft, Google, Bloomberg)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   nums has n + 1 integers, each between 1 and n. Exactly ONE value is repeated (it may appear
 *   more than twice). Return it.
 *   Rules: do NOT modify the array, and use only O(1) extra space.
 *
 * EXAMPLES
 *   Input : [1, 3, 4, 2, 2]     → Output: 2
 *   Input : [3, 1, 3, 4, 2]     → Output: 3
 *   Input : [3, 3, 3, 3, 3]     → Output: 3
 *
 * OUTPUT FORMAT
 *   A single number: the repeated value.
 *
 * THE TRICK: read the array as a LINKED LIST
 *   Treat each index as a node and nums[i] as "next": 0 → nums[0] → nums[nums[0]] → ...
 *   Two indexes point to the duplicate value, so two arrows enter the same node → a CYCLE,
 *   and the node where the cycle starts IS the duplicate.
 *
 * MEMORY: "Tortoise and hare: MEET in the cycle, then walk to the ENTRANCE."
 *   STEP 1 → slow moves 1 step, fast moves 2 steps, until they MEET (inside the cycle)
 *   STEP 2 → put slow back at the start; move BOTH 1 step at a time; where they meet again is
 *            the cycle's entrance = the duplicate
 *
 * COST
 *   Set              : O(n) time, O(n) space          (breaks the O(1) space rule)
 *   Sort, then compare neighbours: O(n log n), modifies the array (breaks the no-modify rule)
 *   Floyd's cycle detection: O(n) time, O(1) space, array untouched
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── SIMPLE WAY: remember what you've seen, O(n) space ────────────────────────
function findDuplicateSet(nums) {
  const seen = new Set();
  for (const x of nums) {
    if (seen.has(x)) return x;                    // seen before → the duplicate
    seen.add(x);
  }
  return -1;
}

// ── OPTIMAL: Floyd's tortoise and hare, O(1) space ───────────────────────────
function findDuplicate(nums) {
  // STEP 1: find a meeting point inside the cycle
  let slow = nums[0];                             // tortoise: 1 step
  let fast = nums[0];                             // hare:     2 steps
  do {
    slow = nums[slow];                            // slow → next
    fast = nums[nums[fast]];                      // fast → next of next
  } while (slow !== fast);                        // they must meet once both are in the cycle

  // STEP 2: find the cycle's entrance
  slow = nums[0];                                 // slow back to the start
  while (slow !== fast) {                         // both now move 1 step at a time
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;                                    // the entrance = the duplicate value
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY ITERATION for [1, 3, 4, 2, 2]
 *   index: 0  1  2  3  4
 *   nums : 1  3  4  2  2
 *
 * THE LINKED LIST (follow index → nums[index]):
 *   0 → 1 → 3 → 2 → 4
 *               ↑       │
 *               └───────┘        index 3 AND index 4 both point to 2 → the cycle starts at 2
 *
 * STEP 1: meet inside the cycle            (start: slow = fast = nums[0] = 1)
 *   round | slow = nums[slow] | fast = nums[nums[fast]]      | meet?
 *   ------|-------------------|------------------------------|-----------
 *     1   | nums[1] = 3       | nums[nums[1]] = nums[3] = 2  | no
 *     2   | nums[3] = 2       | nums[nums[2]] = nums[4] = 2  | yes, at 2
 *
 * STEP 2: walk to the entrance              (slow = nums[0] = 1, fast stays at 2)
 *   round | slow = nums[slow] | fast = nums[fast] | meet?
 *   ------|-------------------|-------------------|------
 *     1   | nums[1] = 3       | nums[2] = 4       | no
 *     2   | nums[3] = 2       | nums[4] = 2       | yes → 2  ✅
 *
 * WHY STEP 2 WORKS (one line)
 *   The distance from the start to the entrance equals the distance from the meeting point to
 *   the entrance (going around the cycle), so walking both at the same speed meets exactly there.
 *
 * TRAPS
 *   1. Use do...while in STEP 1: slow and fast START equal, so a plain while would stop at once.
 *   2. STEP 1's meeting point is NOT the answer; STEP 2 is required.
 *   3. Only works because values are in 1..n (so nums[x] is always a valid index and index 0 is
 *      never pointed back to, which makes it a clean starting point).
 *
 * INTERVIEW LINE
 *   "With values 1..n in n + 1 slots, I treat each value as a pointer to an index. The duplicate
 *    has two incoming pointers, so it's the entrance of a cycle. Floyd's algorithm finds it: fast
 *    and slow pointers meet in the cycle, then one restarts from the beginning and both move one
 *    step until they meet at the entrance. O(n) time, O(1) space, array unchanged."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(findDuplicate([1, 3, 4, 2, 2]));       // 2
console.log(findDuplicate([3, 1, 3, 4, 2]));       // 3
console.log(findDuplicate([3, 3, 3, 3, 3]));       // 3
console.log(findDuplicate([2, 5, 9, 6, 9, 3, 8, 9, 7, 1])); // 9
console.log(findDuplicateSet([1, 3, 4, 2, 2]));    // 2 (Set version, same answer)
