// Ques 6: Implement Quick Sort in JavaScript
// Write a function to sort the given array nums in ascending order.

// Input: nums = [8,3,5,4,7,6,1,2]  ----->>>>>  Output: [1,2,3,4,5,6,7,8]

// ─────────────────────────────────────────────────────────────────────────────
// IDEA (memory hook): "pick a PIVOT → smaller to the LEFT, bigger to the RIGHT →
//                      repeat on each side → join: left + pivot + right"
//
// - Pivot: here always the FIRST item (arr[0]).
// - Recursion: quickSort calls itself on the smaller left and right parts.
// - Base case: an array with 0 or 1 item is already sorted → return it as is.
// ─────────────────────────────────────────────────────────────────────────────

function quickSort(arr) {
  // STEP 1 - Base case: 0 or 1 item is already sorted, so stop here.
  //          (Without this, quickSort would call itself forever.)
  if (arr.length <= 1) {
    return arr;
  }

  // STEP 2 - Choose the pivot (the first item) and make two empty buckets.
  const pivot = arr[0];
  const left = [];   // will hold items SMALLER than the pivot
  const right = [];  // will hold items BIGGER than or EQUAL to the pivot

  // STEP 3 - Partition: put every OTHER item into left or right.
  //          i starts at 1 because index 0 is the pivot itself.
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);   // smaller → left bucket
    } else {
      right.push(arr[i]);  // bigger or equal → right bucket (duplicates go here)
    }
  }

  // STEP 4 - Sort each bucket the same way (recursion), then join:
  //          sorted left  +  pivot in the middle  +  sorted right
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// ─────────────────────────────────────────────────────────────────────────────
// FULL TRACE for quickSort([5, 2, 9, 3, 6, 1, 8, 7])
// (indentation = how deep the recursion is; every line matches what the code does)
// ─────────────────────────────────────────────────────────────────────────────
//
// quickSort([5,2,9,3,6,1,8,7])         pivot = 5
//   i=1: 2 < 5   → left  [2]
//   i=2: 9 >= 5  → right [9]
//   i=3: 3 < 5   → left  [2,3]
//   i=4: 6 >= 5  → right [9,6]
//   i=5: 1 < 5   → left  [2,3,1]
//   i=6: 8 >= 5  → right [9,6,8]
//   i=7: 7 >= 5  → right [9,6,8,7]
//   split → left [2,3,1] | pivot 5 | right [9,6,8,7]
//
//   ── LEFT SIDE ──
//   quickSort([2,3,1])                 pivot = 2
//     i=1: 3 >= 2 → right [3]
//     i=2: 1 < 2  → left  [1]
//     split → left [1] | pivot 2 | right [3]
//     quickSort([1]) → base case → [1]
//     quickSort([3]) → base case → [3]
//     return [1] + 2 + [3]  =  [1,2,3]
//
//   ── RIGHT SIDE ──
//   quickSort([9,6,8,7])               pivot = 9
//     i=1: 6 < 9 → left [6]
//     i=2: 8 < 9 → left [6,8]
//     i=3: 7 < 9 → left [6,8,7]
//     split → left [6,8,7] | pivot 9 | right []
//
//     quickSort([6,8,7])               pivot = 6
//       i=1: 8 >= 6 → right [8]
//       i=2: 7 >= 6 → right [8,7]
//       split → left [] | pivot 6 | right [8,7]
//       quickSort([])  → base case → []
//
//       quickSort([8,7])               pivot = 8
//         i=1: 7 < 8 → left [7]
//         split → left [7] | pivot 8 | right []
//         quickSort([7]) → base case → [7]
//         quickSort([])  → base case → []
//         return [7] + 8 + []  =  [7,8]
//
//       return [] + 6 + [7,8]  =  [6,7,8]
//
//     quickSort([])  → base case → []
//     return [6,7,8] + 9 + []  =  [6,7,8,9]
//
//   ── JOIN AT THE TOP ──
//   return [1,2,3] + 5 + [6,7,8,9]  =  [1,2,3,5,6,7,8,9]   ✅ final answer
//
// ─────────────────────────────────────────────────────────────────────────────
// SUMMARY OF EACH LEVEL
//   Level 0: [5,2,9,3,6,1,8,7]  → [2,3,1]  5  [9,6,8,7]
//   Level 1: [2,3,1]            → [1]  2  [3]
//            [9,6,8,7]          → [6,8,7]  9  []
//   Level 2: [6,8,7]            → []  6  [8,7]
//   Level 3: [8,7]              → [7]  8  []
//   Then every level joins back up: [1,2,3,5,6,7,8,9]
// ─────────────────────────────────────────────────────────────────────────────

// Time Complexity -
// Average Case - O(nlog n)
// Best Case - O(nlog n)
// Worst Case - O(n^2)     ← happens when the array is ALREADY sorted (or reverse sorted):
//                           the first item is then always the smallest (or biggest),
//                           so one side is always empty and the other has n - 1 items.

// Space Complexity -
// This version creates NEW left/right arrays at every level:
// Average Case - O(n) extra memory   (O(log n) only for the "in-place" version that swaps
// Worst Case - O(n^2)                  items inside the same array instead of new arrays)

console.log(quickSort([5, 2, 9, 3, 6, 1, 8, 7]));
// Output: [1, 2, 3, 5, 6, 7, 8, 9]
