# ✂ undercut ✂

[![Join the chat at https://gitter.im/undercutjs/community](https://badges.gitter.im/undercutjs/community.svg)](https://gitter.im/undercutjs/community)
[![npm version](https://img.shields.io/npm/v/undercut.svg)](https://www.npmjs.com/package/undercut)
[![npm downloads](https://img.shields.io/npm/dm/undercut.svg)](https://www.npmjs.com/package/undercut)
[![License](https://img.shields.io/npm/l/undercut.svg)](https://github.com/the-spyke/undercut/blob/master/LICENSE)

JavaScript data processing pipelines and utilities.

Goals:

- Balanced API: not too imperative, not too functional
- Lazy evaluation when possible
- Use existing JS protocols and language features
- Easy extensibility
- Replace `Lodash.chain()`
- Raw code in the npm package (compile in place)
- Pure ES Modules with Node 12 compliance
- Tree shaking friendly
- Good test coverage

## Installation

```sh
npm install --save undercut
# or
yarn add undercut
```

`Undercut` provides raw latest ES code in the package, **don't forget** to include its directory into [Babel](https://babeljs.io/) config or another compiler you use.

## Usage

```js
import { pull, filter, map, skip, toArray } from "undercut";

const data = [1, 2, 3, 4, 5, 6, 7];

const result = pull(toArray, [
    skip(2),
    filter(x => x % 3 === 0),
    map(x => x * 2) // Will be executed only 3 times.
], data);

console.log(result); // [8, 10, 14]
```

### Concepts

`Undercut` helps constructing pipelines for data processing. Instead of creating new concepts `undercut` leverages existing JavaScript protocols and features like [Iterable & Iterator protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) and [Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).

`Pipelines` are just ordered sequences of operations on data `source` items.

```text
source ----> [ op_0 | op_1 | ... | op_N ] ----> target
                       pipeline
```

Depending on the fact whether the data is or isn't yet available there are two different pipeline types: `pull` and `push`.

In `pull` pipelines the data `source` items are available at the moment of execution, so everything is synchronous and based on iteration. The `source` and the `pipeline` are combined into an `iterable` (called a `pull line`) which then is passed to the `target` function. The `target` drives the entire execution by iterating the provided `pull line`, i.e. pulling all items from the `source` through the `pipeline`.

`Push` pipelines are useful when data `source` items are unavailable or can't be calculated synchronously. In this case you want to define what to do when an item appears and where to put the result by creating a `push line`. Later at some moment in time you will `push` items into the `push line` or using it as an `observer`.

### Pull

Terms in releation to `pull lines`:

- `operation` -- a function taking an `iterable` and returning another `iterable`.
- `pipeline` -- an ordered sequence of `operations`. May be an `array` or any `iterable`.
- `source` -- an `iterable` which items will be processed. Many native objects are iterable out of the box: arrays, maps, sets, strings.
- `target` -- a function for extracting the result of a pipeline execution. Takes an `iterable` and returns some value. Many native functions behave this way: `Array.from()`, `new Map()`, `Object.fromEntries()`, etc. Targets provided by the `undercut` are just wrappers around those native functions/constructors. Feel free to use the originals.

The interaction is based mostly on calling `createPullLine()` and `pull()` functions:

- `createPullLine(pipeline, target) => Iterable`

  Creating a `pull line` directly is useful when you want to pass it somewhere or being able to re-evaluate the result several times in a row.
- `pull(target, pipeline, source) => any`

  A convenience function that calls `createPillLine()` and `target()` for you. You saw an example [earlier](#usage).

*There're more than 40 operations for pull lines in `0.1.0`. You may look for more examples in unit tests while the documentation is under construction. There is also a document with [Undercut to Lodash mappings](https://docs.google.com/spreadsheets/d/1SdEfGV-pxTXi9Ur3Lw7IjDo2VVkz_EExUHmPrxRu_do).*

#### Creating a pull line and reusing it later

```js
import { createPullLine, append, compact, skip, toArray } from "undercut";

const data = [0, 1, 2, 3];

const pullLine = createPullLine([
    append(4, 5),
    compact(),
    skip(2)
], data); // No evaluation happens at this step.

const result1 = toArray(pullLine); // [3, 4, 5]

data.push(7);

const result2 = toArray(pullLine); // [3, 7, 4, 5]
```

#### Using different targets or calling them directly

```js
pull(Array.from, pipeline, data);
// or
Array.from(createPullLine(pipeline, data));
// or
toArray(createPullLine(pipeline, data));
```

#### Creating your own operation

`undercut` is built on top of existing JavaScript protocols and features like generators:

```js
function pow(exponent) {
    return function* (iterable) {
        for (const item of iterable) {
            yield Math.pow(item, exponent);
        }
    };
}

const data = [1, 2, 3];

const result = pull(toArray, [pow(2)], data); // [1, 4, 9]
```

#### Composing several existing operations into a new one

```js
import { composeOperations, pull, flatten, zip, toArray } from "undercut";

function interleave(...sources) {
    const pipeline = [
        zip(...sources),
        flatten()
    ];

    return composeOperations(pipeline);
}

const data = [1, 3, 5];

const result = pull(toArray, [
    interleave([2, 4, 6])
], data); // [1, 2, 3, 4, 5, 6]
```

### Push

Push lines and async iteration aren't implemented yet.

## TODO

- Work out entry point exports
- Performance tests/comparison
- Documentation
- TypeScript type definitions
- CI
- Push pipelines
- Async iteration
- Code coverage
- Node precompiled packages
- Browser precompiled package

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
