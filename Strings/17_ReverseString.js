/**
 * Reverses a string WITHOUT using the built-in reverse() method.
 * Example: s = "hello" -> "olleh"
 *
 * MEMORY: "Read it BACKWARDS, or SWAP the two ends and walk inward."
 *   Way 1 → loop from the LAST character to the FIRST and build a new string
 *   Way 2 → string → array, swap left/right ends, move both pointers inward, join back
 *           (a string can't be changed in place, so it becomes an array first)
 *
 * COST: O(n) time, O(n) space (strings are immutable, so a new string is always built)
 *
 * @param {string} s - Input string
 * @returns {string} The reversed string
 */

// ── WAY 1: loop from the end ────────────────────────────────────────────────
function reverseString(s) {
  // 1. Start with an empty result
  let reversed = '';

  /* ==========================================================
   * ITERATION PHASE: walk from the last index down to 0 ("hello")
   * ========================================================== */
  for (let i = s.length - 1; i >= 0; i--) {
    // i = 4 ('o') -> reversed = "o"
    // i = 3 ('l') -> reversed = "ol"
    // i = 2 ('l') -> reversed = "oll"
    // i = 1 ('e') -> reversed = "olle"
    // i = 0 ('h') -> reversed = "olleh"
    reversed += s[i];
  }

  // 2. The characters were added in reverse order
  return reversed;
}

// ── WAY 2: two pointers (same idea as reversing an array in place) ───────────
function reverseStringTwoPointers(s) {
  // 1. A string can't be changed, so copy its characters into an array
  const chars = [...s];                 // "hello" -> ['h','e','l','l','o']

  // 2. One pointer at each end
  let left = 0;
  let right = chars.length - 1;

  /* ==========================================================
   * ITERATION PHASE: swap the ends, then move both pointers inward
   * ========================================================== */
  while (left < right) {
    // left = 0, right = 4: swap 'h' <-> 'o' -> ['o','e','l','l','h']
    // left = 1, right = 3: swap 'e' <-> 'l' -> ['o','l','l','e','h']
    // left = 2, right = 2: left < right is false -> stop (the middle stays)
    [chars[left], chars[right]] = [chars[right], chars[left]];
    left++;
    right--;
  }

  // 3. Array -> string
  return chars.join('');
}

// --- Test Example ---
console.log(reverseString("hello"));              // Output: "olleh"
console.log(reverseString("QA Lead"));            // Output: "daeL AQ"
console.log(reverseStringTwoPointers("hello"));   // Output: "olleh"
console.log(reverseStringTwoPointers("abcd"));    // Output: "dcba"  (even length: no middle)
console.log(reverseString(""));                   // Output: ""      (empty string)

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * QUICK STEPS (English → code)
 * MEMORY: "Read it BACKWARDS, or SWAP the two ends and walk inward."
 * ═════════════════════════════════════════════════════════════════════════════
 * 1. Empty result                      let reversed = '';
 * 2. i from the last index down to 0   for (let i = s.length - 1; i >= 0; i--)
 * 3. Add that char                     reversed += s[i];
 * 4. Return                            return reversed;
 *    Two-pointer way                   const chars = [...s]; while (left < right) swap + left++ + right--; return chars.join('');
 * ═════════════════════════════════════════════════════════════════════════════
 */
