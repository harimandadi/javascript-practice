
// Step 1: Edge case safety check. 
// If the array is missing or empty, return an informative message.
if (!arr || arr.length === 0) {
    return "Array is empty!";
}

// Step 2: Initialize tracking variables.
// Assume the first element is both the min and max to start with.
let min = arr[0];
let max = arr[0];

// Step 3: Loop through the rest of the array starting from index 1.
for (let i = 1; i < arr.length; i++) {
    
    // WHY THIS VARIABLE? Extracts the current element to keep our conditions clean.
    const current = arr[i];

    // --- CASE A: CURRENT NUMBER IS SMALLER THAN MIN ---
    if (current < min) {
        min = current;
    }

    // --- CASE B: CURRENT NUMBER IS LARGER THAN MAX ---
    if (current > max) {
        max = current;
    }
}

// Step 4: Return the result object containing both bounds.
return { min, max };


/**
 * ============================================================================
 * FIND MINIMUM AND MAXIMUM VALUES: INBUILT METHODS PATTERN
 * ============================================================================
 * TIME COMPLEXITY: O(n) - The JS engine still iterates through all elements.
 * SPACE COMPLEXITY: O(n) - The spread operator (...) expands array elements onto 
 *                   the call stack as individual arguments. (Caution: Very large 
 *                   arrays can trigger a "Maximum call stack size exceeded" error).
 * 
 * THE MENTAL MODEL:
 * Instead of manually walking through the array with a loop and clipboards, 
 * you delegate the work to JavaScript's native math library (`Math.min` and `Math.max`).
 * You use the spread operator (`...`) to unpack the array into individual arguments 
 * that these methods accept, storing the results in descriptive variables.
 * ============================================================================
 */

function findMinimumAndMaximumInbuilt(arr) {
    
    // Step 1: Edge case safety check. 
    // If the array is missing or empty, return an informative message.
    if (!arr || arr.length === 0) {
        return "Array is empty!";
    }

    // Step 2: Use Math.min and Math.max combined with the spread operator.
    // WHY? Math.min() and Math.max() expect a list of comma-separated numbers, 
    // not an array. The `...` spread operator unpacks the array elements automatically.
    const minimum = Math.min(...arr);
    const maximum = Math.max(...arr);

    // Step 3: Return the result object containing both bounds with updated keys.
    return { minimum, maximum };
}

// ============================================================================
// TESTING AND EXECUTION IN VS CODE
// ============================================================================
console.log("\n--- Inbuilt Methods Approach ---");
console.log("Normal Array [10, 5, 20, 8]:    ", findMinimumAndMaximumInbuilt([10, 5, 20, 8]));       // Output: { minimum: 5, maximum: 20 }
console.log("Negative Array [-5, -2, -10, -1]:", findMinimumAndMaximumInbuilt([-5, -2, -10, -1])); // Output: { minimum: -10, maximum: -1 }
console.log("Single Element [42]:          ", findMinimumAndMaximumInbuilt([42]));              // Output: { minimum: 42, maximum: 42 }
console.log("Empty Array []:               ", findMinimumAndMaximumInbuilt([]));                // Output: "Array is empty!"