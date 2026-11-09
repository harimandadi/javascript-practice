/**
 * Checks if two arrays are equal USING built-in methods (length check + .every()).
 * 
 * EXAMPLE TRACE FOR INPUT: [1, 2, 3] and [1, 2, 3]
 * ------------------------------------------------------------
 * 1. Length check: Both have length 3 -> Passes!
 * 2. .every() checks index-by-index:
 *    - Index 0: 1 === 1 (true)
 *    - Index 1: 2 === 2 (true)
 *    - Index 2: 3 === 3 (true)
 * 3. Returns true!
 * ------------------------------------------------------------
 */

function areArraysEqualBuiltIn(arr1, arr2) {
    // Step 1: If lengths are different, the arrays can never be equal
    if (arr1.length !== arr2.length) {
        return false;
    }

    // Step 2: Use .every() to check if every element matches the element at the same index in arr2
    return arr1.every((value, index) => value === arr2[index]);
}

// --- TEST IN VSCODE ---
let arrayA = [1, 2, 3, 4];
let arrayB = [1, 2, 3, 4];
let arrayC = [1, 2, 9, 4];

console.log("--- WITH BUILT-IN METHODS ---");
console.log("Array A equals Array B?", areArraysEqualBuiltIn(arrayA, arrayB)); // Output: true
console.log("Array A equals Array C?", areArraysEqualBuiltIn(arrayA, arrayC)); // Output: false



/**
 * Checks if two arrays are equal WITHOUT built-in array methods (using a manual loop).
 * 
 * EXAMPLE TRACE FOR INPUT: [1, 2, 3] and [1, 2, 9]
 * ------------------------------------------------------------
 * - Length check passes (both are length 3).
 * - Loop starts:
 *   - i = 0: arr1[0] (1) === arr2[0] (1) -> matches, continue
 *   - i = 1: arr1[1] (2) === arr2[1] (2) -> matches, continue
 *   - i = 2: arr1[2] (3) === arr2[2] (9) -> NO MATCH! Returns false immediately.
 * ------------------------------------------------------------
 */

function areArraysEqualManual(arr1, arr2) {
    // Step 1: Check if lengths match. If they don't, return false immediately.
    if (arr1.length !== arr2.length) {
        return false;
    }

    // Step 2: Loop through every index of the arrays
    for (let i = 0; i < arr1.length; i++) {
        
        // If elements at the same position do not match, the arrays are not equal
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    // Step 3: If the loop finishes without finding any mismatches, the arrays are identical
    return true;
}

// --- TEST IN VSCODE ---
let list1 = ['apple', 'banana', 'mango'];
let list2 = ['apple', 'banana', 'mango'];
let list3 = ['apple', 'mango', 'banana'];

console.log("\n--- WITHOUT BUILT-IN METHODS ---");
console.log("List 1 equals List 2?", areArraysEqualManual(list1, list2)); // Output: true
console.log("List 1 equals List 3?", areArraysEqualManual(list1, list3)); // Output: false (different order)