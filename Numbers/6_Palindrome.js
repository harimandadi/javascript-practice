// Define a function named 'isPalindrome' that takes a number 'x'
var isPalindrome = function (x) {
  
  // Step 1: Check if 'x' is negative. 
  // If it is, return false immediately (e.g., -121 reversed is 121-, which isn't the same).
  // If it's positive or zero, move to the core logic using the ternary operator (Condition ? If True : If False).
  return x < 0 ? false : 
    
  // Step 2: Convert the number, reverse it, convert it back, and compare it to the original number.
    x === +x.toString().split("").reverse().join("");
};

// Test the function with the number 10
const res = isPalindrome(10);

// Print the result (false, because 10 reversed is 01, which is not 10)
console.log(res);



/*
  Step-by-Step Execution Walkthrough for: isPalindrome(10)

  Input: x = 10

  Step 1: The Ternary Condition (Negative Check)
  - The code evaluates: x < 0 ? false : ...
  - Is 10 less than 0? False.
  - Because it is not negative, it skips 'false' and moves to the right side of the colon (the core logic).

  Step 2: String Conversion (.toString())
  - Code: x.toString()
  - Takes the number 10 and converts it into a text string.
  - Current Result: "10"

  Step 3: Splitting into Array (.split(""))
  - Code: ...split("")
  - Takes the string "10" and splits every character into an individual slot in an array.
  - Current Result: ["1", "0"]

  Step 4: Reversing the Array (.reverse())
  - Code: ...reverse()
  - Flips the order of the items in the array backward.
  - Current Result: ["0", "1"]

  Step 5: Joining Back to String (.join(""))
  - Code: ...join("")
  - Glues the array elements back together into a single continuous text string.
  - Current Result: "01"

  Step 6: Converting Back to Number (+)
  - Code: +...
  - The unary plus operator (+) turns the string "01" back into a real number.
  - Current Result: 1 (JavaScript automatically drops the leading zero).

  Step 7: Final Comparison (===)
  - Code: x === 1
  - Compares the original number (10) with the reversed number (1).
  - Is 10 === 1? False.

  Step 8: Return and Print
  - The function returns 'false' to the variable 'res'.
  - console.log(res) prints 'false' to your terminal.
*/
//------------------------------------------------------------------------------------------------

/*
  Palindrome Number Check - WITHOUT USING .reverse()
  
  Concept: 
  Instead of converting the number to a string and flipping it with array methods, 
  we use pure mathematical operations (modulo '%' and division '/') to extract 
  the digits from the back and rebuild the number in reverse.

  Example Tracing with x = 121:
  1. Negative Check: 121 is not negative, continue.
  2. Extract last digit using modulo (121 % 10 = 1). Add it to reversed number.
  3. Chop off the last digit from original using math (121 / 10 = 12).
  4. Repeat until original number becomes 0. Compare original with reversed.
*/

var isPalindromeWithoutReverse = function (x) {
  // Step 1: Negative numbers are never palindromes (e.g., -121 reversed is 121-)
  if (x < 0) return false;

  // Step 2: Store the original number in a temporary variable because 
  // our loop will completely modify/destroy the value of 'x' while extracting digits.
  let originalNum = x;
  let reversedNum = 0;

  // Step 3: Loop to mathematically reverse the number
  while (x > 0) {
    // 3a. Extract the very last digit of 'x' using modulo 10
    // Example: 121 % 10 gives remainder 1
    let lastDigit = x % 10;

    // 3b. Append this digit to our 'reversedNum'. 
    // We multiply 'reversedNum' by 10 each time to shift existing digits to the left.
    // Example: 0 * 10 + 1 = 1
    reversedNum = (reversedNum * 10) + lastDigit;

    // 3c. Remove the last digit from 'x' by dividing by 10 and rounding down (floor)
    // Example: Math.floor(121 / 10) = 12 (removes the 1)
    x = Math.floor(x / 10);
  }

  // Step 4: Compare the fully reversed number with the original saved number
  // If they match, it's a palindrome (returns true); otherwise false.
  return originalNum === reversedNum;
};

// Test the function with a palindrome number
const res1 = isPalindromeWithoutReverse(121);
console.log(res1); // Output: true

// Test the function with a non-palindrome number
const res2 = isPalindromeWithoutReverse(10);
console.log(res2); // Output: false