// Ques 1 : Truncate the text
// Write a function called truncate that checks the length of a given string - str, and if
// it is longer than a specified maximum length, maxlength, it keeps the first maxlength
// characters and adds the ellipsis "..." at the end.

// Input: str = "Subscribe to RoadsideCoder", maxlength = 9
// Output: "Subscribe..."   (the first 9 characters "Subscribe" + "...")

// Define the function taking the string and the maximum allowed length
function truncate(str, maxlength) {

  // Step 1: Check if the string's length is greater than the allowed maximum length
  if (str.length > maxlength) {

    // Step 2: If it is too long, keep the first maxlength characters: slice(0, maxlength)
    // slice's end index is NOT included, so slice(0, 9) gives indexes 0..8 = 9 characters.
    // Then we concatenate (add) "..." using the plus (+) operator.
    return str.slice(0, maxlength) + "...";
  }

  // Step 3: If the string length is within the limit, return the original string as it is
  else {
    return str;
  }
}

// Test the function with the sample input and print the result
const result = truncate("Subscribe to RoadsideCoder", 9);
console.log(result);                       // Output: "Subscribe..."
console.log(truncate("Hello", 9));         // Output: "Hello"      (short enough: unchanged)
console.log(truncate("Playwright", 10));   // Output: "Playwright" (exactly maxlength: unchanged)
console.log(truncate("Playwright", 4));    // Output: "Play..."

// VARIATION: when the WHOLE result (dots included) must fit in maxlength, keep maxlength - 3 characters
const truncateToFit = (str, maxlength) =>
  str.length > maxlength ? str.slice(0, maxlength - 3) + "..." : str;
console.log(truncateToFit("Subscribe to RoadsideCoder", 9));   // Output: "Subscr..."  (6 + 3 = 9 characters)

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * QUICK STEPS (English → code)
 * MEMORY: "TOO LONG → keep the first maxlength chars + '...'; otherwise keep it."
 * ═════════════════════════════════════════════════════════════════════════════
 * 1. Longer than the max?              if (str.length > maxlength)
 * 2. Keep maxlength chars + dots       return str.slice(0, maxlength) + "...";
 * 3. Otherwise unchanged               return str;
 *    Must fit INCLUDING the dots?      str.slice(0, maxlength - 3) + "..."
 * ═════════════════════════════════════════════════════════════════════════════
 */
