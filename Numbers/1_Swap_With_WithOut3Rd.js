/**
 * Swapping variables USING a temporary variable.
 * 
 * EXAMPLE TRACE FOR INPUT: a = 5, b = 10
 * ------------------------------------------------------------
 * 1. let temp = a;   -> temp holds 5 (a and b are still 5 and 10)
 * 2. a = b;          -> a becomes 10 (b is still 10, temp holds 5)
 * 3. b = temp;       -> b becomes 5 (taken from temp)
 * Final State: a = 10, b = 5
 * ------------------------------------------------------------
 */

function swapWithTemp(a, b) {
    console.log(`Before Swap: a = ${a}, b = ${b}`);

    // Step 1: Store the value of 'a' in a temporary variable before we overwrite it
    let temp = a;

    // Step 2: Assign the value of 'b' into 'a'
    a = b;

    // Step 3: Assign the original value of 'a' (stored in temp) into 'b'
    b = temp;

    console.log(`After Swap:  a = ${a}, b = ${b}`);
}

// --- TEST IN VSCODE ---
swapWithTemp(5, 10);


/**
 * Swapping variables WITHOUT a temporary variable (Modern JS Destructuring).
 * 
 * EXAMPLE TRACE FOR INPUT: a = 5, b = 10
 * ------------------------------------------------------------
 * 1. [a, b] = [b, a] creates a temporary array on the right side: [10, 5]
 * 2. It unpacks that array directly back into 'a' and 'b' in reverse order.
 * Final State: a = 10, b = 5
 * ------------------------------------------------------------
 */

function swapWithDestructuring(a, b) {
    console.log(`Before Swap: a = ${a}, b = ${b}`);

    // Swap values instantly using array destructuring
    [a, b] = [b, a];

    console.log(`After Swap:  a = ${a}, b = ${b}`);
}

// --- TEST IN VSCODE ---
swapWithDestructuring(5, 10);


/**
 * ---------------------------------------------------------------------------
 * SWAP TWO VARIABLES WITHOUT A 3RD VARIABLE (ARITHMETIC APPROACH)
 * ---------------------------------------------------------------------------
 * PURPOSE: Swaps the values of 'a' and 'b' using addition and subtraction symbols 
 * (+ and -) without allocating any extra memory or temporary variables.
 */
function swapWithoutThirdVariable(a, b) {
    console.log(`Before Swap: a = ${a}, b = ${b}`);

    // Step 1: Combine both values into 'a' using addition.
    // 'a' now temporarily holds the combined total of both numbers.
    a = a + b; 

    // Step 2: Subtract the original 'b' from the total sum.
    // This extracts the original value of 'a' and assigns it to 'b'.
    b = a - b; 

    // Step 3: Subtract the new 'b' (which is the original 'a') from the total sum.
    // This extracts the original value of 'b' and assigns it to 'a'.
    a = a - b; 

    console.log(`After Swap:  a = ${a}, b = ${b}`);
    
    return [a, b];
}

// --- TEST IN VSCODE ---
let num1 = 5;
let num2 = 10;
swapWithoutThirdVariable(num1, num2);