// ============================================================================
// FIND THE KTH POSITIVE MISSING NUMBER: LINEAR SCAN SOLUTION
// ============================================================================
// Given an array arr of positive integers sorted in a strictly increasing order,
// and an integer k. Return the kth positive integer that is missing from this array.
// ============================================================================

function findKthPositive(arr, k) {
    // Initialize count to track how many numbers from the array 
    // fall within the range up to our shifting threshold (k + count).
    let count = 0;

    // Traverse through the sorted array from left to right
    for (let i = 0; i < arr.length; i++) {
        
        // If the current array element is less than or equal to (k + count), 
        // it means a missing number has been 'skipped' over, so we increment count 
        // to shift our target window forward.
        if (arr[i] <= k + count) {
            count++;
        }
    }

    // Return the final kth positive missing integer by adding the offset count to k.
    return k + count;
}

// --- Method Call & Execution ---
const arr = [2, 3, 4, 5, 7, 11, 12];
const k = 5;
const result = findKthPositive(arr, k);

console.log("The 5th missing positive integer is:", result);
// Output: 9