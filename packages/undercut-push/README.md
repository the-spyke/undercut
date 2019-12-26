# @undercut/push

This package provides the `push` functionality and is a part of the larger [undercut](https://github.com/the-spyke/undercut) project.

## Quicklinks

- [Installation](#installation)
- [Usage](#usage)
- [Concepts](#concepts)
- [Push](#push)
- [Tutorials](#tutorials)
- [Operations](#operations)
- [Utilities](#utilities)
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

[![Edit undercut-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/undercut-example-9g1nh?fontsize=14&module=%2Fsrc%2Findex.js)

## Concepts

`Undercut` helps constructing pipelines for data processing. Instead of creating new concepts it leverages existing JavaScript protocols and features like [Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) and [Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).

`Pipelines` is just a term for ordered sequences of operations (just like a conveyor on a factory). Imagine you want to process a bunch of `source` items and put the result items somewhere (`target`).

```text
source ----> [ op_0 | op_1 | ... | op_N ] ----> target
                       pipeline
```

Depending on the fact whether the `source` items are or aren't yet available you will have two different approaches: `pull` and `push`.

If `source` items are available at the moment of execution, we can *pull* items from it one by one and process them synchronously. `Undercut` call this a `Pull Line`. It is created by combining a `source` and a `pipeline` into an `Iterable`. This `Iterable` may be passed around and used by any native ES construct like `for-of` loop to read the result. `Undercut` also provides a bunch of `target` helpers for one-line extracting results out of Iterables into common structures like arrays/objects/maps/etc.

```text
Pull Line -- pull items from an Iterable

( source + pipeline = Iterable )
```

If `source` items are **not** available at the moment of execution, we have to process items as they appear. We can do this by *pushing* items into a `Push Line`. It is created by combining a `pipeline` and a `target` into an `Observer`. `Observers` are convenient in use cases like reacting on a button click and may be passed around or used by several producers.

```text
Push line -- push items into an Observer

( pipeline + target = Observer )
```

Of course, you can process synchronous items with `Push Lines` too, but `Pull Lines` are easier to operate and write operations for.

## Push

`Push Lines` are based on `Observers` (which base on write-only generator objects):

```typescript
interface Observer {
    next(value? : any) : void;
    return() : void;
    throw(error) : void;
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

## Operations

To view the list please visit [project's readme](https://github.com/the-spyke/undercut#operations).

## Utilities

Some specific related utilities are exported in this package too, but they are identical to those in the `@undercut/utils` package, which exports [the full list](https://github.com/the-spyke/undercut/blob/master/packages/undercut-utils/README.md).

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
