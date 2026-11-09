# JavaScript Practice

JavaScript programs and study material for coding interviews: **arrays, numbers and strings**, plus self-checking cheat sheets, exercises and interview-program guides.

- **82 programs** in `Arrays/`, `Numbers/` and `Strings/`
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
├── Arrays/      54 array programs, grouped by PATTERN (see Arrays/README.md)
│   ├── 01_Single_Pass/          min/max, stocks, majority (n/2 and n/3), missing number, leaders, ...
│   ├── 02_HashMap_Set/          two sum, duplicates, frequency, longest consecutive, top k, intersection
│   ├── 03_Two_Pointers/         three sum, move zeros, rotate, container, merge sorted, sort colors, rain water,
│   │                            find duplicate (fast/slow), next permutation
│   ├── 04_Kadane_Running_Sum/   max subarray sum, max product subarray
│   ├── 05_Searching/            linear, binary, insert position, rotated search, rotated min, first & last
│   ├── 06_Sorting/              bubble, selection, quick, merge, kth largest (quickselect)
│   ├── 07_Compare_By_Index/     two inputs, same position (equality, Hamming, matching)
│   ├── 08_Bit_Manipulation/     Hamming distance on bits
│   ├── 09_Prefix_Sum/           product except self, subarray sum equals k
│   ├── 10_Intervals/            merge intervals
│   ├── 11_Sliding_Window/       max sum of size k (fixed), min size subarray sum (variable)
│   ├── 12_Matrix/               spiral order, rotate image 90°, set matrix zeroes
│   └── 13_Greedy/               jump game
├── Numbers/      9 number programs (factorial, Fibonacci, prime, Armstrong, ...)
├── Strings/     18 string programs + Index.js (programs grouped by technique)
└── practice/    Cheat sheets, exercises, solutions and interview-program guides
    └── README.md / README.pdf / README.docx   Guide to the practice folder
```

---

## How to run

Run any file with `node`, from the repository folder:

```bash
node Arrays/02_HashMap_Set/1_TwoSum_Indices.js
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

Grouped by **pattern**: learn the pattern, and every program in its folder becomes a variation of it. See [Arrays/README.md](Arrays/README.md) for each pattern's clue words and template.

### 01 Single pass: track the best

Clue words: "max / min / largest / count / sum" · Folder: [`Arrays/01_Single_Pass/`](Arrays/01_Single_Pass/)

| # | Program |
|---|---|
| 1 | [Second largest value](Arrays/01_Single_Pass/1_secondLargestValue.js) |
| 2 | [Min & max in an array](Arrays/01_Single_Pass/2_min%26MaxInArray.js) |
| 3 | [Best time to buy and sell stock](Arrays/01_Single_Pass/3_BestTimeToBuyStocks.js) |
| 4 | [Kth missing positive number](Arrays/01_Single_Pass/4_Missing_Positibve_Kth_Number.js) |
| 5 | [Majority element (voting)](Arrays/01_Single_Pass/5_MajorityElement.js) |
| 6 | [Sum of elements](Arrays/01_Single_Pass/6_Sum_Of_ElementsInArray.js) |
| 7 | [Max difference between adjacent values](Arrays/01_Single_Pass/7_maxDiffBWAdjacentValues_Array.js) |
| 8 | [Missing number (0 to n): sum formula and XOR](Arrays/01_Single_Pass/8_MissingNumber.js) |
| 9 | [Leaders in an array](Arrays/01_Single_Pass/9_LeadersInAnArray.js) |
| 10 | [Majority element II (more than n/3)](Arrays/01_Single_Pass/10_MajorityElementII.js) |

### 02 Hash map / Set: remember what you've seen

Clue words: "duplicate / frequency / pair / unique" · Folder: [`Arrays/02_HashMap_Set/`](Arrays/02_HashMap_Set/)

| # | Program |
|---|---|
| 1 | [Two Sum (indices)](Arrays/02_HashMap_Set/1_TwoSum_Indices.js) |
| 2 | [Remove duplicates (unsorted)](Arrays/02_HashMap_Set/2_removeDuplicates_UnSortedArray.js) |
| 3 | [Element frequency](Arrays/02_HashMap_Set/3_ElementFrequency.js) |
| 4 | [Find duplicate elements](Arrays/02_HashMap_Set/4_findDuplictate_Elements_InArray.js) |
| 5 | [Longest consecutive sequence](Arrays/02_HashMap_Set/5_LongestConsecutiveSequence.js) |
| 6 | [Top K frequent elements](Arrays/02_HashMap_Set/6_TopKFrequentElements.js) |
| 7 | [Intersection of two arrays (unique, and with counts)](Arrays/02_HashMap_Set/7_IntersectionOfTwoArrays.js) |

### 03 Two pointers

Clue words: "sorted / in place / reverse / move" · Folder: [`Arrays/03_Two_Pointers/`](Arrays/03_Two_Pointers/)

| # | Program |
|---|---|
| 1 | [Three Sum = 0](Arrays/03_Two_Pointers/1_ThreeSum_0.js) |
| 2 | [Reverse / rotate an array by k](Arrays/03_Two_Pointers/2_reverseArrayByK.js) |
| 3 | [Move zeros to the end](Arrays/03_Two_Pointers/3_MoveZerosToEnd.js) |
| 4 | [Remove duplicates (sorted)](Arrays/03_Two_Pointers/4_removeDuplicates_Sorted.js) |
| 5 | [Container with most water](Arrays/03_Two_Pointers/5_ContainerWithMostWater.js) |
| 6 | [Merge sorted array (two sorted arrays, in place)](Arrays/03_Two_Pointers/6_MergeSortedArray.js) |
| 7 | [Sort colors: 0s, 1s, 2s (Dutch national flag)](Arrays/03_Two_Pointers/7_SortColors.js) |
| 8 | [Trapping rain water](Arrays/03_Two_Pointers/8_TrappingRainWater.js) |
| 9 | [Find the duplicate number (Floyd's fast/slow pointers)](Arrays/03_Two_Pointers/9_FindTheDuplicateNumber.js) |
| 10 | [Next permutation](Arrays/03_Two_Pointers/10_NextPermutation.js) |

### 04 Kadane / running sum

Clue words: "contiguous subarray, max sum" · Folder: [`Arrays/04_Kadane_Running_Sum/`](Arrays/04_Kadane_Running_Sum/)

| # | Program |
|---|---|
| 1 | [Maximum subarray sum](Arrays/04_Kadane_Running_Sum/1_Maximu_Sub_Array_Sum.js) |
| 2 | [Largest subarray (return the subarray)](Arrays/04_Kadane_Running_Sum/2_LargestSubarray_returnArray.js) |
| 3 | [Maximum product subarray](Arrays/04_Kadane_Running_Sum/3_MaximumProductSubarray.js) |

### 05 Searching

Clue words: "find / position", "sorted", "O(log n)" · Folder: [`Arrays/05_Searching/`](Arrays/05_Searching/)

| # | Program |
|---|---|
| 1 | [Search insert position](Arrays/05_Searching/1_search_InsertPosition.js) |
| 2 | [Binary search](Arrays/05_Searching/2_Searching_BinarySearch.js) |
| 3 | [Linear search](Arrays/05_Searching/3_Searching_LinearSearch.js) |
| 4 | [Search in rotated sorted array](Arrays/05_Searching/4_SearchInRotatedSortedArray.js) |
| 5 | [Find minimum in rotated sorted array](Arrays/05_Searching/5_FindMinimumInRotatedSortedArray.js) |
| 6 | [First and last position of an element](Arrays/05_Searching/6_FirstAndLastPosition.js) |

### 06 Sorting

Clue words: "sort without built-ins" · Folder: [`Arrays/06_Sorting/`](Arrays/06_Sorting/)

| # | Program |
|---|---|
| 1 | [Bubble sort](Arrays/06_Sorting/1_BubbleSort.js) |
| 2 | [Selection sort](Arrays/06_Sorting/2_SelectionSort.js) |
| 3 | [Quick sort (divide & conquer)](Arrays/06_Sorting/3_QuickSort.js) |
| 4 | [Merge sort (divide & conquer, stable)](Arrays/06_Sorting/4_MergeSort.js) |
| 5 | [Kth largest element (quickselect)](Arrays/06_Sorting/5_KthLargestElement.js) |

### 07 Compare by index

Clue words: "two arrays/strings, same position" · Folder: [`Arrays/07_Compare_By_Index/`](Arrays/07_Compare_By_Index/)

| # | Program |
|---|---|
| 1 | [Equality of two arrays](Arrays/07_Compare_By_Index/1_equalityOf_2Arays.js) |
| 2 | [Hamming distance (strings)](Arrays/07_Compare_By_Index/2_hammingDistance.js) |
| 3 | [Matching indices](Arrays/07_Compare_By_Index/3_MatchingIndices.js) |

### 08 Bit manipulation

Clue words: "bits / binary / XOR" · Folder: [`Arrays/08_Bit_Manipulation/`](Arrays/08_Bit_Manipulation/)

| # | Program |
|---|---|
| 1 | [Hamming distance (bits)](Arrays/08_Bit_Manipulation/1_Hammingdistance_Bits.js) |

### 09 Prefix sum

Clue words: "subarray sum equals k / range sum / product except self" · Folder: [`Arrays/09_Prefix_Sum/`](Arrays/09_Prefix_Sum/)

| # | Program |
|---|---|
| 1 | [Product of array except self](Arrays/09_Prefix_Sum/1_ProductOfArrayExceptSelf.js) |
| 2 | [Subarray sum equals K](Arrays/09_Prefix_Sum/2_SubarraySumEqualsK.js) |

### 10 Intervals

Clue words: "intervals / meetings / ranges / overlap" · Folder: [`Arrays/10_Intervals/`](Arrays/10_Intervals/)

| # | Program |
|---|---|
| 1 | [Merge intervals](Arrays/10_Intervals/1_MergeIntervals.js) |

### 11 Sliding window

Clue words: "subarray of size k / longest or shortest subarray with ... (positive numbers)" · Folder: [`Arrays/11_Sliding_Window/`](Arrays/11_Sliding_Window/)

| # | Program |
|---|---|
| 1 | [Maximum sum subarray of size K (fixed window)](Arrays/11_Sliding_Window/1_MaxSumSubarrayOfSizeK.js) |
| 2 | [Minimum size subarray sum (variable window)](Arrays/11_Sliding_Window/2_MinSizeSubarraySum.js) |

### 12 Matrix

Clue words: "matrix / grid / 2D array / rotate / spiral" · Folder: [`Arrays/12_Matrix/`](Arrays/12_Matrix/)

| # | Program |
|---|---|
| 1 | [Spiral matrix](Arrays/12_Matrix/1_SpiralMatrix.js) |
| 2 | [Rotate image 90° (in place)](Arrays/12_Matrix/2_RotateImage.js) |
| 3 | [Set matrix zeroes](Arrays/12_Matrix/3_SetMatrixZeroes.js) |

### 13 Greedy

Clue words: "can you reach / minimum jumps / best local choice" · Folder: [`Arrays/13_Greedy/`](Arrays/13_Greedy/)

| # | Program |
|---|---|
| 1 | [Jump game](Arrays/13_Greedy/1_JumpGame.js) |

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
