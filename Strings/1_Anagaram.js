*/

function isAnagram(s, t) {
  // STEP 1: different lengths can never be anagrams
  if (s.length !== t.length) return false;

  // counts["a"] = how many "a"s from s are still unused
  const counts = {};

  // STEP 2: count UP every letter of s
  for (const ch of s) {
    counts[ch] = (counts[ch] || 0) + 1;     // seen before → old count + 1; new letter → (undefined || 0) + 1 = 1
  }

  // STEP 3: count DOWN with every letter of t
  for (const ch of t) {
    if (!counts[ch]) return false;          // undefined (never in s) OR 0 (already used up) → not an anagram
    counts[ch]--;                           // use one copy of this letter
  }

  // STEP 4: same length + nothing missing or used up → every count ended at exactly 0
  return true;
}

/*
 * 