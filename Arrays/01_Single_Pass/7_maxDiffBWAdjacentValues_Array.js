/**
 * Finds the maximum difference between adjacent elements in an array.
 * 
 * EXAMPLE TRACE FOR INPUT: [2, 9, 1, 5, 10]
 * ------------------------------------------------------------
 * - Adjacent pairs and their absolute differences:
 *   - |9 - 2| = 7
 *   - |1 - 9| = 8  <-- Current Max
 *   - |5 - 1| = 4
 *   - |10 - 5| = 5
 * ------------------------------------------------------------
 * Final Output: 8
 */

function maxAdjacentDifference(arr) {
    // Step 1: Handle edge cases where the array has fewer than 2 elements
    // (You need at least 2 numbers to have an "adjacent pair")
    if (!arr || arr.length < 2) {
        return "Array must contain at least 2 elements!";
    }

    // Step 2: Initialize maxDiff with the difference of the very first adjacent pair
    let maxDiff = Math.abs(arr[1] - arr[0]);

    // Step 3: Loop through the array starting from index 1 up to the end
    for (let i = 1; i < arr.length; i++) {
        
        // Calculate the absolute (abs) difference between the current element and the previous element
        // Math.abs() ensures the difference is always positive (e.g., |1 - 9| becomes 8, not -8)
        let currentDiff = Math.abs(arr[i] - arr[i - 1]);

        // Step 4: Compare current difference with maxDiff. If it's larger, update maxDiff.
        if (currentDiff > maxDiff) {
            maxDiff = currentDiff;
        }
    }

    // Step 5: Return the highest adjacent difference found
    return maxDiff;
}

// --- TEST IT IN VSCODE ---
let numbers = [2, 9, 1, 5, 10];
console.log("Array:", numbers);
console.log("Max Adjacent Difference:", maxAdjacentDifference(numbers)); // Output: 8 (between 9 and 1)

let numbersNegative = [-5, 2, 10, 3];
console.log("\nArray:", numbersNegative);
console.log("Max Adjacent Difference:", maxAdjacentDifference(numbersNegative)); // Output: 7 (between -5 and 2: |-5 - 2| = 7)