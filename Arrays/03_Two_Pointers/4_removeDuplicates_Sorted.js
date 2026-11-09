/**
 * ============================================================================
 * REMOVE DUPLICATES: SPLICE APPROACH (IN-PLACE)
 * ============================================================================
 * TIME COMPLEXITY: O(n^2) - splice() shifts elements in-memory, taking O(n) 
 *                   time per deletion, nested inside a loop.
 * SPACE COMPLEXITY: O(1) - Mutates the original array in-place.
 * ============================================================================
 */

function removeDuplicatesSplice(nums) {
    // Traverse the array up to the second-to-last element
    for (let i = 0; i < nums.length - 1; i++) {
        
        // If the current element matches the next one (duplicate found)
        if (nums[i] === nums[i + 1]) {
            // Remove the duplicate element (shifts all subsequent elements left)
            nums.splice(i + 1, 1);
            
            // Decrement 'i' so the next iteration re-checks the current index 
            // in case there are multiple consecutive duplicates (e.g., three 1s in a row)
            i--;
        }
    }
    
    // Return the new length of the array
    return nums.length;
}

// --- Test Case 1 ---
let nums1 = [1, 1, 2];
let count1 = removeDuplicatesSplice(nums1);
console.log(`Output: ${count1}, [${nums1}]`); 
// Output: 2, [1, 2]


/**
 * Removes duplicates from a sorted array in-place using two pointers.
 * @param {number[]} nums 
 * @returns {number} The count of unique elements
 */
function removeDuplicatesWithoutInbuilt(nums) {
    // Step 1: Edge case safety check
    if (!nums || nums.length === 0) {
        return 0;
    }

    // Step 2: Initialize 'i' as the slow pointer for unique elements
    let i = 0;

    // Step 3: Traverse the array with fast pointer 'j' starting from index 1
    for (let j = 1; j < nums.length; j++) {
        // If we find a new unique element
        if (nums[j] !== nums[i]) {
            i++;                  // Move unique pointer forward
            nums[i] = nums[j];    // Overwrite with the new unique value
        }
    }

    // Step 4: Return the count (index + 1) of unique elements
    return i + 1;
}
let nums2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
let count2 = removeDuplicatesWithoutInbuilt(nums2);
console.log(`Output: ${count2}, [${nums2.slice(0, count2)}]`); 
// Expected Output: 5, [0, 1, 2, 3, 4]