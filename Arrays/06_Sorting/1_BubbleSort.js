/**
 * ---------------------------------------------------------------------------
 * QUICK SORT ALGORITHM (PIVOT = FIRST ELEMENT)
 * ---------------------------------------------------------------------------
 * PURPOSE: Sorts an array using the divide-and-conquer strategy, 
 * explicitly selecting the FIRST element of the array as the pivot.
 */
function quickSortFirstPivot(arr) {
    // Base Case: If the array has 1 or 0 elements, it's already sorted.
    // This stops the recursive loop from executing infinitely.
    if (arr.length <= 1) {
        return arr;
    }

    // Step 1: Choose the FIRST element in the array as the pivot.
    let pivot = arr[0];
    
    // Create two empty buckets for partitioning
    let left = [];   // Will hold elements smaller than the pivot
    let right = [];  // Will hold elements greater than or equal to the pivot

    // Step 2: Loop through the array starting from index 1 (since index 0 is our pivot)
    for (let i = 1; i < arr.length; i++) {
        
        // If element is smaller than pivot, throw it into the left bucket
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } 
        // Otherwise, throw it into the right bucket
        else {
            right.push(arr[i]);
        }
    }

    // Step 3: Recursively sort both buckets and combine them with the pivot in the middle.
    return [...quickSortFirstPivot(left), pivot, ...quickSortFirstPivot(right)];
}

// --- TEST IN VSCODE ---
let numbers = [29, 10, 14, 37, 14];
console.log("Original: ", numbers);
console.log("Sorted:   ", quickSortFirstPivot(numbers)); 
// Output: [10, 14, 14, 29, 37]