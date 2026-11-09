/**
 * Compresses a string by counting consecutive repeating characters.
 * Example: "aabcccccaaa" -> "a2b1c5a3"
 * 
 * @param {string} s - Input string
 * @returns {string} Compressed string (or original if compression doesn't make it smaller)
 */
function compressString(s) {
  // 1. Handle edge cases
  if (!s || s.length === 0) return "";
  
  let compressed = "";
  let count = 0;

  // 2. Iterate through the string
  for (let i = 0; i < s.length; i++) {
    count++;
    
    // If we are at the last character or the next character is different
    if (i + 1 >= s.length || s[i] !== s[i + 1]) {
      compressed += s[i] + count;
      count = 0; // Reset count for the next sequence
    }
  }

  // 3. Return compressed string only if it's shorter than the original
  return compressed.length < s.length ? compressed : s;
}


/* ==========================================================
 * DRY RUN WALKTHROUGH (Input: "aab")
 * ==========================================================
 * 
 * Initial state: 
 *   s = "aab", s.length = 3
 *   compressed = ""
 *   count = 0
 * 
 * --- Iteration 1 (i = 0) ---
 *   - count increments to 1.
 *   - Check condition: i + 1 (1) >= 3 is false. 
 *     s[0] ('a') === s[1] ('a') is true. 
 *     -> Skips the if block. Continue.
 * 
 * --- Iteration 2 (i = 1) ---
 *   - count increments to 2.
 *   - Check condition: i + 1 (2) >= 3 is false. 
 *     s[1] ('a') !== s[2] ('b') is true. 
 *     -> Enters the if block:
 *        - compressed becomes "" + "a" + 2 = "a2"
 *        - count resets to 0.
 * 
 * --- Iteration 3 (i = 2) ---
 *   - count increments to 1.
 *   - Check condition: i + 1 (3) >= 3 is true (out of bounds). 
 *     -> Enters the if block:
 *        - compressed becomes "a2" + "b" + 1 = "a2b1"
 *        - count resets to 0.
 * 
 * --- Final Step ---
 *   - Check length: compressed.length (4) < s.length (3) is false.
 *   - Returns original string: "aab"
 * ========================================================== */

// --- Test Example ---
console.log(compressString("aab")); // Output: "aab"