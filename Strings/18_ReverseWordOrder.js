/**
 * Reverses the ORDER of the words in a sentence (each word itself stays the same).
 * Example: s = "I love QA" -> "QA love I"
 *
 * Not the same as 4_ReverseEachWordInString.js:
 *   reverse EACH word  : "I love QA" -> "I evol AQ"   (letters flip, order stays)
 *   reverse WORD ORDER : "I love QA" -> "QA love I"   (order flips, letters stay)  ← this file
 *
 * MEMORY: "SPLIT into words, read the words BACKWARDS, JOIN with one space."
 *
 * COST: O(n) time, O(n) space
 *
 * @param {string} s - Input sentence
 * @returns {string} Sentence with the word order reversed
 */
function reverseWordOrder(s) {
  // 1. Clean the edges and split on ANY run of spaces
  //    "  I  love   QA " -> trim -> "I  love   QA" -> split(/\s+/) -> ['I', 'love', 'QA']
  const words = s.trim().split(/\s+/);

  // 2. Empty input → nothing to reverse
  if (words[0] === '') return '';

  // 3. Collect the words from last to first
  const result = [];

  /* ==========================================================
   * ITERATION PHASE: walk the words array backwards (['I','love','QA'])
   * ========================================================== */
  for (let i = words.length - 1; i >= 0; i--) {
    // i = 2 ('QA')   -> result = ['QA']
    // i = 1 ('love') -> result = ['QA', 'love']
    // i = 0 ('I')    -> result = ['QA', 'love', 'I']
    result.push(words[i]);
  }

  // 4. Glue the words back together with ONE space between them
  return result.join(' ');   // "QA love I"
}

// --- Test Example ---
console.log(reverseWordOrder("I love QA"));                 // Output: "QA love I"
console.log(reverseWordOrder("  Playwright   is  fast "));  // Output: "fast is Playwright"  (extra spaces removed)
console.log(reverseWordOrder("single"));                    // Output: "single"
console.log(reverseWordOrder("   "));                       // Output: ""  (only spaces)
// Short built-in version: s.trim().split(/\s+/).reverse().join(' ')

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * QUICK STEPS (English → code)
 * MEMORY: "SPLIT into words, read them BACKWARDS, JOIN with one space."
 * ═════════════════════════════════════════════════════════════════════════════
 * 1. Trim + split on any spaces        const words = s.trim().split(/\s+/);
 * 2. Nothing there → ""                if (words[0] === '') return '';
 * 3. Push words last to first          for (let i = words.length - 1; i >= 0; i--) result.push(words[i]);
 * 4. Join with one space               return result.join(' ');
 * ═════════════════════════════════════════════════════════════════════════════
 */
