/**
 * Finds duplicate elements in an array USING built-in methods (.filter(), .indexOf(), Set).
 * 
 * EXAMPLE TRACE FOR INPUT: [1, 2, 3, 2, 4, 1]
 * ------------------------------------------------------------
 * 1. .filter() checks every element to see if its current index does NOT match 
 *    its first occurrence index (.indexOf()). If it doesn't match, it's a duplicate!
 * 2. new Set() ensures that if a number appears 3+ times, it doesn't get repeated in our result.
 * ------------------------------------------------------------
 */

function findDuplicatesWithBuiltIns(arr) {
    // Step 1: Filter elements that appear more than once
    let duplicates = arr.filter((item, index) => arr.indexOf(item) !== index);

    // Step 2: Wrap in a new Set to remove redundant duplicates (if any item appears 3+ times)
    // and convert it back into an array using the spread operator [...]
    return [...new Set(duplicates)];
}

// --- TEST IN VSCODE ---
let numbers1 = [1, 2, 3, 2, 4, 1, 5, 2];
console.log("--- WITH BUILT-IN METHODS ---");
console.log("Original Array:", numbers1);
console.log("Duplicates:    ", findDuplicatesWithBuiltIns(numbers1)); 
// Output: [2, 1]



/**
 * Finds duplicate elements in an array WITHOUT helper methods (using a Frequency Object).
 * 
 * EXAMPLE TRACE FOR INPUT: [4, 2, 4, 3, 2]
 * ------------------------------------------------------------
 * 1. Build Frequency Object (counts each item):
 *    - 4 appears 2 times
 *    - 2 appears 2 times
 *    - 3 appears 1 time
 * 2. Loop through the object properties and collect keys where count > 1.
 * ------------------------------------------------------------
 */

function findDuplicatesWithoutBuiltIns(arr) {
    let frequencyMap = {};
    let duplicates = [];

    // Step 1: Count occurrences of each element
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        
        // If the item already exists in our object, add 1 to its count. Otherwise, initialize it to 1.
        if (frequencyMap[item]) {
            frequencyMap[item]++;
        } else {
            frequencyMap[item] = 1;
        }
    }

    // Step 2: Loop through the keys of our frequency object to find duplicates
    for (let key in frequencyMap) {
        // If an item appeared more than once, it's a duplicate
        if (frequencyMap[key] > 1) {
            // Note: Object keys are automatically converted to strings. 
            // If your array contains numbers, you can convert it back using Number(key).
            duplicates.push(Number(key));
        }
    }

    // Step 3: Return the array of duplicates
    return duplicates;
}

// --- TEST IN VSCODE ---
let numbers2 = [4, 2, 4, 3, 2, 5, 2];
console.log("\n--- WITHOUT BUILT-IN METHODS (Frequency Map) ---");
console.log("Original Array:", numbers2);
console.log("Duplicates:    ", findDuplicatesWithoutBuiltIns(numbers2)); 
// Output: [2, 4]