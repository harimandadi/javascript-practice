// Given two strings x and y, return the Hamming distance between them.

// Input: x = "hello", y = "hwllr"
// Output: 2
// Explanation:
//   (hello)
//   (hwllr)
//     ↑  ↑

function hammingDistance(x, y) {
    // Step 1: Ensure both strings are of equal length
    if (x.length !== y.length) {
        throw new Error("Strings must be of same length");
    }

    // Step 2: Initialize distance counter
    let distance = 0;

    // Step 3: Loop through each character position
    for (let i = 0; i < x.length; i++) {
        // If characters at the same position differ, increment distance
        if (x[i] !== y[i]) {
            distance++;
        }
    }

    // Step 4: Return total Hamming distance
    return distance;
}

// --- TEST IT IN VSCODE ---
console.log("Hamming Distance:", hammingDistance("hello", "hwllr")); // Output: 2


