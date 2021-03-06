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
Interview prepping for software engineering roles can be pretty daunting. Sometimes the Leetcode discussion board can be great, and other times maybe a more thorough dive into problems is needed. That is why I decided to start creating walkthroughs of interesting algorithmic challenges I come across, and hopefully help others along the way. 

In this article, I'll go over one of the most interesting problems I've come across so far: [Leetcode #1011](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/). Let's get right into it! 

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

 To further elaborate, if we were to try another possible combination of splitting the array into 3 subarrays such as `[3, 2, 2], [4, 1], and [4]`, the minimum capacity needed would be 7, which is greater than the previous capacity needed. Remember, the goal is to find the **minimum** capacity needed. 

## Tackling the Problem

It can be a bit tricky getting started on this problem. The first time I encountered this style of problem, I was absolutely stumped. What helped me get the gears rolling was thinking of the worst and the best case scenarios.

```markdown
weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

Given this example, without a requirement for D days, we can try to think of what the worst and best case scenarios. The best case scenario (or the minimum capacity needed for any `D` value), is if `D = weights.length`. That is, split the `weights` array into `weights.length` number of subarrays, where each subarray contains only one value. After all, it'd be impossible to get less than one value per subarray. So what would be the minimum capacity needed if we were to do that? Well, it would be the maximum value found within the array, which in this case is 10.  

Now, with the worst case scenario, we'd have to split the array into one array, or in other words, not split the array at all. In that case, the minimum capacity would simply be the sum of all values `54 = 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10`.  

What you'll notice now is that we now have an effective *range* of possible capacities to work with. When the array is split into the most possible subarrays, the capacity will be the maximum value found in the array and when the array is simply split into 1, the capacity will be the sum of all its values. Therefore all other possible answers should fall **somewhere in between**. 

Starting to sound more manageable? Before we move on, let's get that coded up.

```javascript
function minimumCapacityWithinDDays (weights, D) {
  let min = Math.max(...weights)
  let max = weights.reduce((acc, curr) => acc + curr)
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
  let min = Math.max(...weights)
  let max = weights.reduce((acc, curr) => acc + curr)
  
  for (let i = min; i <= max; i++) {
    const daysAtThisCapacity = findDaysAtThisCapacity(weights, i);
    if (daysAtThisCapacity === D) {
      // since we are iterating in increasing order, we can return the first value we find as it will be the min
      return i
    }
  }
}
```

In the above code, we: 

1. We iterate through every possible capacity from the minimum to the maximum values.
2. Used a helper function that takes in the `weights` array and the current capacity, iterates through the array, sums up the weights, increments the amount of days needed whenever the weight reaches the capacity, and returns the amount of days needed.
3. Once we find the first possible capacity that outputs the same amount of days as `D`, we immediately return that capacity.

## Optimizing the Solution

At this point, the solution is done and will pass the required tests. However, this isn't the most optimal solution. We currently have an O(N^2) solution as we iterate through every possible capacity, and iterate through every possible weight for each of those capacities. I bet we can do better than that. 

Since we have a sorted range of capacities from our `min` and `max` that we pre-processed, we can then turn this into a modified binary search problem. To do so, just modify your code to the following: 

```javascript
// keep our helper function the same
function findDaysAtThisCapacity(weights, capacity) {
  let currentSum = 0;
  let days = 1; 
  for (let weight of weights) {
     currentSum += weight
     if (currentSum > capacity) {
       days++;
       currentSum = weight;
     }
  }
  return days
}

function minimumCapacityWithinDDays (weights, D) {
  let min = Math.max(...weights);
  let max = weights.reduce((acc, curr) => acc + curr);
  // using binary search as opposed to iterating through entire range
  while (min < max) {
    const mid = Math.floor((min + max) / 2);
    
    const daysAtThisCapacity = findDaysAtThisCapacity(weights, mid);
    if (daysAtThisCapacity > D) {
      // not enough capacity so we'll have to move our range to the right
      min = mid + 1
    } else {
      // we have either found a sufficient capacity and still need to check if it's the minimum possible value
      // or we have too much capacity currently
      max = mid
    }
  }
  // our max value will fall upon the correct solution after searching
  return max
}
```

Let's recap that: 

1. We replaced our initial `for` loop with a while loop and implemented a modified binary search in its place.
2. For each `mid` value, we are still checking to see if the capacity is sufficient enough.
3. You might notice that there is no `===` check in the binary search as there normally is. That is because even though we might have found a sufficient enough capacity that allows us to fit the packages into `D` days, we don't know whether it's the minimum possible value. That is why we then move our rightward boundary to the current capacity, `mid`, as opposed to `mid - 1` like you would a normal binary search. If it is the minimum possible value, the leftward pointer, `min`, would then continue to increase until the loop breaks.
4. Then we simply return our `max` pointer which will be the correct solution.

## Time and Space Complexity

After optimizing the solution using binary search, we've come to a time complexity of O(logN * N), which is an improvement on the previous O(N^2) solution. In addition, not using any additional space results in a most optimal space complexity of O(1).