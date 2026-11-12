/**
 * Finds the characters that appear MORE THAN ONCE (each duplicate listed once).
 * Example: s = "automation" -> ['a', 't', 'o']
 *
 * MEMORY: "COUNT everything, then KEEP the counts bigger than 1."
 *   STEP 1 → frequency map (same line as Anagram)
 *   STEP 2 → walk the map; count > 1 → it's a duplicate
 *
 * Compare with 20_RemoveDuplicateChars.js:
 *   remove duplicates → "automation" -> "automin"      (keep one of everything)
 *   find duplicates   → "automation" -> ['a','t','o']  (list what repeats)   ← this file
 *
 * COST: O(n) time, O(k) space
 *
 * @param {string} s - Input string
 * @returns {string[]} Characters that appear more than once, in first-seen order
 */
function findDuplicateChars(s) {
  // 1. Frequency map
  const counts = {};

  /* ==========================================================
   * ITERATION PHASE 1: count every character ("automation")
   * ========================================================== */
  for (const char of s) {
    // a u t o m a t i o n
    // → { a:2, u:1, t:2, o:2, m:1, i:1, n:1 }
    counts[char] = (counts[char] || 0) + 1;
  }

  // 2. Collect the characters seen more than once
  const duplicates = [];

  /* ==========================================================
   * ITERATION PHASE 2: keep only counts > 1
   * ========================================================== */
  for (const char in counts) {
    // a:2 → keep   u:1 → skip   t:2 → keep   o:2 → keep
    // m:1 → skip   i:1 → skip   n:1 → skip
    if (counts[char] > 1) {
      duplicates.push(char);
    }
  }

  return duplicates;   // ['a', 't', 'o']
}

// --- Test Example ---
console.log(findDuplicateChars("automation"));    // Output: [ 'a', 't', 'o' ]
console.log(findDuplicateChars("programming"));   // Output: [ 'r', 'g', 'm' ]
console.log(findDuplicateChars("abc"));           // Output: []  (no duplicates)

// Variation: ignore case and spaces → "Test Lead"
console.log(findDuplicateChars("Test Lead".toLowerCase().replace(/\s/g, '')));   // Output: [ 't', 'e' ]
