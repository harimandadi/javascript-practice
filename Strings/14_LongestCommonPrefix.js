/**
 * Finds the longest common prefix using Vertical Scanning.
 * 
 * @param {string[]} strs - Array of input strings
 * @returns {string} The longest common prefix
 */
function longestCommonPrefixVertical(strs) {
  // Step 1: Handle empty array edge case
  if (!strs || strs.length === 0) return "";

  // Step 2: Loop through the characters of the FIRST string (column by column)
  for (let i = 0; i < strs[0].length; i++) {
    let char = strs[0][i]; // The character we are checking at index i

    // Step 3: Compare this character against all other strings in the array
    for (let j = 1; j < strs.length; j++) {
      
      // If we reach the end of any string OR find a character mismatch,
      // the common prefix ends right here. Return everything up to index i.
      if (i === strs[j].length || strs[j][i] !== char) {
        return strs[0].substring(0, i);
      }
    }
  }

  // Step 4: If the loop finishes completely, the entire first string is the common prefix
  return strs[0];
}

// --- Test Examples ---
console.log(longestCommonPrefixVertical(["flower", "flow", "flight"])); // Output: "fl"
console.log(longestCommonPrefixVertical(["dog", "racecar", "car"]));     // Output: ""

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * QUICK STEPS (English → code)
 * MEMORY: "Read COLUMN by column; first mismatch or short word → stop there."
 * ═════════════════════════════════════════════════════════════════════════════
 * 1. Empty list → ""                   if (!strs || strs.length === 0) return "";
 * 2. Each column i of the first word   for (let i = 0; i < strs[0].length; i++)
 * 3. Compare with every other word     for (let j = 1; j < strs.length; j++)
 * 4. Word ended or char differs → cut  if (i === strs[j].length || strs[j][i] !== char) return strs[0].substring(0, i);
 * 5. No mismatch → whole first word    return strs[0];
 * ═════════════════════════════════════════════════════════════════════════════
 */
