/**
 * Trapping Rain Water   (LeetCode 42 · asked at Amazon, Google, Microsoft, Meta, Goldman Sachs)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   height[i] is the height of a bar of width 1. After it rains, how much water is trapped
 *   between the bars?
 *
 *   Water above bar i = min(tallest bar on its LEFT, tallest bar on its RIGHT) - height[i]
 *   (water rises to the lower of the two walls around it; never below 0)
 *
 * EXAMPLES
 *   Input : height = [4, 2, 0, 3, 2, 5]
 *   Output: 9
 *
 *   Input : height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
 *   Output: 6
 *
 * OUTPUT FORMAT
 *   A single number: the total units of trapped water.
 *
 * MEMORY: "The LOWER side decides; process it and move it in."
 *   STEP 1 → two pointers at the ends, plus leftMax and rightMax (tallest bar seen from each side)
 *   STEP 2 → the side with the LOWER bar is the safe one to process:
 *            update its max, add (max - height) water, move that pointer inward
 *
 * WHY THE LOWER SIDE IS SAFE
 *   If height[left] < height[right], there is a wall at least height[right] on the right, so
 *   the water at `left` is limited only by leftMax. We know leftMax exactly → we can add it now.
 *
 * COST
 *   Brute force   : for each bar, scan left and right for the max → O(n²)
 *   Prefix arrays : precompute leftMax[] and rightMax[] → O(n) time, O(n) space
 *   Two pointers  : O(n) time, O(1) space
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── BRUTE FORCE: O(n²) ── apply the formula to every bar directly ────────────
function trapBrute(height) {
  let water = 0;
  for (let i = 0; i < height.length; i++) {
    let leftMax = 0, rightMax = 0;
    for (let j = 0; j <= i; j++) leftMax = Math.max(leftMax, height[j]);              // tallest on the left (incl. i)
    for (let j = i; j < height.length; j++) rightMax = Math.max(rightMax, height[j]); // tallest on the right (incl. i)
    water += Math.min(leftMax, rightMax) - height[i];
  }
  return water;
}

// ── OPTIMAL: two pointers, O(n) time, O(1) space ─────────────────────────────
function trap(height) {
  let left = 0;                                 // STEP 1: pointers at both ends
  let right = height.length - 1;
  let leftMax = 0;                              //   tallest bar seen from the left so far
  let rightMax = 0;                             //   tallest bar seen from the right so far
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {         // STEP 2: left side is LOWER → process it
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];          //   water above this bar (0 if it's the new max)
      left++;
    } else {                                    //   right side is lower (or equal) → process it
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--;
    }
  }

  return water;
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY ITERATION for height = [4, 2, 0, 3, 2, 5]
 *   index:  0  1  2  3  4  5
 *   height: 4  2  0  3  2  5
 *
 *   step | left (h) | right (h) | lower side | max on that side | water added  | total
 *   -----|----------|-----------|------------|------------------|--------------|------
 *    1   |  0 (4)   |  5 (5)    |  left      | leftMax = 4      | 4 - 4 = 0    |  0
 *    2   |  1 (2)   |  5 (5)    |  left      | leftMax = 4      | 4 - 2 = 2    |  2
 *    3   |  2 (0)   |  5 (5)    |  left      | leftMax = 4      | 4 - 0 = 4    |  6
 *    4   |  3 (3)   |  5 (5)    |  left      | leftMax = 4      | 4 - 3 = 1    |  7
 *    5   |  4 (2)   |  5 (5)    |  left      | leftMax = 4      | 4 - 2 = 2    |  9
 *   left = right = 5 → stop
 *
 *   Answer 9  ✅
 *
 * PICTURE (# = bar, ~ = water):
 *        5 |                #
 *        4 | #  ~  ~  ~  ~  #
 *        3 | #  ~  ~  #  ~  #
 *        2 | #  #  ~  #  #  #
 *        1 | #  #  ~  #  #  #
 *            0  1  2  3  4  5
 *   water per bar: 0 + 2 + 4 + 1 + 2 + 0 = 9
 *
 * TRAPS
 *   1. Water at a bar is min(leftMax, rightMax) - height, NOT max.
 *   2. Process the LOWER side. Processing the higher side could add water that a lower,
 *      not-yet-seen wall on the other side would let escape.
 *   3. Update the max BEFORE adding water, so a new tallest bar adds 0 (not negative).
 *   4. Different from "Container With Most Water" (5_ContainerWithMostWater.js): that picks TWO lines; this sums the
 *      water above EVERY bar.
 *
 * INTERVIEW LINE
 *   "Water above each bar is the lower of the tallest bars on its left and right, minus its
 *    height. Brute force recomputes those maxes: O(n²). Prefix arrays make it O(n) with O(n)
 *    space. With two pointers I always process the lower side, because its max is the real
 *    limit, which gives O(n) time and O(1) space."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(trap([4, 2, 0, 3, 2, 5]));                       // 9
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));     // 6
console.log(trap([1, 2, 3]));                                // 0 (water runs off: no right wall)
console.log(trap([]));                                       // 0
console.log(trapBrute([4, 2, 0, 3, 2, 5]));                  // 9 (brute force, same answer)
