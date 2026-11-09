/**
 * Hamming Distance (strings)
 * ─────────────────────────────────────────────────────────────
 * Question : given two strings x and y, how many positions have DIFFERENT characters?
 *            (Hamming distance is only defined for strings of the SAME length)
 *
 *   Input  : x = "hello", y = "hwllr"
 *   Output : 2
 *              hello
 *              hwllr
 *               ↑  ↑
 *
 * Memory   : "Line them up, count the mismatches."
 *   STEP 1 → same LENGTH?                       (if not → error)
 *   STEP 2 → same POSITION, count the DIFFERENCES  (one loop)
 *
 * Time     : O(n)   (one pass over n characters)
 * Space    : O(1)   (one counter)
 *
 * @param {string} x
 * @param {string} y
 * @return {number}
 */
function hammingDistance(x, y) {
  // STEP 1: same LENGTH?
  if (x.length !== y.length) {                           // Hamming distance is only defined
    throw new Error('Strings must be of same length');   // for equal lengths → fail loudly
  }

  // STEP 2: same POSITION, count the DIFFERENCES
  let distance = 0;                                      // number of mismatches so far
  for (let i = 0; i < x.length; i++) {                   // ONE index walks BOTH strings together
    if (x[i] !== y[i]) {                                 // characters at position i differ?
      distance++;                                        //   → one more mismatch
    }
  }

  return distance;                                       // total mismatched positions
}

/*
 * ─────────────────────────────────────────────────────────────
 * EVERY ITERATION for "hello" vs "hwllr"
 *
 *    i:   0   1   2   3   4
 *    x:   h   e   l   l   o
 *    y:   h   w   l   l   r
 *         ✓   ✗   ✓   ✓   ✗
 *
 *   i | x[i] | y[i] | same? | distance
 *   --|------|------|-------|---------
 *   0 |  h   |  h   |   ✓   |   0
 *   1 |  e   |  w   |   ✗   |   1
 *   2 |  l   |  l   |   ✓   |   1
 *   3 |  l   |  l   |   ✓   |   1
 *   4 |  o   |  r   |   ✗   |   2   ✅
 *
 *   Answer 2 → positions 1 (e/w) and 4 (o/r). One loop of 5 steps → O(n)
 *
 * TWO TRAPS
 *   1. Check the length FIRST → without it, "abc" vs "ab" compares 'c' with undefined
 *      and silently counts it as a mismatch
 *   2. Use !== (strict) → never converts types; a good habit even for characters
 *
 * INTERVIEW FOLLOW-UPS
 *   One-liner : [...x].filter((ch, i) => ch !== y[i]).length
 *   Numbers   : compare the BITS instead → see ../08_Bit_Manipulation/1_Hammingdistance_Bits.js
 * ─────────────────────────────────────────────────────────────
 */

// --- TEST IT IN VS CODE ---
console.log('Hamming Distance:', hammingDistance('hello', 'hwllr')); // 2
console.log('Hamming Distance:', hammingDistance('abc', 'abc'));     // 0 → identical
console.log('Hamming Distance:', hammingDistance('', ''));           // 0 → loop never runs
// hammingDistance('abc', 'ab');                                     // throws: Strings must be of same length
