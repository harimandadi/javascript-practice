/**
 * Groups an array of strings into anagram clusters using a Plain Object.
 * Example: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
 * 
 * @param {string[]} strs - Array of strings
 * @returns {string[][]} Grouped anagrams
 */
function groupAnagrams(strs) {
  // 1. Create a plain JavaScript object to act as our hash map
  const map = {};

  /* ==========================================================
   * ITERATION PHASE: Process each word in the input array
   * ========================================================== */
  for (let i = 0; i < strs.length; i++) {
    const currentWord = strs[i];
    
    // 2. Create a unique sorted key
    // Example: "eat" -> "aet"
    const sortedKey = currentWord.split('').sort().join('');

    // 3. If key doesn't exist in our object, initialize it with an empty array
    if (!map[sortedKey]) {
      map[sortedKey] = [];
    }

    // 4. Push the original word into its corresponding anagram group
    map[sortedKey].push(currentWord);
  }

  // 5. Convert all grouped arrays from the object values into a final 2D array
  return Object.values(map);
}

// --- Test Example ---
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])); 
// Output: [ [ 'eat', 'tea', 'ate' ], [ 'tan', 'nat' ], [ 'bat' ] ]

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * QUICK STEPS (English → code)
 * MEMORY: "SORT the word = its KEY → drop the word in the KEY's bucket."
 * ═════════════════════════════════════════════════════════════════════════════
 * 1. Make an empty map of buckets      const map = {};
 * 2. Each word → sort its letters      const sortedKey = currentWord.split('').sort().join('');
 * 3. No bucket yet → create one        if (!map[sortedKey]) map[sortedKey] = [];
 * 4. Put the ORIGINAL word in          map[sortedKey].push(currentWord);
 * 5. Return only the buckets           return Object.values(map);
 * ═════════════════════════════════════════════════════════════════════════════
 */
