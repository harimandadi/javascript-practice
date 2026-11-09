/**
 * JAVASCRIPT ARRAYS & OBJECTS: EXERCISES
 *
 * Run:  node arrays-and-objects-exercises.js      (from the practice folder)
 *
 *   1. Replace each `return todo();` with your answer.
 *   2. Run: ✔ correct, ✘ wrong (expected vs got), … not done yet.
 *   3. Stuck? arrays-and-objects-cheatsheet.js, then arrays-and-objects-solutions.js.
 */

const envs = ['local', 'qa', 'staging', 'prod'];
const users = [
  { id: 1, name: 'john', role: 'admin' },
  { id: 2, name: 'jane', role: 'user' },
  { id: 3, name: 'bob', role: 'user' },
];
const scores = { login: 90, register: 70, transfer: 85 };
const tests = [
  { id: 1, name: 'login', status: 'passed', durationMs: 1200, module: 'auth' },
  { id: 2, name: 'register', status: 'failed', durationMs: 3400, module: 'auth' },
  { id: 3, name: 'transfer', status: 'passed', durationMs: 2100, module: 'accounts' },
  { id: 4, name: 'find-tx', status: 'skipped', durationMs: 0, module: 'accounts' },
];

// ═══════════════════════════════ ARRAYS ═══════════════════════════════

// 1. Return the LAST env using at().                                        Expected: 'prod'
function ex1() {
  return todo();
}

// 2. find: return the NAME of the user whose id is 2.                       Expected: 'jane'
function ex2() {
  return todo();
}

// 3. findIndex: position of the user named 'bob'.                           Expected: 2
function ex3() {
  return todo();
}

// 4. Sort numbers ascending WITHOUT changing `original`. Return both.
//    Expected: { sorted: [1, 2, 5, 10], original: [10, 1, 5, 2] }
function ex4() {
  const original = [10, 1, 5, 2];
  return todo();
}

// 5. join all user names with ", ".                                         Expected: 'john, jane, bob'
function ex5() {
  return todo();
}

// 6. Flatten completely.                                                    Expected: [1, 2, 3, 4]
function ex6() {
  const nested = [[1, 2], [3, [4]]];
  return todo();
}

// 7. Array.from: create the squares of 0..4.                                Expected: [0, 1, 4, 9, 16]
function ex7() {
  return todo();
}

// 8. Destructure: first item and the rest of ['a', 'b', 'c'].              Expected: { first: 'a', rest: ['b', 'c'] }
function ex8() {
  const letters = ['a', 'b', 'c'];
  return todo();
}

// ═══════════════════════════════ OBJECTS ══════════════════════════════

// 9. Safely read config.db.host; if it doesn't exist return 'none'. (Use ?. and ??)   Expected: 'none'
function ex9() {
  const config = { env: 'qa' };
  return todo();
}

// 10. How many keys does `scores` have?                                     Expected: 3
function ex10() {
  return todo();
}

// 11. Return a NEW object with only the scores >= 80. (entries → filter → fromEntries)
//     Expected: { login: 90, transfer: 85 }
function ex11() {
  return todo();
}

// 12. Merge: overrides win over defaults.
//     Expected: { browser: 'chromium', headless: false, retries: 2 }
function ex12() {
  const defaults = { browser: 'chromium', headless: true, retries: 0 };
  const overrides = { headless: false, retries: 2 };
  return todo();
}

// 13. Make a NEW object with theme 'light' WITHOUT changing `before`. Return both themes.
//     Expected: { before: 'dark', after: 'light' }
function ex13() {
  const before = { theme: 'dark', lang: 'en' };
  return todo();
}

// 14. Return the user WITHOUT the password key (don't use delete).         Expected: { name: 'john' }
function ex14() {
  const user = { name: 'john', password: 'secret' };
  return todo();
}

// 15. Make a DEEP copy, change the copy's city to 'LA', return the ORIGINAL city.   Expected: 'NYC'
function ex15() {
  const person = { name: 'john', address: { city: 'NYC' } };
  return todo();
}

// 16. Destructure `result`: rename title → testName, give retries a default of 0.
//     Return `${testName}-${retries}`.                                      Expected: 'login-0'
function ex16() {
  const result = { title: 'login', status: 'passed' };
  return todo();
}

// ═══════════════════════════ ARRAYS OF OBJECTS ════════════════════════

// 17. Set test id 2's status to 'passed' WITHOUT changing `tests`. Return all statuses of the new array.
//     Expected: ['passed', 'passed', 'passed', 'skipped']
function ex17() {
  return todo();
}

// 18. Group test names by module.
//     Expected: { auth: ['login', 'register'], accounts: ['transfer', 'find-tx'] }
function ex18() {
  return todo();
}

// 19. Names sorted by durationMs, FASTEST first (don't change `tests`).
//     Expected: ['find-tx', 'login', 'transfer', 'register']
function ex19() {
  return todo();
}

// 20. Build a lookup object { id: test } and return the name for id 3.    Expected: 'transfer'
function ex20() {
  return todo();
}

// ═══════════════════════════ PREDICT THE OUTPUT ═══════════════════════
// Answer WITHOUT running first, then return your answer (the value, not the code).

// 21. What does [10, 9, 1, 2].sort() return?
function ex21() {
  return todo();
}

// 22. const a = [1]; const b = a; b.push(2);   What is `a` now?
function ex22() {
  return todo();
}

// ═══════════════════════════════ runner (no need to edit) ═══════════════════════════════
function todo() {
  throw new Error('TODO');
}
const exercises = [
  ['1 at(-1)', ex1, 'prod'],
  ['2 find by id', ex2, 'jane'],
  ['3 findIndex', ex3, 2],
  ['4 sort without mutating', ex4, { sorted: [1, 2, 5, 10], original: [10, 1, 5, 2] }],
  ['5 join', ex5, 'john, jane, bob'],
  ['6 flat', ex6, [1, 2, 3, 4]],
  ['7 Array.from', ex7, [0, 1, 4, 9, 16]],
  ['8 array destructuring', ex8, { first: 'a', rest: ['b', 'c'] }],
  ['9 ?. and ??', ex9, 'none'],
  ['10 count keys', ex10, 3],
  ['11 filter an object', ex11, { login: 90, transfer: 85 }],
  ['12 merge', ex12, { browser: 'chromium', headless: false, retries: 2 }],
  ['13 immutable update', ex13, { before: 'dark', after: 'light' }],
  ['14 remove a key', ex14, { name: 'john' }],
  ['15 deep copy', ex15, 'NYC'],
  ['16 rename + default', ex16, 'login-0'],
  ['17 update in array', ex17, ['passed', 'passed', 'passed', 'skipped']],
  ['18 group by', ex18, { auth: ['login', 'register'], accounts: ['transfer', 'find-tx'] }],
  ['19 sort by field', ex19, ['find-tx', 'login', 'transfer', 'register']],
  ['20 lookup by id', ex20, 'transfer'],
  ['21 predict sort()', ex21, [1, 10, 2, 9]],
  ['22 predict reference', ex22, [1, 2]],
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
