# @undercut/pull

This package provides the `pull` functionality and is a part of the larger [undercut](https://github.com/the-spyke/undercut) project.

## Quicklinks

- [Installation](#installation)
- [Usage](#usage)
- [Concepts](https://github.com/the-spyke/undercut#concepts)
- [Pull](#pull)
- [Tutorials](#tutorials)
- [Operations](https://github.com/the-spyke/undercut#operations)
- [Sources](#sources)
- [Targets](#targets)
- [Utilities](#utilities)
- [License](#license)

## Installation

`@undercut/pull` carries `stable ES Next` code. It is very convenient for apps using Webpack/Babel/etc, and will help to avoid double compilation and deoptimization. Only [finished proposals (Stage 4)](https://github.com/tc39/proposals/blob/master/finished-proposals.md) may be used in its codebase. The code is universal and may be used in Node/Browser/microwave.

Don't forget check that `/node_modules/@undercut/` isn't excluded from compilation and `core-js@3` polyfill or analogue is in place.

```sh
npm install @undercut/pull
# or
yarn add @undercut/pull
```

### Upgrading

If you're upgrading the `undercut` to a newer version, please upgrade `@babel/preset-env` and `core-js` packages to the latest versions too.

## Usage

```js
import { pullArray, filter, map, skip } from "@undercut/pull";

const source = [1, 2, 3, 4, 5, 6, 7];

const result = pullArray([
    skip(2),
    filter(x => x % 3 === 0),
    map(x => x * 2) // Will be executed only 3 times.
], source);

console.log(result); // [8, 10, 14]
```

[![Edit undercut-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/undercut-example-9g1nh?fontsize=14&module=%2Fsrc%2Findex.js)

## [Concepts](https://github.com/the-spyke/undercut#concepts)

## Pull

`Pull Lines` are bases on `Iterables`:

```typescript
interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
}

interface Iterator<T> {
    next(): IteratorResult<T>;
    return?(): void;
}

interface IteratorResult<T> {
    value: T;
    done: boolean;
}
```

`Pull` is the most used type of pipelines. A `Pull Line` is re-usable if its source is re-iterable.

Terms in releation to `Pull Lines`:

- `iterable` -- an object implementing the [Iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol).
- `operation` -- a function taking an `Iterable` of source items and returning an `Iterable` of result items.
- `pipeline` -- an ordered sequence (array) of `operations`.
- `source` -- an `Iterable` which items will be processed. Many native objects are `Iterable` out of the box: arrays, maps, sets, strings.
- `target` -- a function for extracting the result out of pipeline. Takes an `Iterable` and returns some value. Many native functions behave this way: `Array.from()`, `new Map()`, `Object.fromEntries()`, etc. `Targets` provided by the `undercut` are mostly wrappers around those native functions/constructors for convenience. Feel free to use the originals.

```typescript
type PullOperation = <T, R>(iterable: Iterable<T>) => Iterable<R>;

type PullPipeline = Array<PullOperation>;

type PullTarget = <T, R>(iterable: Iterable<T>) => R;
```

### Core Pull functions

#### `composeOperations(operations) => PullOperation`

Composes several existing operations into a new one.

```js
import { composeOperations, pullArray, flatten, zip } from "@undercut/pull";

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

const result = pullArray(pipeline, source);

console.log(result); // [1, 2, 3, 4, 5, 6]
```

#### `pull(target, pipeline, source) => TargetReturnValue`

Executes the pipeline by pulling items from the source to the target and returns target's return value.

```js
import { pull, filter, map, skip, toArray } from "@undercut/pull";

const source = [1, 2, 3, 4, 5, 6, 7];
const pipeline = [
    skip(2),
    filter(x => x % 3 === 0),
    map(x => x * 2)
];

const result = pull(toArray(), pipeline, source);

console.log(result); // [8, 10, 14]
```

#### `pullArray(pipeline, source) => Array`

Same as `pull`, but target is implicitly set to `toArray()`.

```js
import { pullArray, filter, map, skip } from "@undercut/pull";

const source = [1, 2, 3, 4, 5, 6, 7];
const pipeline = [
    skip(2),
    filter(x => x % 3 === 0),
    map(x => x * 2)
];

const result = pullArray(pipeline, source);

console.log(result); // [8, 10, 14]
```

#### `pullLine(pipeline, source) => Iterable`

Creates a `Pull Line`.

Useful when you want to pass it somewhere or being able to re-evaluate the result again in the future.

```js
import { pullLine, append, compact, skip } from "@undercut/pull";

const source = [0, 1, 2, 3];
const pipeline = [
    append(4, 5),
    compact(),
    skip(2)
];

const myItems = pullLine(pipeline, source); // No evaluation happens at this step.

const result1 = Array.from(myItems);

console.log(result1); // [3, 4, 5]

source.push(7); // Modify the source and re-evaluate. Pull Line has a reference to the source.

const result2 = Array.from(myItems);

console.log(result2); // [3, 7, 4, 5]
```

## Tutorials

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

## [Operations](https://github.com/the-spyke/undercut#operations)

## Sources

- `range(start, end, step = 1)` -- creates an iterable of numbers from the `start` to (not including) the `end` by the `step` (optional, only positive because the sign will be chosen depending on whether the `start` is or isn't less than the `end`)

## Targets

- `toArray()` -- returns a function that pulls an iterable into an array.
- `toConsumer(consumer)` -- returns a function that pulls an iterable an passes items one-by-one into the `consumer` function.
- `toMap()` -- returns a function that pulls an iterable into a Map. So, items must be `[key, value]`.
- `toNull()` -- returns a function that pulls an iterable and does nothing with the items.
- `toObject()` -- returns a function that pulls an iterable into an object. So, items must be `[key, value]` and keys will be stringified.
- `toObserver(observer)` -- returns a function that pulls and pushed item one-by-one into the specified observer.
- `toSet()` -- returns a function that pulls an iterable into a Set.
- `toValue()` -- returns a function that pulls an iterable, checks that there's no items or exactly 1 item, and return it or `undefined`. In case of more than 1 item it throws an error.

## Utilities

Some specific utilities are exported in this package too, but they are identical to those in the `@undercut/utils` package, which exports [the entire list](https://github.com/the-spyke/undercut/blob/master/packages/undercut-utils/README.md).

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
