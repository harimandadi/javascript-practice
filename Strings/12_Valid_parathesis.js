/**
 * ============================================================================
 * MEMORY GUIDE: THE STACK PATTERN FOR BRACKET VALIDATION
 * ============================================================================
 * 1. THE STACK: Think of it like a stack of plates. Last In, First Out (LIFO).
 *    When you see an opening bracket, you put a plate ON (push).
 *    When you see a closing bracket, you check the top plate (pop) to see if it matches.
 * 2. THE MAP: Maps every closing bracket to its correct opening partner.
 * 3. THE FINAL CHECK: If any brackets are left on the stack at the end, it's unbalanced!
 * ============================================================================
 */

function isBalanced(str) {
    // Step 1: Initialize an empty stack (array) to track opening brackets
    const stack = [];

    // Step 2: Create a lookup dictionary mapping closing brackets to their opening pairs
    const bracketMap = { 
        '}': '{',  
        ']': '[', 
        ')': '('  
    };

    // Step 3: Loop through every single character in the string using a modern for...of loop
    for (const char of str) {
        
        // --- CASE A: OPENING BRACKETS ---
        // If the character is any opening bracket, push it onto our stack
        if (char === '{' || char === '[' || char === '(') {
            stack.push(char);
        } 
        
        // --- CASE B: CLOSING BRACKETS ---
        // If the character is any closing bracket...
        else if (char === '}' || char === ']' || char === ')') {
            
            // Pop the last added opening bracket from the stack and compare it 
            // to the expected matching partner from our bracketMap.
            // Note: If the stack is empty, stack.pop() returns undefined, causing a mismatch.
            if (stack.pop() !== bracketMap[char]) {
                return false; // Mismatch found! Exit immediately.
            }
        }
        // (Note: Any other characters like commas, letters, or semicolons are automatically ignored)
    }

    // Step 4: Final validation check. 
    // If the stack length is 0, every opening bracket was successfully closed. Return true!
    // If anything is left in the stack, there are unclosed brackets. Return false!
    return stack.length === 0;
}

// --- TEST IT IN VSCODE ---
const str = "{,[,),];";

console.log("Testing string:", str);
console.log(
    isBalanced(str) 
        ? "Brackets are correctly placed" 
        : "Brackets are incorrectly placed"
); 
// Output: Brackets are incorrectly placed (because ')' doesn't match '[' correctly in LIFO order)

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * QUICK STEPS (English → code)
 * MEMORY: "OPEN → push. CLOSE → pop must match. END → stack empty."
 * ═════════════════════════════════════════════════════════════════════════════
 * 1. Empty stack + partner map         const stack = []; const bracketMap = { '}': '{', ']': '[', ')': '(' };
 * 2. Opening bracket → push            if (char === '{' || char === '[' || char === '(') stack.push(char);
 * 3. Closing bracket → pop must match  else if (closing) { if (stack.pop() !== bracketMap[char]) return false; }
 * 4. Nothing left open → true          return stack.length === 0;
 * ═════════════════════════════════════════════════════════════════════════════
 */
