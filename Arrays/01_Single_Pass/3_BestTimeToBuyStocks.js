/**
 * Best Time to Buy and Sell Stock   (LeetCode 121)
 * ═════════════════════════════════════════════════════════════════════════════
 * Question : prices[i] = stock price on day i. Buy ONCE, then sell ONCE on a LATER day.
 *            Return the maximum profit (0 if no profit is possible).
 *
 *   Input : [7, 1, 5, 3, 6, 4]   → Output: 5   (buy on day 1 at 1, sell on day 4 at 6)
 *   Input : [7, 6, 4, 3, 1]      → Output: 0   (prices only fall → don't trade)
 *
 * MEMORY
 *   Brute force: "Every BUY day × every later SELL day, keep the best."
 *   One pass   : "Remember the CHEAPEST day so far; sell TODAY at that price."
 *
 * COST
 *   Brute force: O(n²) time, O(1) space
 *   One pass   : O(n) time,  O(1) space   ← the answer for this folder (01_Single_Pass)
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ── 1. BRUTE FORCE: O(n²) ─────────────────────────────────────────────────────
//   STEP 1 → outer loop picks the BUY day (i)
//   STEP 2 → inner loop picks every later SELL day (j); keep the biggest profit
function maxProfit1(prices) {
  let globalProfit = 0;                              // best profit so far (0 = "don't trade")

  // STEP 1: pick the BUY day
  for (let i = 0; i < prices.length - 1; i++) {      // stop one early: the last day has no later day to sell

    // STEP 2: try every SELL day after it
    for (let j = i + 1; j < prices.length; j++) {    // j starts at i + 1 → you can't sell before buying
      const currentProfit = prices[j] - prices[i];   // sell price − buy price

      if (currentProfit > globalProfit) {            // better than the best so far?
        globalProfit = currentProfit;                //   → remember it
      }
    }
  }

  return globalProfit;                               // best of all buy/sell pairs
}

/*
 * EVERY ITERATION (brute force) for [7, 1, 5, 3, 6, 4]
 *   index: 0:7  1:1  2:5  3:3  4:6  5:4      start: globalProfit = 0
 *
 *   BUY day i (price) | SELL days j → profit (prices[j] − prices[i])   | best after this row
 *   ------------------|---------------------------------------------------|--------------------
 *   0 (7)             | 1: −6 · 2: −2 · 3: −4 · 4: −1 · 5: −3             | 0  (never profitable)
 *   1 (1)             | 2: 4* · 3: 2 · 4: 5* · 5: 3                       | 5  ✅
 *   2 (5)             | 3: −2 · 4: 1 · 5: −1                              | 5
 *   3 (3)             | 4: 3 · 5: 1                                       | 5
 *   4 (6)             | 5: −2                                             | 5
 *
 *   * = new best. Answer 5 (buy day 1 at 1, sell day 4 at 6)
 *   Count: 5 + 4 + 3 + 2 + 1 = 15 pairs checked → O(n²)
 */

// ── 2. ONE PASS: O(n) ─────────────────────────────────────────────────────────
//   STEP 1 → walk the days once, keeping the LOWEST price seen so far (best day to have bought)
//   STEP 2 → for each day: profit if sold TODAY = price − lowest; keep the best
function maxProfit(prices) {
  let minPrice = Infinity;                           // cheapest buy price seen so far (none yet)
  let maxProfit = 0;                                 // best profit so far

  for (const price of prices) {                      // walk each day ONCE
    if (price < minPrice) {
      minPrice = price;                              // STEP 1: a cheaper day to buy
    } else if (price - minPrice > maxProfit) {
      maxProfit = price - minPrice;                  // STEP 2: selling today beats the best so far
    }
  }

  return maxProfit;
}

/*
 * EVERY ITERATION (one pass) for [7, 1, 5, 3, 6, 4]
 *
 *   day | price | cheaper than minPrice? | minPrice | profit if sold today | maxProfit
 *   ----|-------|------------------------|----------|----------------------|----------
 *    0  |   7   | yes (vs ∞)             |    7*    |  –                   |    0
 *    1  |   1   | yes                    |    1*    |  –                   |    0
 *    2  |   5   | no                     |    1     |  5 − 1 = 4           |    4*
 *    3  |   3   | no                     |    1     |  3 − 1 = 2           |    4
 *    4  |   6   | no                     |    1     |  6 − 1 = 5           |    5*  ✅
 *    5  |   4   | no                     |    1     |  4 − 1 = 3           |    5
 *
 *   * = updated. Answer 5 in 6 steps (instead of 15 pairs) → O(n)
 *
 * TWO TRAPS
 *   1. Start profit at 0, not the first difference: if prices only fall ([7, 6, 4, 3, 1])
 *      the answer is 0 (don't trade), never negative.
 *   2. Buy BEFORE selling: brute force uses j = i + 1; one pass only compares with minPrice
 *      from EARLIER days.
 *
 * INTERVIEW LINE
 *   "Brute force tries every buy day with every later sell day: O(n²). In one pass I keep the
 *    lowest price seen so far as the best buy, and on each day I check the profit of selling
 *    today: O(n) time and O(1) space. Starting the profit at 0 handles falling prices."
 */

// --- Method Call & Execution ---
const prices = [7, 1, 5, 3, 6, 4];
const result = maxProfit1(prices);

console.log("The maximum profit is:", result);
// Output: The maximum profit is: 5

// --- More checks (one-pass version) ---
console.log('One pass    :', maxProfit(prices));             // 5
console.log('Falling     :', maxProfit([7, 6, 4, 3, 1]));    // 0 (don't trade)
console.log('One day     :', maxProfit([5]));                // 0 (nothing to sell)
