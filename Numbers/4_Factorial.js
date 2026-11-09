/**
 * Finds the factorial of a given number using an iterative loop.
 * 
 * EXAMPLE TRACE FOR INPUT: n = 5
 * ------------------------------------------------------------
 * Initial: result = 1
 * - i = 1: result = 1 * 1 = 1
 * - i = 2: result = 1 * 2 = 2
 * - i = 3: result = 2 * 3 = 6
 * - i = 4: result = 6 * 4 = 24
 * - i = 5: result = 24 * 5 = 120
 * ------------------------------------------------------------
 * Final Output: 120
 */

function findFactorial(n) {
    // Step 1: Factorial is not defined for negative numbers
    if (n < 0) {
        return "Factorial does not exist for negative numbers.";
    }

    // Step 2: The factorial of 0 and 1 is always 1 by definition
    if (n === 0 || n === 1) {
        return 1;
    }

    // Step 3: Initialize result variable to 1 (since multiplying by 0 would break the math)
    let result = 1;

    // ITERATION START: Loop from 2 up to the given number 'n'
    // (We can start at 2 because multiplying by 1 changes nothing)
    for (let i = 2; i <= n; i++) {
        
        // Multiply the current result by the loop counter 'i'
        result = result * i; 
        // Shortcut version: result *= i;
    }

    // Step 4: Return the final calculated factorial value
    return result;
}

// --- TEST IT IN VSCODE ---
console.log("Factorial of 5:", findFactorial(5)); // Output: 120 (5 * 4 * 3 * 2 * 1)
console.log("Factorial of 0:", findFactorial(0)); // Output: 1 (By definition)
console.log("Factorial of 6:", findFactorial(6)); // Output: 720