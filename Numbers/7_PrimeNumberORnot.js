/**
 * Checks if a given number is a prime number.
 * 
 * EXAMPLE TRACE FOR INPUT: 11
 * ------------------------------------------------------------
 * - Is 11 <= 1? No.
 * - Loop 'i' from 2 up to Math.sqrt(11) (~3.31, so i checks 2 and 3):
 *   - i = 2: 11 % 2 = 1 (Not divisible, remainder is not 0)
 *   - i = 3: 11 % 3 = 2 (Not divisible, remainder is not 0)
 * - Loop finishes without finding any divisors.
 * - Returns true (11 is a prime number).
 * ------------------------------------------------------------
 */

function isPrime(num) {
    // Step 1: Numbers less than or equal to 1 are never prime
    if (num <= 1) {
        return false;
    }

    // Step 2: Loop from 2 up to the square root of the number
    // WHY SQUARE ROOT? 
    // If a number has a factor larger than its square root, it must also have 
    // a corresponding factor smaller than its square root. Checking up to Math.sqrt(num) 
    // makes the code much faster!
    for (let i = 2; i <= Math.sqrt(num); i++) {
        
        // Step 3: Check if 'num' is evenly divisible by 'i' (i.e., remainder is 0)
        if (num % i === 0) {
            // If it divides evenly by anything other than 1 and itself, it's NOT prime
            return false;
        }
    }

    // Step 4: If the loop finishes without finding any divisors, the number is prime
    return true;
}

// --- TEST IT IN VSCODE ---
console.log("Is 11 prime?", isPrime(11)); // Output: true
console.log("Is 4 prime?", isPrime(4));   // Output: false (divisible by 2)
console.log("Is 1 prime?", isPrime(1));   // Output: false (by definition)
console.log("Is 2 prime?", isPrime(2));   // Output: true (the only even prime number)