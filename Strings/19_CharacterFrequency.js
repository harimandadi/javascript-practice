/**
 * Counts how many times each character appears and finds the MOST frequent one.
 * Example: s = "testing" -> { t: 2, e: 1, s: 1, i: 1, n: 1, g: 1 }, most frequent: 't' (2 times)
 *
 * MEMORY: "COUNT every character into a map, then SCAN the map for the biggest count."
 *   STEP 1 → counts[char] = (counts[char] || 0) + 1   (same line as Anagram / First Non-Repeating)
 *   STEP 2 → walk the map and keep the character with the highest count
 *   Tie?   → the character that was counted first wins (map keeps insertion order)
 *
 * COST: O(n) time, O(k) space (k = number of different characters)
 *
 * @param {string} s - Input string
 * @returns {{ counts: Object<string, number>, char: string, count: number }}
 */
function characterFrequency(s) {
  // 1. Plain object as the frequency map
  const counts = {};

  /* ==========================================================
   * ITERATION PHASE 1: count every character ("testing")
   * ========================================================== */
  for (const char of s) {
    // 't' -> { t:1 }
    // 'e' -> { t:1, e:1 }
    // 's' -> { t:1, e:1, s:1 }
    // 't' -> { t:2, e:1, s:1 }          ← t seen again
    // 'i' -> { t:2, e:1, s:1, i:1 }
    // 'n' -> { t:2, e:1, s:1, i:1, n:1 }
    // 'g' -> { t:2, e:1, s:1, i:1, n:1, g:1 }
    counts[char] = (counts[char] || 0) + 1;
  }

  // 2. Track the best character found so far
  let maxChar = '';
  let maxCount = 0;

  /* ==========================================================
   * ITERATION PHASE 2: find the biggest count in the map
   * ========================================================== */
  for (const [char, count] of Object.entries(counts)) {
    // ['t', 2] -> 2 > 0 → maxChar = 't', maxCount = 2
    // ['e', 1] -> 1 > 2? no
    // ... no other count beats 2
    if (count > maxCount) {        // ">" (not ">=") keeps the FIRST character on a tie
      maxChar = char;
      maxCount = count;
    }
  }

  return { counts, char: maxChar, count: maxCount };
}

// --- Test Example ---
console.log(characterFrequency("testing"));
// Output: { counts: { t: 2, e: 1, s: 1, i: 1, n: 1, g: 1 }, char: 't', count: 2 }
console.log(characterFrequency("programming").char);   // Output: "r"  (r, g, m all appear 2 times; r was counted first)
console.log(characterFrequency("aaabbc").count);       // Output: 3
console.log(characterFrequency(""));                   // Output: { counts: {}, char: '', count: 0 }
// Tip: ignore case and spaces first if needed → s.toLowerCase().replace(/\s/g, '')
