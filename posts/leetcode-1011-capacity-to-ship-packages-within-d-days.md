---
layout: blog
title: "Leetcode #1011: Capacity to Ship Packages Within D Days"
description: Learn how to use binary search to optimize your algorithm for
  determining the minimum capacity held within a subarray. This method is
  applicable to many algorithmic interview questions out there on platforms like
  Leetcode and Codesignal.
date: 2021-03-05T17:56:21.520Z
thumbnail: /images/uploads/leetcode-1011.png
---
Something I've learned thus over the years is that often times, the best method to understanding a concept is by teaching it. Being able to reiterate information can be a valuable tool. As such, follow me in my journey of learning data structures and algorithms. 

In this article, I'll go over one of the most interesting problems I've come across so far is [Leetcode #1011](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/). Let's get right into it! 

## The Problem

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

 To further elaborate, if we were to try all possible combinations of splitting the array into 3 subarrays such as `[3, 2, 2], [4, 1], and [4]`, the capacity needed here is 7, which is greater than the previous capacity needed. Remember, we're trying to find the minimum capacity needed. 

## Tackling the Problem

It can be a bit tricky getting started on this problem. My first time encountering this style of problem, I was absolutely stumped. What helped me get the gears rolling was thinking of the worst and the best case scenarios. 

```markdown
weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

Given this example, without a requirement for D days, we can try to think of what the worst and best case scenarios. The best case scenario (or worst, depending on how you think of it), is if D = 1. That is, split the array into 1 array. Well in that case, the minimum capacity would simply be the sum of all values `54 = 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10`. 

Now, with the worst case scenario, we'd have to split the array into 10 subarrays (or length of the array). After all, it'd be impossible to get less than one value per subarray. So what would be the minimum capacity needed if we were to do that? Well, it would be the maximum value found within the array, which in this case is 10.  

What you'll notice now is that we now have an effective *range* of possible capacities to work with. When the array is split into the most possible subarrays, the capacity will be the maximum value found in the array and when the array is simply split into 1, the capacity will be the sum of all its values. Therefore all other possible answers should fall **somewhere in between**. 

Starting to sound more manageable? Before we move on, let's get that coded up.

```javascript
function minimumCapacityWithinDDays (weights, D) {
  const min = Math.max(...weights)
  const max = weights.reduce((acc, curr) => acc + curr)
}
```

### Now What? 

Now that we have a working range of possible capacities that we know the solution falls within, we can iterate through that range and try to find which minimum value solves the problem. 

The next part is determining what we want to be checking at every step of the way. Since we have a range of capacities, we'll need to check to check each capacity to see how many days it would take to ship all packages, compare that to `D`, and return the minimum capacity that fits.

```javascript
function findDaysAtThisCapacity(weights, capacity) {
  let currentSum = 0;
  let days = 1; // it will take at the very least 1 day
  for (let weight of weights) {
     currentSum += weight
    // once the sum is over the capacity, we'll need an additional day
     if (currentSum > capacity) {
       days++;
       // this current weight doesn't fit so we'll allot it to the next day
       currentSum = weight;
     }
  }
  return days
}

function minimumCapacityWithinDDays (weights, D) {
  const min = Math.max(...weights)
  const max = weights.reduce((acc, curr) => acc + curr)
  // value we will return
  let minimumCapacity = Number.MAX_SAFE_INTEGER;
  for (let i = min; i <= max; i++) {
    const daysAtThisCapacity = findDaysAtThisCapacity(weights, i);
    if (daysAtThisCapacity === D) {
      // since we are iterating in increasing order, we can return the first value we find as it will be the min
      return i
    }
  }
}
```