/**
 * Checks if a given string is a pangram (contains all 26 letters of the alphabet).
 * 
 * EXAMPLE TRACE FOR INPUT: "123 abcd..." (Assuming it contains a-z eventually)
 * ------------------------------------------------------------
 * - Converts string to lowercase so 'A' and 'a' count as the same letter.
 * - Loops through each character.
 * - If it's a letter between 'a' and 'z', it adds it to a unique collection (Set).
 * - As soon as our collection hits 26 unique letters, it returns true!
 * ------------------------------------------------------------
 */

function isPangram(str) {
    // Step 1: Convert the entire string to lowercase 
    // This ensures uppercase letters like 'T' are treated the same as lowercase 't'.
    let lowerStr = str.toLowerCase();
    
    // Step 2: Use a JavaScript 'Set' to store unique letters.
    // Sets automatically ignore duplicate values (e.g., adding 'a' twice only keeps one).
    let seenLetters = new Set();

    // ITERATION START: Loop through every character in the string one by one
    for (let i = 0; i < lowerStr.length; i++) {
        let char = lowerStr[i]; // Get the current character at index i

        // Step 3: Check if the character is a valid English letter between 'a' and 'z'
        // In JavaScript, characters can be compared alphabetically using standard operators.
        if (char >= 'a' && char <= 'z') {
            
            // Add the valid letter to our Set
            seenLetters.add(char);

            // Step 4 (Smart Shortcut): 
            // If our Set size reaches 26, it means we have found every single letter of the alphabet!
            // We don't even need to finish looping through the rest of the string.
            if (seenLetters.size === 26) {
                return true; // Exit early and confirm it is a pangram
            }
        }
    }

    // Step 5: After checking all characters, check if the total unique letters equal 26
    // If it reached 26, return true. Otherwise, return false.
    return seenLetters.size === 26;
}

// --- TEST IT IN VSCODE ---
let pangramSentence = "The quick brown fox jumps over the lazy dog";
let normalSentence = "Hello world, this is JavaScript!";

console.log("Is it a pangram?", isPangram(pangramSentence)); 
// Output: true (contains all 26 letters)

console.log("Is it a pangram?", isPangram(normalSentence)); 
// Output: false (missing many letters like f, g, j, etc.)

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * QUICK STEPS (English → code)
 * MEMORY: "Collect unique letters a–z in a Set; 26 of them → pangram."
 * ═════════════════════════════════════════════════════════════════════════════
 * 1. Lowercase everything              let lowerStr = str.toLowerCase();
 * 2. Empty Set of letters              let seenLetters = new Set();
 * 3. Letter a–z → add it               if (char >= 'a' && char <= 'z') seenLetters.add(char);
 * 4. 26 reached → true early           if (seenLetters.size === 26) return true;
 * 5. End → is it 26?                   return seenLetters.size === 26;
 * ═════════════════════════════════════════════════════════════════════════════
 */
