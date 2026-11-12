// Ques 1 : Truncate the text
// Write a function called truncate that checks the length of a given string - str, and if
// it surpasses a specified maximum length, maxlength, it replaces the end of the string[cite: 1]
// with the ellipsis character "..." so that the length matches the maximum length[cite: 1]

// Input: str = "Subscribe to RoadsideCoder", maxlength = 9[cite: 1]
// Output: "Subscribe..."[cite: 1]

// Define the function taking the string and the maximum allowed length
function truncate(str, maxlength) {
  
  // Step 1: Check if the string's length is greater than the allowed maximum length
  if (str.length > maxlength) {
    
    // Step 2: If it is too long, slice the string from index 0 up to (maxlength - 1)
    // Why maxlength - 1? Because we need to save space at the end to attach 3 dots ("...").
    // Then we concatenate (add) "..." using the plus (+) operator.
    return str.slice(0, maxlength - 1) + "...";
  } 
  
  // Step 3: If the string length is within the limit, return the original string as it is
  else {
    return str;
  }
}

// Test the function with the sample input and print the result
const result = truncate("Subscribe to RoadsideCoder", 9);
console.log(result); // Output: "Subscribe..."

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * QUICK STEPS (English → code)
 * MEMORY: "TOO LONG → cut and add '...'; otherwise keep it."
 * ═════════════════════════════════════════════════════════════════════════════
 * 1. Longer than the max?              if (str.length > maxlength)
 * 2. Cut + add the dots                return str.slice(0, maxlength - 1) + "...";
 * 3. Otherwise unchanged               return str;
 * ═════════════════════════════════════════════════════════════════════════════
 */
