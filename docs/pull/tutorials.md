---
title: Pull Tutorials
---

### Creating your own Pull Operation

`Undercut` is built on top of existing JavaScript protocols and features like generators. So, the easiest way to build an `PullOperation` is to use Generators:

```js
function pow(exponent) { // #1
    return function* (iterable) { // #2
        for (const item of iterable) { // #3
            const newItem = Math.pow(item, exponent); // #4

            yield newItem; // #5
        }
    };
}

const source = [1, 2, 3];
const pipeline = [
    pow(2)
];

const result = pullArray(pipeline, source);

console.log(result); // [1, 4, 9]
```

1. Start with an Operation factory. It captures arguments (if there is any) and may provide some additional logic/state to the Operation.
2. Operation function itself. It's super convenient to use Generators for building an operation, but it may be a regular function too. During pipeline execution it will be called with an iterable containing items from the previous pipeline stage.
3. Inside the operation usually you want to iterate over provided items.
4. And do something with them or throw them away and build new ones.
5. When you have something to pass further down the pipeline, just provide it to the `yield` operator (a feature of Generators).

### Using different Pull targets or calling them directly

Choose the one that suits you best:

```js
pull(toArray(), pipeline, source);
// or
pull(Array.from, pipeline, source);
// or
toArray()(pullLine(pipeline, source));
// or
Array.from(pullLine(pipeline, source));
```
