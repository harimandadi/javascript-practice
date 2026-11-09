/**
 * JAVASCRIPT ARRAY METHODS: EXERCISES
 *
 * Run:  node array-methods-exercises.js      (from the practice folder)
 *
 * How to practise:
 *   1. Replace each `return todo();` with your answer (one line is usually enough).
 *   2. Run the file. ✔ = correct, ✘ = wrong (shows expected vs got), … = not done yet.
 *   3. Stuck? Look at array-methods-cheatsheet.js first, then array-methods-solutions.js.
 *
 * Rules: use the method named in each title. Don't change `results` itself unless the
 * exercise is about a mutating method (splice/shift/unshift), and then use the copy given.
 */

const results = [
  { name: 'login', status: 'passed', durationMs: 1200 },
  { name: 'register', status: 'failed', durationMs: 3400 },
  { name: 'transfer', status: 'passed', durationMs: 2100 },
  { name: 'find-tx', status: 'skipped', durationMs: 0 },
];

// ─────────────────────────────── forEach ───────────────────────────────

// 1. forEach: add up every durationMs into `total` and return it.          Expected: 6700
function ex1() {
  let total = 0;
  // results.forEach(...)
  return todo();
}

// ─────────────────────────────── map ───────────────────────────────────

// 2. map: return all names in UPPER CASE.          Expected: ['LOGIN', 'REGISTER', 'TRANSFER', 'FIND-TX']
function ex2() {
  return todo();
}

// 3. map with the INDEX parameter: return "1. login", "2. register", ...
//    Expected: ['1. login', '2. register', '3. transfer', '4. find-tx']
function ex3() {
  return todo();
}

// 4. map returning OBJECTS: return [{ test: name, seconds: durationMs / 1000 }, ...]  (careful with the brackets!)
//    Expected: [{test:'login',seconds:1.2}, {test:'register',seconds:3.4}, {test:'transfer',seconds:2.1}, {test:'find-tx',seconds:0}]
function ex4() {
  return todo();
}

// ─────────────────────────────── filter ────────────────────────────────

// 5. filter + map: names of FAILED tests.          Expected: ['register']
function ex5() {
  return todo();
}

// 6. filter: results that took MORE than 2000 ms, return their names.     Expected: ['register', 'transfer']
function ex6() {
  return todo();
}

// ─────────────────────────────── reduce ────────────────────────────────

// 7. reduce: total duration of tests that were NOT skipped.               Expected: 6700
function ex7() {
  return todo();
}

// 8. reduce into an OBJECT: group names by status.
//    Expected: { passed: ['login', 'transfer'], failed: ['register'], skipped: ['find-tx'] }
function ex8() {
  return todo();
}

// 9. reduce: find the SLOWEST test's name.                                 Expected: 'register'
function ex9() {
  return todo();
}

// ─────────────────────────────── some / every ──────────────────────────

// 10. some: is ANY test slower than 3 seconds (3000 ms)?                   Expected: true
function ex10() {
  return todo();
}

// 11. every: do ALL test names contain no spaces?                          Expected: true
function ex11() {
  return todo();
}

// 12. every on an EMPTY array: what does [].every(x => false) return? Return that call.  Expected: true
function ex12() {
  return todo();
}

// ─────────────────────────────── slice ─────────────────────────────────

// 13. slice: the FIRST TWO names, without changing `results`.             Expected: ['login', 'register']
function ex13() {
  return todo();
}

// 14. slice with a NEGATIVE index: the name of the LAST result.           Expected: 'find-tx'
function ex14() {
  return todo();
}

// ─────────────────────────────── splice ────────────────────────────────

// 15. splice to REMOVE: remove 'register' from `names` (a copy). Return what splice returned and what's left.
//     Expected: { removed: ['register'], left: ['login', 'transfer', 'find-tx'] }
function ex15() {
  const names = results.map((r) => r.name);
  return todo();
}

// 16. splice to INSERT: put 'logout' right AFTER 'login' (remove nothing). Return the array.
//     Expected: ['login', 'logout', 'register', 'transfer', 'find-tx']
function ex16() {
  const names = results.map((r) => r.name);
  return todo();
}

// ─────────────────────────────── shift / unshift ───────────────────────

// 17. shift: process the queue until it's empty; return the order in which jobs were processed.
//     Expected: ['build', 'test', 'deploy']
function ex17() {
  const queue = ['build', 'test', 'deploy'];
  const processed = [];
  return todo();
}

// 18. unshift: add 'setup' to the START of `steps`. Return what unshift returned and the array.
//     Expected: { returned: 3, steps: ['setup', 'run', 'teardown'] }
function ex18() {
  const steps = ['run', 'teardown'];
  return todo();
}

// ─────────────────────────────── predict the output ────────────────────
// Answer WITHOUT running first, then return your answer (not the code) and run to check.

// 19. What does [1, 2, 3].map((n) => { n * 2; }) return?   (JSON shows undefined as null)
function ex19() {
  return todo(); // e.g. return [2, 4, 6];  ← is that right?
}

// 20. What does ['a', 'b', 'c', 'd'].slice(1, 3) return?
function ex20() {
  return todo();
}

// ═══════════════════════════════ runner (no need to edit) ══════════════════════════════
function todo() {
  throw new Error('TODO');
}
const exercises = [
  ['1 forEach total', ex1, 6700],
  ['2 map upper case', ex2, ['LOGIN', 'REGISTER', 'TRANSFER', 'FIND-TX']],
  ['3 map with index', ex3, ['1. login', '2. register', '3. transfer', '4. find-tx']],
  ['4 map to objects', ex4, [{ test: 'login', seconds: 1.2 }, { test: 'register', seconds: 3.4 }, { test: 'transfer', seconds: 2.1 }, { test: 'find-tx', seconds: 0 }]],
  ['5 filter failed', ex5, ['register']],
  ['6 filter > 2000ms', ex6, ['register', 'transfer']],
  ['7 reduce sum not skipped', ex7, 6700],
  ['8 reduce group by status', ex8, { passed: ['login', 'transfer'], failed: ['register'], skipped: ['find-tx'] }],
  ['9 reduce slowest', ex9, 'register'],
  ['10 some > 3s', ex10, true],
  ['11 every no spaces', ex11, true],
  ['12 every on empty', ex12, true],
  ['13 slice first two', ex13, ['login', 'register']],
  ['14 slice last', ex14, 'find-tx'],
  ['15 splice remove', ex15, { removed: ['register'], left: ['login', 'transfer', 'find-tx'] }],
  ['16 splice insert', ex16, ['login', 'logout', 'register', 'transfer', 'find-tx']],
  ['17 shift queue', ex17, ['build', 'test', 'deploy']],
  ['18 unshift', ex18, { returned: 3, steps: ['setup', 'run', 'teardown'] }],
  ['19 predict map', ex19, [null, null, null]],
  ['20 predict slice', ex20, ['b', 'c']],
];
let ok = 0;
let pending = 0;
for (const [title, fn, expected] of exercises) {
  try {
    const got = JSON.stringify(fn());
    const want = JSON.stringify(expected);
    if (got === want) { ok++; console.log(`✔ ${title}`); }
    else console.log(`✘ ${title}\n    expected ${want}\n    got      ${got}`);
  } catch (e) {
    if (e.message === 'TODO') { pending++; console.log(`… ${title} (not done yet)`); }
    else console.log(`✘ ${title}: ${e.message}`);
  }
}
console.log(`\n${ok}/${exercises.length} correct, ${pending} still to do`);
