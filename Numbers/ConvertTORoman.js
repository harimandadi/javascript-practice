/**
 * Converts an integer to a Roman numeral.
 * 
 * EXAMPLE TRACE FOR INPUT: num = 1994
 * ------------------------------------------------------------
 * - 1994 >= 1000 ('M'): result = "M", num = 994
 * - 994 < 1000, but >= 900 ('CM'): result = "MCM", num = 94
 * - 94 < 100, but >= 90 ('XC'): result = "MCMXC", num = 4
 * - 4 >= 4 ('IV'): result = "MCMXCIV", num = 0
 * ------------------------------------------------------------
 * Final Output: "MCMXCIV"
 */

function intToRoman(num) {
    // Step 1: Define parallel arrays for Roman values and their corresponding symbols.
    // Note: We include subtractive combinations like 900 (CM), 400 (CD), 90 (XC), etc.
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];

    let romanResult = "";

    // Step 2: Loop through each value from largest to smallest
    for (let i = 0; i < values.length; i++) {
        
        // Step 3: While the number is greater than or equal to the current value,
        // add its Roman symbol to our result string and subtract the value from 'num'.
        while (num >= values[i]) {
            romanResult += symbols[i];
            num -= values[i];
        }
    }

    // Step 4: Return the fully built Roman numeral string
    return romanResult;
}

// --- TEST IT IN VSCODE ---
console.log("3 in Roman:    ", intToRoman(3));       // Output: "III"
console.log("58 in Roman:   ", intToRoman(58));     // Output: "LVIII" (L = 50, V = 5, III = 3)
console.log("1994 in Roman: ", intToRoman(1994)); // Output: "MCMXCIV"
console.log("3549 in Roman: ", intToRoman(3549)); // Output: "MMMDXLIX"