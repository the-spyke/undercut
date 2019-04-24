# ✂ undercut ✂

[![npm version](https://img.shields.io/npm/v/undercut.svg?style=flat-square)](https://www.npmjs.com/package/undercut)
[![npm downloads](https://img.shields.io/npm/dm/undercut.svg?style=flat-square)](https://www.npmjs.com/package/undercut)
[![license](https://img.shields.io/npm/l/undercut.svg?style=flat-square)](https://github.com/the-spyke/undercut/blob/master/LICENSE)

JavaScript data processing pipelines and utilities.

Goals:

* All-in-one library for data processing
* Simple API: not too imperative, not too functional
* Lazy evaluation when possible
* Use existing protocols and existing JS ecosystem
* Easy extensibility
* Raw code in the npm package (compile in place)
* Pure ES Modules, Node 12 compliance
* Tree shaking friendly
* Typings

## Installation

```sh
npm install --save undercut
# or
yarn add undercut
```

## Usage

By using latest JS syntax you could get more precise and optimized code. Delivering ES Modules makes dependencies clean and gives more possibilities of tree shaking. Modern applications are trying to leverage this power and compile their code with [Babel](https://babeljs.io/) or other compilers.

`undercut` follows this trend and provides raw code in the package, so you could get better browser/node experience and customize for your needs.

```js
import { pull, filter, map, skip, toArray } from "undercut";

const data = [1, 2, 3, 4, 5, 6, 7];

const result = pull(toArray, [
    skip(2),
    filter(x => x % 3 === 0),
    map(x => x * 2) // will be executed only 3 times
], data);

console.log(result); // [8, 10, 14]
```

The `pull` function immediately pulls all items froms the source data and applies operations in order to them: `(target, operations, source) => result`. The `target` is a function extracting results from the pipeline. It has a single argument which is an `iterable`, its return type will be the return type of the `pull`. The `operations` is an array of operations you want to apply to the data. The `source` is an `iterable`: arrays, maps, sets, strings, etc.

You can also create pull lines (operations bound to some data) and reuse them later:

```js
import { pullLine, append, compact, skip, toArray } from "undercut";

const data = [0, 1, 2, 3];
const line = pullLine([
    append(4, 5),
    compact(),
    skip(2)
], data);

const result1 = toArray(line); // [3, 4, 5]

data.push(7);

const result2 = toArray(line); // [3, 7, 4, 5]
```

You can create you own operations too. `undercut` is built on top of existing JavaScript protocols and generators:

```js
function pow(exponent) {
    return function* (iterable) {
        for (const item of iterable) {
            yield Math.pow(item, exponent);
        }
    };
}

const data = [1, 2, 3];
const result = pull(toArray, [
    pow(2)
], data); // [1, 4, 9]
```

Targets `toArray()`, `toMap()`, and soem others are just shortcuts for `Array.from`, `new Map()`, etc. Many native objects support iterables in their constructors, pull lines are iterables too:

```js
const results1 = pull(Array.from, operations, data);
// or even
const results2 = Array.from(pullLine(operations, data));
```

There're more than 40 operations for pull lines in `0.1.0`. You may look for more examples in unit tests while the documentation is under construction.

Push lines work by creating a pipeline and pushing items individually over time. Basically, they are Observables. Push lines and async iteration aren't ready yet.

## Milestones

* 0.1.0 - [2019-04-22] - MVP, test concepts and API convenience
* 0.2.0 - [2019-05-06] - TBD

## TODO

* Work out entry point exports
* Performance tests/comparison
* Documentation
* TypeScript
* CI
* Push pipelines
* Async iteration
* Code coverage
* Node precompiled packages
* Browser precompiled package

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
