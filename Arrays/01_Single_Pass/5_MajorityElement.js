// Boyer-Moore Voting Algorithm
function majorityElement(nums) {
  let count = 0;
  let candidate = null;

  for (let num of nums) {
    // If our count drops to 0, pick a new candidate
    if (count === 0) {
      candidate = num;
    }
    
    // If the current number matches our candidate, vote +1
    // Otherwise, vote -1 (cancel them out)
    if (num === candidate) {
      count = count + 1; // Add 1 if it matches
    } else {
      count = count - 1; // Subtract 1 if it doesn't match
    }
  }

  return candidate;
}

// --- Method Call ---
let nums = [2, 2, 1, 1, 1, 2, 2];
let result = majorityElement(nums);

// Display the result in the console
console.log("The majority element is:", result);