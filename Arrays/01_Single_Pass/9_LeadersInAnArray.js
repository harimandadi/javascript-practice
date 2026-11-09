/**
 * Leaders in an Array   (GeeksforGeeks classic · asked at Flipkart, Amazon, Paytm, PayU, Adobe India)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   An element is a LEADER if it is STRICTLY GREATER than every element to its RIGHT.
 *   The last element is always a leader (nothing is to its right).
 *   Return all leaders in the order they appear in the array.
 *
 * EXAMPLES
 *   Input : [16, 17, 4, 3, 5, 2]
 *   Output: [17, 5, 2]       → 17 > 4,3,5,2 · 5 > 2 · 2 is last
 *
 *   Input : [1, 2, 3, 4, 0]
 *   Output: [4, 0]
 *
 *   Input : [7, 7, 7]
 *   Output: [7]              → "strictly greater": only the last 7
 *
 * OUTPUT FORMAT
 *   An array of the leaders, left to right.
 *
 * MEMORY: "Walk from the RIGHT, carrying the biggest seen so far."
 *   STEP 1 → start at the END with maxFromRight = -Infinity
 *   STEP 2 → moving left: if arr[i] > maxFromRight, it's a leader → save it and update the max;
 *            reverse the saved list at the end (it was collected right-to-left)
 *
 * WHY FROM THE RIGHT?
 *   "Greater than everything to the right" only needs ONE number: the maximum to the right.
 *   Walking from the right, that maximum is already known at every step.
 *
 * COST
 *   Brute force: for each element, check everything to its right → O(n²)
 *   Optimal    : one pass from the right → O(n) time, O(1) extra space (besides the output)
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── BRUTE FORCE: O(n²) ────────────────────────────────────────────────────────
function leadersBrute(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    let isLeader = true;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] >= arr[i]) { isLeader = false; break; }  // someone on the right is as big or bigger
    }
    if (isLeader) result.push(arr[i]);
  }
  return result;
}

// ── OPTIMAL: one pass from the right, O(n) ───────────────────────────────────
function leaders(arr) {
  const result = [];
  let maxFromRight = -Infinity;                   // STEP 1: nothing seen yet on the right

  for (let i = arr.length - 1; i >= 0; i--) {     // STEP 2: walk RIGHT → LEFT
    if (arr[i] > maxFromRight) {                  //   bigger than everything to its right?
      result.push(arr[i]);                        //   → a leader
      maxFromRight = arr[i];                      //   → the new biggest seen
    }
  }

  return result.reverse();                        // collected right-to-left → restore array order
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY ITERATION for [16, 17, 4, 3, 5, 2]
 *   index:  0   1   2  3  4  5
 *   arr  :  16  17  4  3  5  2
 *
 *   i | arr[i] | maxFromRight (before) | arr[i] > max? | leaders (collected) | max after
 *   --|--------|-----------------------|---------------|---------------------|----------
 *   5 |   2    |      -Infinity        |  yes          | [2]                 |    2
 *   4 |   5    |          2            |  yes          | [2, 5]              |    5
 *   3 |   3    |          5            |  no           | [2, 5]              |    5
 *   2 |   4    |          5            |  no           | [2, 5]              |    5
 *   1 |  17    |          5            |  yes          | [2, 5, 17]          |   17
 *   0 |  16    |         17            |  no           | [2, 5, 17]          |   17
 *
 *   reverse → [17, 5, 2]  ✅
 *
 * TRAPS
 *   1. Strictly greater (>), so equal values are not leaders: [7, 7, 7] → [7]. Some versions of
 *      the question say "greater than or equal"; ask, and switch > to >= if so.
 *   2. Reverse at the end (or use unshift, which is O(n) per call → O(n²) overall).
 *   3. Start with -Infinity, not 0, so negative numbers work: [-3, -5] → [-3, -5].
 *
 * INTERVIEW LINE
 *   "A leader only has to beat the maximum to its right, so I scan from the right with a running
 *    max: every element bigger than it is a leader and becomes the new max. One pass, O(n) time,
 *    then I reverse to return them in the original order."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(leaders([16, 17, 4, 3, 5, 2]));       // [ 17, 5, 2 ]
console.log(leaders([1, 2, 3, 4, 0]));            // [ 4, 0 ]
console.log(leaders([7, 7, 7]));                  // [ 7 ]
console.log(leaders([-3, -5]));                   // [ -3, -5 ]
console.log(leadersBrute([16, 17, 4, 3, 5, 2]));  // [ 17, 5, 2 ] (brute force, same answer)
