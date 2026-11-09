/**
 * Checks if two strings are valid anagrams using a Plain Object.
 * Example: s = "anagram", t = "nagaram" -> true
 * 
 * @param {string} s - First string
 * @param {string} t - Second string
 * @returns {boolean}
 */
function isAnagram(s, t) {
  // 1. Edge case: if lengths don't match, they can't be anagrams
  if (s.length !== t.length) return false;

  const counts = {};

  // 2. Step 1: Build the frequency map using string 's'
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    counts[char] = (counts[char] || 0) + 1;
  }

  // 3. Step 2: Loop through string 't' to decrement counts
  for (let i = 0; i < t.length; i++) {
    const char = t[i];
    
    // If character is missing or count is already 0, it's not an anagram
    if (!counts[char]) {
      return false; // Early exit
    }
    
    // Decrement the count for the matched character
    counts[char]--;
  }

  // If the loop completes successfully, they are valid anagrams
  return true;
}

// --- Test Examples ---
console.log(isAnagram("anagram", "nagaram")); // Output: true
console.log(isAnagram("rat", "car"));         // Output: false