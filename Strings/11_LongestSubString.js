/**
 * Finds the length of the longest substring without repeating characters.
 * Uses the Sliding Window technique with an O(n) time complexity.
 * 
 * @param {string} s - The input string to evaluate
 * @returns {number} The maximum length of a unique substring
 */
function lengthOfLongestSubstring(s) {
  // Initialize a Set to store unique characters currently inside our sliding window
  let charSet = new Set();
  
  // 'left' pointer marks the start index of our current valid window
  let left = 0;
  
  // Tracks the maximum window length found during traversal
  let maxLength = 0;

  // Outer Loop: The 'right' pointer expands the window one character at a time
  for (let right = 0; right < s.length; right++) {
    
    // ITERATION CHECK: If we hit a duplicate character (already in the set),
    // we contract the window from the left until the duplicate is removed.
    while (charSet.has(s[right])) {
      charSet.delete(s[left]); // Remove the leftmost character from the set
      left++;                  // Shift the left boundary to the right
    }

    // Expand the window by adding the current character at 'right' to the set
    charSet.add(s[right]);

    // Record the maximum window size found so far (Current Window Size = right - left + 1)
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

// ==========================================
// EXAMPLE WALKTHROUGH FOR: "abcabcbb"
// ==========================================
/*
  right = 0, char = 'a':
    - Set doesn't have 'a'. Adds 'a'. Set: {'a'}, Window: "a" (size 1). maxLength = 1.
  
  right = 1, char = 'b':
    - Set doesn't have 'b'. Adds 'b'. Set: {'a', 'b'}, Window: "ab" (size 2). maxLength = 2.
  
  right = 2, char = 'c':
    - Set doesn't have 'c'. Adds 'c'. Set: {'a', 'b', 'c'}, Window: "abc" (size 3). maxLength = 3.
  
  right = 3, char = 'a':
    - Duplicate 'a' found! While loop triggers:
      * Removes 'a' at left=0, left becomes 1.
    - Adds new 'a'. Set: {'b', 'c', 'a'}, Window: "bca" (size 3). maxLength = 3.
  
  right = 4, char = 'b':
    - Duplicate 'b' found! While loop triggers:
      * Removes 'b' at left=1, left becomes 2.
    - Adds new 'b'. Set: {'c', 'a', 'b'}, Window: "cab" (size 3). maxLength = 3.
  
  (Process continues similarly for remaining characters...)
*/

// Test Execution
console.log(lengthOfLongestSubstring("abcabcbb")); // Output: 3 ("abc")