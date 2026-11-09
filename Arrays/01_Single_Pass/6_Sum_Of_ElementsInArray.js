/**
 * Finds the sum of array elements USING built-in methods (.reduce()).
 * 
 * EXAMPLE TRACE FOR INPUT: [10, 20, 30]
 * ------------------------------------------------------------
 * 1. Initial sum = 0
 * 2. .reduce() loops through each element:
 *    - sum = 0 + 10 = 10
 *    - sum = 10 + 20 = 30
 *    - sum = 30 + 30 = 60
 * 3. Returns final sum: 60
 * ------------------------------------------------------------
 */

function sumArrayBuiltIn(arr) {
    // Step 1: Use .reduce() with an accumulator (sum) and current number (num)
    // The '0' at the end is the initial starting value of our sum.
    return arr.reduce((sum, num) => sum + num, 0);
}

// --- TEST IN VSCODE ---
let numbers1 = [5, 10, 15, 20];
console.log("--- WITH BUILT-IN METHODS ---");
console.log("Array:", numbers1);
console.log("Sum:  ", sumArrayBuiltIn(numbers1)); // Output: 50


/**
 * Finds the sum of array elements WITHOUT built-in methods (using a manual loop).
 * 
 * EXAMPLE TRACE FOR INPUT: [5, 10, 15]
 * ------------------------------------------------------------
 * Initial: sum = 0
 * - i = 0: sum = 0 + 5 = 5
 * - i = 1: sum = 5 + 10 = 15
 * - i = 2: sum = 15 + 15 = 30
 * Final Output: 30
 * ------------------------------------------------------------
 */

function sumArrayManual(arr) {
    // Step 1: Initialize an accumulator variable to store the running total
    let sum = 0;

    // Step 2: Loop through every element in the array from start to finish
    for (let i = 0; i < arr.length; i++) {
        // Add the current element's value to our running sum
        sum += arr[i]; // Equivalent to: sum = sum + arr[i];
    }

    // Step 3: Return the final total sum
    return sum;
}

// --- TEST IN VSCODE ---
let numbers2 = [2, 4, 6, 8, 10];
console.log("\n--- WITHOUT BUILT-IN METHODS ---");
console.log("Array:", numbers2);
console.log("Sum:  ", sumArrayManual(numbers2)); // Output: 30