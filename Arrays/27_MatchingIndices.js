/**
 * Compares two arrays at the same index USING built-in methods (.filter()).
 * 
 * EXAMPLE TRACE FOR INPUT: 
 * arr1 = [10, 20, 30, 40]
 * arr2 = [10, 99, 30, 88]
 * ------------------------------------------------------------
 * - Index 0: arr1[0] (10) === arr2[0] (10) -> Match! Kept.
 * - Index 1: arr1[1] (20) === arr2[1] (99) -> No match. Dropped.
 * - Index 2: arr1[2] (30) === arr2[2] (30) -> Match! Kept.
 * - Index 3: arr1[3] (40) === arr2[3] (88) -> No match. Dropped.
 * ------------------------------------------------------------
 * Final Output: [10, 30]
 */

function findMatchesBuiltIn(arr1, arr2) {
    // Step 1: Use .filter() to keep elements only if they match the value at the same index in arr2
    // Note: It safely loops up to the length of arr1.
    return arr1.filter((value, index) => value === arr2[index]);
}

// --- TEST IN VSCODE ---
let arrayA = [5, 12, 8, 20, 35];
let arrayB = [5, 99, 8, 40, 35];

console.log("--- WITH BUILT-IN METHODS ---");
console.log("Array 1:", arrayA);
console.log("Array 2:", arrayB);
console.log("Matches: ", findMatchesBuiltIn(arrayA, arrayB)); 
// Output: [5, 8, 35]




/**
 * Compares two arrays at the same index WITHOUT built-in methods (using a manual loop).
 * 
 * EXAMPLE TRACE FOR INPUT: 
 * arr1 = ['apple', 'banana', 'cherry']
 * arr2 = ['apple', 'grape', 'cherry']
 * ------------------------------------------------------------
 * - i = 0: 'apple' === 'apple' -> Match! Pushed to results.
 * - i = 1: 'banana' === 'grape' -> No match. Skipped.
 * - i = 2: 'cherry' === 'cherry' -> Match! Pushed to results.
 * ------------------------------------------------------------
 * Final Output: ['apple', 'cherry']
 */

function findMatchesManual(arr1, arr2) {
    let matches = [];

    // Step 1: Find the length of the shorter array to prevent "undefined" index out-of-bounds errors
    let minLength = Math.min(arr1.length, arr2.length);

    // Step 2: Loop through both arrays side-by-side up to the minimum length
    for (let i = 0; i < minLength; i++) {
        
        // Step 3: Check if values at the exact same index match
        if (arr1[i] === arr2[i]) {
            // If they match, add the value to our matches result array
            matches.push(arr1[i]);
        }
    }

    // Step 4: Return the newly created array of matching values
    return matches;
}

// --- TEST IN VSCODE ---
let list1 = [1, 2, 3, 4, 5];
let list2 = [1, 9, 3, 8, 5, 6]; // Note: list2 is longer, but loop safely stops at list1's length

console.log("\n--- WITHOUT BUILT-IN METHODS ---");
console.log("List 1:", list1);
console.log("List 2:", list2);
console.log("Matches:", findMatchesManual(list1, list2)); 
// Output: [1, 3, 5]