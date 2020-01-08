# @undercut/push

This package provides the `push` functionality and is a part of the larger [undercut](https://github.com/the-spyke/undercut) project.

## Quicklinks

- [Installation](#installation)
- [Usage](#usage)
- [Concepts](https://github.com/the-spyke/undercut#concepts)
- [Pull](#pull)
- [Tutorials](#tutorials)
- [Operations](https://github.com/the-spyke/undercut#operations)
- [Sources](#sources)
- [Targets](#targets)
- [License](#license)

## Installation

`@undercut/push` carries `stable ES Next` code. It is very convenient for apps using Webpack/Babel/etc, and will help to avoid double compilation and deoptimization. Only [finished proposals (Stage 4)](https://github.com/tc39/proposals/blob/master/finished-proposals.md) may be used in its codebase. The code is universal and may be used in Node/Browser/microwave.

Don't forget check that `/node_modules/@undercut/` isn't excluded from compilation and `core-js@3` polyfill or analogue is in place.

```sh
npm install @undercut/push
# or
yarn add @undercut/push
```

### Upgrading

If you're upgrading the `undercut` to a newer version, please upgrade `@babel/preset-env` and `core-js` packages to the latest versions too.

## Usage

```js
import { pushArray, filter, map, skip } from "@undercut/push";

const source = [1, 2, 3, 4, 5, 6, 7];

const result = pushArray([
    skip(2),
    filter(x => x % 3 === 0),
    map(x => x * 2) // Will be executed only 3 times.
], source);

console.log(result); // [8, 10, 14]
```

## [Concepts](https://github.com/the-spyke/undercut#concepts)

## Push

`Push Lines` are based on `Observers` (which are a sub-type of Coroutines):

```typescript
interface Observer<T> {
    next(value : T): void;
    return?(): void;
    throw?(error): void;
}
```

`Push` is used less often than `Pull` and has an independent implementation. `Push Lines` are **not** re-usable and you **must** close the `observer` when you're done with it by calling its `.return()` method. Closing the `observer` also signals `end-of-sequence` (many operations wait till they gather all items, until they could continue). The `.throw()` method allows to cancel execution at any time.

To use `Push Lines` you need to import from `@undercut/push` entry point.

Terms in releation to `Push Lines`:

- `observer` -- an object implementing the `Observer protocol`.
- `operation` -- a function taking an `observer` accepting result items and returning an `observer` accepting source items.
- `pipeline` -- an ordered sequence (array) of `operations`.
- `source` -- there is no real `source` in `Push Lines`, because someone need to manually put items into the `observer`, but several `push` functions can help you to process `iterables` with `Push Lines`.
- `target` -- an `observer` that will receive the result.

```typescript
type PushOperation = <T, R>(observer: Observer<T>) => Observer<R>;

type PullPipeline = Array<PushOperation>;

type PushTarget = Observer<T>;
```

### Core Push functions

#### `composeOperations(operations) => PushOperation`

Composes several existing operations into a new one.

```js
import { composeOperations, pushArray, flatten, zip } from "@undercut/push";

function interleave(...sources) {
    const operations = [
        zip(...sources),
        flatten()
    ];

    return composeOperations(operations);
}

const source = [1, 3, 5];
const pipeline = [
    interleave([2, 4, 6])
];

const result = pushArray(pipeline, source);

console.log(result); // [1, 2, 3, 4, 5, 6]
```

#### `push(target, pipeline, source) => target`

Executes the pipeline by pushing items from an iterable source to the target and returns the target back.

```js
import { push, filter, map, skip, toArray } from "@undercut/push";

const source = [1, 2, 3, 4, 5, 6, 7];
const pipeline = [
    skip(2),
    filter(x => x % 3 === 0),
    map(x => x * 2)
];
const target = toArray();

const target2 = push(target, pipeline, source); // target2 === target

// `toArray` target has `values` property.
console.log(target.values); // [8, 10, 14]
```

#### `pushArray(pipeline, source) => Array`

Same as `push`, but target is implicitly set to `toArray()` and its `values` property is returned.

```js
import { pushArray, filter, map, skip } from "@undercut/push";

const source = [1, 2, 3, 4, 5, 6, 7];
const pipeline = [
    skip(2),
    filter(x => x % 3 === 0),
    map(x => x * 2)
];

const result = pushArray(pipeline, source);

console.log(result); // [8, 10, 14]
```

#### `pushLine(pipeline, target) => Observer`

Creates a `Push Line`.

Usually, you will push an item in an event handler like button click, etc.

```js
import { pushLine, append, compact, skip, toArray } from "@undercut/push";

const target = toArray();
const pipeline = [
    append(4, 5),
    compact(),
    skip(2)
];

const numbersObserver = pushLine(pipeline, target); // No evaluation happens at this step.

[0, 1, 2, 3].forEach(x => numbersObserver.next(x)); // Push items.

numbersObserver.return(); // Close the observer.

console.log(target.values); // [3, 4, 5]

useClosable(pushLine(pipeline, target), o => [1, 2, 3].forEach(x => o.next(x)));
```

## Tutorials

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

In case more advanced operations like grouping, where you need to look at all available items first before you can proceed, you can do this in `finally`. Make yourself a flag to skip computation in case of catching a cancellation, and pass items before closing the observer ([see the groupBy operation](packages/undercut-push/src/operations/group_by.js))

## [Operations](https://github.com/the-spyke/undercut#operations)

## Sources

`Push` doesn't have its own `sources` because it's asynchronous by nature. You can use `pull` sources or other iterables for convenience functions like `push` and `pushArray`.

## Targets

- `toArray() => Observer` -- returns an observer that saves all items into an array. The observer has the `values` property to access this array.
- `toConsumer(consumer, finalizer) => Observer` -- returns an observer that passes items into the `consumer`. On `end-of-sequence` or error the `finalizer` will be called with the `error` (if any, or `undefined`) and items `count`.
- `toNull() => Observer` -- returns an observer that does nothing.
- `toValue() => Observer` -- returns an observer that saves the first item into the own `value` property. There's also `hasValue` property to check if there was an item at all.

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
