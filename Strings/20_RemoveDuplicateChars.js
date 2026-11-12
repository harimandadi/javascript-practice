/**
 * Removes duplicate characters, keeping only the FIRST occurrence of each one.
 * Example: s = "programming" -> "progamin"
 *
 * MEMORY: "Remember what you've SEEN. First time → keep it. Seen before → skip it."
 *   STEP 1 → an empty Set called seen, and an empty result
 *   STEP 2 → for each character: not in seen? add to result AND to seen
 *
 * COST: O(n) time, O(k) space (k = number of different characters)
 *
 * @param {string} s - Input string
 * @returns {string} The string with duplicates removed (original order kept)
 */
function removeDuplicateChars(s) {
  // 1. Set = a list that can't hold the same value twice; .has() is a fast lookup
  const seen = new Set();
  let result = '';

  /* ==========================================================
   * ITERATION PHASE: keep a character only the first time ("programming")
   * ========================================================== */
  for (const char of s) {
    // 'p' new  -> keep  → result "p"
    // 'r' new  -> keep  → result "pr"
    // 'o' new  -> keep  → result "pro"
    // 'g' new  -> keep  → result "prog"
    // 'r' seen -> skip
    // 'a' new  -> keep  → result "proga"
    // 'm' new  -> keep  → result "progam"
    // 'm' seen -> skip
    // 'i' new  -> keep  → result "progami"
    // 'n' new  -> keep  → result "progamin"
    // 'g' seen -> skip
    if (!seen.has(char)) {
      seen.add(char);        // remember it
      result += char;        // keep it
    }
  }

  return result;
}

// --- Test Example ---
console.log(removeDuplicateChars("programming"));   // Output: "progamin"
console.log(removeDuplicateChars("automation"));    // Output: "automin"
console.log(removeDuplicateChars("aabbcc"));        // Output: "abc"
console.log(removeDuplicateChars(""));              // Output: ""

// One-line version: a Set keeps the first occurrence in order
console.log([...new Set("programming")].join(''));  // Output: "progamin"

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * QUICK STEPS (English → code)
 * MEMORY: "Remember what you've SEEN. First time → keep. Seen before → skip."
 * ═════════════════════════════════════════════════════════════════════════════
 * 1. Seen set + empty result           const seen = new Set(); let result = '';
 * 2. Not seen → remember and keep      if (!seen.has(char)) { seen.add(char); result += char; }
 * 3. Return                            return result;
 *    One line                          [...new Set(s)].join('')
 * ═════════════════════════════════════════════════════════════════════════════
 */
