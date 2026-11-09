/**
 * JAVASCRIPT STRING PROGRAMS: every program solved TWO ways
 *   A) BUILT-IN  using string & array methods (short, what you'd write at work)
 *   B) LOOP      without built-in helpers (what interviewers ask for: "no reverse(), no split()")
 *
 * Run it:   node string-programs.js      (from the practice folder)
 * Every program is tested with check(). A ✔ means both versions give the right answer.
 *
 * Answer any question with R-A-C-E-S: Restate → Approach → Code → Edge cases → Speed.
 *
 * Each program has:
 *   Q         question with an example
 *   Remember  one-line hook for the built-in version
 *   Loop idea one-line hook for the loop version
 *   Explain   what to SAY in the interview
 *   Speed     time complexity (n = string length)
 *
 * ─────────────────────────────────────────────────────────────────────────────────────────────
 *  INDEX
 * ─────────────────────────────────────────────────────────────────────────────────────────────
 *  BASICS                         COUNTING                        TRANSFORM
 *   1 Reverse a string             9 Count vowels & consonants    17 Capitalize each word
 *   2 Palindrome                  10 Count upper/lower/digits     18 Toggle (swap) case
 *   3 Reverse word order          11 Character frequency          19 Remove all spaces
 *   4 Reverse each word           12 Max occurring character      20 Remove vowels
 *   5 Count words                 13 First non-repeating char     21 Remove duplicate chars
 *   6 Longest word                14 First repeating char         22 Replace all occurrences
 *   7 Find a substring            15 Count a substring            23 camelCase ↔ snake_case
 *   8 Check rotation              16 Duplicate words              24 Truncate with "..."
 *                                                                 25 Mask (e.g. card number)
 *  CLASSIC LOGIC
 *   26 Anagram                    29 String compression ("aaab" → "a3b1")
 *   27 Pangram                    30 Longest common prefix
 *   28 Only digits?               31 Valid parentheses
 *                                 32 Sum of numbers inside a string
 */

let passed = 0;
function check(actual, expected, label) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) throw new Error(`✘ ${label}\n   expected ${e}\n   got      ${a}`);
  passed++;
  console.log(`  ✔ ${label}`);
}
function section(title) {
  console.log(`\n=== ${title} ===`);
}
// Small helpers used by several LOOP versions (written without built-in methods)
const isLetterCh = (ch) => (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
const toLowerCh = (ch) => (ch >= 'A' && ch <= 'Z' ? String.fromCharCode(ch.charCodeAt(0) + 32) : ch);
const toUpperCh = (ch) => (ch >= 'a' && ch <= 'z' ? String.fromCharCode(ch.charCodeAt(0) - 32) : ch);

/* ═══════════════════════════════════════════ BASICS ═══════════════════════════════════════════ */

/**
 * 1. REVERSE A STRING
 * Q         'hello' → 'olleh'
 * Remember  SPLIT → REVERSE → JOIN
 * Loop idea Walk from the LAST index to 0, adding each character
 * Explain   Strings can't be reversed directly, so I convert to an array, reverse, join back.
 * Speed     O(n)
 */
section('1. Reverse a string');
const reverseA = (s) => [...s].reverse().join('');
function reverseB(s) {
  let out = '';
  for (let i = s.length - 1; i >= 0; i--) out += s[i];
  return out;
}
check([reverseA('hello'), reverseB('hello')], ['olleh', 'olleh'], "reverse('hello')");
check([reverseA(''), reverseB('')], ['', ''], 'empty string');

/**
 * 2. PALINDROME
 * Q         'Madam' → true, 'Never odd or even' → true, 'hello' → false
 * Remember  CLEAN (lower-case, letters only) → compare with REVERSE
 * Loop idea TWO POINTERS from both ends, skipping non-letters
 * Explain   Normalise first so case and spaces don't matter. The two-pointer version uses
 *           no extra string and stops at the first mismatch.
 * Speed     O(n)
 */
section('2. Palindrome');
const palindromeA = (s) => {
  const c = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return c === [...c].reverse().join('');
};
function palindromeB(s) {
  let i = 0, j = s.length - 1;
  while (i < j) {
    if (!isLetterCh(s[i])) { i++; continue; }
    if (!isLetterCh(s[j])) { j--; continue; }
    if (toLowerCh(s[i]) !== toLowerCh(s[j])) return false;
    i++; j--;
  }
  return true;
}
check([palindromeA('Madam'), palindromeB('Madam')], [true, true], "'Madam'");
check([palindromeA('Never odd or even'), palindromeB('Never odd or even')], [true, true], 'ignores spaces and case');
check([palindromeA('hello'), palindromeB('hello')], [false, false], "'hello'");

/**
 * 3. REVERSE WORD ORDER
 * Q         'I love JavaScript' → 'JavaScript love I'
 * Remember  TRIM → SPLIT /\s+/ → REVERSE → JOIN ' '
 * Loop idea Collect words character by character, then add them in reverse order
 * Speed     O(n)
 */
section('3. Reverse word order');
const reverseWordsA = (s) => s.trim().split(/\s+/).reverse().join(' ');
function reverseWordsB(s) {
  const words = [];
  let word = '';
  for (const ch of s) {
    if (ch === ' ') { if (word) { words[words.length] = word; word = ''; } }
    else word += ch;
  }
  if (word) words[words.length] = word;
  let out = '';
  for (let i = words.length - 1; i >= 0; i--) out += words[i] + (i ? ' ' : '');
  return out;
}
check([reverseWordsA('I love JavaScript'), reverseWordsB('I love JavaScript')], ['JavaScript love I', 'JavaScript love I'], 'reverse word order');
check([reverseWordsA('  a  b '), reverseWordsB('  a  b ')], ['b a', 'b a'], 'extra spaces');

/**
 * 4. REVERSE EACH WORD (keep the word order)
 * Q         'I love JS' → 'I evol SJ'
 * Remember  SPLIT ' ' → MAP(reverse each) → JOIN ' '
 * Loop idea Build the current word BACKWARDS (prepend), flush it at each space
 * Speed     O(n)
 */
section('4. Reverse each word');
const reverseEachA = (s) => s.split(' ').map((w) => [...w].reverse().join('')).join(' ');
function reverseEachB(s) {
  let out = '', word = '';
  for (const ch of s) {
    if (ch === ' ') { out += word + ' '; word = ''; }
    else word = ch + word; // prepend → word builds reversed
  }
  return out + word;
}
check([reverseEachA('I love JS'), reverseEachB('I love JS')], ['I evol SJ', 'I evol SJ'], 'reverse each word');

/**
 * 5. COUNT WORDS
 * Q         '  Playwright  is   great ' → 3
 * Remember  TRIM → SPLIT /\s+/ → FILTER(Boolean) → LENGTH
 * Loop idea Count every START of a word: a non-space whose previous char is a space (or start)
 * Speed     O(n)
 */
section('5. Count words');
const countWordsA = (s) => s.trim().split(/\s+/).filter(Boolean).length;
function countWordsB(s) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== ' ' && (i === 0 || s[i - 1] === ' ')) count++;
  }
  return count;
}
check([countWordsA('  Playwright  is   great '), countWordsB('  Playwright  is   great ')], [3, 3], 'count words');
check([countWordsA('   '), countWordsB('   ')], [0, 0], 'only spaces → 0');

/**
 * 6. LONGEST WORD
 * Q         'I love automation testing' → 'automation'
 * Remember  SPLIT → REDUCE keeping the longer
 * Loop idea Track current word and best word; compare at every space and at the end
 * Speed     O(n)
 */
section('6. Longest word');
const longestWordA = (s) => s.split(' ').reduce((best, w) => (w.length > best.length ? w : best), '');
function longestWordB(s) {
  let best = '', word = '';
  for (const ch of s + ' ') { // extra space flushes the last word
    if (ch === ' ') { if (word.length > best.length) best = word; word = ''; }
    else word += ch;
  }
  return best;
}
check([longestWordA('I love automation testing'), longestWordB('I love automation testing')], ['automation', 'automation'], 'longest word');

/**
 * 7. FIND A SUBSTRING (does it contain it? where?)
 * Q         'parabank login page' contains 'login'? → true, at index 9
 * Remember  includes() for yes/no, indexOf() for the position
 * Loop idea At every position, compare the next sub.length characters one by one
 * Explain   This is how indexOf works internally: O(n × m) in the simple version.
 * Speed     O(n × m)
 */
section('7. Find a substring');
const findA = (s, sub) => ({ found: s.includes(sub), at: s.indexOf(sub) });
function findB(s, sub) {
  for (let i = 0; i + sub.length <= s.length; i++) {
    let j = 0;
    while (j < sub.length && s[i + j] === sub[j]) j++;
    if (j === sub.length) return { found: true, at: i };
  }
  return { found: false, at: -1 };
}
check([findA('parabank login page', 'login'), findB('parabank login page', 'login')], [{ found: true, at: 9 }, { found: true, at: 9 }], 'find "login"');
check(findB('abc', 'x'), { found: false, at: -1 }, 'not found');

/**
 * 8. CHECK ROTATION
 * Q         is 'cdab' a rotation of 'abcd'? → true
 * Remember  Same length AND (s1 + s1).includes(s2)
 * Loop idea Try every split point: s1.slice(i) + s1.slice(0, i) === s2
 * Explain   'abcdabcd' contains every rotation of 'abcd', which is a neat one-liner to explain.
 * Speed     O(n) with includes; O(n²) with the loop
 */
section('8. Check rotation');
const isRotationA = (a, b) => a.length === b.length && (a + a).includes(b);
function isRotationB(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    let rotated = '';
    for (let k = 0; k < a.length; k++) rotated += a[(i + k) % a.length];
    if (rotated === b) return true;
  }
  return a.length === 0;
}
check([isRotationA('abcd', 'cdab'), isRotationB('abcd', 'cdab')], [true, true], "'cdab' is a rotation");
check([isRotationA('abcd', 'acbd'), isRotationB('abcd', 'acbd')], [false, false], "'acbd' is not");

/* ═══════════════════════════════════════════ COUNTING ═══════════════════════════════════════════ */

/**
 * 9. COUNT VOWELS & CONSONANTS
 * Q         'Hello World' → { vowels: 3, consonants: 7 }
 * Remember  match(/[aeiou]/gi) and match(/[a-z]/gi): letters − vowels = consonants
 * Loop idea For each LETTER: vowel? +1 vowels : +1 consonants (ignore spaces/digits)
 * Speed     O(n)
 */
section('9. Count vowels & consonants');
const vowelsConsonantsA = (s) => {
  const letters = (s.match(/[a-z]/gi) || []).length;
  const vowels = (s.match(/[aeiou]/gi) || []).length;
  return { vowels, consonants: letters - vowels };
};
function vowelsConsonantsB(s) {
  let vowels = 0, consonants = 0;
  for (const ch of s) {
    if (!isLetterCh(ch)) continue;
    const c = toLowerCh(ch);
    if (c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u') vowels++;
    else consonants++;
  }
  return { vowels, consonants };
}
check([vowelsConsonantsA('Hello World'), vowelsConsonantsB('Hello World')], [{ vowels: 3, consonants: 7 }, { vowels: 3, consonants: 7 }], "'Hello World'");

/**
 * 10. COUNT UPPER-CASE, LOWER-CASE, DIGITS, OTHERS
 * Q         'Hello World 2026!' → { upper: 2, lower: 8, digits: 4, others: 3 }
 * Remember  One regex match per group: /[A-Z]/g, /[a-z]/g, /\d/g
 * Loop idea Compare each char with ranges: 'A'–'Z', 'a'–'z', '0'–'9'
 * Speed     O(n)
 */
section('10. Count upper / lower / digits');
const countTypesA = (s) => {
  const upper = (s.match(/[A-Z]/g) || []).length;
  const lower = (s.match(/[a-z]/g) || []).length;
  const digits = (s.match(/\d/g) || []).length;
  return { upper, lower, digits, others: s.length - upper - lower - digits };
};
function countTypesB(s) {
  const r = { upper: 0, lower: 0, digits: 0, others: 0 };
  for (const ch of s) {
    if (ch >= 'A' && ch <= 'Z') r.upper++;
    else if (ch >= 'a' && ch <= 'z') r.lower++;
    else if (ch >= '0' && ch <= '9') r.digits++;
    else r.others++;
  }
  return r;
}
const expectedTypes = { upper: 2, lower: 8, digits: 4, others: 3 };
check([countTypesA('Hello World 2026!'), countTypesB('Hello World 2026!')], [expectedTypes, expectedTypes], "'Hello World 2026!'");

/**
 * 11. CHARACTER FREQUENCY
 * Q         'banana' → { b: 1, a: 3, n: 2 }
 * Remember  REDUCE: acc[ch] = (acc[ch] || 0) + 1
 * Loop idea Same idea with a plain for...of and an object
 * Speed     O(n)
 */
section('11. Character frequency');
const frequencyA = (s) => [...s].reduce((acc, ch) => ({ ...acc, [ch]: (acc[ch] || 0) + 1 }), {});
function frequencyB(s) {
  const freq = {};
  for (const ch of s) freq[ch] = freq[ch] ? freq[ch] + 1 : 1;
  return freq;
}
check([frequencyA('banana'), frequencyB('banana')], [{ b: 1, a: 3, n: 2 }, { b: 1, a: 3, n: 2 }], "'banana'");

/**
 * 12. MAX OCCURRING CHARACTER
 * Q         'programming' → 'r'   (r, g and m all appear twice; the first to reach 2 wins)
 * Remember  FREQUENCY → ENTRIES → REDUCE to the biggest count
 * Loop idea Count, then loop over the counts keeping the best
 * Speed     O(n)
 */
section('12. Max occurring character');
const maxCharA = (s) => Object.entries(frequencyB(s)).reduce((best, cur) => (cur[1] > best[1] ? cur : best))[0];
function maxCharB(s) {
  const freq = frequencyB(s);
  let best = '', bestCount = 0;
  for (const ch in freq) if (freq[ch] > bestCount) { best = ch; bestCount = freq[ch]; }
  return best;
}
check([maxCharA('programming'), maxCharB('programming')], ['r', 'r'], "'programming'");
check([maxCharA('aabbbc'), maxCharB('aabbbc')], ['b', 'b'], "'aabbbc'");

/**
 * 13. FIRST NON-REPEATING CHARACTER
 * Q         'swiss' → 'w'
 * Remember  COUNT, then FIND the first char with count 1
 * Loop idea Same two passes with plain loops
 * Alt       s.indexOf(ch) === s.lastIndexOf(ch) means the char appears once (but O(n²))
 * Speed     O(n)
 */
section('13. First non-repeating character');
const firstUniqueA = (s) => [...s].find((ch) => s.indexOf(ch) === s.lastIndexOf(ch)) ?? null;
function firstUniqueB(s) {
  const freq = frequencyB(s);
  for (const ch of s) if (freq[ch] === 1) return ch;
  return null;
}
check([firstUniqueA('swiss'), firstUniqueB('swiss')], ['w', 'w'], "'swiss'");
check([firstUniqueA('aabb'), firstUniqueB('aabb')], [null, null], 'all repeat → null');

/**
 * 14. FIRST REPEATING CHARACTER
 * Q         'automation' → 'a'   (scanning left to right, 'a' is the first char seen a SECOND time,
 *                               at index 5, just before the second 't' at index 6)
 * Remember  FIND the first char that already appeared EARLIER: s.indexOf(ch) < i
 * Loop idea Keep a "seen" store; the first char already in it is the answer
 * Explain   indexOf gives the FIRST position of a char; if that's before the current
 *           position, this char is a repeat. The "seen" version is faster.
 * Speed     indexOf version O(n²); seen-store version O(n)
 */
section('14. First repeating character');
const firstRepeatA = (s) => [...s].find((ch, i) => s.indexOf(ch) < i) ?? null;
function firstRepeatB(s) {
  const seen = {};
  for (const ch of s) {
    if (seen[ch]) return ch;
    seen[ch] = true;
  }
  return null;
}
check([firstRepeatA('automation'), firstRepeatB('automation')], ['a', 'a'], "'automation' → 'a'");
check([firstRepeatA('testing'), firstRepeatB('testing')], ['t', 't'], "'testing' → 't'");
check([firstRepeatA('abc'), firstRepeatB('abc')], [null, null], 'no repeat → null');

/**
 * 15. COUNT OCCURRENCES OF A SUBSTRING
 * Q         'qa env, qa data, qa users' contains 'qa' → 3 times
 * Remember  s.split(sub).length − 1
 * Loop idea indexOf in a loop, starting each search after the last match
 * Explain   Splitting on 'qa' gives one more piece than there are 'qa's.
 * Speed     O(n)
 */
section('15. Count a substring');
const countSubA = (s, sub) => s.split(sub).length - 1;
function countSubB(s, sub) {
  let count = 0;
  for (let i = 0; i + sub.length <= s.length; i++) {
    let j = 0;
    while (j < sub.length && s[i + j] === sub[j]) j++;
    if (j === sub.length) { count++; i += sub.length - 1; } // skip past this match
  }
  return count;
}
check([countSubA('qa env, qa data, qa users', 'qa'), countSubB('qa env, qa data, qa users', 'qa')], [3, 3], "'qa' × 3");
check([countSubA('aaaa', 'aa'), countSubB('aaaa', 'aa')], [2, 2], 'non-overlapping: "aa" in "aaaa" → 2');

/**
 * 16. DUPLICATE WORDS
 * Q         'the test and the result and the report' → ['the', 'and']
 * Remember  SPLIT → FILTER(indexOf ≠ index) → unique with SET
 * Loop idea Count words in an object, return those with count > 1
 * Speed     O(n) with counting
 */
section('16. Duplicate words');
const duplicateWordsA = (s) => {
  const words = s.toLowerCase().split(/\s+/);
  return [...new Set(words.filter((w, i) => words.indexOf(w) !== i))];
};
function duplicateWordsB(s) {
  const counts = {}, order = [];
  let word = '';
  for (const ch of s.toLowerCase() + ' ') {
    if (ch === ' ') {
      if (word) {
        counts[word] = (counts[word] || 0) + 1;
        if (counts[word] === 2) order[order.length] = word;
      }
      word = '';
    } else word += ch;
  }
  return order;
}
const dupText = 'the test and the result and the report';
check([duplicateWordsA(dupText), duplicateWordsB(dupText)], [['the', 'and'], ['the', 'and']], 'duplicate words');

/* ═══════════════════════════════════════════ TRANSFORM ═══════════════════════════════════════════ */

/**
 * 17. CAPITALIZE EACH WORD
 * Q         'hello wORLD from js' → 'Hello World From Js'
 * Remember  SPLIT → MAP(charAt(0) UP + slice(1) down) → JOIN
 * Loop idea Upper-case a letter if it's first or follows a space, else lower-case it
 * Speed     O(n)
 */
section('17. Capitalize each word');
const capitalizeA = (s) => s.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
function capitalizeB(s) {
  let out = '';
  for (let i = 0; i < s.length; i++) out += i === 0 || s[i - 1] === ' ' ? toUpperCh(s[i]) : toLowerCh(s[i]);
  return out;
}
check([capitalizeA('hello wORLD from js'), capitalizeB('hello wORLD from js')], ['Hello World From Js', 'Hello World From Js'], 'capitalize');

/**
 * 18. TOGGLE (SWAP) CASE
 * Q         'Hello World' → 'hELLO wORLD'
 * Remember  MAP each char: upper? → lower : upper
 * Loop idea Change the character code by 32 ('A' is 65, 'a' is 97)
 * Speed     O(n)
 */
section('18. Toggle case');
const toggleA = (s) => [...s].map((ch) => (ch === ch.toUpperCase() ? ch.toLowerCase() : ch.toUpperCase())).join('');
function toggleB(s) {
  let out = '';
  for (const ch of s) {
    if (ch >= 'A' && ch <= 'Z') out += toLowerCh(ch);
    else if (ch >= 'a' && ch <= 'z') out += toUpperCh(ch);
    else out += ch;
  }
  return out;
}
check([toggleA('Hello World'), toggleB('Hello World')], ['hELLO wORLD', 'hELLO wORLD'], 'toggle case');

/**
 * 19. REMOVE ALL SPACES
 * Q         ' a b  c ' → 'abc'
 * Remember  replace(/\s/g, '')   or   replaceAll(' ', '')   or   split(' ').join('')
 * Loop idea Keep every char that is not a space
 * Speed     O(n)
 */
section('19. Remove all spaces');
const removeSpacesA = (s) => s.replace(/\s/g, '');
function removeSpacesB(s) {
  let out = '';
  for (const ch of s) if (ch !== ' ' && ch !== '\t' && ch !== '\n') out += ch;
  return out;
}
check([removeSpacesA(' a b  c '), removeSpacesB(' a b  c '), ' a b  c '.split(' ').join('')], ['abc', 'abc', 'abc'], 'remove spaces (3 ways)');

/**
 * 20. REMOVE VOWELS
 * Q         'Automation' → 'tmtn'
 * Remember  replace(/[aeiou]/gi, '')
 * Loop idea Keep chars that are not vowels
 * Speed     O(n)
 */
section('20. Remove vowels');
const removeVowelsA = (s) => s.replace(/[aeiou]/gi, '');
function removeVowelsB(s) {
  let out = '';
  for (const ch of s) {
    const c = toLowerCh(ch);
    if (c !== 'a' && c !== 'e' && c !== 'i' && c !== 'o' && c !== 'u') out += ch;
  }
  return out;
}
check([removeVowelsA('Automation'), removeVowelsB('Automation')], ['tmtn', 'tmtn'], "'Automation'");

/**
 * 21. REMOVE DUPLICATE CHARACTERS
 * Q         'programming' → 'progamin'
 * Remember  [...new Set(s)].join('')
 * Loop idea Add a char only if it's not already in the result
 * Speed     O(n) with Set; the loop version is O(n²) (checks the result each time)
 */
section('21. Remove duplicate characters');
const removeDupCharsA = (s) => [...new Set(s)].join('');
function removeDupCharsB(s) {
  let out = '';
  for (const ch of s) {
    let exists = false;
    for (const o of out) if (o === ch) { exists = true; break; }
    if (!exists) out += ch;
  }
  return out;
}
check([removeDupCharsA('programming'), removeDupCharsB('programming')], ['progamin', 'progamin'], "'programming'");

/**
 * 22. REPLACE ALL OCCURRENCES
 * Q         replace every 'qa' with 'prod' in 'qa env, qa data'
 * Remember  replaceAll(find, with)   or   split(find).join(with)
 * Loop idea Scan; on a match append the replacement and jump past it, else copy the char
 * Speed     O(n × m)
 */
section('22. Replace all occurrences');
const replaceAllA = (s, find, rep) => s.replaceAll(find, rep);
const replaceAllSplit = (s, find, rep) => s.split(find).join(rep);
function replaceAllB(s, find, rep) {
  let out = '';
  for (let i = 0; i < s.length; ) {
    let j = 0;
    while (j < find.length && s[i + j] === find[j]) j++;
    if (j === find.length && find.length) { out += rep; i += find.length; }
    else { out += s[i]; i++; }
  }
  return out;
}
const rep = ['qa env, qa data', 'qa', 'prod'];
check([replaceAllA(...rep), replaceAllSplit(...rep), replaceAllB(...rep)], ['prod env, prod data', 'prod env, prod data', 'prod env, prod data'], 'replace all (3 ways)');

/**
 * 23. camelCase ↔ snake_case ↔ kebab-case
 * Q         'userFirstName' → 'user_first_name' → 'userFirstName';  'user-first-name' → 'userFirstName'
 * Remember  camel→snake: replace(/[A-Z]/g, c => '_' + c.toLowerCase())
 *           snake/kebab→camel: replace(/[_-](\w)/g, (_, c) => c.toUpperCase())
 * Loop idea Look at each char: capital → '_' + lower;  '_' → skip it and upper-case the next
 * Speed     O(n)
 */
section('23. camelCase ↔ snake_case');
const camelToSnakeA = (s) => s.replace(/[A-Z]/g, (c) => '_' + c.toLowerCase());
const toCamelA = (s) => s.replace(/[_-](\w)/g, (_, c) => c.toUpperCase());
function camelToSnakeB(s) {
  let out = '';
  for (const ch of s) out += ch >= 'A' && ch <= 'Z' ? '_' + toLowerCh(ch) : ch;
  return out;
}
function toCamelB(s) {
  let out = '', upperNext = false;
  for (const ch of s) {
    if (ch === '_' || ch === '-') { upperNext = true; continue; }
    out += upperNext ? toUpperCh(ch) : ch;
    upperNext = false;
  }
  return out;
}
check([camelToSnakeA('userFirstName'), camelToSnakeB('userFirstName')], ['user_first_name', 'user_first_name'], 'camel → snake');
check([toCamelA('user_first_name'), toCamelB('user_first_name')], ['userFirstName', 'userFirstName'], 'snake → camel');
check([toCamelA('user-first-name'), toCamelB('user-first-name')], ['userFirstName', 'userFirstName'], 'kebab → camel');

/**
 * 24. TRUNCATE WITH "..."
 * Q         truncate('Playwright automation framework', 15) → 'Playwright auto...'
 * Remember  length > max ? slice(0, max) + '...' : s
 * Loop idea Copy the first max chars, then add '...'
 * Speed     O(max)
 */
section('24. Truncate');
const truncateA = (s, max) => (s.length > max ? s.slice(0, max) + '...' : s);
function truncateB(s, max) {
  if (s.length <= max) return s;
  let out = '';
  for (let i = 0; i < max; i++) out += s[i];
  return out + '...';
}
check([truncateA('Playwright automation framework', 15), truncateB('Playwright automation framework', 15)], ['Playwright auto...', 'Playwright auto...'], 'truncate to 15');
check(truncateA('short', 15), 'short', 'short strings unchanged');

/**
 * 25. MASK A STRING (show only the last 4)
 * Q         '4111111111111234' → '************1234'
 * Remember  slice(-4).padStart(length, '*')
 * Loop idea '*' for every index before length − 4, then the real chars
 * Speed     O(n)
 */
section('25. Mask');
const maskA = (s, visible = 4) => s.slice(-visible).padStart(s.length, '*');
function maskB(s, visible = 4) {
  let out = '';
  for (let i = 0; i < s.length; i++) out += i < s.length - visible ? '*' : s[i];
  return out;
}
check([maskA('4111111111111234'), maskB('4111111111111234')], ['************1234', '************1234'], 'mask card number');

/* ═══════════════════════════════════════════ CLASSIC LOGIC ═══════════════════════════════════════════ */

/**
 * 26. ANAGRAM
 * Q         'Listen' & 'Silent' → true
 * Remember  CLEAN → SPLIT → SORT → JOIN, then compare
 * Loop idea COUNT letters: +1 for the first word, −1 for the second; every count must end at 0
 * Speed     sort O(n log n); counting O(n)
 */
section('26. Anagram');
const sortLetters = (s) => [...s.toLowerCase().replace(/[^a-z]/g, '')].sort().join('');
const anagramA = (a, b) => sortLetters(a) === sortLetters(b);
function anagramB(a, b) {
  const count = {};
  for (const ch of a) if (isLetterCh(ch)) { const c = toLowerCh(ch); count[c] = (count[c] || 0) + 1; }
  for (const ch of b) if (isLetterCh(ch)) { const c = toLowerCh(ch); if (!count[c]) return false; count[c]--; }
  for (const c in count) if (count[c] !== 0) return false;
  return true;
}
check([anagramA('Listen', 'Silent'), anagramB('Listen', 'Silent')], [true, true], "'Listen' / 'Silent'");
check([anagramA('Dormitory', 'Dirty room'), anagramB('Dormitory', 'Dirty room')], [true, true], 'with spaces');
check([anagramA('abc', 'abd'), anagramB('abc', 'abd')], [false, false], "'abc' / 'abd'");

/**
 * 27. PANGRAM (uses every letter a–z at least once)
 * Q         'The quick brown fox jumps over the lazy dog' → true
 * Remember  SET of the lower-case letters has size 26
 * Loop idea Mark each letter seen in a 26-slot array; check all are marked
 * Speed     O(n)
 */
section('27. Pangram');
const pangramA = (s) => new Set(s.toLowerCase().replace(/[^a-z]/g, '')).size === 26;
function pangramB(s) {
  const seen = new Array(26).fill(false);
  for (const ch of s) if (isLetterCh(ch)) seen[toLowerCh(ch).charCodeAt(0) - 97] = true;
  for (const x of seen) if (!x) return false;
  return true;
}
const fox = 'The quick brown fox jumps over the lazy dog';
check([pangramA(fox), pangramB(fox)], [true, true], 'fox sentence → true');
check([pangramA('hello world'), pangramB('hello world')], [false, false], "'hello world' → false");

/**
 * 28. ONLY DIGITS?
 * Q         '12345' → true, '12a45' → false, '' → false
 * Remember  /^\d+$/.test(s)   (^ start, \d+ one or more digits, $ end)
 * Loop idea Every char must be between '0' and '9'
 * Edge      Number('') is 0 and Number(' ') is 0, so don't use Number() for this check
 * Speed     O(n)
 */
section('28. Only digits?');
const onlyDigitsA = (s) => /^\d+$/.test(s);
function onlyDigitsB(s) {
  if (s.length === 0) return false;
  for (const ch of s) if (ch < '0' || ch > '9') return false;
  return true;
}
check([onlyDigitsA('12345'), onlyDigitsB('12345')], [true, true], "'12345'");
check([onlyDigitsA('12a45'), onlyDigitsB('12a45')], [false, false], "'12a45'");
check([onlyDigitsA(''), onlyDigitsB('')], [false, false], "'' → false");

/**
 * 29. STRING COMPRESSION (run-length encoding)
 * Q         'aaabbc' → 'a3b2c1'
 * Remember  match the regex (.)\1* with flag g → runs ['aaa', 'bb', 'c'] → map(run[0] + run.length)
 * Loop idea Count while the next char is the same; on change, write char + count
 * Explain   (.) captures one char, \1* matches more of the same char.
 * Speed     O(n)
 */
section('29. String compression');
const compressA = (s) => (s.match(/(.)\1*/g) || []).map((run) => run[0] + run.length).join('');
function compressB(s) {
  let out = '', count = 1;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === s[i + 1]) count++;
    else { out += s[i] + count; count = 1; }
  }
  return out;
}
check([compressA('aaabbc'), compressB('aaabbc')], ['a3b2c1', 'a3b2c1'], "'aaabbc'");
check([compressA(''), compressB('')], ['', ''], 'empty');

/**
 * 30. LONGEST COMMON PREFIX
 * Q         ['flower', 'flow', 'flight'] → 'fl'
 * Remember  Start with the first word; while not every word startsWith it, drop its last char
 * Loop idea Compare column by column: char i of every word, stop at the first difference
 * Speed     O(total characters)
 */
section('30. Longest common prefix');
const commonPrefixA = (words) => {
  if (!words.length) return '';
  let prefix = words[0];
  while (!words.every((w) => w.startsWith(prefix))) prefix = prefix.slice(0, -1);
  return prefix;
};
function commonPrefixB(words) {
  if (!words.length) return '';
  let prefix = '';
  for (let i = 0; i < words[0].length; i++) {
    const ch = words[0][i];
    for (const w of words) if (w[i] !== ch) return prefix;
    prefix += ch;
  }
  return prefix;
}
check([commonPrefixA(['flower', 'flow', 'flight']), commonPrefixB(['flower', 'flow', 'flight'])], ['fl', 'fl'], 'flower/flow/flight');
check([commonPrefixA(['dog', 'car']), commonPrefixB(['dog', 'car'])], ['', ''], 'no common prefix');

/**
 * 31. VALID PARENTHESES
 * Q         '({[]})' → true, '(]' → false, '((' → false
 * Remember  STACK: push openers; on a closer, pop and it must be the matching opener
 * Explain   The most recent unclosed bracket must close first, which is exactly last-in,
 *           first-out, so a stack (array push/pop) fits. Valid only if the stack ends empty.
 * Speed     O(n)
 */
section('31. Valid parentheses');
function isValidBrackets(s) {
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const stack = [];
  for (const ch of s) {
    if ('([{'.includes(ch)) stack.push(ch);
    else if (ch in pairs && stack.pop() !== pairs[ch]) return false;
  }
  return stack.length === 0;
}
check([isValidBrackets('({[]})'), isValidBrackets('(]'), isValidBrackets('(('), isValidBrackets('a(b)c')], [true, false, false, true], 'brackets');

/**
 * 32. SUM OF NUMBERS INSIDE A STRING
 * Q         'Order 12 shipped, order 7 pending, order 305 done' → 324
 * Remember  match(/\d+/g) → map(Number) → reduce sum
 * Loop idea Build the current number digit by digit; add it when a non-digit appears
 * Speed     O(n)
 */
section('32. Sum of numbers in a string');
const sumNumbersA = (s) => (s.match(/\d+/g) || []).map(Number).reduce((a, b) => a + b, 0);
function sumNumbersB(s) {
  let total = 0, current = 0;
  for (const ch of s + ' ') {
    if (ch >= '0' && ch <= '9') current = current * 10 + (ch.charCodeAt(0) - 48);
    else { total += current; current = 0; }
  }
  return total;
}
const orders = 'Order 12 shipped, order 7 pending, order 305 done';
check([sumNumbersA(orders), sumNumbersB(orders)], [324, 324], 'sum of numbers');
check([sumNumbersA('no numbers'), sumNumbersB('no numbers')], [0, 0], 'no numbers → 0');

console.log(`\nAll ${passed} checks passed ✔ (32 string programs, built-in + loop versions)`);
