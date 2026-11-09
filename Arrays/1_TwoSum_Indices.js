/**
 * ============================================================================
 * MEMORY GUIDE: THE TWO SUM PATTERN (USING A MAP)
 * ============================================================================
 * THE CORE IDEA: 
 * Instead of using a slow nested loop to check every pair ($O(n^2)$), 
 * we use a smart "Memory Map" to look backward in $O(n)$ time.
 * 
 * MATH LOGIC:
 * If target = 9, and our current number is 2, we need: 9 - 2 = 7.
 * We just ask our map: "Have you seen 7 before?" 
 * - If YES: We found our pair! Return its index and our current index.
 * - If NO: Save the current number into the map for future steps and move on.
 * ============================================================================
 * 
 * EXAMPLE TRACE FOR INPUT: nums = [2, 7, 11, 15], target = 9
 * ------------------------------------------------------------
 * - i = 0 (currentNum = 2):
 *   - neededNum = 9 - 2 = 7
 *   - Is 7 in map? NO. 
 *   - Save to map -> map = { 2: 0 }
 * 
 * - i = 1 (currentNum = 7):
 *   - neededNum = 9 - 7 = 2
 *   - Is 2 in map? YES! Found at index 0.
 *   - Return [map.get(2), 1] -> [0, 1] 🎉
 * ------------------------------------------------------------
 */

function twoSum(nums, target) {

    // ========================================================================
    // WHY DECLARE THE MAP OUTSIDE THE LOOP?
    // It must live outside because it acts as our persistent history book. 
    // If it were inside the loop, it would get wiped clean on every single iteration!
    // ========================================================================
    const map = new Map(); // Key = number value, Value = its array index

    // ========================================================================
    // WHY A SINGLE LOOP?
    // We only need ONE loop because we are looking *backward* into our map 
    // instead of scanning forward with a second nested loop.
    // ========================================================================
    for (let i = 0; i < nums.length; i++) {
        
        // WHY THIS VARIABLE? 
        // Extracts the element at index 'i' so we don't have to keep writing 'nums[i]' 
        // over and over, making our mathematical expressions clean and readable.
        const currentNum = nums[i];
        
        // WHY THIS VARIABLE? 
        // Mathematically calculates the exact partner we need to reach our target sum.
        const neededNum = target - currentNum;

        // ========================================================================
        // WHY CHECK HISTORY BEFORE SAVING?
        // We check the map FIRST. If we saved ourselves first, a number could 
        // accidentally pair with itself (e.g., if target is 4, current is 2, looking 
        // for 2, it would find itself instantly).
        // ========================================================================
        if (map.has(neededNum)) {
            // WHY THIS LINE? 
            // We found our match! We fetch the old partner's index using map.get(neededNum) 
            // and combine it with our current loop index 'i', returning them immediately.
            return [map.get(neededNum), i]; 
        }

        // WHY THIS LINE? 
        // If the partner wasn't found in history, we save our current number and its 
        // index into the map so that *future* numbers later in the loop can check against it.
        map.set(currentNum, i);
    }

    // WHY A FALLBACK RETURN? 
    // JavaScript requires all code paths to return a value. Even though LeetCode 
    // guarantees a solution exists, this prevents runtime errors if an empty array is passed.
    return []; 
}

// ============================================================================
// TESTING AND EXECUTION IN VS CODE
// ============================================================================
const nums = [2, 7, 11, 15];
const target = 9;

console.log("Input Array:  ", nums);
console.log("Target Sum:   ", target);
console.log("Indices Found:", twoSum(nums, target)); // Output: [0, 1]



/**
 * ============================================================================
 * TWO SUM: USING A PLAIN JAVASCRIPT OBJECT (NO MAP METHODS)
 * ============================================================================
 * STRATEGY: 
 * Instead of using built-in Map methods (.has, .get, .set), we use a standard 
 * JavaScript object `{}` as our history book and check properties using `!== undefined`.
 */

function twoSumPlainObject(nums, target) {
    // Step 1: Create a plain JavaScript object to act as our history container.
    // WHY: Plain objects store data as key-value pairs just like a Map, 
    //      allowing us to avoid Map-specific built-in methods entirely.
    const seen = {};

    // Step 2: Loop through the array one single time from left to right.
    for (let i = 0; i < nums.length; i++) {
        
        // WHY THIS VARIABLE? Extracts the current element value.
        const currentNum = nums[i];
        
        // WHY THIS VARIABLE? Calculates the missing partner needed to reach the target sum.
        const neededNum = target - currentNum;

        // Step 3: Check history using standard object property lookup.
        // WHY: If `seen[neededNum]` is NOT undefined, it means that number exists as a key in our object!
        if (seen[neededNum] !== undefined) {
            // WHY THIS LINE? Returns the index stored in our object paired with our current index 'i'.
            return [seen[neededNum], i];
        }

        // Step 4: Save current number and index into our plain object.
        // WHY: If no match was found, we record our current number so future steps can check it.
        seen[currentNum] = i;
    }

    // Step 5: Fallback return if no pair exists.
    return [];
}

// --- TEST IT IN VSCODE ---
const nums1 = [2, 7, 11, 15];
const target1 = 9;
console.log("Plain Object Result:", twoSumPlainObject(nums1, target1)); // Output: [0, 1]