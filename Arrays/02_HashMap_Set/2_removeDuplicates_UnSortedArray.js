function removeDuplicatesUnsorted(nums) {
  let seen = {}; // Hash map to track numbers we've already encountered
  
  for (let i = 0; i < nums.length; i++) {
    let current = nums[i];
    
    if (seen[current]) {
      // If already seen, it's a duplicate -> remove it
      nums.splice(i, 1);
      i--; // Adjust index because elements shifted left
    } else {
      // If first time seeing it -> mark as seen
      seen[current] = true;
    }
  }
  
  return nums.length;
}

// Test Example
let arr = [3, 1, 3, 2];
console.log(removeDuplicatesUnsorted(arr)); // Output: 3, and arr becomes [3, 1, 2]
