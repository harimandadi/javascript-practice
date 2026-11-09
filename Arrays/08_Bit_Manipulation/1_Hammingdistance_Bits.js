/**
 * Hamming Distance (bits of two integers): Variation 2
 * ─────────────────────────────────────────────────────────────
 * Question : given two NON-NEGATIVE integers x and y, in how many bit positions do they differ?
 *
 *   Input  : x = 1, y = 4
 *   Output : 2
 *              1 → 0 0 1
 *              4 → 1 0 0
 *                  ↑   ↑
 *
 * Memory   : "Make them binary, make them equal, count the mismatches."
 *   STEP 1 → BINARY + EQUAL LENGTH   (toString(2), then pad the shorter one with leading "0"s)
 *   STEP 2 → same POSITION, count the DIFFERENCES   (the same loop as ../07_Compare_By_Index/2_hammingDistance.js)
 *
 * Time     : O(b)  (b = number of bits in the bigger number; at most 32 for normal integers)
 * Space    : O(b)  (the two binary strings)
 *
 * @param {number} x - non-negative integer
 * @param {number} y - non-negative integer
 * @return {number}
 */
function hammingDistance(x, y) {
  // STEP 1: BINARY + EQUAL LENGTH
  x = x.toString(2);                  // number → binary string:  2 → "10"
  y = y.toString(2);                  //                          9 → "1001"

  if (x.length < y.length) {          // x is shorter?
    while (x.length !== y.length) {   //   keep adding a "0" in FRONT of x
      x = '0' + x;                    //   ("0" in front doesn't change the value: "10" = "0010")
    }
  } else {                            // y is shorter (or the same length → loop doesn't run)
    while (x.length !== y.length) {   //   keep adding a "0" in FRONT of y
      y = '0' + y;
    }
  }
  // now aligned: x = "0010", y = "1001"
  // (shortcut for the whole if/else: const len = Math.max(x.length, y.length);
  //  x = x.padStart(len, '0'); y = y.padStart(len, '0');)

  // STEP 2: same POSITION, count the DIFFERENCES
  let distance = 0;                   // number of different bits so far
  for (let i = 0; i < x.length; i++) {
    if (x[i] !== y[i]) {              // bit at position i differs?
      distance++;                     //   → one more mismatch
    }
  }

  return distance;                    // total differing bits
}

/*
 * ─────────────────────────────────────────────────────────────
 * EVERY ITERATION for x = 2, y = 9
 *
 * STEP 1 (binary + equal length)
 *   2 → "10"     9 → "1001"
 *   x is shorter → pad x:  "10" → "010" → "0010"
 *
 * STEP 2 (compare position by position)
 *    i:   0   1   2   3
 *    x:   0   0   1   0      (2)
 *    y:   1   0   0   1      (9)
 *         ✗   ✓   ✗   ✗
 *
 *   i | x[i] | y[i] | same? | distance
 *   --|------|------|-------|---------
 *   0 |  0   |  1   |   ✗   |   1
 *   1 |  0   |  0   |   ✓   |   1
 *   2 |  1   |  0   |   ✗   |   2
 *   3 |  0   |  1   |   ✗   |   3   ✅
 *
 *   Answer 3
 *
 * SAME IDEA for x = 1, y = 4:  "001" vs "100" → ✗ ✓ ✗ → 2
 *
 * TWO TRAPS
 *   1. Pad at the FRONT ("0" + x), never the back: "10" + "00" = "1000" = 8, a different number!
 *   2. Negative numbers: (-5).toString(2) is "-101" (a minus sign, not real bits) → this
 *      version is for non-negative integers only; the XOR version below handles 32-bit values
 *
 * INTERVIEW FOLLOW-UP: the bit-trick version (no strings)
 *   XOR (^) gives 1 exactly where the bits differ, so count the 1s:
 *     2 ^ 9 = 0010 ^ 1001 = 1011 → three 1s → 3
 *
 *     function hammingDistanceXor(x, y) {
 *       let xor = x ^ y;          // 1 wherever the bits differ
 *       let count = 0;
 *       while (xor !== 0) {
 *         count += xor & 1;       // is the last bit 1?
 *         xor >>>= 1;             // shift right to look at the next bit
 *       }
 *       return count;
 *     }
 * ─────────────────────────────────────────────────────────────
 */

// --- TEST IT IN VS CODE ---
console.log(hammingDistance(2, 9)); // 3 → "0010" vs "1001"
console.log(hammingDistance(1, 4)); // 2 → "001"  vs "100"
console.log(hammingDistance(7, 7)); // 0 → same number
console.log(hammingDistance(0, 8)); // 1 → "0000" vs "1000"
