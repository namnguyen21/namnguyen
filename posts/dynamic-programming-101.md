---
“draft”: true
layout: blog
title: "Dynamic Programming: Scary as it Sounds?"
description: Dynamic programming is a mouthful but in practice, it's not as
  scary as it sounds. Improve your dynamic programming skills by following a
  4-step guide to solving complex problems.
date: 2021-03-17T20:19:13.002Z
thumbnail: /images/uploads/dp.png
table of contents:
  - display: What is Dynamic Programming?
    id: what-is-dynamic-programming
  - display: Identifying Dynamic Programming Questions
    id: identifying-dynamic-programming-questions
  - display: Approaching DP Problems
    id: approaching-dp-problems
  - display: Top-Down Approach
    id: top-down-approach
  - display: Optimizing Top-Down Approach Using Memoization
    id: optimizing-top-down-approach-using-memoization
  - display: Bottom-Up Approach
    id: bottom-up-approach
  - display: Replacing Tables With Constant Variables
    id: replacing-tables-with-constant-variables
  - display: Recap
    id: recap
  - display: Resources
    id: resources
---
Dynamic programming can be a pretty scary topic for new developers looking to improve their algorithmic skills. Just the words "dynamic programming" used to turn me off from a problem and would send me in a spiral of self doubt. 

Through time and practice, I was able to gradually improve at dynamic programming by being able to recognize patterns and approaching problems through different angles. This article will go over some of the keys to approaching dynamic programming problems that I've picked up through my studies. First, we need to understand what dynamic programming even is. 

## What is Dynamic Programming?

As complex as the name might make it seem, the concept itself is pretty simple and describes an approach to problem solving. At its core, dynamic programming is the methodology of breaking a large problem into smaller sub-problems and using the solutions to those smaller sub-problems to solve the larger one. The most classic example of dynamic programming at work is the Fibonacci sequence. 

Speaking of the Fibonacci sequence, how can we determine what the 4th value in the Fibonacci sequence is? If you're familiar with the sequence itself, all you have to really know is the first two values of the sequence: `0, 1`. From there on, the `nth` value is simply the sum of the two previous values. So to find the 4th value, we must find the third value, which is `0 + 1 = 1`. The fourth value is then `1 + 1 = 2`. By breaking down the problem into more manageable sub problems and working from the very beginning, we are able to eventually reach the solution of our main problem.

## Identifying Dynamic Programming Questions

The first step in any algorithm is identifying the problem and potential solutions. As mentioned above, dynamic programming is useful in solving problems that contain sub-problems. So ask yourself, "can this problem be broken down into smaller, similar chunks?" If so, it's able to be solved using dynamic programming. 

To better understand, I'll be covering possible solutions to [Leetcode #377: Combination Sum IV](https://leetcode.com/problems/combination-sum-iv/). 

![Problem statement for Leetcode #377: Combination Sum IV](/images/uploads/screen-shot-2021-03-17-at-3.44.48-pm.png "Problem statement for Leetcode #377: Combination Sum IV")

## Approaching DP Problems

When it comes to dynamic programming, there are two ways to go about tackling a problem: **top-down** and **bottom-up**. For many problems, like this example, it is easier to first take a top-down approach and then optimize the solution using the bottom-up method.

### Top-Down Approach

The top-down approach is often the more intuitive of the two. Coding aside, how would you solve this problem? Personally, I would take the target, four, and start subtracting from it the possible values within `nums`. That is, `4 - 1 = 3`. Now that I'm at `3`, `3 - 1 = 2`, and then `2 - 2 = 0`. I just found one possible combination: `1, 2, 1`. Remember, the goal is to find all possible combinations. Therefore using that logic, I'd repeat for various values found within `nums`.  That line of thinking where we are working from some end result backwards is considered top-down. 

Before trying to implement that logic into code, it might be best to look at a diagram to see what we're trying to do. 

![Combination sum tree diagram](/images/uploads/combination-sum-diagram.png "Combination sum tree diagram")

The diagram illustrates a top-down approach where we start with the target value, four, and subtract from it all of the values in the `nums` array. Then from all of those possible solutions, we repeat the same process with those new values until we hit 0, which is the goal, or the value eventually becomes negative which means it isn't possible.

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

This solution works, but takes up a lot of time and memory. ***A lot*** of time and memory. In an interview setting, this would be the *brute* *force* solution. Going back to the diagram above, we can see that for every new `target` value, we create `nums.length` amount of recursive calls. This is a very expensive function to run. To be exact, this current solution runs in O(m^n) time where "m" is the number of values found in `nums` and "n" is `target`. In addition because this is a recursive solution, the space complexity is also O(m^n) due the the size of the call stack retaining all of the recursive functions.

## Optimizing Our Recursive, Top-Down Approach Using Memoization

Memoization might seem like a big word, but it's a simple concept. To understand the need for memoization and how it works, it's best to re-examine the diagram. 

![Combination sum tree diagram highlighting redundancies](/images/uploads/combination-sum-diagram-memo.png "Combination sum tree diagram highlighting redundancies")

In this edited version of the previous diagram, I highlighted redundancies within our solution. In the current solution, we are evaluating certain sub-problems more than once, specifically the sub-problems there `target = 2 and target = 1`. Memoization solves this problem by storing previously solved values. For instance, the first time the function solves `target = 2`, it will store the solution to that sub-problem. Then the next time it comes across `target = 2`, it no longer has to run the whole problem and instead just returns the cached value. 

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
  // use a hash map to cache solutions to solved sub-problems
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

### Further Optimizing The Solution Using a Bottom-Up Approach

Thus far, we've gone over a top-down recursive solution and using memoization to optimize that solution. Recursion is often a great starting point to solve solutions, but will always run the issue of being a worse optimized solution to a problem due to the nature of recursion and its requirement for the call stack to hold function calls in memory. 

That being said, recursive functions can be written iteratively, and iterative solutions can be the solution to optimization. To understand how a bottom-up iterative solution can be created, it'd be useful to go over what our top down solution did step-by-step. 

1. The solution first takes in some `target` value and an array `nums`. 
2. The function then goes top-down, starting from the target value, and begins subtracting values taken from `nums` away from `target`.
3. That is, the function has gone from `findWaysToSum(nums, 4)` to `findWaysToSum(3), findWaysToSum(2), and findWaysToSum(1)`.
4. This process continues for each of those function calls until either zero or a negative number is reached.

So given that the top-down approach required working from the `target` down to zero, what if we built the bottom-up solution from zero to `target`? 

### Working Out The Logic

Answer this question: how many ways are there to get a `target` of one given the previous example where `nums = [1,2,3]`? The answer would be that there is one way. We can only get to one by using the value one. 

How about the number of ways to get to *two?* Let's think that through together. 

```markdown
target = 2, nums = [1,2,3]

From 2, we can either take away 1 or 2. We cannot take away 3 as it'd be too much.

What happens when we take away 1? We are left with 1. 
We already know that there is only 1 way to get to 1. 
That means when you take 1 away from 2, there is ONE way. 

What happens when we take 2 away from 2? 
Well, we are at 0 which means we've found ANOTHER way.

Therefore when target = 2, there are two ways to get to 2.
```

Now let's see what happens when `target = 3`. 

```markdown
target = 3, nums = [1,2,3]

From 3, we can either take away 1, 2, or 3.

3 - 1 = 2:
From the previous target = 2, there are precisely two ways to get to 2.

3 - 2 = 1:
We know that there is one way to get to 1.

3 - 3 = 0:
There is one additional way to reach the target.

Add the solutions to our mini-problems:
2 + 1 + 1 = 4; there are four ways to get to 3.
```

This pattern will continue until the actual target is reached, which in the case of this example, is four. As you can see, the solution requires breaking the problem into small sub-problems that answer bigger problems. ***Dynamic programming*.** 

### Code Implementation

The logic has now been figured out. Now it's a matter of implementing it. Since we'll need to store and access solutions to the sub-problems. We can use an array of `target + 1` length to store solutions. At every index, `i`, we will store the solution to `target = i`. That is, given a target of four, the array will have a length of five with indices `0, 1, 2, 3, 4`.

```javascript
function main(nums, target) {
  const dp = new Array(target + 1).fill(0)
  for (let i = 1; i <= target; i++){
    for (let num of nums){
      if (i - num === 0){
        // we've found one way to get to i
        dp[i]++
      }
      if (i > num){
        dp[i] += dp[i - num]
      }
    }
  }
  return dp[target]
}
```

To summarize what was done: 

1. A `dp` array was created.
2. The function iterates through every value from one to `target`, inclusive.
3. For every value in `nums`, the function checks to see if `i - num === 0`. If so, that means  there is at least one way to get to the current target.
4. Otherwise if `i > num`, or in other words `i - num > 0`, we know from our previous logic walkthrough that we simply add on how many ways there are to get to a target of `i - num`. 
5. This process will be repeated for all values from one to `target`, inclusive. 
6. Then all that needs to be returned is the very last value in the `dp` array, which contains the number of ways there are to get to `target`.

## A Fourth Step - Only Sometimes Applicable

Thus far, I've covered three steps that should aid in solving dynamic programming problems: thinking of a top-down approach using recursion, optimizing the recursive solution using memoization, and using the top-down approach to come up with a bottom-up, iterative solution. 

There is a fourth step that can be applicable to certain problems, but is not applicable to the example we went over. The fourth step is to entirely remove the `dp` table/array and substitute it for constant variables. An example that showcases this is our trusty friend, the Fibonacci Sequence.

Following the bottom-up approach utilizing an array to store values, a solution to finding the `nth` number in the Fibonacci sequence would look as follows: 

```javascript
function fib(n){
  const dp = new Array(n);
  dp[0] = 0;
  dp[1] = 1;
  for (let i = 2; i < n; i++) {
    // to find the nth number, we add the previous two values
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n - 1]
}
```

Notice how at every iteration, only two values need to be evaluated, which are the previous two values. Therefore an array isn't needed and the two values can be stored in variables, which makes the solution use constant O(1) space rather than the O(n) space needed to maintain an array.

```javascript
function fib(n){
  let secondPrevious = 0;
  let previous = 1;
  for (let i = 2; i < n; i++) {
    const current = previous + secondPrevious;
    secondPrevious = previous; 
    previous = current;
  }
  return previous;
}
```

## Recap

Hopefully this article simplified dynamic programming for you. The name is scary but the concept is simple. It's all about **sub-problems**. **Sub-problems and more sub-problems!**

In this article, I covered a useful four-step guide to tackling dynamic programming problems. Remember these steps and it will change the way you view dynamic programming. 

1. Think of a top-down approach using recursion. This approach will also allow you to think of base cases for the overall problem. 
2. Optimize the recursive solution using memoization.
3. Use the base cases and top-down solution to formulate a bottom-up solution using iteration and a table/array to memoize results to previous subproblems.
4. If applicable, substitute the table/array for constant variables if only a few known values are needed. This will improve the space complexity of the function.

## Resources

There is no better way to improve than to practice and practice some more. Below are some *staple* dynamic programming problems found on Leetcode. I suggest doing all of these to get a better grasp of this topic.

1. Easy - [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)
2. Medium - [Word Break](https://leetcode.com/problems/word-break/)
3. Medium - [House Robber](https://leetcode.com/problems/house-robber/)
4. Medium - [Unique Paths](https://leetcode.com/problems/unique-paths/)