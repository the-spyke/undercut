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
* Pure ES Modules
* Tree shaking friendly
* Typings

Milestones:

* 0.1.0 - [2019-04-22] - MVP, test concepts and API convenience
* 0.2.0 - [2019-05-06] - TBD

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

You can also create pipleline instances (operations bound to some data) and reuse them later:

```js
import { pullLine, append, compact, skip, toArray } from "undercut";

const data = [0, 1, 2, 3];
const line = pullLine([
    append(4, 5),
    compact(),
    skip(2)
], data);

const result1 = toArray(line); // [3, 4, 5]
```

You can easily create you own custom operations. `undercut` is built on available JavaScript infrastructure such as Iterator protocol and generators:

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

Targets `toArray()`, `toMap()`, and others are just shortcuts for `Array.from`, `new Map()`, and others. So, you can do this because of how the Itarable protocol works in JS:

```js
pull(Array.from, pipeline, data);
// or even
const results = new Map(pipeline);
```

You may look for more examples in unit tests while the documentation is under construction.

## TODO

* Node 12 ES Modules compliance
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
