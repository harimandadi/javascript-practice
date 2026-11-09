/**
 * Reverses each word in a string manually without built-in methods.
 * Uses the "prepending" trick to reverse words on the fly.
 * 
 * @param {string} str - Input string
 * @returns {string} String with each word reversed
 */
function reverseWordsOptimized(str) {
  let result = "";
  let currentWord = "";

  for (let i = 0; i < str.length; i++) {
    let char = str[i];

    if (char !== " ") {
      // THE TRICK: Prepend the character instead of appending.
      // This reverses the word automatically as we build it!
      // Example: 'h' + "" -> "h", then 'i' + "h" -> "ih"
      currentWord = char + currentWord;
    } else {
      // When we hit a space, append the reversed word + the space to the result
      result += currentWord + " ";
      currentWord = ""; // Reset for the next word
    }
  }

  // Append the very last word (since the string doesn't end with a space)
  result += currentWord;

  return result;
}

// --- Test Example ---
let inputString = "hi js";
console.log("Original:", inputString);
console.log("Reversed:", reverseWordsOptimized(inputString)); // Output: "ih sj"



/**
 * Reverses each word using built-in methods.
 * 
 * @param {string} str - Input string
 * @returns {string} String with each word reversed
 */
function reverseWordsBuiltIn(str) {
  return str
    .split(" ")                               // 1. Split sentence into an array of words: ["hi", "js"]
    .map(word => word.split("").reverse().join("")) // 2. Reverse each individual word: ["ih", "sj"]
    .join(" ");                              // 3. Join them back into a single string: "ih sj"
}

// --- Test Example ---
console.log(reverseWordsBuiltIn("hi js")); // Output: "ih sj"