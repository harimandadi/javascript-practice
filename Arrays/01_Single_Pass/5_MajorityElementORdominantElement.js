/**
 * Majority Element   (LeetCode 169)
 * ═════════════════════════════════════════════════════════════════════════════
 * Question : return the element that appears MORE THAN n/2 times.
 *            (The problem guarantees such an element exists.)
 *
 *   Input : [2, 2, 1, 1, 1, 2, 2]  → Output: 2   (2 appears 4 times out of 7)
 *   Input : [3, 2, 3]              → Output: 3
 *
 * MEMORY: "Majority SURVIVES the cancelling."
 *   STEP 1 → count = 0 → the current number becomes the CANDIDATE
 *   STEP 2 → same as candidate → vote +1; different → vote −1 (one of each cancels out)
 *   The majority appears more than all the others together, so it is the one left standing.
 *
 * APPROACHES (best last)
 *   1. Brute force : count each number                 → O(n²) time, O(1) space
 *   2. Sort        : the middle element is the majority → O(n log n) time
 *   3. Hash map    : count every number once           → O(n) time, O(n) space
 *   4. Boyer-Moore : voting (your version)             → O(n) time, O(1) space  ✅ BEST
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── 4. BEST: Boyer-Moore Voting Algorithm, O(n) time, O(1) space ─────────────
function majorityElement(nums) {
  let count = 0;                       // votes for the current candidate
  let candidate = null;                // who we think the majority is (nobody yet)

  for (let num of nums) {              // ONE pass over the array
    // STEP 1: no votes left → this number becomes the new candidate
    if (count === 0) {
      candidate = num;
    }

    // STEP 2: vote
    if (num === candidate) {
      count = count + 1;               // same as candidate → +1 (a supporter)
    } else {
      count = count - 1;               // different → −1 (one supporter and this number cancel out)
    }
  }

  return candidate;                    // the one left standing
}

/*
 * EVERY ITERATION for [2, 2, 1, 1, 1, 2, 2]      start: count = 0, candidate = null
 *
 *   i | num | count === 0 ?          | num === candidate ? | count after | candidate
 *   --|-----|------------------------|---------------------|-------------|----------
 *   0 |  2  | yes → candidate = 2    | yes → +1            |     1       |    2
 *   1 |  2  | no                     | yes → +1            |     2       |    2
 *   2 |  1  | no                     | no  → −1            |     1       |    2
 *   3 |  1  | no                     | no  → −1            |     0       |    2
 *   4 |  1  | yes → candidate = 1    | yes → +1            |     1       |    1
 *   5 |  2  | no                     | no  → −1            |     0       |    1
 *   6 |  2  | yes → candidate = 2    | yes → +1            |     1       |    2  ✅
 *
 *   Answer 2
 *
 * PICTURE: pair each 2 with a 1 and remove both
 *   2 2 2 2      ← four 2s
 *   1 1 1        ← three 1s
 *   after cancelling three pairs, one 2 is left → 2 is the majority
 *
 * TRAPS
 *   1. The candidate in the MIDDLE of the loop can be wrong (it was 1 at i = 4). Only the
 *      FINAL candidate is the answer.
 *   2. This only works when a majority (more than n/2) is GUARANTEED. If it might not exist
 *      ([1, 2, 3]), count the candidate again at the end (see majorityElementVerified below).
 *   3. More than n/3 (up to two answers) needs TWO candidates: see 10_MajorityElementII.js.
 */

// ── 1. BRUTE FORCE: count each number, O(n²) ──────────────────────────────────
function majorityElementBrute(nums) {
  for (const x of nums) {
    const times = nums.filter((y) => y === x).length;   // a full scan for EACH number
    if (times > nums.length / 2) return x;
  }
  return null;
}

// ── 2. SORT: after sorting, the middle element must be the majority, O(n log n) ──
function majorityElementSort(nums) {
  const sorted = [...nums].sort((a, b) => a - b);       // copy + NUMERIC sort
  return sorted[Math.floor(sorted.length / 2)];         // the majority covers the middle position
  // [2, 2, 1, 1, 1, 2, 2] → sorted [1, 1, 1, 2, 2, 2, 2] → middle index 3 → 2
}

// ── 3. HASH MAP: count every number once, O(n) time but O(n) space ───────────
function majorityElementMap(nums) {
  const counts = new Map();                             // number → how many times
  for (const x of nums) {
    counts.set(x, (counts.get(x) || 0) + 1);
    if (counts.get(x) > nums.length / 2) return x;      // stop as soon as it passes n/2
  }
  return null;
}

// ── Boyer-Moore + VERIFY: when a majority is NOT guaranteed ─────────────────
function majorityElementVerified(nums) {
  const candidate = majorityElement(nums);              // pass 1: find the candidate
  const times = nums.filter((x) => x === candidate).length;   // pass 2: count it
  return times > nums.length / 2 ? candidate : null;    // null = no majority
}

/*
 * WHICH ONE TO SAY IN AN INTERVIEW
 *   "Brute force counts every number: O(n²). A hash map makes it O(n) but uses O(n) memory.
 *    Sorting puts the majority in the middle: O(n log n). Boyer-Moore voting is O(n) time and
 *    O(1) space: a different number cancels one vote, and because the majority appears more
 *    than all the others combined, it's the candidate left at the end. If a majority isn't
 *    guaranteed, I count the candidate once more to confirm."
 */

// --- Method Call ---
let nums = [2, 2, 1, 1, 1, 2, 2];
let result = majorityElement(nums);

// Display the result in the console
console.log("The majority element is:", result);

// --- Compare the approaches ---
console.log('Brute force :', majorityElementBrute(nums));          // 2
console.log('Sort        :', majorityElementSort(nums));           // 2
console.log('Hash map    :', majorityElementMap(nums));            // 2
console.log('No majority :', majorityElementVerified([1, 2, 3]));  // null (Boyer-Moore alone would say 3)
