/**
 * Container With Most Water   (LeetCode 11 · asked at Amazon, Google, Microsoft, Meta, Adobe)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   You are given an array height where height[i] is the height of a vertical line at
 *   position i. Pick TWO lines that, together with the x-axis, hold the MOST water.
 *   Return that maximum amount of water.
 *
 *   water between lines i and j = width × shorter line = (j - i) × min(height[i], height[j])
 *   (the water spills over the SHORTER line, so the shorter one decides the level)
 *
 * EXAMPLES
 *   Input : height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
 *   Output: 49        → lines at index 1 (8) and 8 (7): width 7 × min(8, 7) = 7 × 7 = 49
 *
 *   Input : height = [1, 1]
 *   Output: 1         → width 1 × height 1
 *
 * OUTPUT FORMAT
 *   A single number: the maximum water any two lines can hold.
 *
 * MEMORY: "Start WIDEST, move the SHORTER line in."
 *   STEP 1 → put one pointer at each END (the widest container) and measure the water
 *   STEP 2 → move the pointer at the SHORTER line inward, keep the best; stop when they meet
 *
 * WHY MOVE THE SHORTER LINE?
 *   The water level is limited by the shorter line. Moving the TALLER line inward only makes
 *   the width smaller while the level can't go above the shorter line → it can never be
 *   better. Moving the SHORTER line is the only move that might find a taller wall.
 *
 * COST
 *   Brute force: O(n²) time (every pair)
 *   Optimal    : O(n) time, O(1) space (each step moves one pointer, n steps at most)
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── BRUTE FORCE: O(n²) ── every pair of lines ────────────────────────────────
function maxAreaBrute(height) {
  let best = 0;
  for (let i = 0; i < height.length; i++) {          // left line
    for (let j = i + 1; j < height.length; j++) {    // right line
      const water = (j - i) * Math.min(height[i], height[j]);
      best = Math.max(best, water);
    }
  }
  return best;
}

// ── OPTIMAL: two pointers, O(n) ───────────────────────────────────────────────
function maxArea(height) {
  let left = 0;                                      // STEP 1: one pointer at each END
  let right = height.length - 1;                     //         → the widest container first
  let best = 0;                                      // most water seen so far

  while (left < right) {                             // until the pointers meet
    const width = right - left;                      // distance between the two lines
    const level = Math.min(height[left], height[right]); // water rises only to the SHORTER line
    best = Math.max(best, width * level);            // keep the best container

    // STEP 2: move the SHORTER line inward (the taller one can't help, see WHY above)
    if (height[left] < height[right]) {
      left++;                                        // left is shorter → try the next one to the right
    } else {
      right--;                                       // right is shorter (or equal) → move it left
    }
  }

  return best;
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY ITERATION for height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
 *   index:  0  1  2  3  4  5  6  7  8
 *   height: 1  8  6  2  5  4  8  3  7
 *
 *   step | left (h) | right (h) | width | level = min | water | best | move
 *   -----|----------|-----------|-------|-------------|-------|------|-------------------
 *    1   |  0 (1)   |  8 (7)    |   8   |     1       |   8   |   8  | left  (1 < 7)
 *    2   |  1 (8)   |  8 (7)    |   7   |     7       |  49   |  49  | right (7 < 8)
 *    3   |  1 (8)   |  7 (3)    |   6   |     3       |  18   |  49  | right (3 < 8)
 *    4   |  1 (8)   |  6 (8)    |   5   |     8       |  40   |  49  | right (equal → right)
 *    5   |  1 (8)   |  5 (4)    |   4   |     4       |  16   |  49  | right
 *    6   |  1 (8)   |  4 (5)    |   3   |     5       |  15   |  49  | right
 *    7   |  1 (8)   |  3 (2)    |   2   |     2       |   4   |  49  | right
 *    8   |  1 (8)   |  2 (6)    |   1   |     6       |   6   |  49  | right → pointers meet, stop
 *
 *   Answer 49  ✅  (8 steps for 9 lines → O(n); brute force checks 36 pairs)
 *
 * THE BEST CONTAINER (found at step 2):
 *   index:   0   1   2   3   4   5   6   7   8
 *   height:  1  [8]  6   2   5   4   8   3  [7]
 *                └──────── width 8 - 1 = 7 ───┘
 *   level = min(8, 7) = 7   →   water = 7 × 7 = 49
 *
 * TRAPS
 *   1. The level is the SHORTER line (Math.min), not the taller one, and not the average.
 *   2. Width is right - left (number of gaps), not right - left + 1.
 *   3. Move the SHORTER line. Moving the taller one is the classic wrong answer.
 *   4. Not the same as "Trapping Rain Water": that one sums water over EVERY bar;
 *      this one picks just TWO lines.
 *
 * INTERVIEW LINE
 *   "Start with the widest container, pointers at both ends. The water is width × the shorter
 *    line, so moving the taller line can never help; I always move the shorter one inward
 *    and keep the best. O(n) time, O(1) space, versus O(n²) for checking every pair."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));      // 49
console.log(maxArea([1, 1]));                           // 1
console.log(maxArea([4, 3, 2, 1, 4]));                  // 16 → index 0 and 4: 4 × 4
console.log(maxAreaBrute([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49 (brute force, same answer)
