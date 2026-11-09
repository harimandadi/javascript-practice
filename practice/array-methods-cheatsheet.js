/**
 * JAVASCRIPT ARRAY METHODS CHEAT SHEET
 * forEach, map, filter, reduce, some, every, slice, splice, shift, unshift
 *
 * Run it:   node array-methods-cheatsheet.js      (from the practice folder)
 * Every example calls check(actual, expected). A ✔ means the comment is proven correct.
 *
 * ─────────────────────────────────────────────────────────────────────────────────────────────
 *  QUICK TABLE  ([ ] = optional argument)
 * ─────────────────────────────────────────────────────────────────────────────────────────────
 *  Method    | Arguments                                         | Returns                     | Changes original?
 *  ----------|---------------------------------------------------|-----------------------------|------------------
 *  forEach   | callback(element [, index [, array]]) [, thisArg] | undefined (nothing)         | no
 *  map       | callback(element [, index [, array]]) [, thisArg] | NEW array, same length      | no
 *  filter    | callback(element [, index [, array]]) [, thisArg] | NEW array, kept items       | no
 *  reduce    | callback(acc, element [, index [, array]]) [, initialValue] | ONE value         | no
 *  some      | callback(element [, index [, array]]) [, thisArg] | true / false (ANY match)    | no
 *  every     | callback(element [, index [, array]]) [, thisArg] | true / false (ALL match)    | no
 *  slice     | [start [, end]]                                   | NEW array (a copy of part)  | no
 *  splice    | start [, deleteCount [, ...itemsToInsert]]        | array of REMOVED items      | YES ⚠
 *  shift     | (none)                                            | the removed FIRST item      | YES ⚠
 *  unshift   | ...itemsToAdd (zero or more)                      | the NEW length (a number)   | YES ⚠
 *
 *  Memory tricks
 *   - "slice is safe, sPLICE sPLITS the original": slice copies, splice mutates.
 *   - shift / unshift work at the START, pop / push work at the END.
 *   - map = transform each, filter = keep some, reduce = boil down to one,
 *     forEach = just do something, some = "any?", every = "all?".
 *   - For callback methods only the callback is mandatory; index, array and thisArg are optional.
 */

// ── tiny test helper ───────────────────────────────────────────────────────────────────────
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

// Sample data used throughout (test-automation flavoured)
const results = [
  { name: 'login', status: 'passed', durationMs: 1200 },
  { name: 'register', status: 'failed', durationMs: 3400 },
  { name: 'transfer', status: 'passed', durationMs: 2100 },
  { name: 'find-tx', status: 'skipped', durationMs: 0 },
];
const nums = [1, 2, 3, 4, 5];

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * 0. THE 8 WAYS TO WRITE A CALLBACK (same for forEach / map / filter / some / every / reduce)
 * ═══════════════════════════════════════════════════════════════════════════════════════════ */
section('0. Ways to write the callback (using map)');

// 1) Arrow, one parameter, no brackets, IMPLICIT return (no braces = value is returned)
check(nums.map(n => n * 2), [2, 4, 6, 8, 10], '1) n => n * 2');

// 2) Arrow with brackets around the parameter (same thing; brackets required for 0 or 2+ params)
check(nums.map((n) => n * 2), [2, 4, 6, 8, 10], '2) (n) => n * 2');

// 3) Arrow with a BLOCK body { } → you MUST write `return`
check(nums.map((n) => { return n * 2; }), [2, 4, 6, 8, 10], '3) (n) => { return n * 2; }');
//    ⚠ Pitfall: braces but no return → every result is undefined (JSON shows null)
check(nums.map((n) => { n * 2; }), [null, null, null, null, null], '3b) forgot return → undefined');

// 4) Arrow returning an OBJECT: wrap it in ( ), otherwise { } is read as a block body
check(nums.slice(0, 2).map((n) => ({ value: n })), [{ value: 1 }, { value: 2 }], '4) n => ({ value: n })');

// 5) Classic function expression
check(nums.map(function (n) { return n * 2; }), [2, 4, 6, 8, 10], '5) function (n) { return ... }');

// 6) Pass a NAMED function (no brackets after the name: you pass it, map calls it)
function double(n) { return n * 2; }
check(nums.map(double), [2, 4, 6, 8, 10], '6) nums.map(double)');
//    ⚠ Pitfall: map passes (element, index, array). parseInt's 2nd param is "radix", so the index breaks it:
check(['1', '2', '3'].map(parseInt), [1, null, null], '6b) ["1","2","3"].map(parseInt) → [1, NaN, NaN]');
check(['1', '2', '3'].map((s) => parseInt(s, 10)), [1, 2, 3], '6c) fix: wrap it → s => parseInt(s, 10)');

// 7) Destructure the element's properties right in the parameter list
check(results.map(({ name }) => name), ['login', 'register', 'transfer', 'find-tx'], '7) ({ name }) => name');

// 8) Use the OPTIONAL index and array parameters
check(nums.map((n, i) => n * i), [0, 2, 6, 12, 20], '8) (n, i) => n * i');
check(nums.map((n, i, arr) => arr.length - i), [5, 4, 3, 2, 1], '8b) (n, i, arr) => arr.length - i');

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * 1. forEach: "do something with each item". Returns undefined.
 *    Syntax: array.forEach(callback(element, index?, array?), thisArg?)
 * ═══════════════════════════════════════════════════════════════════════════════════════════ */
section('1. forEach');

// Basic: build something outside the loop
const names1 = [];
results.forEach((r) => names1.push(r.name));
check(names1, ['login', 'register', 'transfer', 'find-tx'], 'push each name');

// With index
const lines = [];
results.forEach((r, i) => lines.push(`${i + 1}. ${r.name}`));
check(lines[1], '2. register', 'with index → "2. register"');

// Return value is ALWAYS undefined, so you can't chain after it
const ret = nums.forEach((n) => n * 2);
check(ret, undefined, 'returns undefined (use map if you want a new array)');

// thisArg (optional 2nd argument): only works with `function`, NOT arrows (arrows ignore `this`)
const counter = { total: 0 };
nums.forEach(function (n) { this.total += n; }, counter);
check(counter.total, 15, 'thisArg with a function → total 15');

// ⚠ You can't `break` out of forEach. Use for...of, or some()/every() if you need to stop early.
const seen = [];
for (const n of nums) { if (n > 2) break; seen.push(n); }
check(seen, [1, 2], 'need to stop early? use for...of + break');

// ⚠ forEach does NOT wait for async callbacks. Use for...of with await, or Promise.all(arr.map(...)).

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * 2. map: "transform every item". Returns a NEW array of the SAME length.
 *    Syntax: array.map(callback(element, index?, array?), thisArg?)
 * ═══════════════════════════════════════════════════════════════════════════════════════════ */
section('2. map');

check(results.map((r) => r.durationMs / 1000), [1.2, 3.4, 2.1, 0], 'ms → seconds');
check(results.map((r) => r.name.toUpperCase()), ['LOGIN', 'REGISTER', 'TRANSFER', 'FIND-TX'], 'upper-case names');
check(nums.map((n) => (n % 2 === 0 ? 'even' : 'odd')), ['odd', 'even', 'odd', 'even', 'odd'], 'ternary inside map');
check(nums.length === nums.map((n) => n).length, true, 'always the same length as the original');
check(nums, [1, 2, 3, 4, 5], 'original unchanged');

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * 3. filter: "keep the items where the callback returns true". NEW array, 0..n items.
 *    Syntax: array.filter(callback(element, index?, array?), thisArg?)
 * ═══════════════════════════════════════════════════════════════════════════════════════════ */
section('3. filter');

check(results.filter((r) => r.status === 'failed').map((r) => r.name), ['register'], 'only failed tests');
check(nums.filter((n) => n > 2), [3, 4, 5], 'n > 2');
check(nums.filter((n, i) => i % 2 === 0), [1, 3, 5], 'by index: every other item');
check(nums.filter((n) => n > 99), [], 'no match → [] (never undefined)');

// filter(Boolean): remove falsy values (0, '', null, undefined, false, NaN)
check([0, 'a', '', null, 'b', undefined].filter(Boolean), ['a', 'b'], 'filter(Boolean) removes falsy');

// Remove duplicates (keep first occurrence)
check([1, 2, 2, 3, 1].filter((n, i, arr) => arr.indexOf(n) === i), [1, 2, 3], 'unique via indexOf');
check([...new Set([1, 2, 2, 3, 1])], [1, 2, 3], 'tip: [...new Set(arr)] does the same');

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * 4. reduce: "boil the array down to ONE value" (number, string, object, array...).
 *    Syntax: array.reduce(callback(accumulator, element, index?, array?), initialValue?)
 *    The accumulator is "the result so far". Whatever you return becomes the next accumulator.
 * ═══════════════════════════════════════════════════════════════════════════════════════════ */
section('4. reduce');

// WITH initialValue (recommended): acc starts as 0, loop starts at index 0
check(nums.reduce((acc, n) => acc + n, 0), 15, 'sum with initial 0');

// WITHOUT initialValue: acc starts as the FIRST element, loop starts at index 1
check(nums.reduce((acc, n) => acc + n), 15, 'sum without initial (acc starts at 1)');

// ⚠ Without initialValue on an EMPTY array → TypeError. With one → returns the initial value.
let emptyError = '';
try { [].reduce((acc, n) => acc + n); } catch (e) { emptyError = e.name; }
check(emptyError, 'TypeError', 'empty array + no initial → TypeError');
check([].reduce((acc, n) => acc + n, 0), 0, 'empty array + initial 0 → 0');

// Max value
check(nums.reduce((max, n) => (n > max ? n : max), -Infinity), 5, 'max');

// Total duration of passed tests
check(results.filter((r) => r.status === 'passed').reduce((sum, r) => sum + r.durationMs, 0), 3300, 'filter → reduce');

// Count by status: the accumulator is an OBJECT
const byStatus = results.reduce((acc, r) => {
  acc[r.status] = (acc[r.status] || 0) + 1;
  return acc; // ⚠ always return the accumulator from a block body
}, {});
check(byStatus, { passed: 2, failed: 1, skipped: 1 }, 'count by status → object');

// Build a lookup (name → duration)
const lookup = results.reduce((acc, r) => ({ ...acc, [r.name]: r.durationMs }), {});
check(lookup.transfer, 2100, 'lookup object');

// Flatten one level (flat() is the modern shortcut)
check([[1, 2], [3], [4, 5]].reduce((acc, arr) => acc.concat(arr), []), [1, 2, 3, 4, 5], 'flatten');
check([[1, 2], [3], [4, 5]].flat(), [1, 2, 3, 4, 5], 'tip: flat() does the same');

// Join to a string, using the optional index
check(['a', 'b', 'c'].reduce((acc, s, i) => acc + (i ? '-' : '') + s, ''), 'a-b-c', 'join with index');

// reduceRight: same, but from the END
check(['a', 'b', 'c'].reduceRight((acc, s) => acc + s, ''), 'cba', 'reduceRight');

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * 5. some: "is AT LEAST ONE item true?" Stops at the first true.
 *    Syntax: array.some(callback(element, index?, array?), thisArg?) → true/false
 * ═══════════════════════════════════════════════════════════════════════════════════════════ */
section('5. some');

check(results.some((r) => r.status === 'failed'), true, 'any failed? → true');
check(nums.some((n) => n > 10), false, 'any > 10? → false');
check([].some(() => true), false, 'empty array → false (nothing matched)');

let calls = 0;
nums.some((n) => { calls++; return n === 2; });
check(calls, 2, 'stops early: only 2 calls');

check(['qa', 'staging', 'prod'].includes('qa'), true, 'tip: for a simple value, includes() is clearer than some()');

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * 6. every: "are ALL items true?" Stops at the first false.
 *    Syntax: array.every(callback(element, index?, array?), thisArg?) → true/false
 * ═══════════════════════════════════════════════════════════════════════════════════════════ */
section('6. every');

check(results.every((r) => r.status === 'passed'), false, 'all passed? → false');
check(nums.every((n) => n > 0), true, 'all positive? → true');
check([].every(() => false), true, '⚠ empty array → TRUE ("vacuous truth": nothing broke the rule)');
check(nums.every((n, i, arr) => i === 0 || arr[i - 1] < n), true, 'sorted ascending? (uses index + array)');

// some vs every are opposites: !some(x) === every(!x)
check(!results.some((r) => r.status === 'failed') === results.every((r) => r.status !== 'failed'), true, 'opposites');

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * 7. slice: "copy a part". NEW array, original untouched. END is NOT included.
 *    Syntax: array.slice(start?, end?)
 *      start: index to begin (default 0). Negative counts from the end (-1 = last).
 *      end:   index to stop BEFORE (default = length). Negative allowed too.
 * ═══════════════════════════════════════════════════════════════════════════════════════════ */
section('7. slice');

const letters = ['a', 'b', 'c', 'd', 'e'];
check(letters.slice(), ['a', 'b', 'c', 'd', 'e'], 'slice() → full shallow copy');
check(letters.slice(2), ['c', 'd', 'e'], 'slice(2) → from index 2 to the end');
check(letters.slice(1, 3), ['b', 'c'], 'slice(1, 3) → indexes 1 and 2 (3 excluded)');
check(letters.slice(-2), ['d', 'e'], 'slice(-2) → last two');
check(letters.slice(0, -1), ['a', 'b', 'c', 'd'], 'slice(0, -1) → all but the last');
check(letters.slice(-3, -1), ['c', 'd'], 'slice(-3, -1)');
check(letters.slice(3, 1), [], 'start after end → []');
check(letters.slice(10), [], 'start beyond length → []');
check(letters, ['a', 'b', 'c', 'd', 'e'], 'original unchanged');
check('automation'.slice(0, 4), 'auto', 'strings have slice() too');

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * 8. splice: "remove and/or insert IN PLACE". ⚠ CHANGES the original. Returns REMOVED items.
 *    Syntax: array.splice(start, deleteCount?, ...itemsToInsert)
 *      start:        where to begin (negative counts from the end).
 *      deleteCount:  how many to remove. Omit it → remove EVERYTHING from start to the end.
 *      items:        optional values inserted at start.
 * ═══════════════════════════════════════════════════════════════════════════════════════════ */
section('8. splice');

let arr = ['a', 'b', 'c', 'd', 'e'];
check(arr.splice(1, 2), ['b', 'c'], 'REMOVE: splice(1, 2) returns the removed items');
check(arr, ['a', 'd', 'e'], '...and the original lost them');

arr = ['a', 'b', 'c', 'd', 'e'];
check(arr.splice(2), ['c', 'd', 'e'], 'no deleteCount → removes to the end');
check(arr, ['a', 'b'], 'original now ["a","b"]');

arr = ['a', 'b', 'c'];
check(arr.splice(1, 0, 'X', 'Y'), [], 'INSERT: deleteCount 0 → nothing removed');
check(arr, ['a', 'X', 'Y', 'b', 'c'], 'X, Y inserted at index 1');

arr = ['a', 'b', 'c'];
check(arr.splice(1, 1, 'B'), ['b'], 'REPLACE: remove 1, insert 1');
check(arr, ['a', 'B', 'c'], 'b replaced by B');

arr = ['a', 'b', 'c', 'd'];
check(arr.splice(-1, 1), ['d'], 'negative start: remove the last item');
check(arr, ['a', 'b', 'c'], 'original now ["a","b","c"]');

// Remove one item by value (find its index first; check it exists!)
arr = ['login', 'register', 'transfer'];
const at = arr.indexOf('register');
if (at !== -1) arr.splice(at, 1);
check(arr, ['login', 'transfer'], 'remove by value with indexOf');

// Non-mutating twin (ES2023, Node 20+): toSpliced returns a NEW array
const original = ['a', 'b', 'c'];
check(original.toSpliced(1, 1), ['a', 'c'], 'toSpliced → new array');
check(original, ['a', 'b', 'c'], '...original untouched');

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * 9. shift: "remove the FIRST item". ⚠ CHANGES the original. Returns that item.
 *    Syntax: array.shift()   (no arguments)
 * ═══════════════════════════════════════════════════════════════════════════════════════════ */
section('9. shift');

const queue = ['job1', 'job2', 'job3'];
check(queue.shift(), 'job1', 'returns the removed first item');
check(queue, ['job2', 'job3'], 'original lost its first item');
check([].shift(), undefined, 'empty array → undefined (no error)');

// Classic queue: take from the front until empty
const work = ['a', 'b', 'c'];
const done = [];
while (work.length) done.push(work.shift());
check(done, ['a', 'b', 'c'], 'process a queue with while + shift');

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * 10. unshift: "add items to the START". ⚠ CHANGES the original. Returns the NEW LENGTH.
 *     Syntax: array.unshift(...items)   (zero or more items)
 * ═══════════════════════════════════════════════════════════════════════════════════════════ */
section('10. unshift');

const list = ['c', 'd'];
check(list.unshift('b'), 3, 'returns the new length (not the array!)');
check(list, ['b', 'c', 'd'], "'b' added at the start");
check(list.unshift('x', 'a'), 5, 'several at once');
check(list, ['x', 'a', 'b', 'c', 'd'], 'they keep their given order');
check(list.unshift(), 5, 'no arguments → nothing added, returns length');

// The four "ends" methods side by side
const ends = [2, 3];
ends.push(4);      // add END    → returns new length
ends.unshift(1);   // add START  → returns new length
check(ends, [1, 2, 3, 4], 'push (end) + unshift (start)');
check(ends.pop(), 4, 'pop removes END → returns item');
check(ends.shift(), 1, 'shift removes START → returns item');
check(ends, [2, 3], 'back to [2, 3]');

// Non-mutating way to add at the start: spread
const base = [2, 3];
check([1, ...base], [1, 2, 3], 'spread instead of unshift (no mutation)');

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * 11. CHAINING: real-world style
 * ═══════════════════════════════════════════════════════════════════════════════════════════ */
section('11. Chaining');

const slowPassedSeconds = results
  .filter((r) => r.status === 'passed')  // keep passed
  .map((r) => r.durationMs / 1000)       // to seconds
  .filter((s) => s > 1.5);               // keep slow ones
check(slowPassedSeconds, [2.1], 'filter → map → filter');

const report = results
  .slice()                                       // copy first, because sort() MUTATES
  .sort((a, b) => b.durationMs - a.durationMs)   // slowest first
  .slice(0, 2)                                   // top 2
  .map(({ name, durationMs }) => `${name}: ${durationMs}ms`);
check(report, ['register: 3400ms', 'transfer: 2100ms'], 'top 2 slowest');

console.log(`\nAll ${passed} checks passed ✔`);
