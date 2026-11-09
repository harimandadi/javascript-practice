# JavaScript Topics: Explained Simply

One topic at a time, each in the same easy-to-remember format:
**memory hook → syntax → how to use → where to use → when not to use → traps → one-line summary.**

---

## Contents

| # | Topic | Memory hook |
|---|---|---|
| 1 | [`map()`](#1-map-transform-every-item-into-something-new) | *map = make a new array by changing each item* |
| 2 | [`filter()`](#2-filter-keep-only-the-items-you-want) | *filter = keep the items that pass the test* |
| 3 | [`reduce()`](#3-reduce-boil-the-whole-array-down-to-one-value) | *reduce = roll everything up into ONE value* |
| 4 | [`forEach()`](#4-foreach-do-something-with-each-item) | *forEach = just DO something with each item, get nothing back* |
| 5 | [`some()`](#5-some-does-at-least-one-item-pass) | *some = is there ANY? (at least one → true)* |
| 6 | [`every()`](#6-every-do-all-items-pass) | *every = are they ALL? (one fails → false)* |
| 7 | [`find()`](#7-find-get-the-first-item-that-matches) | *find = give me THE FIRST one that matches* |
| 8 | [`shift()`](#8-shift-remove-the-first-item) | *shift = take one OFF the FRONT* ⚠ changes the array |
| 9 | [`unshift()`](#9-unshift-add-items-to-the-front) | *unshift = put items ON the FRONT* ⚠ changes the array |

<!-- Add new topics to this table and as a new section at the end, using the same layout. -->

---

## 1. `map()`: transform every item into something new

**Memory hook:** *"map = make a new array by changing each item."*
Same number of items in, same number out, each one transformed.

```
[ 1,  2,  3 ]
  ↓   ↓   ↓    map(n => n * 2)
[ 2,  4,  6 ]
```

### Syntax

```js
const newArray = array.map((item, index, array) => {
  return newValue;
});
```

| Part | Required? | Meaning |
|---|---|---|
| `item` | ✅ yes | the current element |
| `index` | optional | its position (0, 1, 2…) |
| `array` | optional | the whole original array |
| **returns** | | a **new array**, same length |
| **original** | | **unchanged** |

**Remember it as:** `array.map(item => whatToTurnItInto)`

### Full syntax example

```js
const numbers = [10, 20, 30];

const doubled = numbers.map((item, index, array) => {
  console.log(item, index, array);
  return item * 2;
});

// console output, one line per item:
// 10 0 [ 10, 20, 30 ]
// 20 1 [ 10, 20, 30 ]
// 30 2 [ 10, 20, 30 ]

console.log(doubled);   // [ 20, 40, 60 ]
console.log(numbers);   // [ 10, 20, 30 ]   ← original unchanged
```

| Call | `item` | `index` | `array` | returns |
|---|---|---|---|---|
| 1st | 10 | 0 | `[10, 20, 30]` | 20 |
| 2nd | 20 | 1 | `[10, 20, 30]` | 40 |
| 3rd | 30 | 2 | `[10, 20, 30]` | 60 |

### How to use it: simple to real-world

**1. Change numbers**
```js
[1, 2, 3].map(n => n * 10);          // [10, 20, 30]
```

**2. Change text**
```js
['qa', 'prod'].map(env => env.toUpperCase());   // ['QA', 'PROD']
```

**3. Pick one field from objects** (the most common use)
```js
const users = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }];
users.map(u => u.name);              // ['John', 'Jane']
```

**4. Build new objects** (wrap the object in `( )`)
```js
users.map(u => ({ label: u.name, isAdult: u.age >= 18 }));
// [{ label: 'John', isAdult: true }, { label: 'Jane', isAdult: true }]
```

**5. Use the index**
```js
['login', 'logout'].map((step, i) => `${i + 1}. ${step}`);
// ['1. login', '2. logout']
```

**6. Chain it with other methods**
```js
users.filter(u => u.age > 26).map(u => u.name);   // ['John']
```

### Where to use it
Use `map` whenever the sentence in your head is **"for each item, give me ___ instead"**:
- turning API data into the shape you need (`users.map(u => u.id)`)
- formatting values for display (prices, dates, labels)
- converting types (`['1', '2'].map(Number)` → `[1, 2]`)
- in test automation, collecting element texts:
  ```js
  const names = (await page.locator('li').allTextContents()).map(t => t.trim());
  ```

### When *not* to use it

| You want to… | Use instead |
|---|---|
| keep only some items | `filter` |
| get one single value (a total) | `reduce` |
| just do something (log, click), no new array | `forEach` |
| find one item | `find` |

### The 3 traps

```js
// ❌ 1. Braces but no return → every result is undefined
[1, 2].map(n => { n * 2 });            // [undefined, undefined]
// ✅ fix: remove the braces, or write return
[1, 2].map(n => n * 2);                // [2, 4]
[1, 2].map(n => { return n * 2; });    // [2, 4]

// ❌ 2. Returning an object without ( )
[1, 2].map(n => { value: n });         // [undefined, undefined]
// ✅
[1, 2].map(n => ({ value: n }));       // [{value:1}, {value:2}]

// ❌ 3. map(parseInt): map passes the index as a 2nd argument
['1', '2', '3'].map(parseInt);         // [1, NaN, NaN]
// ✅
['1', '2', '3'].map(Number);           // [1, 2, 3]
```

### One-line summary
**`map` takes an array, changes each item with your function, and gives back a new array of the same length. The original stays untouched.**

---

## 2. `filter()`: keep only the items you want

**Memory hook:** *"filter = keep the items that pass the test."*
Your function answers **yes (true)** or **no (false)** for each item. Yes → kept, no → dropped.
Items come out **unchanged**, but there may be **fewer** of them.

```
[ 1,  2,  3,  4 ]
  ✗   ✓   ✗   ✓    filter(n => n % 2 === 0)
[     2,      4 ]
```

### Syntax

```js
const newArray = array.filter((item, index, array) => {
  return trueOrFalse;
});
```

| Part | Required? | Meaning |
|---|---|---|
| `item` | ✅ yes | the current element |
| `index` | optional | its position (0, 1, 2…) |
| `array` | optional | the whole original array |
| **returns** | | a **new array** of the items where you returned `true` (0 to all items) |
| **original** | | **unchanged** |

**Remember it as:** `array.filter(item => shouldIKeepIt)`

### Full syntax example

```js
const numbers = [10, 25, 30, 45];

const big = numbers.filter((item, index, array) => {
  console.log(item, index, array);
  return item > 20;
});

// console output, one line per item:
// 10 0 [ 10, 25, 30, 45 ]
// 25 1 [ 10, 25, 30, 45 ]
// 30 2 [ 10, 25, 30, 45 ]
// 45 3 [ 10, 25, 30, 45 ]

console.log(big);       // [ 25, 30, 45 ]
console.log(numbers);   // [ 10, 25, 30, 45 ]   ← original unchanged
```

| Call | `item` | `index` | `item > 20`? | kept? |
|---|---|---|---|---|
| 1st | 10 | 0 | false | ✗ dropped |
| 2nd | 25 | 1 | true | ✓ kept |
| 3rd | 30 | 2 | true | ✓ kept |
| 4th | 45 | 3 | true | ✓ kept |

### How to use it: simple to real-world

**1. Keep numbers that match**
```js
[1, 2, 3, 4, 5].filter(n => n > 2);          // [3, 4, 5]
```

**2. Keep text that matches**
```js
['qa', 'prod', 'staging'].filter(env => env !== 'prod');   // ['qa', 'staging']
```

**3. Keep objects by a field** (the most common use)
```js
const users = [{ name: 'John', age: 30 }, { name: 'Jane', age: 15 }];
users.filter(u => u.age >= 18);              // [{ name: 'John', age: 30 }]
```

**4. Use the index**
```js
['a', 'b', 'c', 'd'].filter((item, i) => i % 2 === 0);   // ['a', 'c']  (every other item)
```

**5. Remove empty values**
```js
[0, 'a', '', null, 'b', undefined].filter(Boolean);    // ['a', 'b']
```

**6. Remove duplicates**
```js
[1, 2, 2, 3, 1].filter((item, i, arr) => arr.indexOf(item) === i);   // [1, 2, 3]
```

**7. Chain it with `map`**
```js
users.filter(u => u.age >= 18).map(u => u.name);       // ['John']
```

### Where to use it
Use `filter` whenever the sentence in your head is **"give me only the items that ___"**:
- only failed tests: `results.filter(r => r.status === 'failed')`
- only active users, in-stock products, orders over 100
- removing empty or invalid values before processing
- search boxes: `items.filter(i => i.name.includes(searchText))`

### When *not* to use it

| You want to… | Use instead |
|---|---|
| change each item | `map` |
| just ONE item (the first match) | `find` |
| only know IF something matches (true/false) | `some` |
| check that ALL items match | `every` |
| count or total something | `reduce` (or `filter(...).length` for a simple count) |

### The 3 traps

```js
// ❌ 1. Braces but no return → returns undefined → treated as false → nothing kept
[1, 2, 3].filter(n => { n > 1 });            // []
// ✅ fix: remove the braces, or write return
[1, 2, 3].filter(n => n > 1);                // [2, 3]

// ❌ 2. Expecting ONE item: filter ALWAYS returns an array
[{ id: 1 }, { id: 2 }].filter(u => u.id === 2);   // [{ id: 2 }]  ← an array!
// ✅ use find for a single item
[{ id: 1 }, { id: 2 }].find(u => u.id === 2);     // { id: 2 }

// ❌ 3. No match gives an EMPTY array, which is still truthy in an if
if ([1, 2].filter(n => n > 5)) { /* this still runs! */ }
// ✅ check the length (or use some)
if ([1, 2].filter(n => n > 5).length > 0) { /* doesn't run */ }
```

### One-line summary
**`filter` runs a yes/no test on every item and gives back a new array with only the "yes" items, unchanged. The original stays untouched.**

---

## 3. `reduce()`: boil the whole array down to ONE value

**Memory hook:** *"reduce = roll everything up into ONE value."*
Think of a **snowball**: it starts small (the initial value), rolls over each item, and gets bigger.
The snowball is called the **accumulator** (`acc`). Whatever you **return** becomes the snowball for the next item.

```
[ 1,  2,  3,  4 ]     reduce((acc, n) => acc + n, 0)

acc: 0 → 1 → 3 → 6 → 10
         +1  +2  +3  +4
                          result: 10
```

### Syntax

```js
const result = array.reduce((acc, item, index, array) => {
  return newAcc;
}, initialValue);
```

| Part | Required? | Meaning |
|---|---|---|
| `acc` | ✅ yes | the accumulator: the result **so far** |
| `item` | ✅ yes | the current element |
| `index` | optional | its position |
| `array` | optional | the whole original array |
| `initialValue` | optional, **but always give it** | the starting value of `acc` (`0`, `''`, `[]`, `{}`) |
| **returns** | | **one value** of any type: number, string, array, object |
| **original** | | **unchanged** |

**Remember it as:** `array.reduce((acc, item) => acc + item, start)`
The **start value tells you the result type**: `0` → a number, `''` → a string, `[]` → an array, `{}` → an object.

### Full syntax example

```js
const numbers = [10, 20, 30];

const total = numbers.reduce((acc, item, index, array) => {
  console.log(acc, item, index, array);
  return acc + item;
}, 0);

// console output, one line per item:
// 0 10 0 [ 10, 20, 30 ]
// 10 20 1 [ 10, 20, 30 ]
// 30 30 2 [ 10, 20, 30 ]

console.log(total);     // 60
console.log(numbers);   // [ 10, 20, 30 ]   ← original unchanged
```

| Call | `acc` (before) | `item` | `index` | returns → next `acc` |
|---|---|---|---|---|
| 1st | 0 (the initial value) | 10 | 0 | 10 |
| 2nd | 10 | 20 | 1 | 30 |
| 3rd | 30 | 30 | 2 | **60** ← final result |

### How to use it: simple to real-world

**1. Sum** (start `0`)
```js
[1, 2, 3, 4].reduce((acc, n) => acc + n, 0);              // 10
```

**2. Maximum value**
```js
[3, 9, 1, 7].reduce((max, n) => (n > max ? n : max), -Infinity);   // 9
```

**3. Sum a field from objects**
```js
const cart = [{ item: 'pen', price: 10 }, { item: 'book', price: 25 }];
cart.reduce((total, p) => total + p.price, 0);            // 35
```

**4. Count by value** (start `{}`)
```js
const statuses = ['passed', 'failed', 'passed', 'skipped', 'passed'];
statuses.reduce((acc, s) => {
  acc[s] = (acc[s] || 0) + 1;
  return acc;
}, {});
// { passed: 3, failed: 1, skipped: 1 }
```

**5. Group objects by a field** (start `{}`)
```js
const users = [
  { name: 'John', role: 'admin' },
  { name: 'Jane', role: 'user' },
  { name: 'Bob', role: 'user' },
];
users.reduce((acc, u) => {
  (acc[u.role] ||= []).push(u.name);   // create the list the first time, then add
  return acc;
}, {});
// { admin: ['John'], user: ['Jane', 'Bob'] }
```

**6. Array to lookup object** (find things by id quickly)
```js
users.reduce((acc, u) => ({ ...acc, [u.name]: u.role }), {});
// { John: 'admin', Jane: 'user', Bob: 'user' }
```

**7. Flatten nested arrays** (start `[]`)
```js
[[1, 2], [3], [4, 5]].reduce((acc, arr) => acc.concat(arr), []);   // [1, 2, 3, 4, 5]
```

**8. Build a string** (start `''`)
```js
['a', 'b', 'c'].reduce((acc, ch) => acc + ch.toUpperCase(), '');   // 'ABC'
```

**9. Chain it** (filter, then total)
```js
cart.filter(p => p.price > 15).reduce((total, p) => total + p.price, 0);   // 25
```

### Where to use it
Use `reduce` whenever the sentence in your head is **"go through everything and give me ONE ___"**:
- a **total**: cart price, total test duration, sum of scores
- a **count**: tests per status, words per letter
- a **summary object**: group by, lookup by id
- the **biggest / smallest** item
- in test automation: `results.reduce((sum, r) => sum + r.durationMs, 0)` for total run time

### When *not* to use it

| You want to… | Use instead (simpler to read) |
|---|---|
| change each item into a new array | `map` |
| keep only some items | `filter` |
| find one item | `find` |
| join strings with a separator | `join` |
| max / min of plain numbers | `Math.max(...arr)` / `Math.min(...arr)` |
| just count matches | `filter(...).length` |

If a `map` or `filter` says it more clearly, use that: `reduce` can do anything, but it's harder to read.

### The 3 traps

```js
// ❌ 1. No initial value on an EMPTY array → crash
[].reduce((acc, n) => acc + n);           // TypeError: Reduce of empty array with no initial value
// ✅ always give a start value
[].reduce((acc, n) => acc + n, 0);        // 0

// ❌ 2. Braces but no `return acc` → acc becomes undefined after the first item
[1, 2].reduce((acc, n) => { acc + n; }, 0);         // undefined
// ✅
[1, 2].reduce((acc, n) => { return acc + n; }, 0);  // 3

// ❌ 3. No initial value with objects → acc starts as the first OBJECT, not a number
const items = [{ price: 10 }, { price: 25 }];
items.reduce((total, p) => total + p.price);        // '[object Object]25'
// ✅ start at 0
items.reduce((total, p) => total + p.price, 0);     // 35
```

### One-line summary
**`reduce` walks through the array carrying a running result (the accumulator), and gives back ONE final value: a number, string, array or object, decided by the start value. The original stays untouched.**

---

## 4. `forEach()`: do something with each item

**Memory hook:** *"forEach = just DO something with each item, get nothing back."*
It's a shorter `for` loop. It **always returns `undefined`**, so it's only for **actions** (log, push, update, call), never for building a new array.

```
[ 'a', 'b', 'c' ]
   ↓    ↓    ↓     forEach(x => console.log(x))
 log  log  log     → prints a, b, c   → returns undefined
```

### Syntax

```js
array.forEach((item, index, array) => {
  // do something; no return needed
});
```

| Part | Required? | Meaning |
|---|---|---|
| `item` | ✅ yes | the current element |
| `index` | optional | its position (0, 1, 2…) |
| `array` | optional | the whole original array |
| **returns** | | **`undefined`**, always |
| **original** | | unchanged, unless **your code** changes it |

**Remember it as:** `array.forEach(item => doSomething(item))`

### Full syntax example

```js
const numbers = [10, 20, 30];

const result = numbers.forEach((item, index, array) => {
  console.log(item, index, array);
});

// console output, one line per item:
// 10 0 [ 10, 20, 30 ]
// 20 1 [ 10, 20, 30 ]
// 30 2 [ 10, 20, 30 ]

console.log(result);    // undefined   ← forEach gives nothing back
console.log(numbers);   // [ 10, 20, 30 ]
```

| Call | `item` | `index` | `array` | returns |
|---|---|---|---|---|
| 1st | 10 | 0 | `[10, 20, 30]` | (nothing) |
| 2nd | 20 | 1 | `[10, 20, 30]` | (nothing) |
| 3rd | 30 | 2 | `[10, 20, 30]` | (nothing) |

### How to use it: simple to real-world

**1. Print each item**
```js
['qa', 'staging', 'prod'].forEach(env => console.log(env));   // qa, staging, prod (3 lines)
```

**2. Use the index**
```js
['login', 'logout'].forEach((step, i) => console.log(`${i + 1}. ${step}`));
// 1. login
// 2. logout
```

**3. Add up into an outside variable**
```js
let total = 0;
[1, 2, 3, 4].forEach(n => { total += n; });
console.log(total);                                // 10
```

**4. Push into another array**
```js
const names = [];
[{ name: 'John' }, { name: 'Jane' }].forEach(u => names.push(u.name));
console.log(names);                                // ['John', 'Jane']
```

**5. Update each object in place** (forEach itself returns nothing, but your code can change the items)
```js
const users = [{ name: 'John' }, { name: 'Jane' }];
users.forEach(u => { u.active = true; });
console.log(users);   // [{ name: 'John', active: true }, { name: 'Jane', active: true }]
```

**6. Loop over an object** (with `Object.entries`)
```js
const scores = { login: 90, transfer: 85 };
Object.entries(scores).forEach(([key, value]) => console.log(`${key}: ${value}`));
// login: 90
// transfer: 85
```

**7. Chain: filter first, then act**
```js
[5, 12, 8, 20].filter(n => n > 10).forEach(n => console.log(n));   // 12, 20 (2 lines)
```

### Where to use it
Use `forEach` whenever the sentence in your head is **"for each item, do ___"** and you **don't need a new array back**:
- logging or printing each item
- pushing into another array or updating an outside counter
- changing each object in place (set a flag, add a field)
- calling a function for each item (send, save, notify)

### When *not* to use it

| You want to… | Use instead |
|---|---|
| a NEW array of changed items | `map` |
| only some items | `filter` |
| one total / summary value | `reduce` |
| stop early (`break`) | `for...of` loop, or `some` / `find` |
| `await` inside the loop (one after another) | `for...of` loop with `await` |

### The 3 traps

```js
// ❌ 1. Using the result: forEach ALWAYS returns undefined
const doubled = [1, 2].forEach(n => n * 2);
console.log(doubled);                              // undefined
// ✅ use map when you want a new array
const doubled2 = [1, 2].map(n => n * 2);
console.log(doubled2);                             // [2, 4]

// ❌ 2. You can't stop it: return only skips the current item, break is a syntax error
[1, 2, 3].forEach(n => { if (n === 2) return; console.log(n); });   // 1, 3 (still reaches 3)
// ✅ use for...of when you need to stop
for (const n of [1, 2, 3]) { if (n === 2) break; console.log(n); }  // 1

// ❌ 3. It does NOT wait for async/await: the loop finishes before the work does
// [url1, url2].forEach(async url => { await page.goto(url); });   ← doesn't wait!
// ✅ use for...of to run one after another
// for (const url of [url1, url2]) { await page.goto(url); }
```

### One-line summary
**`forEach` runs your function once for every item so you can DO something (log, push, update), and always returns `undefined`. Use `map` if you want a new array back.**

---

## 5. `some()`: does at least one item pass?

**Memory hook:** *"some = is there ANY?"*
It asks your yes/no question item by item and **stops at the first yes**. One `true` is enough → `true`. All `false` → `false`.

```
[ 1,  3,  8,  5 ]     some(n => n % 2 === 0)   "is there ANY even number?"
  ✗   ✗   ✓  (stops here, 5 is never checked)
                       → true
```

### Syntax

```js
const answer = array.some((item, index, array) => {
  return trueOrFalse;
});
```

| Part | Required? | Meaning |
|---|---|---|
| `item` | ✅ yes | the current element |
| `index` | optional | its position (0, 1, 2…) |
| `array` | optional | the whole original array |
| **returns** | | **`true` or `false`**: one boolean, not an array |
| **original** | | **unchanged** |

**Remember it as:** `array.some(item => isThisOne)`

### Full syntax example

```js
const numbers = [10, 25, 30, 45];

const hasBig = numbers.some((item, index, array) => {
  console.log(item, index, array);
  return item > 20;
});

// console output (stops at the first true):
// 10 0 [ 10, 25, 30, 45 ]
// 25 1 [ 10, 25, 30, 45 ]

console.log(hasBig);    // true
console.log(numbers);   // [ 10, 25, 30, 45 ]   ← original unchanged
```

| Call | `item` | `index` | `item > 20`? | what happens |
|---|---|---|---|---|
| 1st | 10 | 0 | false | keep looking |
| 2nd | 25 | 1 | true | **stop → return `true`** |
| — | 30, 45 | | | never checked |

### How to use it: simple to real-world

**1. Any number that matches?**
```js
[1, 3, 8, 5].some(n => n % 2 === 0);                     // true
[1, 3, 5].some(n => n % 2 === 0);                        // false
```

**2. Any text that matches?**
```js
['qa', 'staging', 'prod'].some(env => env === 'prod');   // true
```

**3. Any object with a field value?** (the most common use)
```js
const results = [{ name: 'login', status: 'passed' }, { name: 'register', status: 'failed' }];
results.some(r => r.status === 'failed');                 // true
```

**4. Use it in an `if`**
```js
if (results.some(r => r.status === 'failed')) {
  console.log('Build failed');                            // runs
}
```

**5. Any item containing some text?**
```js
['error.log', 'app.js'].some(file => file.endsWith('.log'));   // true
```

**6. Chain after `filter`**
```js
results.filter(r => r.name.startsWith('l')).some(r => r.status === 'failed');   // false
```

### Where to use it
Use `some` whenever the sentence in your head is **"is there ANY ___?"** or **"does at least one ___?"**:
- did any test fail?
- is any field empty in a form?
- does the user have any admin role?
- does the cart contain any out-of-stock item?

### When *not* to use it

| You want to… | Use instead |
|---|---|
| check that ALL items match | `every` |
| get the matching ITEM, not just true/false | `find` |
| get ALL matching items | `filter` |
| check for one simple value | `includes` (`['a', 'b'].includes('a')`) |

### The 3 traps

```js
// ❌ 1. Expecting the item: some only says true/false
[{ id: 1 }, { id: 2 }].some(u => u.id === 2);      // true   (not the object)
// ✅ use find to get the item
[{ id: 1 }, { id: 2 }].find(u => u.id === 2);      // { id: 2 }

// ❌ 2. Braces but no return → always false
[1, 2, 3].some(n => { n > 2 });                     // false
// ✅
[1, 2, 3].some(n => n > 2);                         // true

// ❌ 3. Empty array → false (there is nothing to match)
[].some(n => true);                                 // false
```

### One-line summary
**`some` returns `true` as soon as ONE item passes your test (and stops looking), otherwise `false`. The original stays untouched.**

---

## 6. `every()`: do all items pass?

**Memory hook:** *"every = are they ALL?"*
It asks your yes/no question item by item and **stops at the first no**. One `false` is enough → `false`. All `true` → `true`.

```
[ 2,  4,  5,  6 ]     every(n => n % 2 === 0)   "are ALL numbers even?"
  ✓   ✓   ✗  (stops here, 6 is never checked)
                       → false
```

### Syntax

```js
const answer = array.every((item, index, array) => {
  return trueOrFalse;
});
```

| Part | Required? | Meaning |
|---|---|---|
| `item` | ✅ yes | the current element |
| `index` | optional | its position (0, 1, 2…) |
| `array` | optional | the whole original array |
| **returns** | | **`true` or `false`**: one boolean, not an array |
| **original** | | **unchanged** |

**Remember it as:** `array.every(item => isThisOk)`

### Full syntax example

```js
const numbers = [10, 25, 30, 45];

const allBig = numbers.every((item, index, array) => {
  console.log(item, index, array);
  return item > 20;
});

// console output (stops at the first false):
// 10 0 [ 10, 25, 30, 45 ]

console.log(allBig);    // false
console.log(numbers);   // [ 10, 25, 30, 45 ]   ← original unchanged
```

| Call | `item` | `index` | `item > 20`? | what happens |
|---|---|---|---|---|
| 1st | 10 | 0 | false | **stop → return `false`** |
| — | 25, 30, 45 | | | never checked |

### How to use it: simple to real-world

**1. All numbers match?**
```js
[2, 4, 6].every(n => n % 2 === 0);                        // true
[2, 4, 5].every(n => n % 2 === 0);                        // false
```

**2. All text matches?**
```js
['qa', 'staging'].every(env => env !== 'prod');           // true
```

**3. All objects have a field value?** (the most common use)
```js
const results = [{ name: 'login', status: 'passed' }, { name: 'register', status: 'failed' }];
results.every(r => r.status === 'passed');                // false
```

**4. Use it in an `if`**
```js
if (results.every(r => r.status === 'passed')) {
  console.log('All tests passed');                        // doesn't run
}
```

**5. Validate a form: all fields filled?**
```js
const form = { name: 'John', email: 'john@test.com', city: '' };
Object.values(form).every(value => value !== '');         // false (city is empty)
```

**6. Use the index and array: is the list sorted?**
```js
[1, 3, 5, 9].every((n, i, arr) => i === 0 || arr[i - 1] <= n);   // true
```

### Where to use it
Use `every` whenever the sentence in your head is **"are ALL ___?"** or **"does every ___?"**:
- did all tests pass?
- are all form fields filled / valid?
- are all prices positive?
- in test automation: are all rows in a table showing the right status?

### When *not* to use it

| You want to… | Use instead |
|---|---|
| check if at least ONE matches | `some` |
| get the items that fail | `filter` (with the opposite test) |
| get the first item that fails | `find` (with the opposite test) |

### The 3 traps

```js
// ❌ 1. Empty array → TRUE (nothing broke the rule), which surprises people
[].every(n => n > 100);                            // true
// ✅ check there is something first
const list = [];
list.length > 0 && list.every(n => n > 100);       // false

// ❌ 2. Braces but no return → always false
[2, 4].every(n => { n % 2 === 0 });                // false
// ✅
[2, 4].every(n => n % 2 === 0);                    // true

// ❌ 3. Mixing up some and every
// "did ANY test fail?"   → results.some(r => r.status === 'failed')
// "did ALL tests pass?"  → results.every(r => r.status === 'passed')
```

### One-line summary
**`every` returns `false` as soon as ONE item fails your test (and stops looking), otherwise `true`. An empty array gives `true`. The original stays untouched.**

### `some` vs `every` side by side

| | `some` | `every` |
|---|---|---|
| Question | is there **ANY**? | are they **ALL**? |
| Stops at | the first **true** | the first **false** |
| Returns `true` when | at least one passes | all pass |
| Empty array `[]` | `false` | `true` |
| Example | did any test fail? | did all tests pass? |

**They are opposites:** "not ANY failed" means the same as "ALL passed":
```js
!results.some(r => r.status === 'failed') === results.every(r => r.status !== 'failed');   // true
```

---

## 7. `find()`: get the first item that matches

**Memory hook:** *"find = give me THE FIRST one that matches."*
It asks your yes/no question item by item and **stops at the first yes**, then gives you **that item itself** (not an array, not true/false).
No match → **`undefined`**.

```
[ 5,  12,  8,  20 ]     find(n => n > 10)   "give me the first number over 10"
  ✗   ✓   (stops here, 8 and 20 are never checked)
                         → 12
```

### Syntax

```js
const found = array.find((item, index, array) => {
  return trueOrFalse;
});
```

| Part | Required? | Meaning |
|---|---|---|
| `item` | ✅ yes | the current element |
| `index` | optional | its position (0, 1, 2…) |
| `array` | optional | the whole original array |
| **returns** | | **the first matching item**, or **`undefined`** if none match |
| **original** | | **unchanged** |

**Remember it as:** `array.find(item => isThisTheOne)`

### Full syntax example

```js
const numbers = [10, 25, 30, 45];

const firstBig = numbers.find((item, index, array) => {
  console.log(item, index, array);
  return item > 20;
});

// console output (stops at the first match):
// 10 0 [ 10, 25, 30, 45 ]
// 25 1 [ 10, 25, 30, 45 ]

console.log(firstBig);  // 25
console.log(numbers);   // [ 10, 25, 30, 45 ]   ← original unchanged
```

| Call | `item` | `index` | `item > 20`? | what happens |
|---|---|---|---|---|
| 1st | 10 | 0 | false | keep looking |
| 2nd | 25 | 1 | true | **stop → return `25`** |
| — | 30, 45 | | | never checked (30 also matches, but find only wants the first) |

### How to use it: simple to real-world

**1. First number that matches**
```js
[5, 12, 8, 20].find(n => n > 10);                          // 12
[5, 8].find(n => n > 10);                                  // undefined
```

**2. First text that matches**
```js
['qa', 'staging', 'prod'].find(env => env.startsWith('s'));   // 'staging'
```

**3. Find an object by id** (the most common use)
```js
const users = [
  { id: 1, name: 'John', role: 'admin' },
  { id: 2, name: 'Jane', role: 'user' },
  { id: 3, name: 'Bob', role: 'user' },
];
users.find(u => u.id === 2);          // { id: 2, name: 'Jane', role: 'user' }
```

**4. Then read a field from it**
```js
users.find(u => u.id === 2).name;     // 'Jane'
```

**5. Safely read a field when it might not exist** (`?.` and `??`)
```js
users.find(u => u.id === 99)?.name ?? 'not found';   // 'not found'
```

**6. First match by a condition**
```js
users.find(u => u.role === 'user');   // { id: 2, name: 'Jane', role: 'user' }  (Bob also matches, but Jane is first)
```

**7. Use it in an `if`**
```js
const admin = users.find(u => u.role === 'admin');
if (admin) {
  console.log(`Admin is ${admin.name}`);   // Admin is John
}
```

### Where to use it
Use `find` whenever the sentence in your head is **"get me THE ___"** (one item):
- the user with this id / email
- the product with this code
- the first failed test
- in test automation: the test data row for a given username, the API response item with a given id

### When *not* to use it

| You want to… | Use instead |
|---|---|
| ALL matching items | `filter` |
| only true/false (is there one?) | `some` |
| the POSITION of the match | `findIndex` (returns `-1` if none) |
| the LAST match | `findLast` |
| check a simple value exists | `includes` |

### The 3 traps

```js
// ❌ 1. No match → undefined → reading a field CRASHES
users.find(u => u.id === 99).name;              // TypeError: Cannot read properties of undefined
// ✅ use ?. (and ?? for a default)
users.find(u => u.id === 99)?.name;             // undefined (no crash)

// ❌ 2. Expecting ALL matches: find returns only the FIRST
users.find(u => u.role === 'user');             // { id: 2, name: 'Jane', ... }  (Bob is missing)
// ✅ use filter for all matches
users.filter(u => u.role === 'user');           // [Jane, Bob]

// ❌ 3. Braces but no return → never matches → undefined
users.find(u => { u.id === 2 });                // undefined
// ✅
users.find(u => u.id === 2);                    // { id: 2, name: 'Jane', ... }
```

### One-line summary
**`find` returns the FIRST item that passes your test (and stops looking), or `undefined` if nothing matches. The original stays untouched.**

### `find` vs `filter` vs `some` (same test, different answers)

```js
const nums = [5, 12, 8, 20];
nums.find(n => n > 10);     // 12           → the first ITEM
nums.filter(n => n > 10);   // [12, 20]     → ALL matching items (array)
nums.some(n => n > 10);     // true         → just yes / no
```

---

## 8. `shift()`: remove the first item

**Memory hook:** *"shift = take one OFF the FRONT."*
Think of a **queue at a counter**: the first person is served and leaves. Everyone else **shifts** forward one place.
⚠ It **changes the original array**, and it **returns the item it removed**.

```
before:  [ 'a', 'b', 'c' ]
           ↑ shift() takes this one off
after:   [ 'b', 'c' ]          returns → 'a'
```

### Syntax

```js
const removedItem = array.shift();
```

| Part | Required? | Meaning |
|---|---|---|
| (arguments) | none | `shift()` takes **no arguments**: it always removes the first item |
| **returns** | | **the removed item**, or `undefined` if the array was empty |
| **original** | | ⚠ **CHANGED**: one item shorter |

**Remember it as:** `const first = array.shift()`: "take the first one out and keep it."

### Full syntax example

```js
const numbers = [10, 20, 30];

const removed = numbers.shift();

console.log(removed);   // 10                  ← the item that was taken off
console.log(numbers);   // [ 20, 30 ]          ← original CHANGED (shorter by 1)
console.log(numbers.length);   // 2
```

| Step | `numbers` before | `shift()` returns | `numbers` after |
|---|---|---|---|
| 1st call | `[10, 20, 30]` | 10 | `[20, 30]` |
| 2nd call | `[20, 30]` | 20 | `[30]` |
| 3rd call | `[30]` | 30 | `[]` |
| 4th call | `[]` | `undefined` | `[]` |

### How to use it: simple to real-world

**1. Remove the first number**
```js
const nums = [1, 2, 3];
nums.shift();          // returns 1
console.log(nums);     // [2, 3]
```

**2. Keep the removed item**
```js
const envs = ['qa', 'staging', 'prod'];
const first = envs.shift();
console.log(first);    // 'qa'
console.log(envs);     // ['staging', 'prod']
```

**3. Process a queue until it's empty** (the most common use)
```js
const queue = ['build', 'test', 'deploy'];
while (queue.length > 0) {
  const job = queue.shift();
  console.log(`Running ${job}`);
}
// Running build
// Running test
// Running deploy
console.log(queue);    // []
```

**4. Skip a header row**
```js
const rows = ['name,age', 'John,30', 'Jane,25'];
const header = rows.shift();
console.log(header);   // 'name,age'
console.log(rows);     // ['John,30', 'Jane,25']   ← only data rows left
```

**5. Empty array is safe**
```js
const empty = [];
console.log(empty.shift());   // undefined (no error)
```

### Where to use it
Use `shift` whenever the sentence in your head is **"take the FIRST one out"**:
- processing a **queue** in order (first in, first out)
- removing a header row before processing data
- taking the next job, message or URL to handle

### When *not* to use it

| You want to… | Use instead |
|---|---|
| keep the original array unchanged | `array.slice(1)` (copy without the first) or `const [first, ...rest] = array` |
| remove the LAST item | `pop` |
| remove an item from the middle | `splice` |
| only READ the first item (not remove it) | `array[0]` |

### The 3 traps

```js
// ❌ 1. Forgetting it CHANGES the original
const list = [1, 2, 3];
const first = list.shift();
console.log(list);              // [2, 3]   ← the 1 is gone from list!
// ✅ need the original kept? read or copy instead
const list2 = [1, 2, 3];
const first2 = list2[0];        // 1
const rest2 = list2.slice(1);   // [2, 3]
console.log(list2);             // [1, 2, 3]   ← unchanged

// ❌ 2. Expecting the new array: shift returns the REMOVED item
console.log([5, 6, 7].shift()); // 5   (not [6, 7])

// ❌ 3. Passing an argument: shift ignores it, always removes the first
const arr = ['a', 'b', 'c'];
arr.shift(2);                   // still removes 'a' (not 'c', not 2 items)
console.log(arr);               // ['b', 'c']
```

### One-line summary
**`shift` removes the FIRST item from the array (changing it) and returns that removed item, or `undefined` if the array is empty.**

---

## 9. `unshift()`: add items to the front

**Memory hook:** *"unshift = put items ON the FRONT."*
It's the opposite of `shift`: everyone else moves back to make room at the start.
⚠ It **changes the original array**, and it **returns the NEW LENGTH** (a number, not the array).

```
before:  [ 'b', 'c' ]
unshift('a')  →  'a' goes in at the front
after:   [ 'a', 'b', 'c' ]     returns → 3   (the new length)
```

### Syntax

```js
const newLength = array.unshift(item1, item2, ...);
```

| Part | Required? | Meaning |
|---|---|---|
| `item1, item2, ...` | optional (0 or more) | the values to add at the start, in this order |
| **returns** | | **the new length** of the array (a number) |
| **original** | | ⚠ **CHANGED**: longer |

**Remember it as:** `array.unshift(newFirstItem)`: "squeeze it in at the front."

### Full syntax example

```js
const numbers = [20, 30];

const newLength = numbers.unshift(10);

console.log(newLength);   // 3                  ← the NEW LENGTH, not the array
console.log(numbers);     // [ 10, 20, 30 ]     ← original CHANGED
```

| Call | `numbers` before | `unshift` returns | `numbers` after |
|---|---|---|---|
| `unshift(10)` | `[20, 30]` | 3 | `[10, 20, 30]` |
| `unshift(-5, 0)` | `[10, 20, 30]` | 5 | `[-5, 0, 10, 20, 30]` |

### How to use it: simple to real-world

**1. Add one item at the start**
```js
const nums = [2, 3];
nums.unshift(1);        // returns 3
console.log(nums);      // [1, 2, 3]
```

**2. Add several items at once** (they keep the order you give)
```js
const letters = ['c', 'd'];
letters.unshift('a', 'b');   // returns 4
console.log(letters);        // ['a', 'b', 'c', 'd']
```

**3. Add a header row back**
```js
const rows = ['John,30', 'Jane,25'];
rows.unshift('name,age');
console.log(rows);      // ['name,age', 'John,30', 'Jane,25']
```

**4. Newest item first** (like a "recent activity" list)
```js
const recent = ['login', 'search'];
recent.unshift('checkout');
console.log(recent);    // ['checkout', 'login', 'search']
```

**5. Add a setup step before the others**
```js
const steps = ['run tests', 'teardown'];
steps.unshift('setup');
console.log(steps);     // ['setup', 'run tests', 'teardown']
```

### Where to use it
Use `unshift` whenever the sentence in your head is **"put this at the START"**:
- adding a header or title row
- "newest first" lists (latest message, latest log)
- adding a setup step before the others

### When *not* to use it

| You want to… | Use instead |
|---|---|
| keep the original unchanged | spread: `const newArr = [newItem, ...array]` |
| add at the END | `push` |
| add in the middle | `splice(index, 0, item)` |
| get the new array back from the call | spread `[item, ...array]` (unshift returns a number) |

### The 3 traps

```js
// ❌ 1. Expecting the array: unshift returns the NEW LENGTH
const result = [2, 3].unshift(1);
console.log(result);              // 3   (not [1, 2, 3])
// ✅ want a new array in one expression? use spread
const result2 = [1, ...[2, 3]];
console.log(result2);             // [1, 2, 3]

// ❌ 2. Forgetting it CHANGES the original
const base = [2, 3];
base.unshift(1);
console.log(base);                // [1, 2, 3]   ← base itself changed
// ✅ keep the original with spread
const base2 = [2, 3];
const copy = [1, ...base2];
console.log(base2);               // [2, 3]      ← unchanged

// ❌ 3. Adding several items one at a time REVERSES them
const a = ['c'];
a.unshift('a');
a.unshift('b');
console.log(a);                   // ['b', 'a', 'c']   ← not a, b, c!
// ✅ pass them together, in the order you want
const b = ['c'];
b.unshift('a', 'b');
console.log(b);                   // ['a', 'b', 'c']
```

### One-line summary
**`unshift` adds one or more items to the FRONT of the array (changing it) and returns the new length, not the array.**

### The 4 "ends" methods side by side

```
              START                         END
            ┌───────┐                   ┌───────┐
  unshift → │  add  │   [ a, b, c ]     │  add  │ ← push
  shift   ← │remove │                   │remove │ → pop
            └───────┘                   └───────┘
```

| Method | Where | Does | Returns | Changes original? |
|---|---|---|---|---|
| `unshift(x)` | start | add | new **length** | ⚠ yes |
| `shift()` | start | remove | the **removed item** | ⚠ yes |
| `push(x)` | end | add | new **length** | ⚠ yes |
| `pop()` | end | remove | the **removed item** | ⚠ yes |

**Memory trick:** *add → returns the length; remove → returns the item.*
**Safe (no change) versions:** `[x, ...arr]` instead of `unshift`, `arr.slice(1)` instead of `shift`, `[...arr, x]` instead of `push`, `arr.slice(0, -1)` instead of `pop`.

---
