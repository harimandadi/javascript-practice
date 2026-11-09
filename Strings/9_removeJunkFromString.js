/**
 * Removes junk characters (special symbols, punctuation, etc.) from a string.
 * Keeps only standard alphanumeric characters (letters and numbers) and spaces.
 * 
 * EXAMPLE:
 * Input:  "Hello, World! @2026 #JavaScript_Code$%"
 * Output: "Hello World 2026 JavaScriptCode"
 */

function removeJunkCharacters(str) {
    
    // ==========================================
    // CONCEPT 1: Regular Expression (RegExp) & Negation
    // ==========================================
    // Regular expressions are patterns used to match character combinations in strings.
    // Inside the square brackets [...], we define a character set.
    // The caret symbol (^) at the very beginning means "NOT" (negation).
    // 
    // Breakdown of /[^a-zA-Z0-9 ]/g:
    // - ^          : NOT (match anything that is NOT in the following list)
    // - a-z        : All lowercase letters from a to z
    // - A-Z        : All uppercase letters from A to Z
    // - 0-9        : All numbers from 0 to 9
    // - (space)    : Keeps whitespace so words don't jam together
    
    let regex = /[^a-zA-Z0-9 ]/g;


    // ==========================================
    // CONCEPT 2: The Global Flag ('g')
    // ==========================================
    // Notice the 'g' at the end of the regex literal (outside the slashes).
    // 'g' stands for "Global". Without it, JavaScript would stop searching and 
    // replacing after finding the very first junk character. The 'g' flag ensures 
    // it scans and cleans the entire string from start to finish.


    // ==========================================
    // CONCEPT 3: The .replace() Method
    // ==========================================
    // The .replace(searchValue, newValue) method searches the string for matches 
    // against our regex pattern and replaces them with the second argument ("").
    // Passing an empty string ("") deletes the matched junk characters entirely.
    
    let cleanedString = str.replace(regex, "");

    // Return the final sanitized string
    return cleanedString;
}

// --- TEST IT IN VSCODE ---
let messyString = "Hello, World! @2026 #JavaScript_Code$% 🚀";
console.log("Original String:", messyString);
console.log("Cleaned String: ", removeJunkCharacters(messyString)); 
// Output: "Hello World 2026 JavaScriptCode "