---
“draft”: true
layout: blog
title: Dynamic Programming 101
description: ""
date: 2021-03-17T20:19:13.002Z
---
Dynamic programming can be a pretty scary topic for new developers looking to improve their algorithm skills. Just the words "dynamic programming" used to turn me off from a problem and would send me in a spiral of self-doubt, questioning whether I was smart enough. 

Through time and practice, I was able to gradually improve at dynamic programming by being able to recognize patterns and approaching problems through different angles. This article will go over some of the approaches I've used to improve my skills and cover a couple example problems to better demonstrate the type of thinking required in this type problem. First, we need to understand what dynamic programming even is. 

## What is Dynamic Programming?

As scary as the name might seem, the concept itself is pretty simple and describes an approach to problem solving. At its core, dynamic programming is the methodology of breaking a large problem into smaller sub-problems and using the solutions to those smaller sub-problems to solve the larger one. The most classic example of dynamic programming at work is the Fibonacci sequence. 

Speaking of the Fibonacci sequence, how can we determine what the 4th value in the Fibonacci sequence is? If you're familiar with the sequence itself, all you have to really memorize is the first two values of the sequence: `0, 1`. From there on, the `nth` value is simply the sum of the two previous values. So to find the 4th value, we must find the third value, which is `0 + 1 = 1`. The fourth value is then `1 + 1 = 2`. By breaking down the problem into more manageable sub problems and working from the very beginning, we are able to eventually reach the solution of our main problem.

## Identifying Dynamic Programming Questions

The first step in any algorithm is identifying the problem and potential solutions. As mentioned above, dynamic programming is useful in solving problems that contain sub-problems. So ask yourself, "can this problem be broken down into smaller, similar chunks?" If so, it's able to be solved using dynamic programming. 

To better understand, I'll be covering possible solutions to [Leetcode #377: Combination Sum IV](https://leetcode.com/problems/combination-sum-iv/). 

![Problem statement for Leetcode #377: Combination Sum IV](/images/uploads/screen-shot-2021-03-17-at-3.44.48-pm.png "Problem statement for Leetcode #377: Combination Sum IV")

## Approaching DP Problems

When it comes to dynamic programming, there are two ways to go about tackling a problem: **top-down** and **bottom-up**. For many problems, like this example, it is easier to first take a top-down approach and then optimize the solution using the bottom-up method.

### Top-Down Approach

Often times, a top-down approach is the more intuitive of the two. Coding aside, how would you solve this problem? Personally, I would take the target, 4, and start subtracting possible values within `nums`. That is, `4 - 1 = 3`. Now that I'm at `3`, `3 - 1 = 2`, and then `2 - 2 = 0`. I just found one possible combination. Remember, the goal is to find all possible combinations. Therefore using that logic, I'd repeat for various values found within `nums`.  That line of thinking where we are working from the target down, is considered top-down. 

Before trying to implement that logic into code, it might be best to look at a diagram to see what we're trying to do. 

![Combination sum tree diagram](/images/uploads/combination-sum-diagram.png "Combination sum tree diagram")

The diagram illustrates a top-down approach where we start with the target value, 4, and subtract from it all of the values in the `nums` array. Then from all of those possible solutions, we repeat the same process with those new values until we hit 0, which is the goal, or the value eventually becomes negative which means it isn't possible.

From looking at the diagram, you might be able to tell that this problem can be solved recursively using the top-down approach. That's because top-down dynamic programming and recursion are like peanut butter and jelly. Let's code that up.

```javascript
function findWaysToSum(nums, target){
  if (target === 0) return 1; // we found 1 way to sum up values
  if (target < 0) return 0; 
  
  let count = 0;
  
  for (let num of nums){
    const diff = target - num;
    // recursively call function using new target value
    const numOfWays = findWaysToSum(nums, diff);
    count += numOfWays;
  }
  
  return count
}

function main(nums, target) {
  return findWaysToSum(nums, target)
}
```

In the code above, we: 

1. Created a recursive function that takes in the `nums` array and a `target` value.
2. Created base cases for the recursive function. If the target is zero, that means we have found one way to sum up the values. If the target is negative, that means there is no way to sum up values adding up to the desired value.
3. Iterate through the values within `nums.`
4. Recursively call our function with a new target value derived from subtracting values of `nums` from our previous target.
5. Return the count of all possible ways.

This solution works, but it is slow and takes up a lot of memory. ***A lot*** of time and memory. In an interview setting, this would be your *brute* force solution. Going back to the diagram above, we can see that for every new `target` value, we create `nums.length` amount of recursive calls. This is a very expensive function to run. To be exact, this current solution runs in O(m^n) time where "m" is the number of values found in `nums` and "n" is `target`. In addition, because this is a recursive solution, the space complexity is also O(m^n) due the the size of the call stack retaining all of the recursive functions.

## Optimizing Our Recursive, Top-Down Approach Using Memoization

Memoization might seem like a big word, but it's a simple concept. To understand the need for memoization and how it works, it's best to re-examine the diagram. 

![Combination sum tree diagram highlighting redundancies](/images/uploads/combination-sum-diagram-memo.png "Combination sum tree diagram highlighting redundancies")

In this edited version of our previous diagram, I highlighted redundancies within our solution. In the current solution, we are evaluating certain sub-problems more than once, specifically the sub-problems there `target = 2 and target = 1`. Memoization solves this problem by storing previously solved values. For instance, the first time the function solves `target = 2`, it will store the solution to that sub-problem. Then the next time it comes across `target = 2`, it no longer has to run the whole problem and instead just returns the cached value. 

To memoize our current recursive function, we can adjust our code to the following:

```javascript
function findWaysToSum(nums, target, memo){
  // check our hash map to see if we've encountered this sub-problem before
  if (memo.has(target)) return memo.get(target)
  if (target === 0) return 1; // we found 1 way to sum up values
  if (target < 0) return 0; 
  
  let count = 0;
  
  for (let num of nums){
    const diff = target - num;
    // recursively call function using new target value
    const numOfWays = findWaysToSum(nums, diff, memo);
    // store the solution to this current sub-problem in hash map
    memo.set(diff, numOfWays);
    count += numOfWays;
  }
  
  return count
}

function main(nums, target) {
  // use a hash map to cache solution to solved sub-problems
  // and pass to our recursive function
  const memo = new Map();
  return findWaysToSum(nums, target, memo)
}
```

To summarize the changes:

1. A hash map was created that is in charge of storing solutions to solved sub-problems.
2. That hash map is continuously passed through the recursive function so that the function can access it.
3. The function checks the hash map whether it has a cached value for the current target.
4. The function stores any solved sub-problems' solutions in the hash map for future reference.

With the added memoization, our diagram will look much more manageable.

![Combination sum diagram after implementing memoization](/images/uploads/combination-sum-diagram-final.png "Combination sum diagram after implementing memoization")

As you can see, the middle and right sub-trees no longer have to be executed to the same extent they previously were because the solutions to those sub-trees have already been solved and effectively memoized. The solution is now much more acceptable and doesn't require an abundance of time and space to run.