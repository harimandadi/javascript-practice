/**
 * Counts words in a given string by tracking character transitions.
 * 
 * EXAMPLE TRACE FOR INPUT: "hi js"
 * ------------------------------------------------------------
 * i = 0 | char = 'h' | inWord: false -> true  | count = 1 (Start of first word)
 * i = 1 | char = 'i' | inWord: true -> true   | count = 1 (Still inside word)
 * i = 2 | char = ' ' | inWord: true -> false  | count = 1 (Hit a space)
 * i = 3 | char = 'j' | inWord: false -> true  | count = 2 (Start of second word)
 * i = 4 | char = 's' | inWord: true -> true   | count = 2 (Still inside word)
 * ------------------------------------------------------------
 */

function countWords(str) {
    let wordCount = 0;
    let inWord = false; // Flag to track whether we are currently reading inside a word

    // ITERATION START: Loop through every character in the string
    for (let i = 0; i < str.length; i++) {
        let char = str[i];

        // Check if the current character is NOT a space
        if (char !== " ") {
            // If we weren't already inside a word, this marks the start of a new word
            if (!inWord) {
                wordCount++;     // Increment our word count
                inWord = true;   // Update flag to show we are now inside a word
            }
            // (If inWord is already true, we are continuing the same word, so do nothing)

        } else {
            // If the character IS a space, we have exited the current word
            inWord = false;
        }
    }

    // Return the total final word count
    return wordCount;
}

// --- TEST IT IN VSCODE ---
let inputString = "  Hello   world! This is JS.  ";
console.log("Input:", inputString);
console.log("Word Count:", countWords(inputString)); // Output: 5

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * QUICK STEPS (English → code)
 * MEMORY: "Count a word when you STEP INTO it (space → letter)."
 * ═════════════════════════════════════════════════════════════════════════════
 * 1. Count 0, not in a word            let wordCount = 0; let inWord = false;
 * 2. Letter and not in a word yet      if (char !== " ") { if (!inWord) { wordCount++; inWord = true; } }
 * 3. Space → you left the word         else inWord = false;
 * 4. Return                            return wordCount;
 * ═════════════════════════════════════════════════════════════════════════════
 */
