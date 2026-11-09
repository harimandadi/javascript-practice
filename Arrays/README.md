# Array programs by pattern

Learn the **pattern**, not each program. Every file in a folder is a variation of that folder's template.
In an interview: hear the clue words → name the pattern → write the template → adapt it.

| Folder | Pattern | Clue words | Typical cost |
|---|---|---|---|
| [01_Single_Pass](01_Single_Pass/) | Track the best in one loop | max, min, largest, count, sum, profit | O(n) time, O(1) space |
| [02_HashMap_Set](02_HashMap_Set/) | Remember what you've seen | duplicate, frequency, pair, unique, anagram | O(n) time, O(n) space |
| [03_Two_Pointers](03_Two_Pointers/) | Two indexes moving toward each other, or slow and fast | sorted, in place, reverse, move, remove | O(n) time, O(1) space |
| [04_Kadane_Running_Sum](04_Kadane_Running_Sum/) | Extend the sum or start fresh | contiguous subarray, max sum | O(n) time, O(1) space |
| [05_Searching](05_Searching/) | Halve the range (binary), or scan (linear) | find, position, sorted, O(log n) | O(log n) / O(n) |
| [06_Sorting](06_Sorting/) | Order the elements yourself | sort without built-ins | O(n²) / O(n log n) average |
| [07_Compare_By_Index](07_Compare_By_Index/) | One index walks two inputs | equal, same position, differences | O(n) time, O(1) space |
| [08_Bit_Manipulation](08_Bit_Manipulation/) | Work on binary digits | bits, binary, XOR | O(bits) |
| [09_Prefix_Sum](09_Prefix_Sum/) | Running total (or product) from the left, and sometimes the right | subarray sum = k, range sum, product except self | O(n) time |
| [10_Intervals](10_Intervals/) | Sort by start, then glue or start new | intervals, meetings, ranges, overlap | O(n log n) time |
| [11_Sliding_Window](11_Sliding_Window/) | Add the one coming in, remove the one going out | subarray of size k, shortest/longest window with a sum (positive numbers) | O(n) time, O(1) space |
| [12_Matrix](12_Matrix/) | Walk rows and columns with boundaries; transpose / mark | matrix, grid, spiral, rotate, set zeroes | O(rows × cols) |
| [13_Greedy](13_Greedy/) | Make the best local choice; one running value describes everything | can you reach, minimum jumps, farthest | O(n) time, O(1) space |

## Templates

**01 Single pass**
```js
let best = arr[0];                       // start from a REAL element, not 0
for (let i = 1; i < arr.length; i++) {
  if (arr[i] > best) best = arr[i];      // change the rule: min, profit, count...
}
```

**02 Hash map / Set**
```js
const seen = new Map();                  // or new Set()
for (const [i, x] of arr.entries()) {
  if (seen.has(target - x)) return [seen.get(target - x), i];   // "have I seen what I need?"
  seen.set(x, i);                        // remember this one
}
```

**02 Set: count only from the start of a run** (longest consecutive sequence)
```js
const set = new Set(arr);
let best = 0;
for (const x of set) {
  if (set.has(x - 1)) continue;          // not a start → skip
  let len = 1;
  while (set.has(x + len)) len++;        // count up
  best = Math.max(best, len);
}
```

**02 Count + bucket** (top k frequent)
```js
const count = new Map();
for (const x of arr) count.set(x, (count.get(x) || 0) + 1);
const buckets = Array.from({ length: arr.length + 1 }, () => []);
for (const [x, c] of count) buckets[c].push(x);              // bucket by count
const result = [];
for (let c = arr.length; c >= 1 && result.length < k; c--)  // read from the top
  for (const x of buckets[c]) if (result.length < k) result.push(x);
```

**03 Two pointers**
```js
let left = 0, right = arr.length - 1;
while (left < right) {
  // compare / swap arr[left] and arr[right], then move one or both pointers
  left++; right--;
}
```

**04 Kadane**
```js
let current = arr[0], best = arr[0];
for (let i = 1; i < arr.length; i++) {
  current = Math.max(arr[i], current + arr[i]);   // extend or start fresh
  best = Math.max(best, current);
}
```

**05 Binary search** (sorted input)
```js
let low = 0, high = arr.length - 1;
while (low <= high) {
  const mid = Math.floor((low + high) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) low = mid + 1; else high = mid - 1;
}
return low;                              // insert position when not found
```

**05 Search in a rotated sorted array**
```js
while (low <= high) {
  const mid = Math.floor((low + high) / 2);
  if (arr[mid] === target) return mid;
  if (arr[low] <= arr[mid]) {                                        // left half sorted
    if (arr[low] <= target && target < arr[mid]) high = mid - 1; else low = mid + 1;
  } else {                                                           // right half sorted
    if (arr[mid] < target && target <= arr[high]) low = mid + 1; else high = mid - 1;
  }
}
return -1;
```

**06 Merge sort**
```js
function mergeSort(arr) {
  if (arr.length <= 1) return arr;                                   // base case
  const mid = Math.floor(arr.length / 2);
  return mergeTwo(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
}
// mergeTwo: take the smaller front element (<= keeps it stable), then append the leftovers
```

**03 Merge two sorted arrays from the back** (in place)
```js
let i = m - 1, j = n - 1, write = m + n - 1;
while (j >= 0) nums1[write--] = (i >= 0 && nums1[i] > nums2[j]) ? nums1[i--] : nums2[j--];
```

**01 Missing number (0..n)**
```js
const n = arr.length;
return n * (n + 1) / 2 - arr.reduce((sum, x) => sum + x, 0);         // expected - actual
```

**07 Compare by index**
```js
if (a.length !== b.length) return false; // or throw
let count = 0;
for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) count++;
```

**08 Bits**
```js
let xor = x ^ y, count = 0;              // 1 wherever the bits differ
while (xor !== 0) { count += xor & 1; xor >>>= 1; }
```

**09 Prefix sum + hash map** (count subarrays with sum k)
```js
const seen = new Map([[0, 1]]);          // {0:1} → subarrays that start at index 0
let sum = 0, count = 0;
for (const x of arr) {
  sum += x;                              // running (prefix) sum
  count += seen.get(sum - k) || 0;       // earlier prefix of (sum - k) → the part after it sums to k
  seen.set(sum, (seen.get(sum) || 0) + 1);
}
```

**09 Prefix + suffix** (product except self)
```js
let prefix = 1;
for (let i = 0; i < n; i++) { answer[i] = prefix; prefix *= arr[i]; }        // left of i
let suffix = 1;
for (let i = n - 1; i >= 0; i--) { answer[i] *= suffix; suffix *= arr[i]; }  // × right of i
```

**03 Two pointers: shrink from both ends** (container with most water)
```js
let left = 0, right = arr.length - 1, best = 0;
while (left < right) {
  best = Math.max(best, (right - left) * Math.min(arr[left], arr[right]));
  if (arr[left] < arr[right]) left++; else right--;   // move the SHORTER side
}
```

**10 Merge intervals**
```js
const sorted = [...intervals].sort((a, b) => a[0] - b[0]);   // numeric sort by start
const result = [[...sorted[0]]];
for (const [start, end] of sorted.slice(1)) {
  const last = result[result.length - 1];
  if (start <= last[1]) last[1] = Math.max(last[1], end);    // overlap → glue
  else result.push([start, end]);                            // gap → start new
}
```

**11 Fixed sliding window** (size k)
```js
let sum = 0;
for (let i = 0; i < k; i++) sum += arr[i];              // first window
let best = sum;
for (let i = k; i < arr.length; i++) {
  sum += arr[i] - arr[i - k];                              // in - out
  best = Math.max(best, sum);
}
```

**11 Variable sliding window** (shortest window with sum >= target, positive numbers)
```js
let left = 0, sum = 0, best = Infinity;
for (let right = 0; right < arr.length; right++) {
  sum += arr[right];                                       // grow
  while (sum >= target) {                                  // shrink while still enough
    best = Math.min(best, right - left + 1);
    sum -= arr[left++];
  }
}
return best === Infinity ? 0 : best;
```

**12 Matrix: four walls (spiral) / transpose + reverse (rotate 90° clockwise)**
```js
let top = 0, bottom = m.length - 1, left = 0, right = m[0].length - 1;   // spiral: walk a side, move that wall in
for (let i = 0; i < n; i++)                                             // rotate: transpose...
  for (let j = i + 1; j < n; j++) [m[i][j], m[j][i]] = [m[j][i], m[i][j]];
m.forEach((row) => row.reverse());                                      // ...then reverse each row
```

**04 Kadane with max AND min** (max product subarray)
```js
let maxHere = arr[0], minHere = arr[0], best = arr[0];
for (let i = 1; i < arr.length; i++) {
  if (arr[i] < 0) [maxHere, minHere] = [minHere, maxHere];   // a negative flips them
  maxHere = Math.max(arr[i], maxHere * arr[i]);
  minHere = Math.min(arr[i], minHere * arr[i]);
  best = Math.max(best, maxHere);
}
```

**01 Scan from the right** (leaders)
```js
let maxRight = -Infinity; const out = [];
for (let i = arr.length - 1; i >= 0; i--) if (arr[i] > maxRight) { out.push(arr[i]); maxRight = arr[i]; }
return out.reverse();
```

**01 Voting with 2 candidates** (more than n/3), then VERIFY the counts
```js
for (const x of arr) {
  if (x === c1) n1++; else if (x === c2) n2++;
  else if (n1 === 0) { c1 = x; n1 = 1; } else if (n2 === 0) { c2 = x; n2 = 1; }
  else { n1--; n2--; }
}
```

**03 Fast & slow pointers** (find the duplicate: Floyd)
```js
let slow = arr[0], fast = arr[0];
do { slow = arr[slow]; fast = arr[arr[fast]]; } while (slow !== fast);   // meet in the cycle
slow = arr[0];
while (slow !== fast) { slow = arr[slow]; fast = arr[fast]; }          // walk to the entrance
return slow;
```

**03 Next permutation**: find the dip from the right, swap with the next bigger, reverse the tail

**13 Greedy reach** (jump game)
```js
let farthest = 0;
for (let i = 0; i < arr.length; i++) {
  if (i > farthest) return false;                 // can't stand here
  farthest = Math.max(farthest, i + arr[i]);
  if (farthest >= arr.length - 1) return true;
}
```

## Before every answer
1. Name the pattern.
2. Brute force first, say its cost, then optimize.
3. Dry-run one example as a table.
4. Check the edge cases: empty, one element, all negative, duplicates, already sorted.

Run any program from the repository folder, e.g. `node Arrays/02_HashMap_Set/1_TwoSum_Indices.js`.
