/**
 * JAVASCRIPT INTERVIEW PROGRAMS: solved with array & object methods
 *
 * Run it:   node js-interview-programs.js      (from the practice folder)
 * Every program is tested with check(). A ✔ means the solution is proven correct.
 *
 * ─────────────────────────────────────────────────────────────────────────────────────────────
 *  HOW TO ANSWER ANY CODING QUESTION: remember "R-A-C-E-S"
 * ─────────────────────────────────────────────────────────────────────────────────────────────
 *   R  Restate     "So I take a string and return it reversed, right? What about empty input?"
 *   A  Approach    Say the idea in ONE sentence before typing (each program's "Remember" line).
 *   C  Code        Write the short method version; offer the loop version if they want no built-ins.
 *   E  Edge cases  Empty input, one item, duplicates, negative numbers, upper/lower case.
 *   S  Speed       Time and space complexity: O(n) = one pass, O(n²) = loop inside a loop.
 *
 *  Each program below has:
 *   Q        the question, with an example
 *   Remember a one-line hook to recall the approach
 *   Explain  what to SAY in the interview
 *   Speed    time / space complexity
 *   Edge     edge cases to mention
 *
 * ─────────────────────────────────────────────────────────────────────────────────────────────
 *  INDEX
 * ─────────────────────────────────────────────────────────────────────────────────────────────
 *  STRINGS                          NUMBERS & ARRAYS                    OBJECTS
 *   1 Reverse a string               12 Sum & average                    31 Group by a property
 *   2 Palindrome                     13 Max & min                        32 Count by a property
 *   3 Count vowels                   14 Second largest                   33 Invert keys and values
 *   4 Character frequency            15 Remove duplicates                34 Sort objects by a key
 *   5 First non-repeating char       16 Find duplicates                  35 Deep clone
 *   6 Reverse words / each word      17 Missing number 1..n              36 Deep equal
 *   7 Capitalize each word           18 Two sum
 *   8 Anagram                        19 Flatten nested array
 *   9 Longest word                   20 Chunk an array
 *  10 Remove duplicate characters    21 Rotate an array
 *  11 Count words                    22 Merge two sorted arrays
 *                                    23 Intersection / difference / union
 *                                    24 Move zeros to the end
 *                                    25 Most frequent element
 *                                    26 FizzBuzz
 *                                    27 Factorial
 *                                    28 Fibonacci
 *                                    29 Prime numbers
 *                                    30 Sum of digits
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

/* ══════════════════════════════════════════ STRINGS ══════════════════════════════════════════ */

/**
 * 1. REVERSE A STRING
 * Q        'hello' → 'olleh'
 * Remember SPLIT → REVERSE → JOIN
 * Explain  Strings have no reverse(), so I turn the string into an array of characters,
 *          reverse the array, and join it back into a string.
 * Speed    O(n) time, O(n) space
 * Edge     '' → ''. Use [...s] instead of s.split('') if emojis matter (split breaks them).
 */
section('1. Reverse a string');
const reverseString = (s) => [...s].reverse().join('');

function reverseStringLoop(s) {            // "without built-ins": walk from the end
  let out = '';
  for (let i = s.length - 1; i >= 0; i--) out += s[i];
  return out;
}
const reverseStringReduce = (s) => [...s].reduce((acc, ch) => ch + acc, ''); // prepend each char

check(reverseString('hello'), 'olleh', "reverseString('hello')");
check(reverseStringLoop('hello'), 'olleh', 'loop version');
check(reverseStringReduce('hello'), 'olleh', 'reduce version');
check(reverseString(''), '', 'empty string');

/**
 * 2. PALINDROME (reads the same both ways)
 * Q        'Racecar' → true, 'A man, a plan, a canal: Panama' → true, 'hello' → false
 * Remember CLEAN → REVERSE → COMPARE
 * Explain  First I normalise: lower-case and remove anything that isn't a letter or digit.
 *          Then I compare the cleaned string with its reverse.
 * Speed    O(n) time, O(n) space
 * Edge     Case, spaces and punctuation; '' counts as a palindrome.
 */
section('2. Palindrome');
const isPalindrome = (s) => {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean === [...clean].reverse().join('');
};

function isPalindromeTwoPointers(s) {      // O(1) extra space: compare from both ends inward
  const c = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  for (let i = 0, j = c.length - 1; i < j; i++, j--) if (c[i] !== c[j]) return false;
  return true;
}

check(isPalindrome('Racecar'), true, "isPalindrome('Racecar')");
check(isPalindrome('A man, a plan, a canal: Panama'), true, 'ignores case, spaces and punctuation');
check(isPalindrome('hello'), false, "isPalindrome('hello')");
check(isPalindromeTwoPointers('Madam'), true, 'two-pointer version');

/**
 * 3. COUNT VOWELS
 * Q        'Automation' → 6
 * Remember FILTER the vowels, take the LENGTH
 * Explain  I split into characters, keep only those found in 'aeiou', and count them.
 * Speed    O(n) time
 * Edge     Upper-case vowels, so lower-case first; no vowels → 0.
 */
section('3. Count vowels');
const countVowels = (s) => [...s.toLowerCase()].filter((ch) => 'aeiou'.includes(ch)).length;
const countVowelsRegex = (s) => (s.match(/[aeiou]/gi) || []).length; // match returns null when nothing matches

check(countVowels('Automation'), 6, "countVowels('Automation')");
check(countVowelsRegex('Automation'), 6, 'regex version');
check(countVowels('xyz'), 0, 'no vowels → 0');

/**
 * 4. CHARACTER FREQUENCY
 * Q        'hello' → { h: 1, e: 1, l: 2, o: 1 }
 * Remember REDUCE into an object: acc[ch] = (acc[ch] || 0) + 1
 * Explain  I loop once over the characters and keep a count per character in an object.
 * Speed    O(n) time, O(k) space (k = distinct characters)
 * Edge     Empty string → {}.
 */
section('4. Character frequency');
const charFrequency = (s) => [...s].reduce((acc, ch) => {
  acc[ch] = (acc[ch] || 0) + 1;
  return acc;
}, {});

check(charFrequency('hello'), { h: 1, e: 1, l: 2, o: 1 }, "charFrequency('hello')");
check(charFrequency(''), {}, 'empty → {}');

/**
 * 5. FIRST NON-REPEATING CHARACTER
 * Q        'swiss' → 'w'
 * Remember COUNT first, then FIND the first with count 1
 * Explain  Two passes: build the frequency map (program 4), then walk the string again
 *          and return the first character whose count is 1.
 * Speed    O(n) time (two passes, still linear)
 * Edge     All characters repeat → null.
 */
section('5. First non-repeating character');
const firstUnique = (s) => {
  const freq = charFrequency(s);
  return [...s].find((ch) => freq[ch] === 1) ?? null;
};

check(firstUnique('swiss'), 'w', "firstUnique('swiss')");
check(firstUnique('aabb'), null, 'all repeat → null');

/**
 * 6. REVERSE WORDS (two common versions)
 * Q        'I love JS' → 'JS love I'  (word ORDER)   and   → 'I evol SJ'  (EACH word)
 * Remember Order: SPLIT ' ' → REVERSE → JOIN.   Each word: SPLIT ' ' → MAP(reverse) → JOIN
 * Explain  Split on spaces into words; either reverse the array of words,
 *          or map each word through the string-reverse from program 1.
 * Speed    O(n) time
 * Edge     Extra spaces: split(/\s+/) after trim() handles them.
 */
section('6. Reverse words');
const reverseWordOrder = (s) => s.trim().split(/\s+/).reverse().join(' ');
const reverseEachWord = (s) => s.split(' ').map(reverseString).join(' ');

check(reverseWordOrder('I love JS'), 'JS love I', 'reverse word order');
check(reverseWordOrder('  I   love JS '), 'JS love I', 'handles extra spaces');
check(reverseEachWord('I love JS'), 'I evol SJ', 'reverse each word');

/**
 * 7. CAPITALIZE EACH WORD (title case)
 * Q        'hello wORLD' → 'Hello World'
 * Remember SPLIT → MAP(first letter UP + rest down) → JOIN
 * Explain  For each word: upper-case charAt(0), lower-case slice(1), then join with spaces.
 * Speed    O(n) time
 * Edge     charAt(0) is safe on empty words (w[0].toUpperCase() would crash on '').
 */
section('7. Capitalize each word');
const capitalizeWords = (s) =>
  s.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');

check(capitalizeWords('hello wORLD'), 'Hello World', "capitalizeWords('hello wORLD')");
check(capitalizeWords('a  b'), 'A  B', 'double space keeps an empty word safely');

/**
 * 8. ANAGRAM (same letters, different order)
 * Q        'listen', 'silent' → true
 * Remember NORMALISE → SORT the letters → COMPARE
 * Explain  Two words are anagrams if their sorted letters are identical.
 *          The counting version (frequency map) is faster for long strings.
 * Speed    Sorting O(n log n); counting O(n)
 * Edge     Case and spaces ('Dormitory', 'Dirty room'), different lengths.
 */
section('8. Anagram');
const normalize = (s) => s.toLowerCase().replace(/[^a-z]/g, '');
const isAnagram = (a, b) => [...normalize(a)].sort().join('') === [...normalize(b)].sort().join('');

function isAnagramCount(a, b) {            // O(n): count up for a, down for b, all must end at 0
  const x = normalize(a), y = normalize(b);
  if (x.length !== y.length) return false;
  const count = {};
  for (const ch of x) count[ch] = (count[ch] || 0) + 1;
  for (const ch of y) { if (!count[ch]) return false; count[ch]--; }
  return true;
}

check(isAnagram('listen', 'silent'), true, "isAnagram('listen', 'silent')");
check(isAnagram('Dormitory', 'Dirty room'), true, 'ignores case and spaces');
check(isAnagram('abc', 'abd'), false, 'different letters → false');
check(isAnagramCount('listen', 'silent'), true, 'counting version');

/**
 * 9. LONGEST WORD
 * Q        'I love automation testing' → 'automation'
 * Remember SPLIT → REDUCE keeping the longer one
 * Explain  I keep the longest word seen so far as the accumulator.
 * Speed    O(n) time
 * Edge     Ties: the first one wins (because of > not >=).
 */
section('9. Longest word');
const longestWord = (s) => s.split(' ').reduce((longest, w) => (w.length > longest.length ? w : longest), '');

check(longestWord('I love automation testing'), 'automation', 'longestWord');

/**
 * 10. REMOVE DUPLICATE CHARACTERS
 * Q        'programming' → 'progamin'
 * Remember NEW SET keeps unique values in first-seen order
 * Explain  A Set stores each value once and keeps insertion order; spread it back and join.
 * Speed    O(n) time
 */
section('10. Remove duplicate characters');
const removeDuplicateChars = (s) => [...new Set(s)].join('');
const removeDuplicateCharsFilter = (s) => [...s].filter((ch, i, arr) => arr.indexOf(ch) === i).join(''); // O(n²)

check(removeDuplicateChars('programming'), 'progamin', 'Set version');
check(removeDuplicateCharsFilter('programming'), 'progamin', 'filter + indexOf version');

/**
 * 11. COUNT WORDS
 * Q        '  Playwright   is great ' → 3
 * Remember TRIM → SPLIT on whitespace → FILTER empty → LENGTH
 * Explain  Splitting on /\s+/ treats any run of spaces as one separator; trim avoids empty ends.
 * Speed    O(n) time
 * Edge     '' or '   ' → 0 (split would give [''], so filter(Boolean) removes it).
 */
section('11. Count words');
const countWords = (s) => s.trim().split(/\s+/).filter(Boolean).length;

check(countWords('  Playwright   is great '), 3, 'countWords');
check(countWords('   '), 0, 'only spaces → 0');

/* ═════════════════════════════════════ NUMBERS & ARRAYS ═════════════════════════════════════ */

/**
 * 12. SUM & AVERAGE
 * Q        [1, 2, 3, 4] → sum 10, average 2.5
 * Remember REDUCE with initial 0; average = sum / length
 * Explain  reduce adds each number to the running total; always pass 0 so an empty array works.
 * Speed    O(n) time
 * Edge     Empty array: sum 0, average → avoid dividing by 0.
 */
section('12. Sum & average');
const sum = (arr) => arr.reduce((total, n) => total + n, 0);
const average = (arr) => (arr.length ? sum(arr) / arr.length : 0);

check(sum([1, 2, 3, 4]), 10, 'sum');
check(average([1, 2, 3, 4]), 2.5, 'average');
check(average([]), 0, 'empty → 0, not NaN');

/**
 * 13. MAX & MIN
 * Q        [3, 9, 1, 7] → max 9, min 1
 * Remember Math.max(...arr)   or   REDUCE keeping the bigger one
 * Explain  Spread passes the numbers as arguments to Math.max. For huge arrays (100k+)
 *          spread can overflow the call stack, so reduce is the safe version.
 * Speed    O(n) time
 * Edge     Math.max() of an empty array is -Infinity.
 */
section('13. Max & min');
const max = (arr) => Math.max(...arr);
const min = (arr) => Math.min(...arr);
const maxReduce = (arr) => arr.reduce((m, n) => (n > m ? n : m));

check([max([3, 9, 1, 7]), min([3, 9, 1, 7])], [9, 1], 'Math.max / Math.min');
check(maxReduce([3, 9, 1, 7]), 9, 'reduce version');

/**
 * 14. SECOND LARGEST
 * Q        [10, 40, 30, 40] → 30   (duplicates of the largest don't count)
 * Remember UNIQUE → SORT descending → take [1]   or   ONE PASS tracking first & second
 * Explain  Remove duplicates with a Set, sort descending, pick index 1. In an interview offer
 *          the one-pass version: it's O(n) instead of O(n log n).
 * Speed    Sort O(n log n); single pass O(n)
 * Edge     Fewer than 2 distinct values → undefined.
 */
section('14. Second largest');
const secondLargest = (arr) => [...new Set(arr)].sort((a, b) => b - a)[1];

function secondLargestOnePass(arr) {
  let first = -Infinity, second = -Infinity;
  for (const n of arr) {
    if (n > first) { second = first; first = n; }   // new biggest: old biggest becomes second
    else if (n > second && n < first) second = n;   // between the two
  }
  return second === -Infinity ? undefined : second;
}

check(secondLargest([10, 40, 30, 40]), 30, 'sort version');
check(secondLargestOnePass([10, 40, 30, 40]), 30, 'one-pass version');
check(secondLargest([5, 5]), undefined, 'all the same → undefined');

/**
 * 15. REMOVE DUPLICATES FROM AN ARRAY
 * Q        [1, 2, 2, 3, 1] → [1, 2, 3]
 * Remember [...new Set(arr)]
 * Explain  A Set keeps only unique values; spread converts it back to an array, order kept.
 * Speed    O(n). The filter + indexOf version is O(n²), fine for small arrays.
 */
section('15. Remove duplicates');
const unique = (arr) => [...new Set(arr)];
const uniqueFilter = (arr) => arr.filter((x, i) => arr.indexOf(x) === i);

check(unique([1, 2, 2, 3, 1]), [1, 2, 3], 'Set version');
check(uniqueFilter([1, 2, 2, 3, 1]), [1, 2, 3], 'filter version');

/**
 * 16. FIND DUPLICATES
 * Q        [1, 2, 2, 3, 3, 3] → [2, 3]
 * Remember FILTER items whose indexOf ≠ current index, then make them UNIQUE
 * Explain  An item is a duplicate if it appeared earlier (its first index isn't this index).
 *          The Set version tracks "seen" in one pass.
 * Speed    filter version O(n²); Set version O(n)
 */
section('16. Find duplicates');
const findDuplicates = (arr) => unique(arr.filter((x, i) => arr.indexOf(x) !== i));

function findDuplicatesSet(arr) {
  const seen = new Set(), dupes = new Set();
  for (const x of arr) (seen.has(x) ? dupes : seen).add(x);
  return [...dupes];
}

check(findDuplicates([1, 2, 2, 3, 3, 3]), [2, 3], 'filter version');
check(findDuplicatesSet([1, 2, 2, 3, 3, 3]), [2, 3], 'Set version');

/**
 * 17. MISSING NUMBER in 1..n
 * Q        [1, 2, 4, 5] → 3
 * Remember EXPECTED sum − ACTUAL sum.  Expected = n × (n + 1) / 2
 * Explain  The numbers 1..n add up to n(n+1)/2. With one missing, n is length + 1;
 *          whatever is missing from the total is the answer.
 * Speed    O(n) time, O(1) space
 */
section('17. Missing number');
const missingNumber = (arr) => {
  const n = arr.length + 1;
  return (n * (n + 1)) / 2 - sum(arr);
};

check(missingNumber([1, 2, 4, 5]), 3, 'missingNumber([1, 2, 4, 5])');
check(missingNumber([2, 3, 1, 5]), 4, 'order does not matter');

/**
 * 18. TWO SUM
 * Q        nums [2, 7, 11, 15], target 9 → indexes [0, 1]
 * Remember MAP of value → index; for each n look up (target − n)
 * Explain  The brute force tries every pair, O(n²). Instead I remember each number's index in a
 *          Map; for each new number I check whether its partner (target − n) was already seen.
 * Speed    O(n) time, O(n) space
 * Edge     No solution → null. Check BEFORE storing so a number can't pair with itself.
 */
section('18. Two sum');
function twoSum(nums, target) {
  const seen = new Map();                  // value → index
  for (const [i, n] of nums.entries()) {
    const partner = target - n;
    if (seen.has(partner)) return [seen.get(partner), i];
    seen.set(n, i);
  }
  return null;
}

check(twoSum([2, 7, 11, 15], 9), [0, 1], 'twoSum([2,7,11,15], 9)');
check(twoSum([3, 3], 6), [0, 1], 'same value twice');
check(twoSum([1, 2], 10), null, 'no pair → null');

/**
 * 19. FLATTEN A NESTED ARRAY
 * Q        [1, [2, [3, [4]]]] → [1, 2, 3, 4]
 * Remember arr.flat(Infinity)   or   RECURSION: if it's an array, flatten it again
 * Explain  Built-in flat(Infinity) does it. Interviewers often want the recursive version:
 *          reduce, and for each item either concat its flattened self or the plain value.
 * Speed    O(n) total items
 */
section('19. Flatten nested array');
const flattenBuiltIn = (arr) => arr.flat(Infinity);
const flatten = (arr) =>
  arr.reduce((acc, item) => acc.concat(Array.isArray(item) ? flatten(item) : item), []);

check(flattenBuiltIn([1, [2, [3, [4]]]]), [1, 2, 3, 4], 'flat(Infinity)');
check(flatten([1, [2, [3, [4]]]]), [1, 2, 3, 4], 'recursive reduce');

/**
 * 20. CHUNK AN ARRAY
 * Q        [1, 2, 3, 4, 5], size 2 → [[1, 2], [3, 4], [5]]
 * Remember Array.from({ length: CEIL(n / size) }) + SLICE each piece
 * Explain  The number of chunks is length / size rounded up; chunk i is slice(i*size, i*size + size).
 * Speed    O(n)
 * Edge     The last chunk may be smaller.
 */
section('20. Chunk an array');
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));

check(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]], 'chunk(…, 2)');
check(chunk([], 3), [], 'empty → []');

/**
 * 21. ROTATE AN ARRAY to the right by k
 * Q        [1, 2, 3, 4, 5], k 2 → [4, 5, 1, 2, 3]
 * Remember LAST k items + the REST   (use k % length)
 * Explain  Rotating right by k moves the last k items to the front. k % length handles
 *          k bigger than the array (rotating by 7 = rotating by 2 for 5 items).
 * Speed    O(n)
 */
section('21. Rotate an array');
const rotateRight = (arr, k) => {
  const n = arr.length;
  if (n === 0) return [];
  const cut = n - (k % n);
  return [...arr.slice(cut), ...arr.slice(0, cut)];
};

check(rotateRight([1, 2, 3, 4, 5], 2), [4, 5, 1, 2, 3], 'rotate by 2');
check(rotateRight([1, 2, 3, 4, 5], 7), [4, 5, 1, 2, 3], 'k bigger than length');
check(rotateRight([1, 2, 3], 0), [1, 2, 3], 'k = 0 → unchanged');

/**
 * 22. MERGE TWO SORTED ARRAYS
 * Q        [1, 3, 5] + [2, 4, 6] → [1, 2, 3, 4, 5, 6]
 * Remember TWO POINTERS: take the smaller front item each time, then add the leftovers
 * Explain  Easy version: [...a, ...b].sort() is O(n log n). Because both are already sorted,
 *          I walk both with two indexes and always take the smaller, which is O(n + m).
 * Speed    O(n + m)
 */
section('22. Merge two sorted arrays');
function mergeSorted(a, b) {
  const out = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) out.push(a[i] <= b[j] ? a[i++] : b[j++]);
  return [...out, ...a.slice(i), ...b.slice(j)];   // one of these is empty
}
const mergeSortedSimple = (a, b) => [...a, ...b].sort((x, y) => x - y);

check(mergeSorted([1, 3, 5], [2, 4, 6]), [1, 2, 3, 4, 5, 6], 'two pointers');
check(mergeSorted([1, 2], [3, 4, 5, 6]), [1, 2, 3, 4, 5, 6], 'different lengths');
check(mergeSortedSimple([1, 3, 5], [2, 4, 6]), [1, 2, 3, 4, 5, 6], 'simple version');

/**
 * 23. INTERSECTION, DIFFERENCE, UNION
 * Q        a [1, 2, 3, 4], b [3, 4, 5] → common [3, 4], only in a [1, 2], all [1, 2, 3, 4, 5]
 * Remember Put b in a SET, then FILTER a by set.has
 * Explain  Set.has is O(1), so filtering a against it is O(n + m) instead of O(n × m) with includes.
 * Speed    O(n + m)
 */
section('23. Intersection / difference / union');
const intersection = (a, b) => { const s = new Set(b); return a.filter((x) => s.has(x)); };
const difference = (a, b) => { const s = new Set(b); return a.filter((x) => !s.has(x)); };
const union = (a, b) => [...new Set([...a, ...b])];

check(intersection([1, 2, 3, 4], [3, 4, 5]), [3, 4], 'intersection');
check(difference([1, 2, 3, 4], [3, 4, 5]), [1, 2], 'difference');
check(union([1, 2, 3, 4], [3, 4, 5]), [1, 2, 3, 4, 5], 'union');

/**
 * 24. MOVE ZEROS TO THE END (keep the order of the others)
 * Q        [0, 1, 0, 3, 12] → [1, 3, 12, 0, 0]
 * Remember NON-zeros + ZEROS   (two filters)
 * Explain  Filter out the non-zero values in order, then append as many zeros as there were.
 * Speed    O(n)
 */
section('24. Move zeros to the end');
const moveZeros = (arr) => [...arr.filter((n) => n !== 0), ...arr.filter((n) => n === 0)];

check(moveZeros([0, 1, 0, 3, 12]), [1, 3, 12, 0, 0], 'moveZeros');

/**
 * 25. MOST FREQUENT ELEMENT
 * Q        ['qa', 'prod', 'qa', 'dev', 'qa'] → 'qa'
 * Remember COUNT with reduce → ENTRIES → REDUCE to the biggest count
 * Explain  Build a frequency object, turn it into [value, count] pairs, keep the pair with
 *          the highest count.
 * Speed    O(n)
 * Edge     Ties: the first one reaching the top count wins.
 */
section('25. Most frequent element');
const mostFrequent = (arr) => {
  const counts = arr.reduce((acc, x) => ({ ...acc, [x]: (acc[x] || 0) + 1 }), {});
  return Object.entries(counts).reduce((best, cur) => (cur[1] > best[1] ? cur : best))[0];
};

check(mostFrequent(['qa', 'prod', 'qa', 'dev', 'qa']), 'qa', 'mostFrequent');

/**
 * 26. FIZZBUZZ
 * Q        1..15: multiples of 3 → 'Fizz', of 5 → 'Buzz', of both → 'FizzBuzz', else the number
 * Remember Check 15 (both) FIRST, then 3, then 5
 * Explain  Array.from builds 1..n; map turns each number into its word. The "both" case must
 *          be checked first, otherwise 15 would stop at 'Fizz'.
 * Speed    O(n)
 */
section('26. FizzBuzz');
const fizzBuzz = (n) =>
  Array.from({ length: n }, (_, i) => {
    const x = i + 1;
    if (x % 15 === 0) return 'FizzBuzz';
    if (x % 3 === 0) return 'Fizz';
    if (x % 5 === 0) return 'Buzz';
    return x;
  });

check(fizzBuzz(15).slice(-6), ['Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz'], 'fizzBuzz(15), last six');

/**
 * 27. FACTORIAL
 * Q        5! = 5 × 4 × 3 × 2 × 1 = 120
 * Remember RECURSION: n × factorial(n − 1), STOP at 1
 * Explain  Every recursion needs a base case (n ≤ 1 → 1) or it never stops.
 *          The reduce version multiplies 1..n without recursion.
 * Speed    O(n) time; the recursive version also uses O(n) call-stack space
 * Edge     0! = 1.
 */
section('27. Factorial');
const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
const factorialReduce = (n) => Array.from({ length: n }, (_, i) => i + 1).reduce((p, x) => p * x, 1);

check(factorial(5), 120, 'recursive');
check(factorialReduce(5), 120, 'reduce');
check(factorial(0), 1, '0! = 1');

/**
 * 28. FIBONACCI
 * Q        first 8 numbers → [0, 1, 1, 2, 3, 5, 8, 13]; fib(10) → 55
 * Remember EACH = the PREVIOUS TWO added
 * Explain  Start with [0, 1] and keep pushing the sum of the last two. Mention that the naive
 *          recursive fib(n) is exponential (O(2^n)); the loop is O(n).
 * Speed    O(n)
 */
section('28. Fibonacci');
const fibSeries = (count) => {
  const seq = [0, 1];
  while (seq.length < count) seq.push(seq.at(-1) + seq.at(-2));
  return seq.slice(0, count);
};
function fib(n) {                          // n-th number with two variables, O(1) space
  let [a, b] = [0, 1];
  for (let i = 0; i < n; i++) [a, b] = [b, a + b];
  return a;
}

check(fibSeries(8), [0, 1, 1, 2, 3, 5, 8, 13], 'fibSeries(8)');
check(fib(10), 55, 'fib(10)');
check(fibSeries(1), [0], 'count 1');

/**
 * 29. PRIME NUMBERS
 * Q        isPrime(7) → true; primes up to 20 → [2, 3, 5, 7, 11, 13, 17, 19]
 * Remember Try dividing only up to √n
 * Explain  A prime has no divisors except 1 and itself. If n has a divisor, one of the pair is
 *          ≤ √n, so checking i × i ≤ n is enough. Then filter 1..n with isPrime.
 * Speed    isPrime O(√n)
 * Edge     0 and 1 are NOT prime; 2 is the only even prime.
 */
section('29. Prime numbers');
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
}
const primesUpTo = (n) => Array.from({ length: n }, (_, i) => i + 1).filter(isPrime);

check([isPrime(7), isPrime(9), isPrime(1), isPrime(2)], [true, false, false, true], 'isPrime 7, 9, 1, 2');
check(primesUpTo(20), [2, 3, 5, 7, 11, 13, 17, 19], 'primesUpTo(20)');

/**
 * 30. SUM OF DIGITS
 * Q        1234 → 10
 * Remember NUMBER → STRING → SPLIT → REDUCE(Number)
 * Explain  Convert to a string to get the digits, then add them back as numbers.
 *          Maths version: n % 10 gives the last digit, Math.floor(n / 10) drops it.
 * Speed    O(d), d = number of digits
 * Edge     Negative numbers: use Math.abs first.
 */
section('30. Sum of digits');
const sumDigits = (n) => String(Math.abs(n)).split('').reduce((s, d) => s + Number(d), 0);
function sumDigitsMath(n) {
  n = Math.abs(n);
  let total = 0;
  while (n > 0) { total += n % 10; n = Math.floor(n / 10); }
  return total;
}

check(sumDigits(1234), 10, 'string version');
check(sumDigitsMath(1234), 10, 'maths version');
check(sumDigits(-56), 11, 'negative → uses Math.abs');

/* ══════════════════════════════════════════ OBJECTS ══════════════════════════════════════════ */

const tests = [
  { name: 'login', status: 'passed', durationMs: 1200, module: 'auth' },
  { name: 'register', status: 'failed', durationMs: 3400, module: 'auth' },
  { name: 'transfer', status: 'passed', durationMs: 2100, module: 'accounts' },
];

/**
 * 31. GROUP BY A PROPERTY
 * Q        group tests by module → { auth: [...], accounts: [...] }
 * Remember REDUCE: (acc[key] ||= []).push(item)
 * Explain  The accumulator is an object of arrays; create the array the first time a key
 *          appears, then push. Newer Node also has Object.groupBy(arr, fn).
 * Speed    O(n)
 */
section('31. Group by a property');
const groupBy = (arr, key) =>
  arr.reduce((acc, item) => {
    (acc[item[key]] ||= []).push(item.name);
    return acc;
  }, {});

check(groupBy(tests, 'module'), { auth: ['login', 'register'], accounts: ['transfer'] }, "groupBy(tests, 'module')");
check(Object.keys(Object.groupBy(tests, (t) => t.status)), ['passed', 'failed'], 'Object.groupBy');

/**
 * 32. COUNT BY A PROPERTY
 * Q        count tests per status → { passed: 2, failed: 1 }
 * Remember REDUCE: acc[key] = (acc[key] || 0) + 1   (same idea as character frequency)
 * Speed    O(n)
 */
section('32. Count by a property');
const countBy = (arr, key) => arr.reduce((acc, x) => {
  acc[x[key]] = (acc[x[key]] || 0) + 1;
  return acc;
}, {});

check(countBy(tests, 'status'), { passed: 2, failed: 1 }, "countBy(tests, 'status')");

/**
 * 33. INVERT AN OBJECT (swap keys and values)
 * Q        { a: 'x', b: 'y' } → { x: 'a', y: 'b' }
 * Remember ENTRIES → MAP([k, v] → [v, k]) → FROM ENTRIES
 * Explain  Object.entries turns the object into pairs, map swaps each pair, fromEntries rebuilds it.
 * Speed    O(n)
 * Edge     Duplicate values collide: the last one wins.
 */
section('33. Invert keys and values');
const invert = (obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));

check(invert({ a: 'x', b: 'y' }), { x: 'a', y: 'b' }, 'invert');

/**
 * 34. SORT ARRAY OF OBJECTS BY A KEY
 * Q        sort tests by durationMs (fastest first) or by name (A→Z)
 * Remember COPY first, then sort with (a, b) => a.key − b.key  (numbers) / localeCompare (text)
 * Explain  sort() mutates, so I use toSorted (or [...arr].sort). Numbers subtract; strings
 *          use localeCompare, because subtracting strings gives NaN.
 * Speed    O(n log n)
 */
section('34. Sort objects by a key');
const sortBy = (arr, key) =>
  arr.toSorted((a, b) => (typeof a[key] === 'number' ? a[key] - b[key] : String(a[key]).localeCompare(b[key])));

check(sortBy(tests, 'durationMs').map((t) => t.name), ['login', 'transfer', 'register'], 'by number');
check(sortBy(tests, 'name').map((t) => t.name), ['login', 'register', 'transfer'], 'by text');
check(tests[0].name, 'login', 'original not mutated');

/**
 * 35. DEEP CLONE
 * Q        copy an object so that changing nested parts of the copy doesn't affect the original
 * Remember structuredClone(obj)   or   RECURSION: copy arrays/objects, return primitives as they are
 * Explain  Spread { ...obj } is SHALLOW: nested objects are still shared. structuredClone is the
 *          built-in deep copy. The recursive version shows I understand how it works.
 * Speed    O(n) properties
 * Edge     JSON.parse(JSON.stringify(x)) loses Dates, undefined and functions.
 */
section('35. Deep clone');
function deepClone(value) {
  if (value === null || typeof value !== 'object') return value;          // primitives as they are
  if (Array.isArray(value)) return value.map(deepClone);                  // arrays: clone each item
  return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, deepClone(v)])); // objects
}

const original = { name: 'john', address: { city: 'NYC' }, tags: ['qa'] };
const copy = deepClone(original);
copy.address.city = 'LA';
copy.tags.push('lead');
check([original.address.city, original.tags], ['NYC', ['qa']], 'recursive deepClone: original untouched');
check(structuredClone(original).address !== original.address, true, 'structuredClone: new nested object');

/**
 * 36. DEEP EQUAL (are two values structurally the same?)
 * Q        deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }) → true
 * Remember SAME primitive? → SAME number of keys? → every key deepEqual (RECURSION)
 * Explain  === only compares references for objects. I compare primitives directly, then check
 *          both are objects with the same keys, and recurse into every value.
 * Speed    O(n) total properties
 * Edge     null is typeof 'object'; arrays vs objects; key order shouldn't matter.
 */
section('36. Deep equal');
function deepEqual(a, b) {
  if (a === b) return true;                                               // same primitive / same ref
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => Object.hasOwn(b, k) && deepEqual(a[k], b[k]));
}

check(deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }), true, 'nested equal → true');
check(deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 }), true, 'key order does not matter');
check(deepEqual({ a: 1 }, { a: '1' }), false, '1 vs "1" → false');
check(deepEqual([1, 2], { 0: 1, 1: 2 }), false, 'array vs object → false');
check({ a: 1 } === { a: 1 }, false, 'compare with === → false (different references)');

console.log(`\nAll ${passed} checks passed ✔ (36 programs)`);
