/**
 * Right rotates a string by K positions.
 * Compatible with VS Code / JavaScript environment.
 * 
 * @param {string} s - The input string to rotate
 * @param {number} k - The number of positions to shift right
 * @returns {string} The resulting rotated string
 */
function rotateRight(s, k) {
  // Iteration / Step 1: Check if the string is empty. If so, return it as-is.
  const n = s.length;
  if (n === 0) return s;

  // Iteration / Step 2: Normalize K using the modulo operator.
  // If k is greater than the string length, rotating it 'k' times 
  // is equivalent to rotating it 'k % n' times (avoids redundant shifts).
  const effectiveK = k % n;
  if (effectiveK === 0) return s;

  // Iteration / Step 3: Extract the trailing characters that will wrap around to the front.
  // Example for "abcde" (n=5) and effectiveK=2: 
  // s.slice(5 - 2) extracts from index 3 to end -> "de"
  const tailPart = s.slice(n - effectiveK);

  // Iteration / Step 4: Extract the leading characters that will shift to the back.
  // Example for "abcde" (n=5) and effectiveK=2:
  // s.slice(0, 5 - 2) extracts from index 0 to 3 -> "abc"
  const headPart = s.slice(0, n - effectiveK);

  // Iteration / Step 5: Combine the tail and head parts to form the final rotated string.
  // "de" + "abc" = "deabc"
  return tailPart + headPart;
}

// --- Example Usage / Test Run ---
const inputString = "abcde";
const shiftCount = 2;

const rotatedResult = rotateRight(inputString, shiftCount);
console.log(`Original String : ${inputString}`);
console.log(`Rotated Right by ${shiftCount}: ${rotatedResult}`);

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * QUICK STEPS (English → code)
 * MEMORY: "CUT the tail, GLUE it in front."
 * ═════════════════════════════════════════════════════════════════════════════
 * 1. Empty → return as is              if (n === 0) return s;
 * 2. Shrink k (k = 7 on 5 → 2)         const effectiveK = k % n;  if (effectiveK === 0) return s;
 * 3. Cut the tail (last k)             const tailPart = s.slice(n - effectiveK);
 * 4. Cut the head (the rest)           const headPart = s.slice(0, n - effectiveK);
 * 5. Tail + head                       return tailPart + headPart;
 * ═════════════════════════════════════════════════════════════════════════════
 */
