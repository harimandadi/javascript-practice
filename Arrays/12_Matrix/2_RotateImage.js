/**
 * Rotate Image (rotate an n × n matrix 90° clockwise)   (LeetCode 48 · Microsoft, Amazon, Apple, Google)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   Given an n × n matrix (an image), rotate it 90 degrees CLOCKWISE, IN PLACE
 *   (don't create another matrix).
 *
 * EXAMPLES
 *   Input :  [[1, 2, 3],          Output:  [[7, 4, 1],
 *             [4, 5, 6],                    [8, 5, 2],
 *             [7, 8, 9]]                    [9, 6, 3]]
 *
 *   Input :  [[1, 2],             Output:  [[3, 1],
 *             [3, 4]]                       [4, 2]]
 *
 * OUTPUT FORMAT
 *   The same matrix, changed in place (this file also returns it for console.log).
 *
 * MEMORY: "TRANSPOSE, then REVERSE each row."
 *   STEP 1 → TRANSPOSE: swap matrix[i][j] with matrix[j][i] (rows become columns)
 *   STEP 2 → REVERSE every row
 *   (Counter-clockwise instead: transpose, then reverse every COLUMN, i.e. reverse the row order.)
 *
 * WHY IT WORKS
 *   Rotating clockwise sends the element at (row i, col j) to (row j, col n-1-i).
 *   Transpose sends (i, j) → (j, i); reversing the row sends (j, i) → (j, n-1-i). Same place.
 *
 * COST
 *   Simple way: build a new matrix: result[j][n-1-i] = matrix[i][j] → O(n²) time, O(n²) space
 *   Optimal   : transpose + reverse in place → O(n²) time, O(1) space
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── SIMPLE WAY: new matrix, O(n²) extra space ────────────────────────────────
function rotateCopy(matrix) {
  const n = matrix.length;
  const result = Array.from({ length: n }, () => new Array(n));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      result[j][n - 1 - i] = matrix[i][j];        // row i becomes column n-1-i
    }
  }
  return result;
}

// ── OPTIMAL: in place, transpose + reverse ────────────────────────────────────
function rotate(matrix) {
  const n = matrix.length;

  // STEP 1: TRANSPOSE (only the part above the diagonal, j > i; otherwise each pair swaps twice)
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  // STEP 2: REVERSE each row
  for (const row of matrix) {
    row.reverse();                                // in place
  }

  return matrix;
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY STEP for [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
 *
 * START             STEP 1: transpose            STEP 2: reverse each row
 *   1  2  3           1  4  7                       7  4  1
 *   4  5  6    →      2  5  8           →           8  5  2
 *   7  8  9           3  6  9                       9  6  3   ✅
 *
 * STEP 1 swaps (i, j) with (j, i) for j > i (the diagonal 1, 5, 9 stays put):
 *   (0,1) ↔ (1,0): 2 ↔ 4
 *   (0,2) ↔ (2,0): 3 ↔ 7
 *   (1,2) ↔ (2,1): 6 ↔ 8
 *
 * CHECK one element: 1 starts at (0,0) → transpose (0,0) → reverse row 0 → (0,2): top-right ✅
 *   (rotating clockwise moves the top-left corner to the top-right)
 *
 * TRAPS
 *   1. In the transpose, loop j from i + 1, not 0: swapping every (i, j) AND (j, i) undoes itself.
 *   2. Clockwise = transpose + reverse ROWS. Reversing the order of the rows instead gives
 *      counter-clockwise.
 *   3. Only for SQUARE matrices in place; an m × n rotation changes the shape (n × m), so it
 *      needs a new matrix.
 *
 * INTERVIEW LINE
 *   "A clockwise rotation is a transpose followed by reversing each row. Transposing swaps
 *    (i, j) with (j, i) above the diagonal; reversing rows finishes the move. Both steps are in
 *    place, so it's O(n²) time and O(1) extra space."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));   // [ [ 7, 4, 1 ], [ 8, 5, 2 ], [ 9, 6, 3 ] ]
console.log(rotate([[1, 2], [3, 4]]));                    // [ [ 3, 1 ], [ 4, 2 ] ]
console.log(rotate([[5]]));                               // [ [ 5 ] ]
console.log(rotateCopy([[1, 2, 3], [4, 5, 6], [7, 8, 9]])); // same answer (new-matrix version)
