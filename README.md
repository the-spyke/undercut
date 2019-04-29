# ✂ undercut ✂

[![npm version](https://img.shields.io/npm/v/undercut.svg?style=flat-square)](https://www.npmjs.com/package/undercut)
[![npm downloads](https://img.shields.io/npm/dm/undercut.svg?style=flat-square)](https://www.npmjs.com/package/undercut)
[![license](https://img.shields.io/npm/l/undercut.svg?style=flat-square)](https://github.com/the-spyke/undercut/blob/master/LICENSE)

JavaScript data processing pipelines and utilities.

Goals:

- Simple API: not too imperative, not too functional
- Lazy evaluation when possible
- Use existing protocols and existing JS ecosystem
- Easy extensibility
- Raw code in the npm package (compile in place)
- Pure ES Modules, Node 12 compliance
- Tree shaking friendly
- Typings

## Installation

```sh
npm install --save undercut
# or
yarn add undercut
```

`undercut` provides raw latest ES code in the package, **don't forget** to include its directory into [Babel](https://babeljs.io/) config or another compiler you use.

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

### Main concepts

- `operation` -- a function taking an `iterable` and returning another `iterable`. Will be applied to the data source's items.
- `pipeline` -- an ordered sequence of `operation`s. May be an `array` or any `iterable`.
- `source` -- an `iterable` which items will be processed. Many native objects are iterable out of the box: arrays, maps, sets, strings.
- `target` -- a function for extracting the result of a pipeline execution. Takes an `iterable` and returns some value. Many native functions do this: `Array.from()`, `new Map()`, `Object.fromEntries()`, etc. Targets provided by the `undercut` are just wrappers around those native functions/constructors for convenience.
- `pull` -- a function that immediately pulls all items from the data `source` through the `pipeline` to the `target`: `pull(target, pipeline, source) => result`. The return value of the `target` is the return value of the `pull()` call.
- `pull line` -- an `iterable` that binds a `pipeline` and a data `source`. It's made with `createPullLine()` function that takes a `pipeline` and a data `source` as arguments and returns an `iterable` -- the `pull line`. Pull lines are useful when you want to pass a result somewhere without evaluating it first or being able to recalcualte the result several times.

### Examples

Creating a pull line and reusing it later:

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

Using different targets or calling them directly:

```js
pull(Array.from, pipeline, data);
// or
Array.from(createPullLine(pipeline, data));
// or
toArray(createPullLine(pipeline, data));
```

Creating your own operations is simple. `undercut` is built on top of existing JavaScript protocols and features like generators:

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

Composing several existing operations into a new one:

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

### Tips

There're more than 40 operations for pull lines in `0.1.0`. You may look for more examples in unit tests while the documentation is under construction.

Push lines work by creating a pipeline and pushing items individually over time. Basically, they are Observables. Push lines and async iteration aren't ready yet.

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
