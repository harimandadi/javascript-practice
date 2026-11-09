# JavaScript Practice

JavaScript programs and study material for coding interviews: **arrays, numbers and strings**, plus self-checking cheat sheets, exercises and interview-program guides.

- **55 programs** in `Arrays/`, `Numbers/` and `Strings/`
- **Study material** in [`practice/`](practice/): cheat sheets, exercises with solutions, 36 interview programs and 32 string programs, with a [guide](practice/README.md) (also as [PDF](practice/README.pdf) and [Word](practice/README.docx))

Only **Node.js** is needed. There is nothing to install.

---

## Contents

1. [Repository structure](#repository-structure)
2. [How to run](#how-to-run)
3. [Arrays](#arrays)
4. [Numbers](#numbers)
5. [Strings](#strings)
6. [Practice: cheat sheets & interview guides](#practice-cheat-sheets--interview-guides)
7. [How to explain a program in an interview](#how-to-explain-a-program-in-an-interview)

---

## Repository structure

```
javascript-practice/
├── Arrays/      27 array programs (searching, sorting, two sum, max subarray, ...)
├── Numbers/      9 number programs (factorial, Fibonacci, prime, Armstrong, ...)
├── Strings/     18 string programs + Index.js (programs grouped by technique)
└── practice/    Cheat sheets, exercises, solutions and interview-program guides
    └── README.md / README.pdf / README.docx   Guide to the practice folder
```

---

## How to run

Run any file with `node`, from the repository folder:

```bash
node Arrays/1_TwoSum_Indices.js
```

Example output:

```
Input Array:   [ 2, 7, 11, 15 ]
Target Sum:    9
Indices Found: [ 0, 1 ]
```

The files in `practice/` check their own answers. For example `node practice/string-programs.js` ends with `All 55 checks passed ✔`.

---

## Arrays

| # | Program | Topic |
|---|---|---|
| 1 | [Two Sum (indices)](Arrays/1_TwoSum_Indices.js) | Hash map |
| 2 | [Three Sum = 0](Arrays/2_ThreeSum_0.js) | Sorting + two pointers |
| 3 | [Second largest value](Arrays/3_secondLargestValue.js) | Single pass |
| 4 | [Min & max in an array](Arrays/4_min%26MaxInArray.js) | Single pass |
| 5 | [Reverse / rotate an array by k](Arrays/5_reverseArrayByK.js) | Rotation |
| 6 | [Move zeros to the end](Arrays/6_MoveZerosToEnd.js) | Two pointers |
| 7 | [Best time to buy and sell stock](Arrays/7_BestTimeToBuyStocks.js) | Track the minimum |
| 8 | [Kth missing positive number](Arrays/8_Missing_Positibve_Kth_Number.js) | Counting |
| 9 | [Remove duplicates (unsorted)](Arrays/9_removeDuplicates_UnSortedArray.js) | Set / hash map |
| 10 | [Remove duplicates (sorted)](Arrays/10_removeDuplicates_Sorted.js) | Two pointers |
| 11 | [Majority element](Arrays/11_MajorityElement.js) | Counting / voting |
| 12 | [Element frequency](Arrays/12_ElementFrequency.js) | Hash map |
| 13 | [Equality of two arrays](Arrays/13_equalityOf_2Arays.js) | Comparison |
| 14 | [Sum of elements](Arrays/14_Sum_Of_ElementsInArray.js) | Reduce / loop |
| 15 | [Search insert position](Arrays/15_search_InsertPosition.js) | Binary search |
| 16 | [Max difference between adjacent values](Arrays/16_maxDiffBWAdjacentValues_Array.js) | Single pass |
| 17 | [Hamming distance](Arrays/17_hammingDistance.js) | Comparison |
| 18 | [Hamming distance (bits)](Arrays/18_Hammingdistance_Bits.js) | Bit manipulation |
| 19 | [Maximum subarray sum](Arrays/19_Maximu_Sub_Array_Sum.js) | Kadane's algorithm |
| 20 | [Largest subarray (return the subarray)](Arrays/20_LargestSubarray_returnArray.js) | Kadane's algorithm |
| 21 | [Find duplicate elements](Arrays/21_findDuplictate_Elements_InArray.js) | Set / hash map |
| 22 | [Binary search](Arrays/22_Searching_BinarySearch.js) | Searching |
| 22 | [Linear search](Arrays/22_Searching_LinearSearch.js) | Searching |
| 24 | [Bubble sort](Arrays/24_BubbleSort.js) | Sorting |
| 25 | [Selection sort](Arrays/25_SelectionSort.js) | Sorting |
| 26 | [Quick sort](Arrays/26_QuickSort.js) | Sorting (divide & conquer) |
| 27 | [Matching indices](Arrays/27_MatchingIndices.js) | Comparison |

---

## Numbers

| # | Program | Topic |
|---|---|---|
| 1 | [Swap two numbers (with and without a third variable)](Numbers/1_Swap_With_WithOut3Rd.js) | Arithmetic / destructuring |
| 2 | [Reverse a number](Numbers/2_reverseNumber.js) | `% 10` and `/ 10` |
| 3 | [Armstrong number or not](Numbers/3_armstrongNumORNot.js) | Digits & powers |
| 4 | [Factorial](Numbers/4_Factorial.js) | Loop / recursion |
| 5 | [Fibonacci numbers](Numbers/5_FibonacciNumber.js) | Loop |
| 6 | [Fibonacci with recursion](Numbers/fib_WithRecursion.js) | Recursion |
| 7 | [Palindrome number](Numbers/6_Palindrome.js) | Reverse & compare |
| 8 | [Prime number or not](Numbers/7_PrimeNumberORnot.js) | Divide up to √n |
| 9 | [Convert to Roman numerals](Numbers/ConvertTORoman.js) | Greedy mapping |

---

## Strings

| # | Program | Topic |
|---|---|---|
| 1 | [Anagram](Strings/1_Anagaram.js) | Frequency counter |
| 2 | [Group anagrams](Strings/2_GroupAnagrams.js) | Hash map |
| 3 | [First non-repeating character](Strings/3_First_Non_RepeatingCharacter.js) | Frequency counter |
| 4 | [Reverse each word in a string](Strings/4_ReverseEachWordInString.js) | String manipulation |
| 5 | [Rotate a string](Strings/5_rotateStrings.js) | String manipulation |
| 5 | [Rotate a string without built-in methods](Strings/5_rotateStringWithOutInbuilt.js) | String manipulation |
| 6 | [String compression](Strings/6_StringCompression.js) | Counting runs |
| 7 | [Truncate a string](Strings/7_truncateTheString.js) | String parsing |
| 8 | [Count words in a string](Strings/8_countWordsInString.js) | String parsing |
| 9 | [Remove junk characters](Strings/9_removeJunkFromString.js) | String cleaning |
| 10 | [Reverse vowels](Strings/10_ReverseOvels.js) | Two pointers |
| 10 | [Replace vowels with X](Strings/10_replaceVowelsWithX.js) | String cleaning |
| 11 | [Longest substring without repeating characters](Strings/11_LongestSubString.js) | Sliding window |
| 12 | [Valid parentheses](Strings/12_Valid_parathesis.js) | Stack |
| 13 | [Pangram check](Strings/13_PanagramCheck.js) | Set / frequency |
| 14 | [Longest common prefix](Strings/14_LongestCommonPrefix.js) | Comparison |
| 15 | [Valid palindrome (alphanumeric)](Strings/15_ValidPalindrome_AlphaNum.js) | Two pointers |
| 16 | [Find all indices of a target character](Strings/16_find_all_Indices_TragetChar.js) | Searching |

### Strings by technique
(from [`Strings/Index.js`](Strings/Index.js))

| Technique | Programs |
|---|---|
| **Two pointers** | Valid palindrome, reverse vowels |
| **Hash maps / frequency counters** | Anagram, first non-repeating character, group anagrams |
| **Sliding window** | Longest substring without repeating characters |
| **Stack** | Valid parentheses |
| **String manipulation** | Reverse each word, rotate string, string compression |
| **Parsing & cleaning** | Remove junk, truncate, count words, replace vowels |

---

## Practice: cheat sheets & interview guides

The [`practice/`](practice/) folder holds self-checking study files: run one and every example is verified (✔).

| File | What's inside | Result |
|---|---|---|
| [array-methods-cheatsheet.js](practice/array-methods-cheatsheet.js) | forEach, map, filter, reduce, some, every, slice, splice, shift, unshift: arguments, returns, traps | 90 checks ✔ |
| [arrays-and-objects-cheatsheet.js](practice/arrays-and-objects-cheatsheet.js) | All other array methods, every object operation, arrays of objects | 165 checks ✔ |
| [string-methods-cheatsheet.js](practice/string-methods-cheatsheet.js) | Every built-in string method | 116 checks ✔ |
| [js-interview-programs.js](practice/js-interview-programs.js) | 36 interview programs with "Remember" and "Explain" notes | 87 checks ✔ |
| [string-programs.js](practice/string-programs.js) | 32 string programs, each with a built-in AND a loop version | 55 checks ✔ |
| [array-methods-exercises.js](practice/array-methods-exercises.js) + [solutions](practice/array-methods-solutions.js) | 20 exercises | |
| [arrays-and-objects-exercises.js](practice/arrays-and-objects-exercises.js) + [solutions](practice/arrays-and-objects-solutions.js) | 22 exercises | |

The full guide to this folder (sections, memory hooks, quick reference tables, study plan) is in [practice/README.md](practice/README.md), and also as [PDF](practice/README.pdf) and [Word](practice/README.docx).

---

## How to explain a program in an interview

Use **R-A-C-E-S**:

| Step | What to do |
|---|---|
| **R**estate | Repeat the problem with an example; ask about empty input and edge cases |
| **A**pproach | Say the idea in one sentence before coding (for example *"a hash map of value → index"*) |
| **C**ode | Write a clean version; offer a version without built-in methods if asked |
| **E**dge cases | Empty input, one element, duplicates, negative numbers, upper/lower case |
| **S**peed | Time and space complexity: O(n) one pass, O(n log n) sorting, O(n²) nested loops |

**Common patterns worth knowing**

| Pattern | Use it for | Examples here |
|---|---|---|
| Hash map / Set | Fast lookup, counting, duplicates | Two sum, frequency, anagrams, duplicates |
| Two pointers | Sorted arrays, palindromes, in-place moves | Three sum, move zeros, valid palindrome |
| Sliding window | Longest/shortest substring or subarray | Longest substring without repeats |
| Kadane's algorithm | Maximum subarray sum | Max subarray, largest subarray |
| Binary search | Sorted data, O(log n) | Binary search, search insert position |
| Stack | Matching pairs, "last in, first out" | Valid parentheses |
| Recursion | Problems defined by smaller versions | Factorial, Fibonacci, quick sort |
