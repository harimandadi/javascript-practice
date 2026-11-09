/**
 * Set Matrix Zeroes   (LeetCode 73 · asked at Microsoft, Amazon, Meta, Oracle)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   Given an m × n matrix, if an element is 0, set its ENTIRE ROW and ENTIRE COLUMN to 0.
 *   Do it in place. Follow-up: use O(1) extra space.
 *
 * EXAMPLES
 *   Input :  [[1, 1, 1],          Output:  [[1, 0, 1],
 *             [1, 0, 1],                    [0, 0, 0],
 *             [1, 1, 1]]                    [1, 0, 1]]
 *
 *   Input :  [[0, 1, 2, 0],       Output:  [[0, 0, 0, 0],
 *             [3, 4, 5, 2],                 [0, 4, 5, 0],
 *             [1, 3, 1, 5]]                 [0, 3, 1, 0]]
 *
 * OUTPUT FORMAT
 *   The same matrix, changed in place (this file also returns it for console.log).
 *
 * MEMORY: "FIND first, ZERO later."
 *   STEP 1 → FIND: scan the whole matrix and note which rows and columns contain a 0
 *   STEP 2 → ZERO: scan again and set matrix[r][c] = 0 if row r OR column c was noted
 *
 * WHY NOT ZERO WHILE SCANNING?
 *   A 0 you just wrote looks exactly like an original 0. The scan would then zero ITS row and
 *   column too, and the zeros spread over the whole matrix.
 *
 * COST
 *   Two sets (rows, cols)      : O(m·n) time, O(m + n) space   ← clear, good first answer
 *   First row/column as markers: O(m·n) time, O(1) space       ← the follow-up (below)
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── CLEAR VERSION: remember rows and columns in two Sets, O(m + n) space ─────
function setZeroes(matrix) {
  const zeroRows = new Set();                     // rows that contain a 0
  const zeroCols = new Set();                     // columns that contain a 0

  // STEP 1: FIND every original 0
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[0].length; c++) {
      if (matrix[r][c] === 0) {
        zeroRows.add(r);
        zeroCols.add(c);
      }
    }
  }

  // STEP 2: ZERO every cell whose row or column was found
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[0].length; c++) {
      if (zeroRows.has(r) || zeroCols.has(c)) {
        matrix[r][c] = 0;
      }
    }
  }

  return matrix;
}

// ── FOLLOW-UP: O(1) space ── use the first row and first column as the "sets" ─
function setZeroesConstantSpace(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const firstRowHasZero = matrix[0].includes(0);              // remember these two BEFORE
  const firstColHasZero = matrix.some((row) => row[0] === 0); // using them as markers

  // STEP 1: FIND → mark in the first row / first column
  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      if (matrix[r][c] === 0) {
        matrix[r][0] = 0;                         // "row r must be zeroed"
        matrix[0][c] = 0;                         // "column c must be zeroed"
      }
    }
  }

  // STEP 2: ZERO the inner cells using the markers
  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      if (matrix[r][0] === 0 || matrix[0][c] === 0) matrix[r][c] = 0;
    }
  }

  // Finally the first row and column themselves (LAST, because they held the markers)
  if (firstRowHasZero) for (let c = 0; c < cols; c++) matrix[0][c] = 0;
  if (firstColHasZero) for (let r = 0; r < rows; r++) matrix[r][0] = 0;

  return matrix;
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY STEP for [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]   (clear version)
 *
 *            col 0  1  2  3
 *   row 0      [0, 1, 2, 0]
 *   row 1      [3, 4, 5, 2]
 *   row 2      [1, 3, 1, 5]
 *
 * STEP 1: FIND
 *   cell (r,c) | value | zeroRows | zeroCols
 *   -----------|-------|----------|---------
 *   (0,0)      |   0   | {0}      | {0}
 *   (0,3)      |   0   | {0}      | {0, 3}
 *   (no other 0s)
 *
 * STEP 2: ZERO (row in {0} OR column in {0, 3})
 *   row 0: whole row in zeroRows            → [0, 0, 0, 0]
 *   row 1: columns 0 and 3 are in zeroCols  → [0, 4, 5, 0]
 *   row 2: columns 0 and 3 are in zeroCols  → [0, 3, 1, 0]
 *
 *   Answer [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]  ✅
 *
 * TRAPS
 *   1. Don't zero during the FIND scan (the zeros would spread; see WHY above).
 *   2. In the O(1) version, check the first row and first column for zeros BEFORE writing markers
 *      into them, and zero them LAST.
 *   3. matrix[0].length is the number of COLUMNS; matrix.length is the number of ROWS.
 *
 * INTERVIEW LINE
 *   "Two passes: first record which rows and columns contain a zero, then zero every cell in
 *    those rows or columns. Zeroing during the first pass would make new zeros look like original
 *    ones. With sets that's O(m + n) space; for O(1) I store the markers in the first row and
 *    column and handle those two separately, last."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(setZeroes([[1, 1, 1], [1, 0, 1], [1, 1, 1]]));
// [ [ 1, 0, 1 ], [ 0, 0, 0 ], [ 1, 0, 1 ] ]
console.log(setZeroes([[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]));
// [ [ 0, 0, 0, 0 ], [ 0, 4, 5, 0 ], [ 0, 3, 1, 0 ] ]
console.log(setZeroesConstantSpace([[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]));
// same answer (O(1)-space version)
