function countElementFrequency(arr) {
  return arr.reduce((acc, currentVal) => {
    // If the element already exists in the accumulator, increment its count; otherwise, initialize it to 1
    acc[currentVal] = (acc[currentVal] || 0) + 1;
    return acc;
  }, {});
}

// --- Method Call & Execution ---
const numbers = [1, 2, 2, 3, 1, 4, 2, 'apple', 'banana', 'apple'];
const result = countElementFrequency(numbers);

console.log("Element frequencies:", result);
// Output: Element frequencies: { '1': 2, '2': 3, '3': 1, '4': 1, apple: 2, banana: 1 }

/**
 * Counts element frequency manually using a standard loop.
 * @param {Array} arr 
 * @returns {Object} An object containing frequencies of each element
 */
function countElementFrequencyManual(arr) {
    // Step 1: Initialize an empty object to act as our frequency map
    let frequencyMap = {};

    // Step 2: Loop through the array standard-style
    for (let i = 0; i < arr.length; i++) {
        let current = arr[i];

        // Step 3: If the element is already in our map, increment its count. 
        // Otherwise, initialize it to 1.
        if (frequencyMap[current] !== undefined) {
            frequencyMap[current]++;
        } else {
            frequencyMap[current] = 1;
        }
    }

    // Step 4: Return the completed frequency map object
    return frequencyMap;
}

// --- Method Call & Execution ---
const resultManual = countElementFrequencyManual(numbers);

console.log("Element frequencies (Manual Loop):", resultManual);
// Output: { '1': 2, '2': 3, '3': 1, '4': 1, apple: 2, banana: 1 }