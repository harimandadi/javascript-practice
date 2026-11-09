/**
 * JAVASCRIPT ARRAY METHODS: SOLUTIONS (try the exercises first!)
 *
 * Run:  node array-methods-solutions.js      (from the practice folder)
 * Each answer has a short comment explaining the key idea.
 */

const results = [
  { name: 'login', status: 'passed', durationMs: 1200 },
  { name: 'register', status: 'failed', durationMs: 3400 },
  { name: 'transfer', status: 'passed', durationMs: 2100 },
  { name: 'find-tx', status: 'skipped', durationMs: 0 },
];

// 1. forEach returns nothing, so update a variable OUTSIDE the callback.
function ex1() {
  let total = 0;
  results.forEach((r) => { total += r.durationMs; });
  return total;
}

// 2. map = transform each item; same length out as in.
function ex2() {
  return results.map((r) => r.name.toUpperCase());
}

// 3. The index is the optional 2nd parameter; it starts at 0, hence i + 1.
function ex3() {
  return results.map((r, i) => `${i + 1}. ${r.name}`);
}

// 4. Returning an object from an arrow needs ( ) around { }, or JS reads { } as a block.
function ex4() {
  return results.map((r) => ({ test: r.name, seconds: r.durationMs / 1000 }));
}

// 5. filter keeps whole items; map then picks the field you want.
function ex5() {
  return results.filter((r) => r.status === 'failed').map((r) => r.name);
}

// 6. Destructuring the parameter keeps it short.
function ex6() {
  return results.filter(({ durationMs }) => durationMs > 2000).map(({ name }) => name);
}

// 7. Always give reduce an initial value (0 here) when summing.
function ex7() {
  return results.filter((r) => r.status !== 'skipped').reduce((sum, r) => sum + r.durationMs, 0);
}

// 8. Accumulator is an object: create the array the first time a status is seen, then push.
//    Block body → must `return acc`.
function ex8() {
  return results.reduce((acc, r) => {
    if (!acc[r.status]) acc[r.status] = [];
    acc[r.status].push(r.name);
    return acc;
  }, {});
}

// 9. Keep the "best so far" item as the accumulator. No initial value is fine
//    here because the array is not empty (acc starts as the first result).
function ex9() {
  return results.reduce((slowest, r) => (r.durationMs > slowest.durationMs ? r : slowest)).name;
}

// 10. some = "at least one?" and it stops at the first match.
function ex10() {
  return results.some((r) => r.durationMs > 3000);
}

// 11. every = "all of them?" and it stops at the first failure.
function ex11() {
  return results.every((r) => !r.name.includes(' '));
}

// 12. every on an empty array is TRUE (nothing broke the rule). some on an empty array is false.
function ex12() {
  return [].every(() => false);
}

// 13. slice(start, end): end is NOT included, original untouched.
function ex13() {
  return results.slice(0, 2).map((r) => r.name);
}

// 14. Negative index counts from the end: -1 is the last item. (results.at(-1) also works.)
function ex14() {
  return results.slice(-1)[0].name;
}

// 15. splice(start, deleteCount) returns the REMOVED items and changes the array.
function ex15() {
  const names = results.map((r) => r.name);
  const removed = names.splice(names.indexOf('register'), 1);
  return { removed, left: names };
}

// 16. Insert = deleteCount 0. "After login" means index of login + 1.
function ex16() {
  const names = results.map((r) => r.name);
  names.splice(names.indexOf('login') + 1, 0, 'logout');
  return names;
}

// 17. shift removes and returns the FIRST item; loop while there's something left.
function ex17() {
  const queue = ['build', 'test', 'deploy'];
  const processed = [];
  while (queue.length > 0) processed.push(queue.shift());
  return processed;
}

// 18. unshift returns the NEW LENGTH, not the array.
function ex18() {
  const steps = ['run', 'teardown'];
  const returned = steps.unshift('setup');
  return { returned, steps };
}

// 19. Braces with no `return` → each callback returns undefined → [undefined, undefined, undefined]
//     (JSON.stringify shows undefined inside arrays as null).
function ex19() {
  return [undefined, undefined, undefined];
}

// 20. slice(1, 3) → indexes 1 and 2 (3 is excluded).
function ex20() {
  return ['b', 'c'];
}

// ═══════════════════════════════ runner ══════════════════════════════
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
for (const [title, fn, expected] of exercises) {
  const got = JSON.stringify(fn());
  const want = JSON.stringify(expected);
  if (got === want) { ok++; console.log(`✔ ${title}`); }
  else console.log(`✘ ${title}\n    expected ${want}\n    got      ${got}`);
}
console.log(`\n${ok}/${exercises.length} correct`);
