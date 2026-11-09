/**
 * JAVASCRIPT ARRAYS & OBJECTS: SOLUTIONS (try the exercises first!)
 *
 * Run:  node arrays-and-objects-solutions.js      (from the practice folder)
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

// 1. at(-1) counts from the end. Old way: envs[envs.length - 1]
function ex1() {
  return envs.at(-1);
}

// 2. find returns the first matching ITEM (or undefined), then read its name.
function ex2() {
  return users.find((u) => u.id === 2).name;
}

// 3. findIndex returns the position (or -1).
function ex3() {
  return users.findIndex((u) => u.name === 'bob');
}

// 4. sort() mutates, so use toSorted() (or [...original].sort(...)). Numbers need (a, b) => a - b.
function ex4() {
  const original = [10, 1, 5, 2];
  const sorted = original.toSorted((a, b) => a - b);
  return { sorted, original };
}

// 5. map to the names, then join with the separator you want.
function ex5() {
  return users.map((u) => u.name).join(', ');
}

// 6. flat(Infinity) flattens every level.
function ex6() {
  const nested = [[1, 2], [3, [4]]];
  return nested.flat(Infinity);
}

// 7. Array.from({ length }, (value, index) => ...): the first argument is unused, so `_`.
function ex7() {
  return Array.from({ length: 5 }, (_, i) => i * i);
}

// 8. Rest element collects the remaining items into a new array.
function ex8() {
  const letters = ['a', 'b', 'c'];
  const [first, ...rest] = letters;
  return { first, rest };
}

// ═══════════════════════════════ OBJECTS ══════════════════════════════

// 9. ?. stops at the missing `db` (no TypeError); ?? supplies the default.
function ex9() {
  const config = { env: 'qa' };
  return config.db?.host ?? 'none';
}

// 10. Objects have no .length, so count Object.keys.
function ex10() {
  return Object.keys(scores).length;
}

// 11. entries → array methods → fromEntries. `[, v]` skips the key in destructuring.
function ex11() {
  return Object.fromEntries(Object.entries(scores).filter(([, v]) => v >= 80));
}

// 12. Spread merge: later spreads overwrite earlier keys.
function ex12() {
  const defaults = { browser: 'chromium', headless: true, retries: 0 };
  const overrides = { headless: false, retries: 2 };
  return { ...defaults, ...overrides };
}

// 13. Copy with spread, then override. The original object is untouched.
function ex13() {
  const before = { theme: 'dark', lang: 'en' };
  const after = { ...before, theme: 'light' };
  return { before: before.theme, after: after.theme };
}

// 14. Destructure the key you want to drop; ...rest holds everything else.
function ex14() {
  const user = { name: 'john', password: 'secret' };
  const { password, ...safeUser } = user;
  return safeUser;
}

// 15. structuredClone copies nested objects too ({ ...person } would share `address`).
function ex15() {
  const person = { name: 'john', address: { city: 'NYC' } };
  const copy = structuredClone(person);
  copy.address.city = 'LA';
  return person.address.city;
}

// 16. { original: newName } renames; { key = default } supplies a default when missing.
function ex16() {
  const result = { title: 'login', status: 'passed' };
  const { title: testName, retries = 0 } = result;
  return `${testName}-${retries}`;
}

// ═══════════════════════════ ARRAYS OF OBJECTS ════════════════════════

// 17. map returns a new array; for the matching item return a NEW object with the change.
function ex17() {
  const updated = tests.map((t) => (t.id === 2 ? { ...t, status: 'passed' } : t));
  return updated.map((t) => t.status);
}

// 18. reduce into an object. `||=` creates the array the first time a module is seen.
//     (Object.groupBy(tests, t => t.module) groups whole objects in one call.)
function ex18() {
  return tests.reduce((acc, t) => {
    (acc[t.module] ||= []).push(t.name);
    return acc;
  }, {});
}

// 19. toSorted keeps `tests` unchanged; a - b means smallest first.
function ex19() {
  return tests.toSorted((a, b) => a.durationMs - b.durationMs).map((t) => t.name);
}

// 20. map each test to an [id, test] pair, then fromEntries builds the lookup.
function ex20() {
  const byId = Object.fromEntries(tests.map((t) => [t.id, t]));
  return byId[3].name;
}

// ═══════════════════════════ PREDICT THE OUTPUT ═══════════════════════

// 21. With no compare function, sort() compares items as STRINGS: "1" < "10" < "2" < "9".
function ex21() {
  return [1, 10, 2, 9];
}

// 22. `b = a` copies the REFERENCE, not the array: both names point at the same array.
function ex22() {
  return [1, 2];
}

// ═══════════════════════════════ runner ═══════════════════════════════
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
for (const [title, fn, expected] of exercises) {
  const got = JSON.stringify(fn());
  const want = JSON.stringify(expected);
  if (got === want) { ok++; console.log(`✔ ${title}`); }
  else console.log(`✘ ${title}\n    expected ${want}\n    got      ${got}`);
}
console.log(`\n${ok}/${exercises.length} correct`);
