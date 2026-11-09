/**
 * Reverses only the vowels in a given string using ES6 destructuring for the swap.
 * 
 * @param {string} str - Input string
 * @returns {string} String with only the vowels reversed
 */
function reverseVowels(str) {
    // Convert the string into an array of characters since strings are immutable in JS
    let chars = str.split('');
    
    // Set up two pointers: one at the beginning, one at the end
    let left = 0;
    let right = chars.length - 1;
    
    // Define a string containing all vowels (both lowercase and uppercase)
    let vowels = "aeiouAEIOU";

    // Loop until the two pointers meet in the middle
    while (left < right) {
        
        // Step 1: If the character at the 'left' pointer is NOT a vowel, move 'left' rightward
        if (!vowels.includes(chars[left])) {
            left++;
        } 
        // Step 2: If the character at the 'right' pointer is NOT a vowel, move 'right' leftward
        else if (!vowels.includes(chars[right])) {
            right--;
        } 
        // Step 3: If BOTH pointers are currently pointing at vowels, swap them using ES6 Destructuring!
        else {
            // ES6 Single-line swap (No temporary variable needed)
            [chars[left], chars[right]] = [chars[right], chars[left]];

            // Move both pointers inward to continue checking the rest of the string
            left++;
            right--;
        }
    }

    // Join the array back into a single string and return it
    return chars.join('');
}

// --- TEST IT IN VSCODE ---
let inputString = "IceCreAm";
console.log("Original String:", inputString);
console.log("Reversed Vowels:", reverseVowels(inputString)); 
// Output: "AceCreIm"