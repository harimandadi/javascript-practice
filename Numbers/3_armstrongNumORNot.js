/**
 * Checks if a given number is an Armstrong number.
 * 
 * EXAMPLE TRACE FOR INPUT: 153
 * ------------------------------------------------------------
 * 1. Count Digits: 153 has 3 digits. (power = 3)
 * 2. Extract & Sum Digits:
 *    - Digit 3: 3^3 = 27  | sum = 0 + 27 = 27
 *    - Digit 5: 5^3 = 125 | sum = 27 + 125 = 152
 *    - Digit 1: 1^3 = 1   | sum = 152 + 1 = 153
 * 3. Compare: Calculated sum (153) === Original number (153) -> true!
 * ------------------------------------------------------------
 */

function isArmstrongNumber(num) {
    // Step 1: Armstrong numbers are generally non-negative integers
    if (num < 0) {
        return false;
    }

    // Step 2: Convert the number to a string to easily find how many digits it has
    let numStr = num.toString();
    let numDigits = numStr.length;

    let originalNum = num;
    let sum = 0;

    // Step 3: Loop through the number using math (extracting digits from right to left)
    while (num > 0) {
        // Get the last digit using modulo 10
        let digit = num % 10;

        // Raise the digit to the power of the total number of digits and add to sum
        // Math.pow(base, exponent) calculates exponents
        sum += Math.pow(digit, numDigits);

        // Remove the last digit by dividing by 10 and flooring the result
        num = Math.trunc(num / 10);
    }

    // Step 4: Check if the final sum matches the original number
    return sum === originalNum;
}

// --- TEST IT IN VSCODE ---
console.log("Is 153 an Armstrong number?", isArmstrongNumber(153));   // Output: true (1^3 + 5^3 + 3^3 = 153)
console.log("Is 1634 an Armstrong number?", isArmstrongNumber(1634)); // Output: true (1^4 + 6^4 + 3^4 + 4^4 = 1634)
console.log("Is 123 an Armstrong number?", isArmstrongNumber(123));   // Output: false (1^3 + 2^3 + 3^3 = 36 != 123)