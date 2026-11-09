/**
 * Kth Largest Element in an Array   (LeetCode 215 · asked at Amazon, Meta, Microsoft, Google)
 * ═════════════════════════════════════════════════════════════════════════════
 * PROBLEM STATEMENT
 *   Given an integer array nums and an integer k, return the k-th LARGEST element
 *   (in sorted order, not the k-th distinct value). Can you do better than sorting?
 *
 * EXAMPLES
 *   Input : nums = [3, 2, 1, 5, 6, 4], k = 2
 *   Output: 5            → sorted [1, 2, 3, 4, 5, 6]: largest 6, 2nd largest 5
 *
 *   Input : nums = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4
 *   Output: 4            → sorted descending 6, 5, 5, 4 → duplicates count
 *
 * OUTPUT FORMAT
 *   A single number: the k-th largest value.
 *
 * MEMORY: "Partition ONE side only (quick sort that stops early)."
 *   The k-th largest is the element that would sit at index (n - k) in ascending order.
 *   STEP 1 → PARTITION like quick sort: pick a pivot; smaller values go left, pivot lands at its
 *            FINAL sorted index p
 *   STEP 2 → p === n - k → found it. Otherwise continue in ONLY the side that contains n - k
 *            (quick sort would sort both sides; quickselect needs just one)
 *
 * COST
 *   Sorting      : O(n log n)
 *   Min-heap of k: O(n log k)  (keep the k largest; the top is the answer; JS has no built-in heap)
 *   Quickselect  : O(n) on average (n + n/2 + n/4 + ... ≈ 2n), O(n²) worst case, O(1) extra space
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── SIMPLE WAY: sort descending, O(n log n) ──────────────────────────────────
function findKthLargestSort(nums, k) {
  return [...nums].sort((a, b) => b - a)[k - 1];   // copy, numeric sort, k-th from the top
}

// ── Partition (Lomuto): pivot = last element; returns the pivot's FINAL index ─
function partition(arr, left, right) {
  const pivot = arr[right];
  let store = left;                                  // next position for a value smaller than pivot
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {                            // smaller → move it to the left part
      [arr[store], arr[j]] = [arr[j], arr[store]];
      store++;
    }
  }
  [arr[store], arr[right]] = [arr[right], arr[store]];  // put the pivot right after the smaller values
  return store;                                      // the pivot is now exactly where it belongs
}

// ── OPTIMAL: quickselect, O(n) on average ────────────────────────────────────
function findKthLargest(nums, k) {
  const arr = [...nums];                             // copy so the caller's array isn't reordered
  const target = arr.length - k;                     // index of the answer in ASCENDING order
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const p = partition(arr, left, right);           // STEP 1: pivot lands at its final index p
    if (p === target) return arr[p];                 // STEP 2: that's the answer
    if (p < target) left = p + 1;                    //   answer is to the RIGHT of p
    else right = p - 1;                              //   answer is to the LEFT of p
  }
  return -1;                                         // only for invalid k
}

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * EVERY ITERATION for nums = [3, 2, 1, 5, 6, 4], k = 2   →   target index = 6 - 2 = 4
 *
 * ROUND 1: partition indexes 0..5, pivot = 4
 *   j | arr[j] | < 4 ? | action             | array               | store
 *   --|--------|-------|--------------------|---------------------|------
 *   0 |   3    |  yes  | swap(0,0), store++ | [3, 2, 1, 5, 6, 4]  |  1
 *   1 |   2    |  yes  | swap(1,1), store++ | [3, 2, 1, 5, 6, 4]  |  2
 *   2 |   1    |  yes  | swap(2,2), store++ | [3, 2, 1, 5, 6, 4]  |  3
 *   3 |   5    |  no   |                    | [3, 2, 1, 5, 6, 4]  |  3
 *   4 |   6    |  no   |                    | [3, 2, 1, 5, 6, 4]  |  3
 *   pivot 4 swaps into index 3 → [3, 2, 1, 4, 6, 5],  p = 3
 *   p = 3 < target 4 → search only the RIGHT side: left = 4   (3, 2, 1 are never touched again)
 *
 * ROUND 2: partition indexes 4..5, pivot = 5
 *   j = 4: 6 < 5? no
 *   pivot 5 swaps into index 4 → [3, 2, 1, 4, 5, 6],  p = 4
 *   p = 4 = target → answer arr[4] = 5  ✅
 *
 * TRAPS
 *   1. k-th LARGEST = index n - k in ascending order (not k - 1, which is for descending order).
 *   2. Always the last element as pivot → O(n²) on an already sorted array. In production,
 *      pick a RANDOM pivot (swap a random element to `right` first) for O(n) on average.
 *   3. Copy the array: quickselect reorders it in place.
 *   4. Plain .sort() compares as text; always (a, b) => b - a for numbers.
 *
 * INTERVIEW LINE
 *   "Sorting is O(n log n). A min-heap of size k gives O(n log k). Quickselect partitions like
 *    quick sort but only continues into the side that contains index n - k, so the work is
 *    n + n/2 + n/4 ... ≈ 2n: O(n) on average. A random pivot avoids the O(n²) worst case."
 * ═════════════════════════════════════════════════════════════════════════════
 */

// --- TEST IT IN VS CODE ---
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));            // 5
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));   // 4
console.log(findKthLargest([1], 1));                           // 1
console.log(findKthLargest([7, 7, 7], 2));                     // 7 (duplicates)
console.log(findKthLargestSort([3, 2, 1, 5, 6, 4], 2));        // 5 (sort version, same answer)
