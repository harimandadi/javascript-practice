// Brute Force Solution
function maxProfit1(prices) {
    // Initialize global profit tracker to 0 (no profit made yet)
    let globalProfit = 0;

    // Outer loop: picks each day as the potential buying day (from index 0 up to the second-to-last day)
    for (let i = 0; i < prices.length - 1; i++) {
        
        // Inner loop: picks each subsequent day as the potential selling day (from the day after 'i' to the end)
        for (let j = i + 1; j < prices.length; j++) {
            
            // Calculate the profit for buying on day i and selling on day j
            const currentProfit = prices[j] - prices[i];

            // If the current profit is greater than our recorded global profit, update it
            if (currentProfit > globalProfit) {
                globalProfit = currentProfit;
            }
        }
    }

    // Return the maximum profit found across all possible pair combinations
    return globalProfit;
}

// --- Method Call & Execution ---
const prices = [7, 1, 5, 3, 6, 4];
const result = maxProfit1(prices);

console.log("The maximum profit is:", result);
// Output: The maximum profit is: 5