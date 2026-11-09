/**
 * Right rotates a string by K positions WITHOUT using the slice() method.
 * Example: "abcde", k = 2 -> "deabc"
 * 
 * @param {string} s - The input string to rotate
 * @param {number} k - The number of positions to shift right
 * @returns {string} The resulting rotated string
 */
function rotateRightWithoutSlice(s, k) {
  const n = s.length;
  if (n === 0) return s;

  // 1. Normalize k to avoid redundant loops
  const effectiveK = k % n;
  if (effectiveK === 0) return s;

  let rotatedString = "";

  /* ==========================================================
   * ITERATION PHASE: Build the rotated string character by character
   * ========================================================== */
  for (let i = 0; i < n; i++) {
    // Calculate the mapped index from the original string.
    // Example for "abcde" (n=5) and effectiveK=2 (n - effectiveK = 3):
    // i = 0 -> (0 + 3) % 5 = index 3 ('d')
    // i = 1 -> (1 + 3) % 5 = index 4 ('e')
    // i = 2 -> (2 + 3) % 5 = index 0 ('a')
    // i = 3 -> (3 + 3) % 5 = index 1 ('b')
    // i = 4 -> (4 + 3) % 5 = index 2 ('c')
    const originalIndex = (i + (n - effectiveK)) % n;
    
    // Append the character to our new string result
    rotatedString += s[originalIndex];
  }

  return rotatedString;
}

// --- Test Example ---
const inputString = "abcde";
const shiftCount = 2;

const rotatedResult = rotateRightWithoutSlice(inputString, shiftCount);
console.log(`Original String : ${inputString}`);
console.log(`Rotated Right by ${shiftCount}: ${rotatedResult}`); 
// Output: "deabc"