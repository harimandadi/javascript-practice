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