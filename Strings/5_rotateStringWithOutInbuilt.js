function rotateStringByReversal(str, k) {
  const n = str.length;
  if (n <= 1) return str;                 // nothing to rotate
  k = k % n;                              // k = 7 on 5 letters is the same as k = 2
  if (k === 0) return str;

  const chars = [...str];                 // "abcde" → ['a','b','c','d','e']   string → ARRAY (now swappable)

  function reverse(start, end) {          // EXACTLY the same helper as rotateArray
    while (start < end) {
      [chars[start], chars[end]] = [chars[end], chars[start]];
      start++;
      end--;
    }
  }

  reverse(0, n - 1);                      // Step A: reverse everything
  reverse(0, k - 1);                      // Step B: reverse the first k
  reverse(k, n - 1);                      // Step C: reverse the rest

  return chars.join('');                  // ARRAY → string again
}

function rotateRightWithoutSlice(s, k) {
  const n = s.length;
  if (n === 0) return s;

  const effectiveK = k % n;
  if (effectiveK === 0) return s;

  let rotatedString = "";

  for (let i = 0; i < n; i++) {
    const originalIndex = (i + (n - effectiveK)) % n;
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

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * QUICK STEPS (English → code)
 * MEMORY: "New position i reads from old position (i + n − k) % n."
 * ═════════════════════════════════════════════════════════════════════════════
 * 1. Empty → return as is              if (n === 0) return s;
 * 2. Shrink k                          const effectiveK = k % n;  if (effectiveK === 0) return s;
 * 3. Empty result                      let rotatedString = "";
 * 4. Each i → read the mapped index    rotatedString += s[(i + (n - effectiveK)) % n];
 * 5. Return                            return rotatedString;
 * ═════════════════════════════════════════════════════════════════════════════
 */
console.log(rotateStringByReversal("abcde", 2));   // "deabc"
console.log(rotateStringByReversal("abcde", 7));   // "deabc"  (7 % 5 = 2)
