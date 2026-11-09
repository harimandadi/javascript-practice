/**
 * JAVASCRIPT STRING METHODS CHEAT SHEET
 *
 * Run it:   node string-methods-cheatsheet.js      (from the practice folder)
 * Every example calls check(actual, expected). A ✔ means the comment is proven correct.
 *
 * ─────────────────────────────────────────────────────────────────────────────────────────────
 *  GOLDEN RULE: strings are IMMUTABLE. No string method changes the original string;
 *  every method RETURNS A NEW value. So always use the result:  s = s.trim();
 * ─────────────────────────────────────────────────────────────────────────────────────────────
 *  QUICK TABLE  ([ ] = optional argument)
 * ─────────────────────────────────────────────────────────────────────────────────────────────
 *  Method          | Arguments                         | Returns
 *  ----------------|-----------------------------------|-----------------------------------------
 *  length          | (property, no brackets)           | number of characters
 *  at              | index (negative ok)               | character or undefined
 *  charAt          | [index = 0]                       | character or '' (never undefined)
 *  charCodeAt      | [index = 0]                       | number (UTF-16 code), NaN if out of range
 *  indexOf         | search [, fromIndex]              | first position or -1
 *  lastIndexOf     | search [, fromIndex]              | last position or -1
 *  includes        | search [, position]               | true / false
 *  startsWith      | search [, position]               | true / false
 *  endsWith        | search [, length]                 | true / false
 *  slice           | [start [, end]]  (negative ok)    | new string (end excluded)
 *  substring       | start [, end]    (no negatives)   | new string (swaps if start > end)
 *  toUpperCase     | (none)                            | new string
 *  toLowerCase     | (none)                            | new string
 *  trim / trimStart / trimEnd | (none)                 | new string without whitespace
 *  padStart/padEnd | targetLength [, padString = ' ']  | new string padded to length
 *  repeat          | count                             | new string repeated
 *  split           | [separator [, limit]]             | ARRAY of pieces
 *  concat          | ...strings                        | new string
 *  replace         | pattern, replacement|function     | new string (FIRST match only, unless regex /g)
 *  replaceAll      | pattern, replacement|function     | new string (ALL matches)
 *  match           | regex                             | array of matches or null
 *  matchAll        | regex with /g                     | iterator of detailed matches
 *  search          | regex                             | first position or -1
 *  localeCompare   | other [, locale [, options]]      | negative / 0 / positive (for sorting)
 *
 *  Memory tricks
 *   - "Strings never change, they only return": always store the result.
 *   - slice and substring look alike: slice takes NEGATIVE numbers, substring does not.
 *   - replace = first match only; replaceAll (or regex /g) = every match.
 *   - split turns a string INTO an array; join turns an array BACK into a string.
 */

let passed = 0;
function check(actual, expected, label = '') {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) throw new Error(`✘ ${label}\n   expected ${e}\n   got      ${a}`);
  passed++;
  console.log(`  ✔ ${label || a}`);
}
function section(title) {
  console.log(`\n=== ${title} ===`);
}

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * 1. CREATE & CONVERT
 * ═══════════════════════════════════════════════════════════════════════════════════════════ */
section('1. Create & convert');
check('single', 'single', "single quotes '...'");
check("double", 'double', 'double quotes "..." (same thing)');
const env = 'qa';
check(`env: ${env}, tests: ${2 + 3}`, 'env: qa, tests: 5', 'template literal `${expression}`');
check(`line1
line2`.includes('\n'), true, 'template literals can span lines');
check(String(123), '123', 'String(value) → string');
check((123).toString(), '123', 'number.toString()');
check((255).toString(16), 'ff', 'toString(radix): 255 in hex');
check((5).toString(2), '101', 'toString(2) → binary');
check(Number('42'), 42, 'Number("42") → 42');
check(Number('42px'), null, 'Number("42px") → NaN (JSON shows null): whole string must be numeric');
check(parseInt('42px', 10), 42, 'parseInt reads digits until the first non-digit');
check(parseFloat('3.14abc'), 3.14, 'parseFloat keeps decimals');
check(+'7', 7, 'unary + converts too');
check('5' + 3, '53', '⚠ + with a string JOINS');
check('5' - 3, 2, '⚠ - converts to number');
check([...'abc'], ['a', 'b', 'c'], 'spread [...s] → array of characters');
check(Array.from('abc'), ['a', 'b', 'c'], 'Array.from(s) → same');

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * 2. LENGTH & READING CHARACTERS
 * ═══════════════════════════════════════════════════════════════════════════════════════════ */
section('2. Length & reading characters');
const word = 'Playwright';
check(word.length, 10, 'length (a property: no brackets)');
check(word[0], 'P', 's[0] → first character');
check(word[word.length - 1], 't', 's[s.length - 1] → last');
check(word.at(-1), 't', 's.at(-1) → last (modern)');
check(word[99], undefined, 's[99] → undefined');
check(word.charAt(99), '', 'charAt(99) → "" (never undefined)');
check(word.charAt(), 'P', 'charAt() with no argument → index 0');
check('A'.charCodeAt(0), 65, 'charCodeAt → character code');
check(String.fromCharCode(72, 105), 'Hi', 'String.fromCharCode(codes) → string');
const s1 = 'abc';
s1[0] = 'X'; // silently ignored
check(s1, 'abc', '⚠ strings are immutable: s[0] = "X" does nothing');
check('😀'.length, 2, '⚠ emojis count as 2 in length...');
check([...'😀'].length, 1, '...spread counts real characters');

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * 3. SEARCH: indexOf, lastIndexOf, includes, startsWith, endsWith, search
 * ═══════════════════════════════════════════════════════════════════════════════════════════ */
section('3. Search');
const url = 'https://parabank.parasoft.com/parabank/index.htm';
check(url.indexOf('parabank'), 8, 'indexOf → first position');
check(url.indexOf('parabank', 10), 30, 'indexOf(search, fromIndex) → start looking later');
check(url.lastIndexOf('parabank'), 30, 'lastIndexOf → last position');
check(url.indexOf('admin'), -1, 'not found → -1');
check(url.includes('parasoft'), true, 'includes → true/false');
check(url.includes('https', 1), false, 'includes(search, position)');
check(url.startsWith('https'), true, 'startsWith');
check(url.startsWith('parabank', 8), true, 'startsWith(search, position)');
check(url.endsWith('.htm'), true, 'endsWith');
check('index.htm.bak'.endsWith('.htm', 9), true, 'endsWith(search, length): treat the string as 9 chars long');
check('Hello'.includes('hello'), false, '⚠ search is case-sensitive...');
check('Hello'.toLowerCase().includes('hello'), true, '...lower-case both sides to ignore case');
check(url.search(/\d/), -1, 'search(regex) → position of first match or -1');

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * 4. EXTRACT: slice, substring (and why substr is avoided)
 * ═══════════════════════════════════════════════════════════════════════════════════════════ */
section('4. Extract: slice, substring');
const text = 'automation';
check(text.slice(0, 4), 'auto', 'slice(start, end): end excluded');
check(text.slice(4), 'mation', 'slice(start) → to the end');
check(text.slice(-3), 'ion', 'slice(-3) → last 3 (negatives allowed)');
check(text.slice(1, -1), 'utomatio', 'slice(1, -1) → drop first and last');
check(text.slice(), 'automation', 'slice() → whole string');
check(text.substring(0, 4), 'auto', 'substring(start, end) → same as slice here');
check(text.substring(4, 0), 'auto', 'substring swaps start/end if start > end');
check(text.slice(4, 0), '', '...slice returns "" instead');
check(text.substring(-3), 'automation', '⚠ substring treats negatives as 0');
// substr(start, length) is deprecated: use slice instead.
check(url.slice(url.lastIndexOf('/') + 1), 'index.htm', 'real use: text after the last "/"');

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * 5. CHANGE CASE, TRIM, PAD, REPEAT
 * ═══════════════════════════════════════════════════════════════════════════════════════════ */
section('5. Case, trim, pad, repeat');
check('Hello'.toUpperCase(), 'HELLO', 'toUpperCase');
check('Hello'.toLowerCase(), 'hello', 'toLowerCase');
const raw = '   padded text  ';
check(raw.trim(), 'padded text', 'trim → both ends');
check(raw.trimStart(), 'padded text  ', 'trimStart → start only');
check(raw.trimEnd(), '   padded text', 'trimEnd → end only');
check(raw, '   padded text  ', 'original unchanged (immutable)');
check('5'.padStart(3, '0'), '005', 'padStart(targetLength, padString) → leading zeros');
check('7'.padStart(3), '  7', 'padStart default pad is a space');
check('abc'.padEnd(6, '.'), 'abc...', 'padEnd');
check('abcdef'.padStart(3, '0'), 'abcdef', 'already long enough → unchanged');
check('1234'.padStart(16, '*'), '************1234', 'mask a card number');
check('ab'.repeat(3), 'ababab', 'repeat(count)');
check('-'.repeat(10), '----------', 'quick separator line');
check('x'.repeat(0), '', 'repeat(0) → ""');

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * 6. SPLIT (string → array) and JOIN (array → string)
 *    Syntax: str.split(separator?, limit?)
 * ═══════════════════════════════════════════════════════════════════════════════════════════ */
section('6. split & join');
check('a,b,c'.split(','), ['a', 'b', 'c'], 'split(",")');
check('abc'.split(''), ['a', 'b', 'c'], 'split("") → characters');
check('a b  c'.split(' '), ['a', 'b', '', 'c'], '⚠ split(" ") keeps empty pieces for double spaces');
check('a b  c'.split(/\s+/), ['a', 'b', 'c'], 'split(/\\s+/) → any run of whitespace');
check('a,b,c,d'.split(',', 2), ['a', 'b'], 'split(separator, limit) → only the first 2');
check('abc'.split(), ['abc'], 'split() with no separator → whole string in one item');
check(''.split(','), [''], '⚠ empty string → [""], not []');
check('2026-11-09'.split('-').map(Number), [2026, 11, 9], 'split then map(Number)');
check(['a', 'b', 'c'].join('-'), 'a-b-c', 'join is the reverse of split');
check('a,b,c'.split(',').join(' | '), 'a | b | c', 'swap a separator: split + join');

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * 7. JOIN STRINGS: +, concat, template literals
 * ═══════════════════════════════════════════════════════════════════════════════════════════ */
section('7. Join strings');
const first = 'John', last = 'Smith';
check(first + ' ' + last, 'John Smith', '+ operator');
check(first.concat(' ', last), 'John Smith', 'concat(...strings)');
check(`${first} ${last}`, 'John Smith', 'template literal (most readable)');
check(['Hello', 'World'].join(' '), 'Hello World', 'join many pieces');

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * 8. REPLACE & REPLACE ALL
 *    Syntax: str.replace(pattern, replacement)    pattern: string or regex; replacement: string or function
 * ═══════════════════════════════════════════════════════════════════════════════════════════ */
section('8. replace, replaceAll');
const msg = 'qa env, qa data, qa users';
check(msg.replace('qa', 'prod'), 'prod env, qa data, qa users', '⚠ replace(string) → FIRST match only');
check(msg.replaceAll('qa', 'prod'), 'prod env, prod data, prod users', 'replaceAll → every match');
check(msg.replace(/qa/g, 'prod'), 'prod env, prod data, prod users', 'regex with /g flag → every match');
check('QA and qa'.replace(/qa/gi, 'x'), 'x and x', '/gi → global + ignore case');
check('a1b2c3'.replace(/\d/g, ''), 'abc', 'remove all digits');
check('  too   many   spaces '.replace(/\s+/g, ' ').trim(), 'too many spaces', 'collapse whitespace');
check('hello world'.replace(/\b\w/g, (ch) => ch.toUpperCase()), 'Hello World', 'replacement FUNCTION: capitalize words');
check('2026-11-09'.replace(/(\d+)-(\d+)-(\d+)/, '$3/$2/$1'), '09/11/2026', 'capture groups $1 $2 $3 reorder parts');
check('price: $5'.replaceAll('$', 'USD '), 'price: USD 5', 'replaceAll with a string treats $ literally');

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * 9. REGEX MATCHING: match, matchAll, test
 * ═══════════════════════════════════════════════════════════════════════════════════════════ */
section('9. match, matchAll, test');
const log = 'Order 12 shipped, order 7 pending, order 305 done';
check(log.match(/\d+/g), ['12', '7', '305'], 'match(/g) → array of all matches');
check(log.match(/\d+/g).map(Number), [12, 7, 305], '...convert to numbers');
check(log.match(/xyz/g), null, '⚠ no match → null (not []): use (s.match(re) || [])');
check((log.match(/xyz/g) || []).length, 0, 'safe count with || []');
check(log.match(/order (\d+)/i)[1], '12', 'match without /g → first match + capture groups ([1])');
check([...log.matchAll(/order (\d+) (\w+)/gi)].map((m) => `${m[1]}:${m[2]}`), ['12:shipped', '7:pending', '305:done'], 'matchAll → every match WITH groups');
check(/^\d+$/.test('12345'), true, 'regex.test(s) → true/false (only digits?)');
check(/^[\w.]+@\w+\.\w+$/.test('john@test.com'), true, 'simple email check');

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * 10. COMPARE & SORT
 * ═══════════════════════════════════════════════════════════════════════════════════════════ */
section('10. Compare & sort');
check('apple' === 'apple', true, '=== compares contents for strings (unlike objects)');
check('a' < 'b', true, '< and > compare alphabetically...');
check('B' < 'a', true, '⚠ ...but ALL upper-case letters come before lower-case');
check('10' < '9', true, '⚠ number-strings compare as text');
check(['banana', 'Apple', 'cherry'].sort(), ['Apple', 'banana', 'cherry'], 'sort() → by character code');
check(['b', 'a', 'C'].sort((x, y) => x.localeCompare(y)), ['a', 'b', 'C'], 'localeCompare → natural A–Z ignoring case order');
check(['file10', 'file2'].sort((x, y) => x.localeCompare(y, undefined, { numeric: true })), ['file2', 'file10'], 'localeCompare numeric: file2 before file10');
check('Résumé'.localeCompare('resume', undefined, { sensitivity: 'base' }), 0, 'compare ignoring case and accents');

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * 11. LOOPING OVER A STRING
 * ═══════════════════════════════════════════════════════════════════════════════════════════ */
section('11. Loop over a string');
let viaFor = '';
for (let i = 0; i < 'abc'.length; i++) viaFor += 'abc'[i].toUpperCase();
check(viaFor, 'ABC', 'classic for loop with index');
let viaForOf = '';
for (const ch of 'abc') viaForOf += ch + ch;
check(viaForOf, 'aabbcc', 'for...of → each character (emoji-safe)');
check([...'abc'].map((ch) => ch.charCodeAt(0)), [97, 98, 99], 'spread → then any ARRAY method');
check(Array.from('abc', (ch) => ch.toUpperCase()).join(''), 'ABC', 'Array.from(s, mapFn)');
check([...'hello'].filter((ch) => 'aeiou'.includes(ch)).length, 2, 'filter characters');

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * 12. CHARACTER CHECKS (handy in programs)
 * ═══════════════════════════════════════════════════════════════════════════════════════════ */
section('12. Character checks');
const isUpper = (ch) => ch !== ch.toLowerCase();
const isLower = (ch) => ch !== ch.toUpperCase();
const isDigit = (ch) => ch >= '0' && ch <= '9';
const isLetter = (ch) => /^[a-z]$/i.test(ch);
const isVowel = (ch) => 'aeiouAEIOU'.includes(ch);
check([isUpper('A'), isUpper('a'), isUpper('1')], [true, false, false], 'isUpper');
check([isLower('a'), isLower('A')], [true, false], 'isLower');
check([isDigit('7'), isDigit('x')], [true, false], 'isDigit');
check([isLetter('g'), isLetter('5')], [true, false], 'isLetter');
check([isVowel('E'), isVowel('z')], [true, false], 'isVowel');
check(' \t\n'.trim() === '', true, 'is blank: s.trim() === ""');

console.log(`\nAll ${passed} checks passed ✔`);
