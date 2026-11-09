/**
 * ---------------------------------------------------------------------------
 * APPROACH 1: STANDARD LINEAR SEARCH (Returns the first matching index)
 * ---------------------------------------------------------------------------
 * PURPOSE: Scans the array sequentially from left to right. The moment it 
 * finds the target, it immediately returns its index. If the loop finishes 
 * without finding it, returns -1.
 */
const linearSearch = (nums, target) => {
  // Loop through every element in the array one by one from index 0 to the end
  for (let i = 0; i < nums.length; i++) {
    
    // Check if the current element matches our target
    if (target === nums[i]) {
      return i; // Found it! Return the current index immediately.
    }
  }
  
  // If the loop completes and no match was found, return -1
  return -1;
};

// Time Complexity  - O(n) (in the worst case, we check every element)
// Space Complexity - O(1) (no extra memory used)
console.log(linearSearch([4, 5, 6, 7, 0, 1, 2], 0)); // Output: 4
console.log(linearSearch([4, 5, 6, 7, 0, 1, 2], 3)); // Output: -1



/**
 * ---------------------------------------------------------------------------
 * APPROACH 2: GLOBAL LINEAR SEARCH (Returns ALL matching indices)
 * ---------------------------------------------------------------------------
 * PURPOSE: What if the target appears multiple times in the array? 
 * Instead of stopping at the first match, this function collects every index 
 * where the target appears into an array.
 */
const globalLinearSearch = (nums, target) => {
  // Initialize an empty array to store all matching indices
  const result = [];
  
  // Loop through the entire array
  for (let i = 0; i < nums.length; i++) {
    
    // Check if current element matches the target
    if (target === nums[i]) {
      result.push(i); // Push the index into our result array instead of returning early
    }
  }
  
  // If no matches were found (result array is empty), return -1
  if (result.length === 0) return -1;
  
  // Return the complete list of indices where the target was found
  return result;
};

// Time Complexity  - O(n)
// Space Complexity - O(n) (stores matching indices in the result array)
console.log(globalLinearSearch([4, 5, 0, 7, 0, 1, 2], 0)); // Output: [2, 4]



/**
 * ===========================================================================
 *                    SAME SEARCHES WITH BUILT-IN METHODS
 * ===========================================================================
 * Built-in methods do the same left-to-right scan for you, so the loop
 * disappears. They are still LINEAR SEARCH underneath: still O(n).
 */

/**
 * ---------------------------------------------------------------------------
 * APPROACH 3: FIRST MATCHING INDEX WITH indexOf  (built-in version of Approach 1)
 * ---------------------------------------------------------------------------
 * PURPOSE: indexOf scans from left to right and returns the index of the FIRST
 * element equal (===) to the target, or -1 if there is none. That is exactly
 * what Approach 1 does with a loop.
 */
const linearSearchIndexOf = (nums, target) => {
  return nums.indexOf(target); // first index where nums[i] === target, else -1
};

// Time Complexity  - O(n)
// Space Complexity - O(1)
console.log(linearSearchIndexOf([4, 5, 6, 7, 0, 1, 2], 0)); // Output: 4
console.log(linearSearchIndexOf([4, 5, 6, 7, 0, 1, 2], 3)); // Output: -1



/**
 * ---------------------------------------------------------------------------
 * APPROACH 4: FIRST MATCHING INDEX WITH findIndex  (search by a CONDITION)
 * ---------------------------------------------------------------------------
 * PURPOSE: indexOf can only look for an exact value. findIndex takes a function,
 * so you can search by any condition (greater than, a field of an object, ...).
 * It returns the index of the FIRST element where the function returns true,
 * or -1 if there is none.
 */
const linearSearchFindIndex = (nums, target) => {
  return nums.findIndex((num) => {
    return num === target; // true → stop and return this index
  });
};

// Time Complexity  - O(n)
// Space Complexity - O(1)
console.log(linearSearchFindIndex([4, 5, 6, 7, 0, 1, 2], 0)); // Output: 4
console.log(linearSearchFindIndex([4, 5, 6, 7, 0, 1, 2], 3)); // Output: -1

// Where findIndex is better than indexOf: searching by a condition
console.log([4, 5, 6, 7, 0, 1, 2].findIndex((num) => num > 5));       // Output: 2 (first value > 5 is 6)
const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
console.log(users.findIndex((user) => user.name === 'Jane'));        // Output: 1



/**
 * ---------------------------------------------------------------------------
 * APPROACH 5: ALL MATCHING INDICES WITH reduce  (built-in version of Approach 2)
 * ---------------------------------------------------------------------------
 * PURPOSE: reduce walks through the whole array once, carrying the result array
 * (acc). Whenever the element matches, the current index is pushed into acc.
 * Like Approach 2, it returns -1 when nothing matches.
 */
const globalLinearSearchReduce = (nums, target) => {
  const result = nums.reduce((acc, num, index) => {
    if (num === target) {
      acc.push(index); // match → remember its index
    }
    return acc;        // always return the accumulator
  }, []);              // start with an empty array

  return result.length === 0 ? -1 : result;
};

// Time Complexity  - O(n)
// Space Complexity - O(n) (stores matching indices)
console.log(globalLinearSearchReduce([4, 5, 0, 7, 0, 1, 2], 0)); // Output: [2, 4]
console.log(globalLinearSearchReduce([4, 5, 0, 7, 0, 1, 2], 9)); // Output: -1



/**
 * ---------------------------------------------------------------------------
 * APPROACH 6: ALL MATCHING INDICES WITH map + filter  (two simple steps)
 * ---------------------------------------------------------------------------
 * PURPOSE: Step 1 - map each element to its index if it matches, otherwise -1.
 *          Step 2 - filter out the -1 values, leaving only the matching indices.
 *
 *   [4, 5, 0, 7, 0, 1, 2]  target 0
 *   map    → [-1, -1, 2, -1, 4, -1, -1]
 *   filter → [2, 4]
 */
const globalLinearSearchMapFilter = (nums, target) => {
  const result = nums
    .map((num, index) => {
      return num === target ? index : -1;  // index if it matches, else -1
    })
    .filter((index) => {
      return index !== -1;                 // keep only real indices
    });

  return result.length === 0 ? -1 : result;
};

// Time Complexity  - O(n) (two passes over the array, still linear)
// Space Complexity - O(n) (map builds a full-length temporary array)
console.log(globalLinearSearchMapFilter([4, 5, 0, 7, 0, 1, 2], 0)); // Output: [2, 4]
console.log(globalLinearSearchMapFilter([4, 5, 0, 7, 0, 1, 2], 9)); // Output: -1



/**
 * ---------------------------------------------------------------------------
 * QUICK COMPARISON
 * ---------------------------------------------------------------------------
 *  Need                         | Loop version     | Built-in version
 *  -----------------------------|------------------|-------------------------------
 *  first index of a value       | Approach 1       | indexOf(target)
 *  first index by a condition   | Approach 1 + if  | findIndex(item => condition)
 *  ALL indices of a value       | Approach 2       | reduce  /  map + filter
 *  just "is it there?" (yes/no) | loop + flag      | includes(target)
 *  the ITEM itself, not index   | loop + return    | find(item => condition)
 *
 *  All of these are LINEAR search: they check items one by one → O(n).
 *  For a SORTED array, binary search is faster: O(log n) (see 2_Searching_BinarySearch.js).
 */
console.log([4, 5, 6, 7, 0, 1, 2].includes(7));             // Output: true
console.log([4, 5, 6, 7, 0, 1, 2].find((num) => num > 5));  // Output: 6