/**
 * Counts vowels, consonants, digits, spaces and special characters in a string.
 * Example: s = "QA@2026" -> { vowels: 1, consonants: 1, digits: 4, spaces: 0, specials: 1 }
 *
 * MEMORY: "One loop, five buckets: ask in ORDER → letter? (vowel or consonant) → digit? → space? → else special."
 *   The order matters: a letter must be checked BEFORE "special", or every letter would count as special.
 *
 * COST: O(n) time, O(1) space (always 5 counters)
 *
 * @param {string} s - Input string
 * @returns {{ vowels: number, consonants: number, digits: number, spaces: number, specials: number }}
 */
function countCharacterTypes(s) {
  // 1. Five counters, all starting at 0
  const result = { vowels: 0, consonants: 0, digits: 0, spaces: 0, specials: 0 };
  const VOWELS = 'aeiou';

  /* ==========================================================
   * ITERATION PHASE: put every character into exactly ONE bucket ("QA@2026")
   * ========================================================== */
  for (const char of s) {
    const lower = char.toLowerCase();          // so 'A' and 'a' are treated the same

    if (lower >= 'a' && lower <= 'z') {        // a LETTER
      if (VOWELS.includes(lower)) {
        result.vowels++;                       // 'A' -> vowels = 1
      } else {
        result.consonants++;                   // 'Q' -> consonants = 1
      }
    } else if (char >= '0' && char <= '9') {   // a DIGIT
      result.digits++;                         // '2','0','2','6' -> digits = 4
    } else if (char === ' ') {                 // a SPACE
      result.spaces++;
    } else {                                   // anything else
      result.specials++;                       // '@' -> specials = 1
    }
  }

  return result;
}

// --- Test Example ---
console.log(countCharacterTypes("QA@2026"));
// Output: { vowels: 1, consonants: 1, digits: 4, spaces: 0, specials: 1 }
console.log(countCharacterTypes("Hello World 123!"));
// Output: { vowels: 3, consonants: 7, digits: 3, spaces: 2, specials: 1 }   (3+7+3+2+1 = 16 = length)

// Regex version (same answers): count the matches of each pattern
const countRegex = (s) => ({
  vowels: (s.match(/[aeiou]/gi) || []).length,
  consonants: (s.match(/[b-df-hj-np-tv-z]/gi) || []).length,   // letters that are not vowels
  digits: (s.match(/\d/g) || []).length,
  spaces: (s.match(/ /g) || []).length,
  specials: (s.match(/[^a-z0-9 ]/gi) || []).length,
});
console.log(countRegex("Hello World 123!"));
// Output: { vowels: 3, consonants: 7, digits: 3, spaces: 2, specials: 1 }
