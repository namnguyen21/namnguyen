---
layout: blog
title: "Leetcode #1011: Capacity to Ship Packages Within D Days"
description: Learn how to use binary search to optimize your algorithm for
  determining the minimum capacity held within a subarray. This method is
  applicable to many algorithmic interview questions out there on platforms like
  Leetcode and Codesignal.
date: 2021-03-05T17:56:21.520Z
thumbnail: /images/uploads/leetcode-1011.png
table of contents:
  - display: The Problem
    id: the-problem
  - display: Tackling the Problem
    id: tackling-the-problem
  - display: Time and Space Complexity
    id: time-and-space-complexity
---
Interview prepping for software engineering roles can be pretty daunting. Platforms, such as [Leetcode](https://leetcode.com) and [codewars](https://www.codewars.com/), offer excellent means of practicing technical interview questions.  Sometimes the discussion boards on those sites can be great, and other times maybe a more thorough dive into problems is needed. That is why I decided to start creating walkthroughs of interesting algorithmic challenges I come across, and hopefully help others along the way. 

In this article, I'll go over one of the most interesting problems I've come across so far: [Leetcode #1011](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/). Let's get right into it! 

## The Problem <a id="the-problem"></a>

![Leetcode #1011](/images/uploads/screen-shot-2021-03-05-at-10.42.33-am.png "Leetcode #1011")

Simplified, this question is asking us to take an array `weights`, split the array into `D` number of segments in a way such that the segment with the largest sum relative to its counterparts is the minimum possible value, and return that minimum possible value. Perhaps an example would be even better for understanding.

```markdown
weights = [3,2,2,4,1,4]
D = 3

Answer: 6

Explanation: 
We can split the array into 3 segments: 
1. [3, 2]
2. [2, 4] -> minimum capacity needed
3. [1, 4] 
```

To further elaborate, if we were to try another possible combination of splitting the array into 3 subarrays such as `[3, 2, 2], [4, 1], and [4]`, the capacity needed would be 7, which is greater than the previous capacity needed. Remember, the goal is to find the **minimum** capacity needed. 

## Tackling the Problem <a id="tackling-the-problem"></a>

It can be a bit tricky getting started on this problem. The first time I encountered this style of problem, I was absolutely stumped. What helped me get the gears rolling was thinking of the worst and the best case scenarios.

```markdown
weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

Given this example, without a requirement for `D` days, we can try to think of what the worst and best case scenarios. The best case scenario (or the smallest minimum capacity needed for any `D` value), is if `D = weights.length`. That is, if the `weights` array was split into `weights.length` number of subarrays, where each subarray contains only one value. After all, it'd be impossible to get less than one value per subarray. So what would be the minimum capacity needed if we were to do that? Well, it would be the maximum value found within the array, which in this case is 10.  

With the worst case scenario, we'll have to split the array into one array, or in other words, not split the array at all. In that case, the minimum capacity needed would be the sum of all its values `1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 = 55`.  

What you'll notice now is that we have an effective *range,* from 10 to 55 in this example, of possible capacities to work with. When the array is split into the most possible subarrays (the length of the array), the capacity will be the single maximum value found in the array and when the array is simply split into one, the capacity will be the sum of all its values. Therefore all other possible answers should fall **somewhere in between**. 

Starting to sound more manageable? Before we move on, let's get that coded up.

```javascript
function shipWithinDays (weights, D) {
  // min variable will hold the maximum value found in weights
  let min = Number.MIN_SAFE_INTEGER;
  // max variable will hold the sum of all values
  let max = 0;
  for (let weight of weights) {
    min = Math.max(min, weight);
    max += weight;
  }
}
```

### Now What?

We now know that our solution will fall within a range of values. Any time we're presented with a sorted array of values, or in this case a range, binary search has to come to mind. With an O(log n) run time, binary search is incredibly useful and efficient. 

```javascript
function shipWithinDays (weights, D) {
  let min = Number.MIN_SAFE_INTEGER;
  let max = 0;
  for (let weight of weights) {
    min = Math.max(min, weight);
    max += weight;
  }
  
  while (min < max) {
    // storing the current middle value in currentCapacity
    const currentCapacity = Math.floor((min + max) / 2);
    // do something
  }
}
```

With that in mind, we'll need to check for *something* at every step of the binary search. Given that there is currently a range of potential capacity values, we'll need to check whether any given capacity allows the packages to be shipped in D days. Then find the minimum of those values. For that, a modified binary search will be needed.

```javascript
// new helper function to loop through the weights array
// and determine the days needed to ship packages at a certain capacity
function determineDaysBasedOnCapacity(weights, capacity) {
  // it will take at the minimum 1 day to ship
  let days = 1;
  let sum = 0;
  for (let weight of weights) {
    sum += weight;
    // if the weight goes over capacity
    if (sum > capacity) {
      // we'll need to increment days
      days++;
      // and move the current weight to the next day
      sum = weight
    }
  }
    return days;
}

function shipWithinDays (weights, D) {
  let min = Number.MIN_SAFE_INTEGER;
  let max = 0;
  for (let weight of weights) {
    min = Math.max(min, weight);
    max += weight;
  }
  
  while (min < max) {
    const currentCapacity = Math.floor((min + max) / 2);
    const daysAtThisCapacity = determineDaysBasedOnCapacity(weights, currentCapacity);
    
    if (daysAtThisCapacity > D) {
      min = currentCapacity + 1;
    } else {
      max = currentCapacity;
    }
  }
  return max
}
```

Let's break that down. 

1. A helper function was created that takes in the `weights` array and a specific capacity value as parameters. It then iterates through the array and determines how many days it would take to ship all the packages given the current capacity constraint. At a minimum, it takes at least one day to ship so therefore the value is set to `1` to begin with.
2. That function is called within the binary search and the return value is stored to `daysAtThisCapacity`.
3. Similar to a normal binary search, that value is then compared to see if it is greater than `D`. When it is greater than, that means that there is not enough capacity which results in a greater amount of days to ship. Therefore, the `min` boundary needs to shift.
4. The `else` comparison is inclusive of both situations in which there is currently too much capacity and can ship in **less** days than `D` **OR** if the capacity is sufficient to ship within `D` days and we aren't sure if it is the minimum value possible. 
5. Therefore, instead of setting `max = currentCapacity - 1` like you would a normal binary search, we set `max = currentCapacity`, because there is the possibility that the currentCapacity is the solution to the problem. 
6. Following this logic, if and when `currentCapacity` is the right answer and the minimum capacity needed, the `min` pointer will continue increasing until the loop breaks and we simply return the `max` value. 

## Time and Space Complexity <a id="time-and-space-complexity"></a>

To determine the time complexity of this solution, a breakdown of the function(s) is needed. 

1. Our main `shipWithinDays` function first iterates once through the `weights` array to determine define the `min` and `max` variables. At the very least, this will be an O(N) solution where "N" is the length of the `weights` array.
2. Binary search was then implemented. This results in an O(N + logM) run time where "M" is the range between our `min` and `max` values. 
3. Within the binary search, the `determineDaysBasedOnCapacity` function is called, which iterates through the `weights` array. This results in an O(N + logM \* N) run time where "log M \* N" represents iterating through the `weights` array at each step of the binary search.

Therefore our end time complexity is O(N + logM \* N). In simplified Big-O notation, this would boil down to a O(n \* log n) solution as the solution's runtime is bounded by the larger value. In addition, this solution does not use any extra space and results in an O(1) space complexity.