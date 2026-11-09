/*
  Approach 2: WITH Recursion 
  - Uses a function that calls itself to solve smaller sub-problems.
  - Every recursive function needs a "Base Case" to stop it from running infinitely.
*/

var generateFibonacciRecursive = function (n) {
  // Edge Case 1: If n is 0 or negative, return an empty array
  if (n <= 0) return [];
  // Edge Case 2: If n is 1, return just the first term
  if (n === 1) return [0];

  // Helper function to find the Fibonacci number at a specific index 'i' using recursion
  function getFibAt(i) {
    // BASE CASES: Stop the recursion when we reach the first two static numbers
    if (i === 0) return 0;
    if (i === 1) return 1;

    // RECURSIVE STEP: The function calls itself for the previous two positions
    return getFibAt(i - 1) + getFibAt(i - 2);
  }

  // Build the array by calling our recursive helper for each index from 0 to n-1
  let fibArray = [];
  for (let i = 0; i < n; i++) {
    fibArray.push(getFibAt(i)); // Pushes the result of the recursive function into the array
  }

  return fibArray;
};

// Test the recursive function
const resRecursive = generateFibonacciRecursive(7);
console.log("Recursive Result:", resRecursive); // [0, 1, 1, 2, 3, 5, 8]