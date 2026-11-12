/**
 * Finds the index of the first non-repeating character in a string using a Plain Object.
 * Example: s = "leetcode" -> 0 (since 'l' appears once)
 * 
 * @param {string} s - Input string
 * @returns {number} Index of the first non-repeating character, or -1
 */
function firstUniqChar(s) {
  // 1. Create a plain JavaScript object to act as our frequency counter
  const counts = {};

  /* ==========================================================
   * ITERATION PHASE 1: Pass 1 - Build Frequency Map ("leetcode")
   * ========================================================== */
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    
    // i = 0 ('l'): counts['l'] becomes 1 -> { 'l': 1 }
    // i = 1 ('e'): counts['e'] becomes 1 -> { 'l': 1, 'e': 1 }
    // i = 2 ('e'): counts['e'] becomes (1 + 1) = 2 -> { 'l': 1, 'e': 2 }
    // i = 3 ('t'): counts['t'] becomes 1 -> { 'l': 1, 'e': 2, 't': 1 }
    // ... continues for all characters ...
    counts[char] = (counts[char] || 0) + 1;
  }

  /* ==========================================================
   * ITERATION PHASE 2: Pass 2 - Find first character with count === 1
   * ========================================================== */
  for (let i = 0; i < s.length; i++) {
    // i = 0: s[0] is 'l'. counts['l'] is 1.
    //   -> Match found! Returns index 0 immediately.
    // 
    // (If 'l' had a count > 1, the loop would move to i = 1, check 'e', etc.)
    if (counts[s[i]] === 1) {
      return i; 
    }
  }

  return -1; // Return -1 if every character repeats
}

// --- Test Example ---
console.log(firstUniqChar("leetcode")); // Output: 0

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * QUICK STEPS (English → code)
 * MEMORY: "COUNT everything, then the FIRST one with count 1 wins."
 * ═════════════════════════════════════════════════════════════════════════════
 * 1. Make an empty count map           const counts = {};
 * 2. Each char → +1                    counts[char] = (counts[char] || 0) + 1;
 * 3. Walk the string again from 0      for (let i = 0; i < s.length; i++)
 * 4. Count is 1 → that's the answer    if (counts[s[i]] === 1) return i;
 * 5. Nothing unique → -1               return -1;
 * ═════════════════════════════════════════════════════════════════════════════
 */
