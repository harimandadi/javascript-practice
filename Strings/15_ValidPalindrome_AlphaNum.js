/**
 * Checks if a string is a valid palindrome, considering only alphanumeric characters and ignoring cases.
 * 
 * @param {string} s - Input string to be evaluated
 * @returns {boolean} True if palindrome, false otherwise
 */
function isPalindrome(s) {
  
  // WHY: We need to normalize the string so uppercase letters don't clash with lowercase ones, 
  // and punctuation/spaces don't break our palindrome symmetry check.
  // HOW: 
  // 1. s.toLowerCase() turns everything into lowercase (e.g., "A" becomes "a").
  // 2. .replace(/[^a-z0-9]/g, "") uses a Regular Expression (RegEx) to target 
  //    everything EXCEPT lowercase letters (a-z) and digits (0-9) and replaces them with an empty string ("").
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  
  // WHY: Set up two pointers to compare characters from both ends moving towards the center.
  // HOW: 'left' starts at index 0 (the very beginning of the cleaned string).
  let left = 0;
  
  // WHY: We need a pointer at the other end of the string to compare against the left pointer.
  // HOW: 'right' starts at the last index of the cleaned string (length - 1).
  let right = cleaned.length - 1;

  // WHY: We continue comparing as long as the left pointer hasn't crossed or met the right pointer.
  // HOW: The loop runs repeatedly, shrinking our verification window from both sides.
  while (left < right) {
    
    // WHY: Check if the character on the left matches the character on the right.
    // HOW: If they do NOT match, it's immediately disqualified as a palindrome.
    if (cleaned[left] !== cleaned[right]) {
      return false; // Mismatch found! Exit the function immediately.
    }
    
    // WHY: If they match, we need to move inward to check the next set of characters.
    // HOW: Increment 'left' to move one step to the right...
    left++;
    
    // HOW: ...and decrement 'right' to move one step to the left.
    right--;
  }

  // WHY: If the while loop finishes completely without triggering any false returns, 
  // it means all corresponding characters matched symmetrically.
  // HOW: Return true confirming it is a valid palindrome.
  return true;
}

// --- Test Example in VS Code ---
// WHY: Test with a complex real-world palindrome sentence containing spaces, capitalization, and punctuation.
const testString = "A man, a plan, a canal: Panama";
console.log("Original:", testString);
console.log("Is Palindrome:", isPalindrome(testString)); // Output: true

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * QUICK STEPS (English → code)
 * MEMORY: "CLEAN it, then compare from both ENDS inward."
 * ═════════════════════════════════════════════════════════════════════════════
 * 1. Keep only lowercase letters/digits const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");
 * 2. Pointers at both ends             let left = 0; let right = cleaned.length - 1;
 * 3. Mismatch → false                  if (cleaned[left] !== cleaned[right]) return false;
 * 4. Move inward                       left++; right--;
 * 5. All matched → true                return true;
 * ═════════════════════════════════════════════════════════════════════════════
 */
