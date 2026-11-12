/*
  Linear Search: Find All Indices of a Target Character
  - Scans through elements one by one.
  - Collects all indices where the target character is found.
*/

function findAllIndices(arr, target) {
  // Step 1: Create an empty array to store the matching indices
  let indices = [];

  // Step 2: Loop through each element in the array one by one
  for (let i = 0; i < arr.length; i++) {
    // Step 3: Check if the current element matches the target character
    if (arr[i] === target) {
      // Step 4: If it matches, record its position (index)
      indices.push(i);
    }
  }

  // Step 5: Return the collection of all found indices
  return indices;
}

// Test the function
const result = findAllIndices(["a", "p", "p", "l", "e"], "p");
console.log(result); // Output: [1, 2]

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * QUICK STEPS (English → code)
 * MEMORY: "Scan everything; on a match, SAVE the index."
 * ═════════════════════════════════════════════════════════════════════════════
 * 1. Empty list of indices             let indices = [];
 * 2. Each position i                   for (let i = 0; i < arr.length; i++)
 * 3. Match → save i                    if (arr[i] === target) indices.push(i);
 * 4. Return                            return indices;
 * ═════════════════════════════════════════════════════════════════════════════
 */
