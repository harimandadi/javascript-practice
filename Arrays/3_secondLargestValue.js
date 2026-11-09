/**
 * ============================================================================
 * FIND SECOND LARGEST VALUE: SINGLE-PASS PATTERN
 * ============================================================================
 * TIME COMPLEXITY: O(n) - We loop through the array only once.
 * SPACE COMPLEXITY: O(1) - We only store two tracking variables.
 * 
 * THE MENTAL MODEL:
 * Imagine a podium. 
 * - If a new runner is faster than 1st place, the old 1st place gets pushed down to 2nd, 
 *   and the new runner takes 1st.
 * - If a runner isn't fast enough for 1st, but beats the current 2nd place (and isn't a duplicate), 
 *   they take 2nd place.
 * ============================================================================
 */

function secondLargestValue(arr) {
    
    // Step 1: Edge case safety check. 
    // If the array is missing or has fewer than 2 elements, a second largest cannot exist.
    if (!arr || arr.length < 2) {
        return null;
    }

    // Step 2: Initialize tracking variables to Negative Infinity (-Infinity).
    // WHY? If we initialized to 0, an array of negative numbers (like [-10, -5, -2]) 
    // would break because 0 is higher than all elements. -Infinity ensures any real 
    // number in the array will successfully override it on the first check.
    let largest = -Infinity;
    let secondLargest = -Infinity;

    // Step 3: Loop through the array one single time from left to right.
    for (let i = 0; i < arr.length; i++) {
        
        // WHY THIS VARIABLE? Extracts the current element to keep our conditions clean.
        const current = arr[i];

        // --- CASE A: CURRENT NUMBER BEATS 1ST PLACE ---
        if (current > largest) {
            // Demote the current 'largest' down to 'secondLargest' before updating.
            secondLargest = largest;
            // Crown the current number as the new 'largest'.
            largest = current;
        } 
        
        // --- CASE B: CURRENT NUMBER BEATS 2ND PLACE (BUT ISN'T 1ST) ---
        // Note: We check `current !== largest` to prevent duplicate values (e.g., if array is [10, 10, 5]) 
        // from incorrectly assigning 10 to both largest and secondLargest.
        else if (current > secondLargest && current !== largest) {
            secondLargest = current;
        }
    }

    // Step 4: Fallback check. 
    // If 'secondLargest' was never updated (meaning all numbers in the array were identical, like [5, 5, 5]), 
    // return null instead of returning -Infinity.
    return secondLargest === -Infinity ? null : secondLargest;
}

// ============================================================================
// TESTING AND EXECUTION IN VS CODE
// ============================================================================
console.log("Normal Array [10, 5, 20, 8]:     ", secondLargestValue([10, 5, 20, 8]));       // Output: 10
console.log("Negative Array [-5, -2, -10, -1]:", secondLargestValue([-5, -2, -10, -1]));   // Output: -2
console.log("Duplicates [10, 10, 5, 2]:       ", secondLargestValue([10, 10, 5, 2]));       // Output: 5
console.log("All Identical [7, 7, 7]:         ", secondLargestValue([7, 7, 7]));            // Output: null