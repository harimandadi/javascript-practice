/**
 * Valid Anagram   (LeetCode 242 · Amazon, Microsoft, Bloomberg, Meta)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   Two strings are anagrams if they use the SAME letters the SAME number of times
 *   (only the order is different). Return true if t is an anagram of s.
 *
 * EXAMPLES
 *   Input : s = "anagram", t = "nagaram"   Output: true
 *   Input : s = "rat",     t = "car"       Output: false   ('c' is not in "rat")
 *   Input : s = "aab",     t = "abb"       Output: false   ('b' is used up)
 *
 * MEMORY: "FILL the bag with s, EMPTY the bag with t. Missing or used up → false."
 *
 * COST: O(n) time, O(k) space (k = number of different letters; at most 26 for a–z)
 * ═════════════════════════════════════════════════════════════════════════════
 */

function isAnagram(s, t) {
  // STEP 1: different lengths can never be anagrams
  if (s.length !== t.length) return false;

  // counts["a"] = how many "a"s from s are still unused
  const counts = {};

  // STEP 2: count UP every letter of s
  for (const ch of s) {
    counts[ch] = (counts[ch] || 0) + 1;     // seen before → old count + 1; new letter → (undefined || 0) + 1 = 1
  }

  // STEP 3: count DOWN with every letter of t
  for (const ch of t) {
    if (!counts[ch]) return false;          // undefined (never in s) OR 0 (already used up) → not an anagram
    counts[ch]--;                           // use one copy of this letter
  }

  // STEP 4: same length + nothing missing or used up → every count ended at exactly 0
  return true;
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY ITERATION for s = "anagram", t = "nagaram"
 *
 *   STEP 1: lengths 7 === 7 → continue
 *
 *   STEP 2 (Loop 1, FILL the bag with s):
 *     a → {a:1}   n → {a:1,n:1}   a → {a:2,n:1}   g → {a:2,n:1,g:1}
 *     r → {…,r:1} a → {a:3,…}     m → {a:3, n:1, g:1, r:1, m:1}   ← full bag
 *
 *   STEP 3 (Loop 2, EMPTY the bag with t):
 *     ch | count before | !count? | after
 *     ---|--------------|---------|------
 *     n  |      1       |  false  | n:0
 *     a  |      3       |  false  | a:2
 *     g  |      1       |  false  | g:0
 *     a  |      2       |  false  | a:1
 *     r  |      1       |  false  | r:0
 *     a  |      1       |  false  | a:0
 *     m  |      1       |  false  | m:0   → bag empty
 *
 *   STEP 4: loop finished → return true ✅
 *
 * FAILING CASES
 *   "rat" vs "car": bag {r:1, a:1, t:1}; first letter 'c' → counts.c is undefined → false ❌ (MISSING)
 *   "aab" vs "abb": bag {a:2, b:1}; a → a:1, b → b:0, b → counts.b is 0 → false ❌ (USED UP)
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(isAnagram("anagram", "nagaram"));   // true
console.log(isAnagram("rat", "car"));           // false  ('c' missing)
console.log(isAnagram("aab", "abb"));           // false  ('b' used up)
console.log(isAnagram("ab", "a"));              // false  (different lengths)
console.log(isAnagram("", ""));                 // true   (two empty strings)

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * TRICK + ALGORITHM: how to WRITE this logic yourself (from a blank page)
 * ═════════════════════════════════════════════════════════════════════════════
 *
 * THE TRICK (one idea)
 *   An anagram = SAME letters + SAME counts. Order doesn't matter, so don't compare order:
 *   compare COUNTS. Think of a BAG of letter tiles:
 *     - put every letter of s INTO the bag    (count up)
 *     - take every letter of t OUT of the bag  (count down)
 *     - a letter you can't take out → NOT an anagram
 *
 * ALGORITHM (write these 4 lines of English first, then turn each into code)
 *   1. If the lengths differ → return false.             if (s.length !== t.length) return false;
 *   2. Make an empty bag.                                const counts = {};
 *   3. For each letter of s → add 1 to its count.        counts[ch] = (counts[ch] || 0) + 1;
 *   4. For each letter of t:
 *        a. count is missing or 0 → return false.        if (!counts[ch]) return false;
 *        b. otherwise subtract 1.                        counts[ch]--;
 *   5. Loop finished → return true.                      return true;
 *
 * HOW TO REMEMBER THE CODE SHAPE
 *   "CHECK length → FILL with s → EMPTY with t → TRUE"
 *        1 line         1 loop       1 loop       1 line
 *
 * THE TWO LINES PEOPLE GET WRONG
 *   counts[ch] = (counts[ch] || 0) + 1;   → a new letter is undefined; "|| 0" turns it into 0 (else NaN)
 *   if (!counts[ch]) return false;        → catches BOTH undefined (missing) and 0 (used up)
 *
 * WHY NO "ARE ALL COUNTS 0?" CHECK AT THE END
 *   Same length + no count ever went below 0 → t took out exactly what s put in → the bag is empty.
 *
 * OTHER WAYS (say these in an interview after the main solution)
 *   Sort and compare   : [...s].sort().join('') === [...t].sort().join('')    O(n log n), shortest to write
 *   Array of 26        : count[ch.charCodeAt(0) - 97]++ / --                  fastest, only for a–z
 *   Map + [...s]       : works for any characters (Unicode / emoji)
 *   Ignore case/spaces : clean first → s.toLowerCase().replace(/[^a-z]/g, '')
 *
 * SELF-CHECK BEFORE SUBMITTING (test these 4 inputs)
 *   ("anagram", "nagaram") → true     happy path
 *   ("rat", "car")         → false    missing letter
 *   ("aab", "abb")         → false    used-up letter
 *   ("ab", "a")            → false    different lengths
 *
 * INTERVIEW LINE
 *   "Anagrams have the same letters with the same counts. I check the lengths, count every letter
 *    of s, then walk t and use one copy per letter, returning false as soon as a letter is missing
 *    or used up. Finishing the loop means every count is back to zero. O(n) time, O(k) space."
 * ═════════════════════════════════════════════════════════════════════════════
 */
