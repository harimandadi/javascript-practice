// Variation 2: Given two integers x and y, return the Hamming distance between their bits.
// Input: x = 1, y = 4
// Output: 2
// Explanation:
// 1   (0 0 0 1)
// 4   (0 1 0 0)
//         ↑   ↑

function hammingDistance(x, y) {
    
    // Step 1: Convert both numbers into binary strings using .toString(2)
    // Example with x = 2 and y = 9:
    // 2 in binary is "10"
    // 9 in binary is "1001"
    x = x.toString(2);
    y = y.toString(2);

    // Step 2: Pad the shorter binary string with leading zeros ("0") 
    // so that both strings are of equal length for accurate comparison.
    if (x.length < y.length) {
        // If x is shorter than y, keep adding "0" to the front of x until lengths match
        while (x.length !== y.length) {
            x = "0" + x;
        }
    } else {
        // If y is shorter than or equal to x, keep adding "0" to the front of y until lengths match
        // For x="10" (length 2) and y="1001" (length 4), x becomes "0010"
        while (x.length !== y.length) {
            y = "0" + y;
        }
    }
    // Now both are aligned: x = "0010" and y = "1001"

    // Step 3: Initialize a counter variable to track differing bit positions
    let distance = 0;

    // Step 4: Loop through each character (bit) of the aligned binary strings
    for (let i = 0; i < x.length; i++) {
        // Check if the bit at index 'i' in string x is DIFFERENT from string y
        if (x[i] !== y[i]) {
            // If they are different, increase our distance counter by 1
            distance++;
        }
    }

    // Step 5: Return the total count of mismatched bits
    return distance;
}

// Test the function with inputs 2 and 9
// Binary of 2 is "0010"
// Binary of 9 is "1001"
// Mismatches occur at indices 0, 1, 2, 3? Let's check:
// Index 0: '0' vs '1' (Different -> +1)
// Index 1: '0' vs '0' (Same)
// Index 2: '1' vs '0' (Different -> +1)
// Index 3: '0' vs '1' (Different -> +1)
// Total distance = 3
const res = hammingDistance(2, 9);
console.log(res); // Output: 3