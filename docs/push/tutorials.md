---
title: Push Tutorials
---

### Creating your own Push Operation

`Undercut` is built on top of existing JavaScript protocols and features like generators. So, the easiest way to build a `PushOperation` is to use Generators:

```js
function pow(exponent) { // #1
    return function* (observer) { // #2
        try { // #3
            while (true) { // #4
                const item = yield; // #5
                const newItem = Math.pow(item, exponent); // #6

                observer.next(newItem); // #7
            }
        } catch (e) { // #8
            observer.throw(e); // #9
        } finally { // #10
            observer.return(); // #11
        }
    };
}

const source = [1, 2, 3];

const result = pushArray([pow(2)], source);

console.log(result); // [1, 4, 9]
```

1. Start with an operation factory. It captures arguments (if there is any) and may provide some additional functionality (but do not store any mutable state here, because operation must be reusable).
2. Operation function itself. It's super convenient to use Generators for building an operation, but it may be a regular function too. During pipeline execution it will be called with an observer representing the next stage of the pipeline.
3. `try-catch-finally` block should cover 2 possible exiting scenarios: cancellation and `end-of-sequence` signal.
4. Observers wait for new items indefinitely. The loop ends only because of `yield`.
5. Get an item by `yielding`.
6. Do your computation.
7. When you need to pass something down the pipleline, do this by passing it to `observer.next()` call.
8. `yield` will throw on calling the `.throw()` method. This means a cancellation of the execution.
9. You need to signal remaining observers in the chain, so they could clean up the resources too. This is done by passing the error to the `observer.throw()` call.
10. You will get here in case of both cancellation and `end-of-sequence` signal.
11. It is a good place to clean up your resources. You must also signal remaining observers in the chain by calling `observer.return()`.

In case more advanced operations like grouping, where you need to look at all available items first before you can proceed, you can do this in `finally`. Make yourself a flag to skip computation in case of catching a cancellation, and pass items before closing the observer ([see the groupBy operation](packages/undercut-push/src/operations/group_by.js)).
