# ✂ undercut ✂

[![Join the chat at https://gitter.im/undercutjs/community](https://badges.gitter.im/undercutjs/community.svg)](https://gitter.im/undercutjs/community)
[![npm version](https://img.shields.io/npm/v/undercut.svg)](https://www.npmjs.com/package/undercut)
[![npm downloads](https://img.shields.io/npm/dm/undercut.svg)](https://www.npmjs.com/package/undercut)
[![License](https://img.shields.io/npm/l/undercut.svg)](https://github.com/the-spyke/undercut/blob/master/LICENSE)

JavaScript data processing pipelines and utilities. Use native Iterators/Generators/Observers like it's 2015 already.

- Based on existing JS protocols and language features
- Balanced API: not too imperative, not too functional
- Easy operation extensibility and composability
- Pure ES Modules with Node 12 loader compliance
- Raw code in packages (compile in place)
- Lazy evaluation when possible
- Tree shaking friendliness
- 90% test coverage
- SemVer

## Installation

```sh
npm install --save undercut
# or
yarn add undercut
```

`undercut` provides raw Stage 4 ECMAScript code in the package, **don't forget** to include its `node_modules` directories into [Babel](https://babeljs.io/) config or another compiler of your choice.

## Usage

```js
import { pull, filter, map, skip, toArray } from "undercut";

const source = [1, 2, 3, 4, 5, 6, 7];

const result = pull(toArray, [
    skip(2),
    filter(x => x % 3 === 0),
    map(x => x * 2) // Will be executed only 3 times.
], source);

console.log(result); // [8, 10, 14]
```

## Concepts

`undercut` helps constructing pipelines for data processing. Instead of creating new concepts `undercut` leverages existing JavaScript protocols and features like [Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) and [Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).

`Pipelines` are ordered sequences of operations just like a conveyor on a factory. You want to process a bunch of `source` items and put the result items somewhere (`target`).

```text
source ----> [ op_0 | op_1 | ... | op_N ] ----> target
                       pipeline
```

Depending on the fact whether the `source` items are or aren't yet available you will have two different approaches: `pull` and `push`.

If `source` items are available at the moment of execution, we can combine a `source` and a `pipeline` into an `iterable` callint it a `pull line`. This `iterable` may be passed around and used by any native ES construct like `for-of` loop to read the result. What happens is that you manually pull items from a `pull line` by iterating through it. For convenience `undercut` provides a bunch of `target` helpers for one-line extracting results into common structures like arrays/objects/maps/etc.

Pull line -- pull items from an Iterable:

```text
source + pipeline = Iterable
```

If `source` items are unavailable at the moment of execution, we can combine a `pipeline` and a `target` into an `observer` calling it a `push line`. This way you can push items into `observer` when they are ready (for example in a button click handler) getting the result in the `target`.

Push line -- push items into an Observer:

```text
pipeline + target = Observer
```

Both pipeline types have independant implementations: one based on iterables and another one based on observers. The main package entry point exports `pull` pipelines as the most commonly used type and some basic ES utils. If you need `push` pipelines, import them manually from `undercut/src/push.js`. There is also `undercut/src/pull.js` entry point if you what to import just `pull lines` without utils.

## Pull

Pull lines are bases on Iterables:

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

`Pull` is the most used type of pipelines. Pull lines are re-usable if the source is re-iterable.

To use pull lines you need to import from the default `undercut` entry point or alternative `undercut/src/push.js`.

Terms in releation to `pull lines`:

- `iterable` -- an object implementing the [Iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol).
- `operation` -- a function taking an `iterable` and returning another `iterable`.
- `pipeline` -- an ordered sequence of `operations` (means an `array` of `functions`).
- `source` -- an `iterable` which items will be processed. Many native objects are iterable out of the box: arrays, maps, sets, strings.
- `target` -- a function for extracting the result of pipeline execution. Takes an `iterable` and returns some value. Many native functions behave this way: `Array.from()`, `new Map()`, `Object.fromEntries()`, etc. Targets provided by the `undercut` are mostly wrappers around those native functions/constructors. Feel free to use the originals.

### Core pull functions

#### `composeOperations(pipeline) => operation`

Composes several existing operations into a new one.

```js
import { composeOperations, pull, flatten, zip, toArray } from "undercut";

function interleave(...sources) {
    const pipeline = [
        zip(...sources),
        flatten()
    ];

    return composeOperations(pipeline);
}

const source = [1, 3, 5];

const result = pullItems([interleave([2, 4, 6])], source);

console.log(result); // [1, 2, 3, 4, 5, 6]
```

#### `pull(target, pipeline, source) => targetResult`

Executes the pipeline by pulling items from the source to the target and returns target's value.

```js
import { pull, filter, map, skip, toArray } from "undercut";

const source = [1, 2, 3, 4, 5, 6, 7];

const result = pull(toArray, [
    skip(2),
    filter(x => x % 3 === 0),
    map(x => x * 2)
], source);

console.log(result); // [8, 10, 14]
```

#### `pullItems(pipeline, source) => array`

Same as `pull`, but target is set to `toArray`.

```js
import { pullItems, filter, map, skip, toArray } from "undercut";

const source = [1, 2, 3, 4, 5, 6, 7];

const result = pullItems([
    skip(2),
    filter(x => x % 3 === 0),
    map(x => x * 2)
], source);

console.log(result); // [8, 10, 14]
```

#### `pullLine(pipeline, source) => Iterable`

Creating a `pull line` directly is useful when you want to pass it somewhere or being able to re-evaluate the result again in the future. Does exactly that.

```js
import { pullLine, append, compact, skip, toArray } from "undercut";

const source = [0, 1, 2, 3];

const myItems = pullLine([
    append(4, 5),
    compact(),
    skip(2)
], source); // No evaluation happens at this step.

const result1 = toArray(myItems);

console.log(result1); // [3, 4, 5]

source.push(7); // Modify the source and re-evaluate.

const result2 = toArray(myItems);

console.log(result2); // [3, 7, 4, 5]
```

### Creating your own pull operation

`undercut` is built on top of existing JavaScript protocols and features like generators:

```js
function pow(exponent) { // #1. Start with an operation factory.
    return function* (iterable) { // #2. Return the operation itself.
        for (const item of iterable) { // #3. Iterate over.
            const newItem = Math.pow(item, exponent); // #4. Do your stuff.

            yield newItem; // #5. Pass something further.
        }
    };
}

const source = [1, 2, 3];

const result = pull(toArray, [pow(2)], source);

console.log(result); // [1, 4, 9]
```

1. Operation factory captures arguments (if there is any) and may provide some additional logic/state to the operation.
2. Operation function itself. It's super convenient to use Generators for building an operation, but it may be a regular function too. During pipeline execution it will be called with an iterable containing items from the previous pipeline stage.
3. Inside the operation usually you want to iterate over provided items.
4. And do something with them or even throw them away and build new ones.
5. When you have something to pass further down the pipeline, just provide it to the `yield` operator (a feature of Generators).

### Using different pull targets or calling them directly

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

Push lines are based on Observers:

```typescript
interface Observer {
    next(value? : any) : void;
    return(value? : any) : void;
    throw(error) : void;
}
```

`Push` is used less often than `pull` and has an independant implementation. Push lines aren't re-usable and you **must** close the iterator when you're done with it by calling `.return()` method. Closing the observer also signals `end-of-sequence`. Many operation wait till they gather all items, so they may continue. The `.throw()` method allows to cancel execution at any time.

To use push lines you need to import from `undercut/src/push.js` entry point.

Terms in releation to `push lines`:

- `observer` -- an object implementing the `Observer protocol`.
- `operation` -- a function taking an `observer`, having no return value, and getting items by `yielding`.
- `pipeline` -- an ordered sequence of `operations` (means an `array` of `functions`).
- `source` -- there is no real `source` in `push lines`, because someone need to manually put items into the `observer`, but several `push` functions can help to push an `iterable` into it for you.
- `target` -- an `observer` that will receive the results.

### Core push functions

#### `composeOperations(pipeline) => operation`

Composes several existing operations into a new one.

```js
import { composeOperations, push, flatten, zip, toArray } from "undercut/src/push.js";

function interleave(...sources) {
    const pipeline = [
        zip(...sources),
        flatten()
    ];

    return composeOperations(pipeline);
}

const source = [1, 3, 5];

const result = pushItems([interleave([2, 4, 6])], source);

console.log(result); // [1, 2, 3, 4, 5, 6]
```

#### `push(target, pipeline, source) => target`

Executes the pipeline by pushing items from the source to the target and returns target back.

```js
import { push, filter, map, skip, toArray } from "undercut/src/push.js";

const source = [1, 2, 3, 4, 5, 6, 7];

const target = push(toArray(), [
    skip(2),
    filter(x => x % 3 === 0),
    map(x => x * 2)
], source);

// `toArray` target has `values` property.
console.log(target.values); // [8, 10, 14]
```

#### `pushItems(pipeline, source) => array`

Same as `push`, but target is set to `toArray` and `values` are returned.

```js
import { pushItems, filter, map, skip, toArray } from "undercut/src/push.js";

const source = [1, 2, 3, 4, 5, 6, 7];

const result = pushItems([
    skip(2),
    filter(x => x % 3 === 0),
    map(x => x * 2)
], source);

console.log(result); // [8, 10, 14]
```

#### `pushLine(pipeline, target) => Observer`

Creates an `observer` (`push line`) which accepts items. Usually, you will push an item in an event handler like button click, etc.

```js
import { pushLine, append, compact, skip, toArray } from "undercut/src/push.js";

const target = toArray();

const numbersObserver = pushLine([
    append(4, 5),
    compact(),
    skip(2)
], target); // No evaluation happens at this step.

[0, 1, 2, 3].forEach(x => numbersObserver.next(x)); // Push items.

numbersObserver.return(); // Close the observer.

console.log(target.values); // [3, 4, 5]
```

### Creating your own push operation

`undercut` is built on top of existing JavaScript protocols and features like generators:

```js
import { closeObserver } from "undercut/src/push.js";

function pow(exponent) { // #1. Start with an operation factory.
    return function* (observer) { // #2. Return the operation itself.
        try { // #3.
            while (true) { // #4
                const item = yield; // #5
                const newItem = Math.pow(item, exponent); // #6

                observer.next(newItem); // #7
            }
        } catch (e) { // #8
            observer.throw(e); // #9
        } finally { // #10.
            // #11 (optional)
            closeObserver(observer); // #12
        }
    };
}

const source = [1, 2, 3];

const result = pushItems([pow(2)], source);

console.log(result); // [1, 4, 9]
```

1. Operation factory captures arguments (if there is any) and may provide some additional logic/state to the operation.
2. Operation function itself. It's super convenient to use Generators for building an operation, but it may be a regular function too. During pipeline execution it will be called with an observer you need to pass items to.
3. `try-catch-finally` block should cover all possible scenarios like cancellation and `end-of-sequence`.
4. An observer waits for new items until `.return()` was called and `yield` exits the function.
5. Get an item by `yielding`.
6. Do your job.
7. When you need to pass something down the pipleline, do this by calling `observer.next()`.
8. `yield` will throw on calling `.throw()` method. This means a cancellation of the execution. Usually, you want to set some flag and check it later in `finally`.
9. Propagate the error down the pipeline by calling `observer.throw()`.
10. You will get here in case of both `end-of-sequence` and cancellation.
11. If you have some work to do after you've seen all items, you can do it here (even pass items). It is also a good place to clean up your resources.
12. Close the observer.

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
