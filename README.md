# ✂ undercut ✂

[![version](https://img.shields.io/npm/v/undercut.svg)](https://www.npmjs.com/package/undercut)
[![downloads](https://img.shields.io/npm/dm/undercut.svg)](https://www.npmjs.com/package/undercut)
[![chat](https://badges.gitter.im/undercutjs/community.svg)](https://gitter.im/undercutjs/community)
[![license](https://img.shields.io/npm/l/undercut.svg)](https://github.com/the-spyke/undercut/blob/master/LICENSE)

[![circleci](https://circleci.com/gh/the-spyke/undercut.svg?style=shield)](https://circleci.com/gh/the-spyke/undercut)
[![codecov](https://codecov.io/gh/the-spyke/undercut/branch/master/graph/badge.svg)](https://codecov.io/gh/the-spyke/undercut)

JavaScript data processing pipelines and utilities. Use native Iterators/Generators/Observers like it's 2015 already.

- Based on existing JS protocols and language features
- Balanced API: not too imperative, not too functional
- Easy operation extensibility and composability
- Pure ES Modules with Node 13 loader compliance
- Raw code in the package + precompiled versions
- Lazy evaluation when possible
- Tree shaking friendliness

## Quicklinks

- [Concepts](#concepts)
- [Pull](#pull)
- [Push](#push)
- [Operations](#operations)
- [Utilities](#utilities)

## Installation

`Undercut` comes in several flavors. The `undercut` package is the intended way to consume it. This package carries universal `stable ES Next` code. It is very convenient for apps using Webpack/Babel/etc, and will help to avoid double compilation and deoptimization. Only [finished proposals (Stage 4)](https://github.com/tc39/proposals/blob/master/finished-proposals.md) may be used in its codebase. The code is universal and runs in Node/Browser/microwave, but likely requires `core-js@3` in your environment. Also, don't forget check thaat `node_modules/undercut` isn't excluded from compilation.

Several precompiled packages are provided for older projects or quick experiments. They do not require any sort of compilaton:

- `undercut-node-10` -- a precompiled CommonJS version for Node.js 10 LTS and upwards. Requires stable polyfills from `core-js@3`.
- `undercut-web-2019` -- a precompiled version for Web browsers not older than 2019-01-01. Creates the `undercut` variable in the `window`, may also be used by CJS/AMD loaders. Requires stable polyfills from `core-js@3`.

```sh
npm install undercut
# or
yarn add undercut
```

For precompiled packages it is convenient to use [Yarn aliases](https://yarnpkg.com/en/docs/cli/add#toc-yarn-add-alias):

```sh
yarn add undercut@npm:undercut-node-10
```

### Upgrading undercut

If you're upgrading `undercut` to a newer version, upgrade `@babel/preset-env` and `core-js` packages to the latest versions too.

## Usage

[![Edit undercut-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/undercut-example-9g1nh?fontsize=14&module=%2Fsrc%2Findex.js)

```js
import { pullItems, filter, map, skip } from "undercut";

const source = [1, 2, 3, 4, 5, 6, 7];

const result = pullItems([
    skip(2),
    filter(x => x % 3 === 0),
    map(x => x * 2) // Will be executed only 3 times.
], source);

console.log(result); // [8, 10, 14]
```

There are 3 entry points:

- `pull` (default) -- exports for Pull Lines (Iterables).
- `push` -- exports for Push Lines (Observers).
- `utils` -- various JavaScript utilities, some of them like `asc`/`desc`/`compare` you will need for data processing too.

These entry points are stable, so any export removal/renaming counts as a breaking change.

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

If `source` items are **not** available at the moment of execution, we have to process items as they appear. We can do this by *pushing* items into a `Push Line`. It is created by combining a `pipeline` and a `target` into an `Observer`. `Observers` are convenient in use cases like reacting on a button click and me be passed around or used by several sources.

```text
Push line -- push items into an Observer

( pipeline + target = Observer )
```

Of course, you can process synchronous items with `Push Lines` too, but `Pull Lines` are easier to operate and write operations for.

## Pull

`Pull Lines` are bases on `Iterables`:

```typescript
interface Iterable {
    [Symbol.iterator]() : Iterator;
}

interface Iterator {
    next() : IteratorResult;
}

interface IteratorResult {
    value : any;
    done : boolean;
}
```

`Pull` is the most used type of pipelines. A `Pull Line` is re-usable if its source is re-iterable.

To use `Pull Lines` you need to import from the default `undercut` entry point or explicit `undercut/push.js`.

Terms in releation to `Pull Lines`:

- `iterable` -- an object implementing the [Iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol).
- `operation` -- a function taking an `Iterable` and returning another `Iterable`.
- `pipeline` -- an ordered sequence of `operations` (an array).
- `source` -- an `Iterable` which items will be processed. Many native objects are `Iterable` out of the box: arrays, maps, sets, strings.
- `target` -- a function for extracting the result out of pipeline. Takes an `Iterable` and returns some value. Many native functions behave this way: `Array.from()`, `new Map()`, `Object.fromEntries()`, etc. `Targets` provided by the `undercut` are mostly wrappers around those native functions/constructors for convenience. Feel free to use the originals.

### Core Pull functions

#### `composeOperations(operations) => PullOperation`

Composes several existing operations into a new one.

```js
import { composeOperations, pull, flatten, zip, toArray } from "undercut";

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

const result = pullItems(pipeline, source);

console.log(result); // [1, 2, 3, 4, 5, 6]
```

#### `pull(target, pipeline, source) => TargetReturnValue`

Executes the pipeline by pulling items from the source to the target and returns target's return value.

```js
import { pull, filter, map, skip, toArray } from "undercut";

const source = [1, 2, 3, 4, 5, 6, 7];
const pipeline = [
    skip(2),
    filter(x => x % 3 === 0),
    map(x => x * 2)
];

const result = pull(toArray, pipeline, source);

console.log(result); // [8, 10, 14]
```

#### `pullItems(pipeline, source) => Array`

Same as `pull`, but target is implicitly set to `toArray`.

```js
import { pullItems, filter, map, skip, toArray } from "undercut";

const source = [1, 2, 3, 4, 5, 6, 7];
const pipeline = [
    skip(2),
    filter(x => x % 3 === 0),
    map(x => x * 2)
];

const result = pullItems(pipeline, source);

console.log(result); // [8, 10, 14]
```

#### `pullLine(pipeline, source) => Iterable`

Creates a `Pull Line`.

Useful when you want to pass it somewhere or being able to re-evaluate the result again in the future.

```js
import { pullLine, append, compact, skip, toArray } from "undercut";

const source = [0, 1, 2, 3];
const pipeline = [
    append(4, 5),
    compact(),
    skip(2)
];

const myItems = pullLine(pipeline, source); // No evaluation happens at this step.

const result1 = toArray(myItems);

console.log(result1); // [3, 4, 5]

source.push(7); // Modify the source and re-evaluate. Pull Line has a reference to the source.

const result2 = toArray(myItems);

console.log(result2); // [3, 7, 4, 5]
```

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

const result = pullItems(pipeline, source);

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
pull(toArray, pipeline, source);
// or
pull(Array.from, pipeline, source);
// or
toArray(pullLine(pipeline, source));
// or
Array.from(pullLine(pipeline, source));
```

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

To use `Push Lines` you need to import from `undercut/push.js` entry point.

Terms in releation to `Push Lines`:

- `observer` -- an object implementing the `Observer protocol`.
- `operation` -- a function taking an `observer` and returning another one.
- `pipeline` -- an ordered sequence of `operations` (array).
- `source` -- there is no real `source` in `Push Lines`, because someone need to manually put items into the `observer`, but several `push` functions can help you to process `iterables` with `Push Lines`.
- `target` -- an `observer` that will receive the result.

### Core Push functions

#### `composeOperations(operations) => PushOperation`

Composes several existing operations into a new one.

```js
import { composeOperations, push, flatten, zip, toArray } from "undercut/push.js";

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

const result = pushItems(pipeline, source);

console.log(result); // [1, 2, 3, 4, 5, 6]
```

#### `push(target, pipeline, source) => target`

Executes the pipeline by pushing items from an iterable source to the target and returns the target back.

```js
import { push, filter, map, skip, toArray } from "undercut/push.js";

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

#### `pushItems(pipeline, source) => Array`

Same as `push`, but target is implicitly set to `toArray()` and its `values` property is returned.

```js
import { pushItems, filter, map, skip, toArray } from "undercut/push.js";

const source = [1, 2, 3, 4, 5, 6, 7];
const pipeline = [
    skip(2),
    filter(x => x % 3 === 0),
    map(x => x * 2)
];

const result = pushItems(pipeline, source);

console.log(result); // [8, 10, 14]
```

#### `pushLine(pipeline, target) => Observer`

Creates a `Push Line`.

Usually, you will push an item in an event handler like button click, etc.

```js
import { pushLine, append, compact, skip, toArray } from "undercut/push.js";

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

const result = pushItems([pow(2)], source);

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

In case more advanced operations like grouping, where you need to look at all available items first before you can proceed, you can do this in `finally`. Make yourself a flag to skip computation in case of catching a cancellation, and pass items before closing the observer ([see the groupBy operation](packages/undercut/src/push/operations/group_by.js))

## Operations

Operation exist in both `pull` and `push` versions:

- `append(...items)` -- adds its arguments to the end of the sequence.
- `average()` -- reduces the sequence into a number by calculating the average of it.
- `chunk(size)` -- groups items in the sequence into arrays of `size` items.
- `compact()` -- removes all falsy items from the sequence.
- `concatEnd(source)` -- adds items from the `source` to the end of the sequence.
- `concatStart(source)` -- adds items from the `source` to the beginning of the sequence.
- `count()` -- reduces the sequence into a number by countint items in it.
- `difference(...sources)` -- removes sources' items from the sequence matching by their identity.
- `differenceBy(selector, ...sources)` -- removes sources' items from the sequence matching by the `selected` value.
- `every(predicate)` -- reduces the sequence into a boolean by calculating if the `predicate` returns `true` for every item.
- `filter(predicate)` -- removes all items from the sequence for which the `predicate` returns `false`.
- `find(predicate)` -- reduces the sequence to the first item for which `predicate` have returned `true`.
- `findIndex(predicate)` -- reduces the sequence to the index of the first item for which the `predicate` have returned `true`.
- `first()` -- removes all items from the sequence, but the first one.
- `flatten(depth = 1)` -- flattens nested arrays in the sequence `depth` levels deep. `depth` can be `Infinity`.
- `flattenIterables(depth = 1)` -- flattens nested iterables in the sequence `depth` levels deep. `depth` can be `Infinity`.
- `forEach(action)` -- executes the `action` for every item in the sequence, used for side effects.
- `groupBy(keySelector)` -- groups items of the sequence into the new `[key, items]` items matching by the `selected key`.
- `includes(value)` -- reduces the sequence into a boolean depending on whether the `value` was found in it.
- `interleave(...sources)` -- interleaves sources' items into the sequence in round-robin fashion.
- `intersection(...sources)` -- reduces the sequence to items to which have identicals in every source.
- `intersectionBy(selector, ...sources)` -- reduces the sequence to items to which have identicals in every source matching by the `selected` value.
- `join(separator = ",")` -- reduces the sequence into a string, works the same as `Array.prototype.join()`.
- `last()` -- removes all items from the sequence, but the last one.
- `map(mapper)` -- transforms the sequence into a new one by `mapping` all its items.
- `max()` -- reduces the sequence into a number by finding maximum value.
- `min()` -- reduces the sequence into a number by finding minimum value.
- `nth(n)` -- removes all items from the sequence, but the `n`th one.
- `orderBy(...orderingSpecs)` -- reorders items in the sequence by ordering specs, you build them with `asc` and `desc` utilities.
- `prepend(...items)` -- adds its arguments to the beginning of the sequence.
- `reduce(reducer, initial = undefined)` -- reduces the sequence into a value starting with the `initial` one and executing the `reducer` for every item.
- `remove(predicate)` -- removes all items from the sequence for which the `predicate` returns `true`.
- `reverse()` -- reverses the order of the items in the sequence.
- `skip(count)` -- removes the first `count` items from the sequence.
- `skipWhile(predicate)` -- removes the first items from the sequence for which the `predicate` consequently have returned `true`.
- `some()` -- reduces the sequence into a boolean by calculating if the `predicate` returns `true` at least for one item.
- `sort(comparator, order = asc)` -- sorts the items in the sequence using the `comparator`.
- `sortNumbers(order = asc)` -- sorts the items as numbers in the sequence.
- `sortStrings(order = asc)` -- sorts the items as strings in the sequence.
- `sum()` -- reduces the sequence into a number by summing all items.
- `symmetricDifference(...sources)` -- reduces the sequence by applying [Symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference) with sources' items matching by their identity.
- `symmetricDifferenceBy(selector, ...sources)` -- reduces the sequence by applying [Symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference) with sources' items matching by the `selected` value.
- `take(count)` -- reduces the sequence the the first `count` items.
- `takeWhile(predicate)` -- reduces the sequence the the first `count` items for which the `predicate` consequently have returned `true`.
- `union(...sources)` -- reduces the sequence by combining it with sources an leaving only unique items matching by their identity.
- `unionBy(selector, ...sources)` -- reduces the sequence by combining it with sources an leaving only unique items matching by the `selected` value.
- `unique()` -- educes the sequence by leaving only unique items matching by their identity.
- `uniqueBy(selector)` -- reduces the sequence by combining it with sources an leaving only unique items matching by the `selected` value.
- `unzip()` -- reverse to the `zip` producing a sequence of sources.
- `unzipWith(itemsExtractor)` -- reverse to the `zip` producing a sequence of sources by getting their items from the `extractor`.
- `zip(...sources)` -- transforms the sequence into a new one by combining by one item from it and the sources into an array.
- `zipWith(itemFactory, ...sources)` -- transforms the sequence into a new one by combining by one item from it and the source into a value returned by the `itemFactory`.

## Utilities

Some utilities are exported in `pull` and `push` entries, but they identical to those in the `utils` entry, where you get to whole package:

- `asc(comparator, selector = identity) => OrderingSpec` -- used itself as a value for specifying ascending sorting direction, of as a factory function for creating OrderingSpec for `groupBy` operation.
- `closeIterator(iterator) => void` -- closes the `iterator` if it has a `return` method.
- `closeObserver(observer) => void` -- closes the `observer` if it has a `return` method.
- `compare` -- a set of predefined comparators for sorting.
- `delay(promise, time) => Promise` -- returns a new Promise that waits `time` more miliseconds after the `promise` and fulfills with its result.
- `desc(comparator, selector = identity) => OrderingSpec` -- used itself as a value for specifying descending sorting direction, of as a factory function for creating OrderingSpec for `groupBy` operation.
- `getIterator(iterable) => Iterator` -- calls the `Symbol.iterator` method of the `iterable` for you.
- `identity(value) => value` -- returns the same `value` the was provided as the first argument.
- `initializeObserver(observer) => observer` -- returns the same observer after calling the `next` method on it once.
- `isBoolean(value) => boolean` -- returns `true` if the `value` is of the boolean type, `false` otherwise.
- `isDefined(value) => boolean` -- returns `true` if the `value` is exactly not `undefined`, `false` otherwise.
- `isFalsy(value) => boolean` -- returns `true` if the `value` converted to Boolean is `false`, `false` otherwise.
- `isFunction(value) => boolean` -- returns `true` if the `value` is a function, `false` otherwise.
- `isIterable(value) => boolean` -- returns `true` if the `value` is an object having `Symbol.iterator` method, `false` otherwise.
- `isIterator(value) => boolean` -- returns `true` if the `value` is an object having `next` method, `false` otherwise.
- `isNegative(value) => boolean` -- returns `true` if the `value` is a Number less than zero, `false` otherwise.
- `isNegativeOrZero(value) => boolean` -- returns `true` if the `value` is a Number less or equal to zero, `false` otherwise.
- `isNull(value) => boolean` -- returns `true` if the `value` is exactly `null`, `false` otherwise.
- `isNullish(value) => boolean` -- returns `true` if the `value` is exactly `null` or `undefined`, `false` otherwise.
- `isNumber(value) => boolean` -- returns `true` if the `value` is of the Number type, `false` otherwise. `NaN` is a Number in JavaScript.
- `isNumberValue(value) => boolean` -- same as `isNumber`, but returns `false` for `NaN`.
- `isObject(value) => boolean` -- returns `true` if the `value` is an Object, `false` otherwise. `null` is an Object is JavaScript.
- `isObjectValue(value) => boolean` -- same as `isObject`, but returns `false` for `null`.
- `isObserver(value) => boolean` -- returns `true` if the `value` is an object with the `next` method, `false` otherwise.
- `isPositive(value) => boolean` -- returns `true` if the `value` is a Number greater that zero, `false` otherwise.
- `isPositiveOrZero(value) => boolean` -- returns `true` if the `value` is a Number equal or greater than zero, `false` otherwise.
- `isString(value) => boolean` -- returns `true` if the `value` is of the String type, `false` otherwise.
- `isSymbol(value) => boolean` -- returns `true` if the `value` is of the Symbol type, `false` otherwise.
- `isTruthy(value) => boolean` -- returns `true` if the `value` converted to Boolean is `true`, `false` otherwise.
- `isUndefined(value) => boolean` -- returns `true` if the `value` is exactly `undefined`, `false` otherwise.
- `makeReiterable(function) => Iterable` -- makes an `Iterable` from a provided function. It could be a generator or a factory, but must return a new iterator every time.
- `negate(value) => boolean` -- performs the `!` operation with provided value.
- `negateSign(value) => number` -- inverts the sign of the numeric value.
- `noop() => void` -- an empty function.
- `rethrow(error) => void` -- immidietly throws provided `error`.
- `unwrapPromise() => object` -- creates a new Promise and returnss it together with its `resolve`/`reject` functions.
- `useIterator(iterator, usage) => UsageReturnValue` -- a helper for closing iterators for you. `usage` is a function provided the iterator from the first argument. The `iterator` will be closed right after `usage` function exits. Use it for convenience instead of manual `try/finally` blocks.
- `useObserver(observer, usage) => UsageReturnValue` -- same as `useIterator`, but for observers.
- `wait(time) => Promise` -- returns a Promise fulfilling after `time` miliseconds.

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
