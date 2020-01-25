# ✂ undercut ✂

[![downloads](https://img.shields.io/npm/dm/@undercut/utils)](https://www.npmjs.com/package/@undercut/utils)
[![circleci](https://circleci.com/gh/the-spyke/undercut.svg?style=shield)](https://circleci.com/gh/the-spyke/undercut)
[![codecov](https://codecov.io/gh/the-spyke/undercut/branch/master/graph/badge.svg)](https://codecov.io/gh/the-spyke/undercut)
[![license](https://img.shields.io/npm/l/undercut.svg)](https://github.com/the-spyke/undercut/blob/master/LICENSE)

JavaScript data processing pipelines and utilities. Use native Iterators/Generators/Observers like it's 2015 already.

- Based on existing JS protocols and language features
- Balanced API: not too imperative, not too functional
- Easy operation extensibility and composability
- Pure ES Modules with Node 13 loader compliance
- Raw code in the packages + precompiled versions
- Lazy evaluation when possible
- Tree shaking friendliness

## Installation

There are 3 main packages:

- [`@undercut/pull`](https://www.npmjs.com/package/@undercut/pull) -- exports Pull Lines (Iterables).
- [`@undercut/push`](https://www.npmjs.com/package/@undercut/push) -- exports Push Lines (Observers).
- [`@undercut/utils`](https://www.npmjs.com/package/@undercut/utils) -- exports all the various JavaScript utilities.

These packages are the intended way to use `Undercut`. They carry `stable ES Next` code. It is very convenient for apps using Webpack/Babel/etc, and will help to avoid double compilation and deoptimization. Only [finished proposals (Stage 4)](https://github.com/tc39/proposals/blob/master/finished-proposals.md) may be used in its codebase. The code is universal and may be used in Node/Browser/microwave.

Don't forget to check that `/node_modules/@undercut/` isn't excluded from compilation and `core-js@3` polyfill or analogue is in place.

Package main entry points are stable, so any export removal/renaming is as a breaking change.

```sh
npm install @undercut/pull
# or
yarn add @undercut/pull
```

### Additional packages

Several precompiled packages are available:

- [`@undercut/cli`](https://www.npmjs.com/package/@undercut/cli) -- provides a command line interface for processing data with JavaScript and `undercut` in a shell. Accepts string items from `stdin` and puts results as strings into `stdout`. Works on Node.js 10.13 and upwards.
- [`@undercut/node-10`](https://www.npmjs.com/package/@undercut/node-10) -- a precompiled CommonJS version for Node.js 10.13 and upwards. Requires stable polyfills from `core-js@3`.
- [`@undercut/web-2019`](https://www.npmjs.com/package/@undercut/web-2019) -- a precompiled version for web browsers not older than `2019-01-01`. Creates `undercut` variable in the global scope, may also be used by CJS/AMD loaders. Requires stable polyfills from `core-js@3`.

### Updating `undercut`

If you're upgrading `Undercut` to a newer version, please upgrade `@babel/preset-env` and `core-js` packages to the latest versions too.

## Usage

```js
import { pullArray, filter, map, skip } from "@undercut/pull";

const source = [1, 2, 3, 4, 5, 6, 7];

const result = pullArray([
    skip(2),
    filter(x => x % 3),
    map(x => x * 2) // Will be executed only 3 times.
], source);

console.log(result); // [8, 10, 14]
```

## Concepts

*\* Please visit the website for full documentation or look in the `docs` folder.*

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

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
