/**
 * Replaces all vowels (a, e, i, o, u) in a string with the letter 'x'.
 * 
 * EXAMPLE TRACE FOR INPUT: "hello"
 * ------------------------------------------------------------
 * i = 0 | char = 'h' | Not a vowel -> kept as 'h'
 * i = 1 | char = 'e' | Vowel found! -> replaced with 'x'
 * i = 2 | char = 'l' | Not a vowel -> kept as 'l'
 * i = 3 | char = 'l' | Not a vowel -> kept as 'l'
 * i = 4 | char = 'o' | Vowel found! -> replaced with 'x'
 * ------------------------------------------------------------
 * Final Output: "hxllx"
 */

function replaceVowelsWithX(str) {
    // Step 1: Create an empty string to hold our new modified result
    let result = "";
    
    // Step 2: Define a string containing all vowels (both lowercase and uppercase)
    let vowels = "aeiouAEIOU";

    // Step 3: Loop through every character in the input string one by one
    for (let i = 0; i < str.length; i++) {
        let char = str[i]; // Get the current character at index i

        // Step 4: Check if the current character is inside our 'vowels' list
        if (vowels.includes(char)) {
            // If it IS a vowel, add 'x' (or 'X') to our result instead of the vowel
            result += "x";
        } else {
            // If it is NOT a vowel, keep the original character and add it to the result
            result += char;
        }
    }

    // Step 5: Return the final processed string
    return result;
}

// --- TEST IT IN VSCODE ---
let inputString = "JavaScript";
console.log("Original String:", inputString);
console.log("Replaced Vowels: ", replaceVowelsWithX(inputString)); 
// Output: "JxvxScxprt" (a, a, i replaced with x)

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * QUICK STEPS (English → code)
 * MEMORY: "Vowel → 'x', anything else → copy it."
 * ═════════════════════════════════════════════════════════════════════════════
 * 1. Empty result + vowel list         let result = ""; let vowels = "aeiouAEIOU";
 * 2. Each char is a vowel → add x      if (vowels.includes(char)) result += "x";
 * 3. Otherwise → copy the char         else result += char;
 * 4. Return                            return result;
 *    Regex way                         str.replace(/[aeiou]/gi, "x")
 * ═════════════════════════════════════════════════════════════════════════════
 */
