// Define a function that takes 'n' (the total number of terms you want)
var generateFibonacci = function (n) {
  
  // Edge Case 1: If someone asks for 0 or negative terms, return an empty list
  if (n <= 0) return [];
  
  // Edge Case 2: If someone asks for just 1 term, return only the first number
  if (n === 1) return [0];

  // Step 1: Start an array with the first two mandatory Fibonacci numbers
  let fib = [0, 1];

  // Step 2: Use a loop to calculate the rest of the numbers up to 'n' terms
  // We start at index 2 because indices 0 and 1 are already handled ([0, 1])
  for (let i = 2; i < n; i++) {
    
    // Each new number is the sum of the two numbers right before it
    fib[i] = fib[i - 1] + fib[i - 2];
  }

  // Step 3: Return the completed array of Fibonacci numbers
  return fib;
};

// Call the method asking for 7 terms
const res = generateFibonacci(7);

// Print the result -> [0, 1, 1, 2, 3, 5, 8]
console.log(res);



/*
  Iteration-by-Iteration Walkthrough (n = 7)

  Iteration 1: When i = 2
  1. Check Condition: Is 2 < 7? Yes, enter the loop.
  2. The Code: fib[2] = fib[2 - 1] + fib[2 - 2];
  3. Resolve Math:
    - fib[2 - 1] becomes fib[1] (which is 1)
    - fib[2 - 2] becomes fib[0] (which is 0)
    - 1 + 0 = 1
  4. Assignment: fib[2] = 1;
  5. Current Array State: [0, 1, 1] (Loop finishes this round, i increments to 3)

  Iteration 2: When i = 3
  1. Check Condition: Is 3 < 7? Yes, enter the loop.
  2. The Code: fib[3] = fib[3 - 1] + fib[3 - 2];
  3. Resolve Math:
    - fib[3 - 1] becomes fib[2] (which is now 1)
    - fib[3 - 2] becomes fib[1] (which is 1)
    - 1 + 1 = 2
  4. Assignment: fib[3] = 2;
  5. Current Array State: [0, 1, 1, 2] (Loop finishes this round, i increments to 4)

  Iteration 3: When i = 4
  1. Check Condition: Is 4 < 7? Yes, enter the loop.
  2. The Code: fib[4] = fib[4 - 1] + fib[4 - 2];
  3. Resolve Math:
    - fib[4 - 1] becomes fib[3] (which is 2)
    - fib[4 - 2] becomes fib[2] (which is 1)
    - 2 + 1 = 3
  4. Assignment: fib[4] = 3;
  5. Current Array State: [0, 1, 1, 2, 3] (Loop finishes this round, i increments to 5)

  Iteration 4: When i = 5
  1. Check Condition: Is 5 < 7? Yes, enter the loop.
  2. The Code: fib[5] = fib[5 - 1] + fib[5 - 2];
  3. Resolve Math:
    - fib[5 - 1] becomes fib[4] (which is 3)
    - fib[5 - 2] becomes fib[3] (which is 2)
    - 3 + 2 = 5
  4. Assignment: fib[5] = 5;
  5. Current Array State: [0, 1, 1, 2, 3, 5] (Loop finishes this round, i increments to 6)

  Iteration 5: When i = 6
  1. Check Condition: Is 6 < 7? Yes, enter the loop.
  2. The Code: fib[6] = fib[6 - 1] + fib[6 - 2];
  3. Resolve Math:
    - fib[6 - 1] becomes fib[5] (which is 5)
    - fib[6 - 2] becomes fib[4] (which is 3)
    - 5 + 3 = 8
  4. Assignment: fib[6] = 8;
  5. Current Array State: [0, 1, 1, 2, 3, 5, 8] (Loop finishes this round, i increments to 7)

  Loop Termination:
  - Next, i becomes 7.
  - The loop checks the condition: Is 7 < 7? False!
  - The loop breaks/stops immediately.

  Final Result:
  - The function executes return fib;
  - It outputs the full array: [0, 1, 1, 2, 3, 5, 8]
*/

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