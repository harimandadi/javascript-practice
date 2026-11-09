/**
 * JAVASCRIPT ARRAYS & OBJECTS CHEAT SHEET: everyday operations
 * (forEach/map/filter/reduce/some/every/slice/splice/shift/unshift are in array-methods-cheatsheet.js)
 *
 * Run it:   node arrays-and-objects-cheatsheet.js      (from the practice folder)
 * Every example calls check(actual, expected). A ✔ means the comment is proven correct.
 *
 * ─────────────────────────────────────────────────────────────────────────────────────────────
 *  PART A: ARRAYS                                  PART B: OBJECTS
 *   A1 create & check                               B1 create
 *   A2 read: at, indexOf, includes                  B2 read: dot, brackets, ?. and ??
 *   A3 find, findIndex, findLast                    B3 add, update, delete
 *   A4 add/remove at the ends: push, pop            B4 check keys: in, hasOwn
 *   A5 join, concat, spread                         B5 keys, values, entries, fromEntries
 *   A6 sort, reverse (+ safe versions)              B6 loop over an object
 *   A7 flat, flatMap                                B7 merge: spread, Object.assign
 *   A8 fill, Array.from, keys/entries               B8 destructuring (defaults, rename, rest)
 *   A9 destructuring arrays                         B9 copy: shallow vs deep (structuredClone)
 *   A10 copy & compare                              B10 compare, JSON, freeze
 *                                                   B11 Map and Set
 *  PART C: ARRAYS OF OBJECTS (the most common real-world data)
 *   find by id · update/remove immutably · sort by field · group · unique · lookup · totals
 * ─────────────────────────────────────────────────────────────────────────────────────────────
 *
 *  Methods that CHANGE the original (⚠ mutate):  push, pop, shift, unshift, splice, sort, reverse, fill
 *  Their safe twins that return a NEW array:      [...a, x], slice, toSpliced, toSorted, toReversed, with
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

/* ═════════════════════════════════════════ PART A: ARRAYS ═════════════════════════════════════════ */

section('A1. Create & check');
check([1, 2, 3], [1, 2, 3], 'literal [1, 2, 3] (the usual way)');
check(Array.of(7), [7], 'Array.of(7) → [7]');
check(new Array(3).length, 3, '⚠ new Array(3) → 3 EMPTY slots, not [3]');
check(Array.from('abc'), ['a', 'b', 'c'], 'Array.from(string) → characters');
check(Array.from({ length: 3 }, (_, i) => i * 10), [0, 10, 20], 'Array.from({length}, fn) → generate values');
check(Array.isArray([]), true, 'Array.isArray([]) → true');
check(typeof [], 'object', '⚠ typeof [] is "object", so use Array.isArray');
check([].length === 0, true, 'empty check: arr.length === 0');

section('A2. Read: index, at, indexOf, includes');
const envs = ['local', 'qa', 'staging', 'prod'];
check(envs[0], 'local', 'arr[0] → first');
check(envs[envs.length - 1], 'prod', 'arr[arr.length - 1] → last (old way)');
check(envs.at(-1), 'prod', 'arr.at(-1) → last (modern)');
check(envs.at(-2), 'staging', 'arr.at(-2) → second last');
check(envs[10], undefined, 'out of range → undefined (no error)');
check(envs.indexOf('qa'), 1, 'indexOf → position');
check(envs.indexOf('uat'), -1, 'indexOf not found → -1');
check(envs.includes('prod'), true, 'includes → true/false (simplest check)');
check([NaN].includes(NaN), true, 'includes finds NaN...');
check([NaN].indexOf(NaN), -1, '...indexOf does not');

section('A3. find, findIndex, findLast, findLastIndex');
const users = [
  { id: 1, name: 'john', role: 'admin' },
  { id: 2, name: 'jane', role: 'user' },
  { id: 3, name: 'bob', role: 'user' },
];
check(users.find((u) => u.role === 'user'), { id: 2, name: 'jane', role: 'user' }, 'find → FIRST matching item');
check(users.find((u) => u.id === 99), undefined, 'find, no match → undefined');
check(users.findIndex((u) => u.name === 'bob'), 2, 'findIndex → its position');
check(users.findIndex((u) => u.id === 99), -1, 'findIndex, no match → -1');
check(users.findLast((u) => u.role === 'user').name, 'bob', 'findLast → LAST matching item');
check(users.findLastIndex((u) => u.role === 'admin'), 0, 'findLastIndex');
// find vs filter: find returns ONE item (or undefined), filter returns an ARRAY (maybe empty)
check(users.filter((u) => u.role === 'user').length, 2, 'filter returns all matches');

section('A4. Ends: push, pop (⚠ mutate)');
const stack = [1, 2];
check(stack.push(3, 4), 4, 'push(...items) → NEW LENGTH');
check(stack, [1, 2, 3, 4], 'added at the END');
check(stack.pop(), 4, 'pop() → removed LAST item');
check(stack, [1, 2, 3], 'array lost its last item');
check([].pop(), undefined, 'pop on empty → undefined');
//  START: unshift (add) / shift (remove)     END: push (add) / pop (remove)

section('A5. join, concat, spread');
check(['a', 'b', 'c'].join(), 'a,b,c', 'join() default separator is ","');
check(['a', 'b', 'c'].join(' | '), 'a | b | c', 'join(" | ")');
check(['a', 'b', 'c'].join(''), 'abc', 'join("") → no separator');
check('a-b-c'.split('-'), ['a', 'b', 'c'], 'split is the opposite of join');
check([1, 2].concat([3, 4], 5), [1, 2, 3, 4, 5], 'concat → new array');
check([...[1, 2], ...[3, 4], 5], [1, 2, 3, 4, 5], 'spread [...a, ...b] → same, more common');
check([0, ...[1, 2], 3], [0, 1, 2, 3], 'spread lets you insert anywhere');

section('A6. sort, reverse (⚠ mutate) + safe versions');
check([10, 9, 1, 2].sort(), [1, 10, 2, 9], '⚠ default sort compares as STRINGS');
check([10, 9, 1, 2].sort((a, b) => a - b), [1, 2, 9, 10], 'numbers ascending: (a, b) => a - b');
check([10, 9, 1, 2].sort((a, b) => b - a), [10, 9, 2, 1], 'numbers descending: (a, b) => b - a');
check(['bob', 'Alice', 'carl'].sort((a, b) => a.localeCompare(b)), ['Alice', 'bob', 'carl'], 'strings: localeCompare');
const original = [3, 1, 2];
const sorted = original.sort((a, b) => a - b);
check(original, [1, 2, 3], '⚠ sort CHANGED the original...');
check(sorted === original, true, '...and returns the SAME array, not a copy');
const safe = [3, 1, 2];
check(safe.toSorted((a, b) => a - b), [1, 2, 3], 'toSorted → new sorted array (Node 20+)');
check(safe, [3, 1, 2], '...original untouched');
check([...safe].sort((a, b) => a - b), [1, 2, 3], 'older safe way: copy then sort');
check([1, 2, 3].toReversed(), [3, 2, 1], 'toReversed → new array (reverse() mutates)');
check([1, 2, 3].with(1, 99), [1, 99, 3], 'with(index, value) → new array with one item changed');

section('A7. flat, flatMap');
check([1, [2, [3, [4]]]].flat(), [1, 2, [3, [4]]], 'flat() → one level');
check([1, [2, [3, [4]]]].flat(2), [1, 2, 3, [4]], 'flat(2) → two levels');
check([1, [2, [3, [4]]]].flat(Infinity), [1, 2, 3, 4], 'flat(Infinity) → all levels');
check(['a b', 'c'].flatMap((s) => s.split(' ')), ['a', 'b', 'c'], 'flatMap = map + flat(1)');
check([1, 2, 3].flatMap((n) => (n % 2 ? [n] : [])), [1, 3], 'flatMap can filter: return [] to drop');

section('A8. fill, keys, entries');
check(new Array(3).fill(0), [0, 0, 0], 'new Array(n).fill(value)');
check([1, 2, 3, 4].fill(9, 1, 3), [1, 9, 9, 4], 'fill(value, start, end) ⚠ mutates');
check([...['a', 'b'].keys()], [0, 1], 'keys() → indexes');
check([...['a', 'b'].entries()], [[0, 'a'], [1, 'b']], 'entries() → [index, value] pairs');
const indexed = [];
for (const [i, v] of ['a', 'b'].entries()) indexed.push(`${i}:${v}`);
check(indexed, ['0:a', '1:b'], 'for...of + entries() → index and value');

section('A9. Destructuring arrays');
const [first, second] = ['qa', 'staging', 'prod'];
check([first, second], ['qa', 'staging'], 'const [first, second] = arr');
const [, , third] = ['qa', 'staging', 'prod'];
check(third, 'prod', 'skip items with empty commas');
const [head, ...rest] = [1, 2, 3, 4];
check({ head, rest }, { head: 1, rest: [2, 3, 4] }, 'rest: const [head, ...rest] = arr');
const [x = 'default'] = [];
check(x, 'default', 'default value when missing');
let p = 1, q = 2;
[p, q] = [q, p];
check([p, q], [2, 1], 'swap two variables');

section('A10. Copy & compare');
const nums = [1, 2, 3];
const copy1 = [...nums];
const copy2 = nums.slice();
const copy3 = Array.from(nums);
check(copy1 !== nums && copy2 !== nums && copy3 !== nums, true, 'spread / slice / Array.from → new arrays');
const alias = nums;
alias.push(4);
check(nums, [1, 2, 3, 4], '⚠ = does NOT copy: both names point to the SAME array');
check([1, 2] === [1, 2], false, '⚠ === compares references, not contents');
check(JSON.stringify([1, 2]) === JSON.stringify([1, 2]), true, 'simple content compare: JSON.stringify');
check([1, 2].every((v, i) => v === [1, 2][i]), true, 'or compare item by item');

/* ═════════════════════════════════════════ PART B: OBJECTS ═════════════════════════════════════════ */

section('B1. Create');
const user = { name: 'john', age: 30 };
check(user, { name: 'john', age: 30 }, 'object literal { key: value }');
const name = 'jane';
const role = 'admin';
check({ name, role }, { name: 'jane', role: 'admin' }, 'shorthand: { name } means { name: name }');
const field = 'status';
check({ [field]: 'passed' }, { status: 'passed' }, 'computed key: { [variable]: value }');
check({ greet() { return 'hi'; } }.greet(), 'hi', 'method shorthand: { greet() {...} }');
check(Object.fromEntries([['a', 1], ['b', 2]]), { a: 1, b: 2 }, 'Object.fromEntries(pairs)');

section('B2. Read: dot, brackets, optional chaining ?. and ??');
const config = { env: 'qa', db: { host: 'localhost', port: 5432 }, 'base-url': 'https://x.test' };
check(config.env, 'qa', 'dot: obj.key');
check(config['env'], 'qa', 'brackets: obj["key"]');
const key = 'env';
check(config[key], 'qa', 'brackets with a variable: obj[key]  (obj.key would look for "key")');
check(config['base-url'], 'https://x.test', 'brackets for keys with - or spaces');
check(config.db.port, 5432, 'nested: obj.a.b');
check(config.missing, undefined, 'missing key → undefined');
let err = '';
try { config.missing.value; } catch (e) { err = e.name; }
check(err, 'TypeError', '⚠ reading INTO a missing object → TypeError');
check(config.missing?.value, undefined, '?. stops safely → undefined');
check(config.missing?.value ?? 'n/a', 'n/a', '?? gives a default when null/undefined');
check({ count: 0 }.count ?? 10, 0, '?? keeps 0 ...');
check({ count: 0 }.count || 10, 10, '...but || replaces 0 (and "", false)');

section('B3. Add, update, delete (⚠ mutate)');
const settings = { theme: 'dark' };
settings.lang = 'en';
check(settings, { theme: 'dark', lang: 'en' }, 'add: obj.newKey = value');
settings.theme = 'light';
check(settings.theme, 'light', 'update: assign again');
settings['font-size'] = 14;
check(settings['font-size'], 14, 'add with brackets');
delete settings['font-size'];
check(settings, { theme: 'light', lang: 'en' }, 'delete obj.key');
const constObj = { a: 1 };
constObj.a = 2;
check(constObj.a, 2, '⚠ const stops REASSIGNING the variable, not changing the object');
// Immutable update (no mutation): spread into a new object, then override
const before = { theme: 'dark', lang: 'en' };
const after = { ...before, theme: 'light' };
check([before.theme, after.theme], ['dark', 'light'], 'immutable update: { ...obj, key: newValue }');
const { lang, ...withoutLang } = before;
check(withoutLang, { theme: 'dark' }, 'immutable delete: const { key, ...rest } = obj');

section('B4. Check if a key exists');
const opts = { a: 1, b: undefined };
check('a' in opts, true, '"key" in obj');
check(Object.hasOwn(opts, 'b'), true, 'Object.hasOwn → true even if the value is undefined');
check(opts.b !== undefined, false, '⚠ checking !== undefined misses keys whose value IS undefined');
check('toString' in opts, true, '⚠ in also sees INHERITED keys...');
check(Object.hasOwn(opts, 'toString'), false, '...hasOwn checks only the object\'s own keys');

section('B5. keys, values, entries, fromEntries');
const scores = { login: 90, register: 70, transfer: 85 };
check(Object.keys(scores), ['login', 'register', 'transfer'], 'Object.keys → array of keys');
check(Object.values(scores), [90, 70, 85], 'Object.values → array of values');
check(Object.entries(scores), [['login', 90], ['register', 70], ['transfer', 85]], 'Object.entries → [key, value] pairs');
check(Object.keys(scores).length, 3, 'count properties: Object.keys(obj).length');
check(Object.keys({}).length === 0, true, 'empty object check');
// The power move: entries → array methods → fromEntries
const passing = Object.fromEntries(Object.entries(scores).filter(([, v]) => v >= 80));
check(passing, { login: 90, transfer: 85 }, 'filter an object: entries → filter → fromEntries');
const doubled = Object.fromEntries(Object.entries(scores).map(([k, v]) => [k, v * 2]));
check(doubled.login, 180, 'map an object\'s values the same way');
check(Object.values(scores).reduce((a, b) => a + b, 0), 245, 'sum of values');

section('B6. Loop over an object');
const pairs = [];
for (const [k, v] of Object.entries(scores)) pairs.push(`${k}=${v}`);
check(pairs, ['login=90', 'register=70', 'transfer=85'], 'for...of Object.entries (recommended)');
const keys = [];
for (const k in scores) keys.push(k);
check(keys, ['login', 'register', 'transfer'], 'for...in → keys (⚠ also inherited ones; prefer Object.keys)');
const viaForEach = [];
Object.keys(scores).forEach((k) => viaForEach.push(k.toUpperCase()));
check(viaForEach, ['LOGIN', 'REGISTER', 'TRANSFER'], 'Object.keys(obj).forEach(...)');
// ⚠ for...of directly on an object throws: objects are not iterable. Use Object.entries/keys/values.

section('B7. Merge objects');
const defaults = { browser: 'chromium', headless: true, retries: 0 };
const overrides = { headless: false, retries: 2 };
check({ ...defaults, ...overrides }, { browser: 'chromium', headless: false, retries: 2 }, 'spread merge: LATER keys win');
check({ ...overrides, ...defaults }.retries, 0, 'order matters: the last spread wins');
const target = { a: 1 };
Object.assign(target, { b: 2 }, { c: 3 });
check(target, { a: 1, b: 2, c: 3 }, 'Object.assign(target, ...sources) ⚠ mutates target');
check(Object.assign({}, defaults, overrides).retries, 2, 'Object.assign({}, ...) → new object');
const nestedA = { db: { host: 'a', port: 1 } };
const nestedB = { db: { host: 'b' } };
check({ ...nestedA, ...nestedB }, { db: { host: 'b' } }, '⚠ spread is SHALLOW: nested object replaced, port lost');
check({ ...nestedA, db: { ...nestedA.db, ...nestedB.db } }, { db: { host: 'b', port: 1 } }, 'merge nested levels by hand');

section('B8. Destructuring objects');
const testResult = { title: 'login', status: 'passed', meta: { browser: 'chromium' } };
const { title, status } = testResult;
check([title, status], ['login', 'passed'], 'const { a, b } = obj');
const { title: testName } = testResult;
check(testName, 'login', 'rename: { title: testName }');
const { retries = 0 } = testResult;
check(retries, 0, 'default: { retries = 0 }');
const { meta: { browser } } = testResult;
check(browser, 'chromium', 'nested: { meta: { browser } }');
const { title: t, ...others } = testResult;
check(others, { status: 'passed', meta: { browser: 'chromium' } }, 'rest: { title, ...others }');
function describe({ title, status = 'unknown' }) { return `${title}: ${status}`; }
check(describe({ title: 'register' }), 'register: unknown', 'destructure in function parameters');

section('B9. Copy: shallow vs deep');
const orig = { name: 'john', address: { city: 'NYC' }, tags: ['a'] };
const shallow = { ...orig };
shallow.name = 'jane';
shallow.address.city = 'LA';
check(orig.name, 'john', 'shallow copy: top-level values are independent');
check(orig.address.city, 'LA', '⚠ ...but nested objects are SHARED');
const orig2 = { name: 'john', address: { city: 'NYC' }, when: new Date(0) };
const deep = structuredClone(orig2);
deep.address.city = 'LA';
check(orig2.address.city, 'NYC', 'structuredClone → deep copy (nested independent)');
check(deep.when instanceof Date, true, 'structuredClone keeps Dates');
const viaJson = JSON.parse(JSON.stringify(orig2));
check(typeof viaJson.when, 'string', '⚠ JSON copy turns Dates into strings (and drops functions/undefined)');

section('B10. Compare, JSON, freeze');
check({ a: 1 } === { a: 1 }, false, '⚠ === compares references');
const sameRef = orig;
check(sameRef === orig, true, 'same reference → true');
check(JSON.stringify({ a: 1, b: 2 }) === JSON.stringify({ a: 1, b: 2 }), true, 'simple deep compare via JSON...');
check(JSON.stringify({ a: 1, b: 2 }) === JSON.stringify({ b: 2, a: 1 }), false, '⚠ ...but key ORDER matters');
check(JSON.stringify({ a: 1, b: [1, 2] }), '{"a":1,"b":[1,2]}', 'JSON.stringify → string');
check(JSON.parse('{"a":1}'), { a: 1 }, 'JSON.parse → object');
check(JSON.stringify({ a: 1 }, null, 2).includes('\n'), true, 'JSON.stringify(obj, null, 2) → pretty print');
const frozen = Object.freeze({ env: 'prod' });
frozen.env = 'qa'; // silently ignored (throws in strict mode / ES modules)
check(frozen.env, 'prod', 'Object.freeze → cannot change (shallow!)');
check(Object.isFrozen(frozen), true, 'Object.isFrozen');

section('B11. Map and Set (when a plain object/array is not enough)');
const map = new Map([['qa', 2]]);
map.set('prod', 1).set('local', 4);
check(map.get('prod'), 1, 'Map: set/get');
check(map.has('uat'), false, 'Map: has');
check(map.size, 3, 'Map: size (objects need Object.keys().length)');
check([...map.keys()], ['qa', 'prod', 'local'], 'Map keeps insertion order');
check(Object.fromEntries(map), { qa: 2, prod: 1, local: 4 }, 'Map → object');
const objKey = { id: 1 };
check(new Map([[objKey, 'value']]).get(objKey), 'value', 'Map keys can be objects (plain object keys cannot)');
const set = new Set(['a', 'b', 'a']);
check(set.size, 2, 'Set: unique values only');
check(set.has('a'), true, 'Set: has (fast lookup)');
check([...set], ['a', 'b'], 'Set → array with spread');

/* ═══════════════════════════════════ PART C: ARRAYS OF OBJECTS ═══════════════════════════════════ */

const tests = [
  { id: 1, name: 'login', status: 'passed', durationMs: 1200, module: 'auth' },
  { id: 2, name: 'register', status: 'failed', durationMs: 3400, module: 'auth' },
  { id: 3, name: 'transfer', status: 'passed', durationMs: 2100, module: 'accounts' },
  { id: 4, name: 'find-tx', status: 'skipped', durationMs: 0, module: 'accounts' },
];

section('C1. Find, pluck, count');
check(tests.find((t) => t.id === 3).name, 'transfer', 'find by id');
check(tests.map((t) => t.name), ['login', 'register', 'transfer', 'find-tx'], 'pluck one field → map');
check(tests.filter((t) => t.status === 'passed').length, 2, 'count matches → filter().length');
check(tests.some((t) => t.status === 'failed'), true, 'any failed? → some');

section('C2. Update / add / remove WITHOUT mutating (React/Redux style)');
const updated = tests.map((t) => (t.id === 2 ? { ...t, status: 'passed' } : t));
check(updated[1].status, 'passed', 'update one item: map + spread');
check(tests[1].status, 'failed', '...original untouched');
const added = [...tests, { id: 5, name: 'logout', status: 'passed', durationMs: 300, module: 'auth' }];
check(added.length, 5, 'add: [...arr, newItem]');
const removed = tests.filter((t) => t.id !== 4);
check(removed.map((t) => t.id), [1, 2, 3], 'remove by id: filter');

section('C3. Sort by a field (copy first!)');
check(tests.toSorted((a, b) => b.durationMs - a.durationMs).map((t) => t.name), ['register', 'transfer', 'login', 'find-tx'], 'by number, descending');
check([...tests].sort((a, b) => a.name.localeCompare(b.name)).map((t) => t.name), ['find-tx', 'login', 'register', 'transfer'], 'by string, A→Z');
check(tests[0].name, 'login', 'original order untouched');

section('C4. Group, index, unique');
const byModule = tests.reduce((acc, t) => {
  (acc[t.module] ||= []).push(t.name);
  return acc;
}, {});
check(byModule, { auth: ['login', 'register'], accounts: ['transfer', 'find-tx'] }, 'group by field: reduce');
const grouped = Object.groupBy(tests, (t) => t.status);
check(Object.keys(grouped), ['passed', 'failed', 'skipped'], 'Object.groupBy (Node 21+) does the same');
const byId = Object.fromEntries(tests.map((t) => [t.id, t]));
check(byId[3].name, 'transfer', 'lookup by id: fromEntries(map → [id, item])');
check([...new Set(tests.map((t) => t.module))], ['auth', 'accounts'], 'unique values of a field');
const uniqueByModule = [...new Map(tests.map((t) => [t.module, t])).values()].map((t) => t.name);
check(uniqueByModule, ['register', 'find-tx'], 'unique by field (keeps the LAST of each)');

section('C5. Totals & summaries');
check(tests.reduce((sum, t) => sum + t.durationMs, 0), 6700, 'total duration');
const summary = tests.reduce((acc, t) => ({ ...acc, [t.status]: (acc[t.status] ?? 0) + 1 }), {});
check(summary, { passed: 2, failed: 1, skipped: 1 }, 'count by status');
const slowest = tests.reduce((max, t) => (t.durationMs > max.durationMs ? t : max));
check(slowest.name, 'register', 'item with the max value');
const avg = tests.filter((t) => t.durationMs > 0).reduce((s, t, _, arr) => s + t.durationMs / arr.length, 0);
check(Math.round(avg), 2233, 'average (ignoring zeros)');

section('C6. Convert between shapes');
check(tests.map(({ id, name }) => ({ id, name }))[0], { id: 1, name: 'login' }, 'pick some fields');
check(tests.map(({ module, ...rest }) => rest)[0], { id: 1, name: 'login', status: 'passed', durationMs: 1200 }, 'drop a field');
check(Object.entries({ a: 1, b: 2 }).map(([key, value]) => ({ key, value })), [{ key: 'a', value: 1 }, { key: 'b', value: 2 }], 'object → array of objects');

console.log(`\nAll ${passed} checks passed ✔`);
