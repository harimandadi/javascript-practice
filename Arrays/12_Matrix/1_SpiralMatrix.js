/**
 * Spiral Matrix   (LeetCode 54 · asked at Microsoft, Amazon, Google, Apple, Adobe)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   Given an m × n matrix (array of rows), return all its elements in SPIRAL order:
 *   left→right along the top, top→bottom down the right side, right→left along the bottom,
 *   bottom→top up the left side, then repeat for the inner layer.
 *
 * EXAMPLES
 *   Input :  [[1, 2, 3],
 *             [4, 5, 6],
 *             [7, 8, 9]]
 *   Output: [1, 2, 3, 6, 9, 8, 7, 4, 5]
 *
 *   Input :  [[1,  2,  3,  4],
 *             [5,  6,  7,  8],
 *             [9, 10, 11, 12]]
 *   Output: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
 *
 * OUTPUT FORMAT
 *   A flat array with all m × n values in spiral order.
 *
 * MEMORY: "Four walls: walk a side, then move that wall IN."
 *   STEP 1 → four boundaries: top, bottom, left, right
 *   STEP 2 → walk → top row, ↓ right column, ← bottom row, ↑ left column;
 *            after each side, move that boundary inward (top++, right--, bottom--, left++)
 *            and stop when the walls cross
 *
 * COST
 *   O(m·n) time (each cell visited once), O(1) extra space besides the output
 * ═════════════════════════════════════════════════════════════════════════════
 */

function spiralOrder(matrix) {
  const result = [];
  if (matrix.length === 0) return result;

  let top = 0;                                   // STEP 1: the four walls
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {       // STEP 2: until the walls cross
    for (let c = left; c <= right; c++) result.push(matrix[top][c]);      // → along the top row
    top++;                                                                // top row done

    for (let r = top; r <= bottom; r++) result.push(matrix[r][right]);    // ↓ down the right column
    right--;                                                              // right column done

    if (top <= bottom) {                                                  // a bottom row still exists?
      for (let c = right; c >= left; c--) result.push(matrix[bottom][c]); // ← along the bottom row
      bottom--;
    }

    if (left <= right) {                                                  // a left column still exists?
      for (let r = bottom; r >= top; r--) result.push(matrix[r][left]);   // ↑ up the left column
      left++;
    }
  }

  return result;
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY ITERATION for [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
 *
 *        col 0  1  2
 *   row 0   [1, 2, 3]
 *   row 1   [4, 5, 6]
 *   row 2   [7, 8, 9]
 *
 *   layer | walls (top,bottom,left,right) | side        | cells        | result so far
 *   ------|-------------------------------|-------------|--------------|-----------------------------
 *     1   | 0, 2, 0, 2                    | → top row 0 | 1 2 3        | [1,2,3]               top = 1
 *         | 1, 2, 0, 2                    | ↓ col 2     | 6 9          | [1,2,3,6,9]           right = 1
 *         | 1, 2, 0, 1                    | ← row 2     | 8 7          | [1,2,3,6,9,8,7]       bottom = 1
 *         | 1, 1, 0, 1                    | ↑ col 0     | 4            | [1,2,3,6,9,8,7,4]     left = 1
 *     2   | 1, 1, 1, 1                    | → row 1     | 5            | [1,2,3,6,9,8,7,4,5]   top = 2
 *         | 2, 1, 1, 1                    | ↓ col 1     | (none)       |                       right = 0
 *         | top > bottom → skip ←;  left > right → skip ↑;  walls crossed → stop
 *
 *   Answer [1, 2, 3, 6, 9, 8, 7, 4, 5]  ✅
 *
 * PICTURE:
 *   1 → 2 → 3
 *             ↓
 *   4 → 5     6
 *   ↑         ↓
 *   7 ← 8 ← 9
 *
 * TRAPS
 *   1. The two `if` checks before ← and ↑ matter for NON-SQUARE matrices: in a single middle row
 *      or column, without them the same cells are added twice (try the 3 × 4 example).
 *   2. Move each wall right after walking its side, so corners aren't repeated.
 *   3. Rows are matrix[r], columns are matrix[r][c]: matrix[top][c] walks a ROW.
 *
 * INTERVIEW LINE
 *   "I keep four boundaries and peel the matrix layer by layer: top row, right column, bottom row,
 *    left column, shrinking the matching boundary after each side. Two checks stop me from
 *    re-reading a single leftover row or column. O(m·n) time, O(1) extra space."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));
// [ 1, 2, 3, 6, 9, 8, 7, 4, 5 ]
console.log(spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]));
// [ 1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7 ]
console.log(spiralOrder([[1], [2], [3]]));      // [ 1, 2, 3 ]  (single column)
console.log(spiralOrder([]));                   // []
