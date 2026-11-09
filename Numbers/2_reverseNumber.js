/**
 * Reverses the digits of a given number.
 * 
 * EXAMPLE TRACE FOR INPUT: -1234
 * ------------------------------------------------------------
 * 1. Sign Check: Input is negative (-1), so we remember to restore the minus sign later.
 * 2. Absolute Value & String: Math.abs(-1234) turns it into 1234, then .toString() makes it "1234".
 * 3. Array operations: 
 *    - .split('') -> ['1', '2', '3', '4']
 *    - .reverse() -> ['4', '3', '2', '1']
 *    - .join('')  -> "4321"
 * 4. Final conversion: Number("4321") * -1 -> -4321
 * ------------------------------------------------------------
 */

function reverseNumber(num) {
    // Step 1: Capture the sign of the number (returns -1 for negative, 1 for positive, 0 for zero)
    // This ensures negative numbers like -123 stay negative (-321) after reversal.
    let sign = Math.sign(num);

    // Step 2: Convert the number to a positive string
    // Math.abs() removes the negative sign temporarily so it doesn't get stuck at the end ("4321-").
    let numStr = Math.abs(num).toString();

    // Step 3: Reverse the string characters using built-in array methods:
    // - split('') breaks the string into individual character elements in an array
    // - reverse() flips the order of the array elements backward
    // - join('') glues the flipped elements back together into a new string
    let reversedStr = numStr.split('').reverse().join('');

    // Step 4: Convert the reversed string back into a number and multiply by the original sign
    let result = Number(reversedStr) * sign;

    // Return the final reversed number
    return result;
}

// --- TEST IT IN VSCODE ---
console.log("Original: 12345 | Reversed:", reverseNumber(12345));   // Output: 54321
console.log("Original: -12345 | Reversed:", reverseNumber(-12345)); // Output: -54321
console.log("Original: 1200   | Reversed:", reverseNumber(1200));    // Output: 21 (leading zeros are dropped automatically)



/**
 * Reverses a number WITHOUT using built-in methods (uses math % and /)
 * 
 * EXAMPLE TRACE FOR INPUT: 1234
 * ------------------------------------------------------------
 * Initial: n = 1234, reversed = 0
 * 
 * Iteration 1:
 *   - digit = 1234 % 10 = 4 (extracts last digit)
 *   - reversed = (0 * 10) + 4 = 4
 *   - n = Math.trunc(1234 / 10) = 123 (removes last digit)
 * 
 * Iteration 2:
 *   - digit = 123 % 10 = 3
 *   - reversed = (4 * 10) + 3 = 43
 *   - n = Math.trunc(123 / 10) = 12
 * 
 * Iteration 3:
 *   - digit = 12 % 10 = 2
 *   - reversed = (43 * 10) + 2 = 432
 *   - n = Math.trunc(12 / 10) = 1
 * 
 * Iteration 4:
 *   - digit = 1 % 10 = 1
 *   - reversed = (432 * 10) + 1 = 4321
 *   - n = Math.trunc(1 / 10) = 0
 * 
 * Loop ends because n is 0. Final output: 4321
 * ------------------------------------------------------------
 */

function reverseNumberWithoutBuiltIns(num) {
    // Step 1: Save the original sign (+1 or -1)
    let sign = Math.sign(num);
    
    // Step 2: Work with the absolute (positive) value of the number
    let n = Math.abs(num);
    let reversed = 0;

    // Step 3: Loop until all digits have been extracted
    while (n > 0) {
        // Get the last digit of the number using modulo 10
        let digit = n % 10;
        
        // Shift existing reversed digits to the left (* 10) and add the new digit
        reversed = (reversed * 10) + digit;
        
        // Remove the last digit from 'n' by dividing by 10 and dropping decimals
        n = Math.trunc(n / 10);
    }

    // Step 4: Multiply by the original sign to restore negativity if needed
    return reversed * sign;
}

// --- TEST IN VSCODE ---
console.log("\n--- WITHOUT BUILT-IN METHODS ---");
console.log("Original: 12345  | Reversed:", reverseNumberWithoutBuiltIns(12345));   // Output: 54321
console.log("Original: -12345 | Reversed:", reverseNumberWithoutBuiltIns(-12345)); // Output: -54321
console.log("Original: 1200   | Reversed:", reverseNumberWithoutBuiltIns(1200));    // Output: 21