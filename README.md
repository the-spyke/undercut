# ✂ undercut ✂

[![downloads](https://img.shields.io/npm/dm/@undercut/pull)](https://www.npmjs.com/package/@undercut/pull)
[![circleci](https://circleci.com/gh/the-spyke/undercut.svg?style=shield)](https://circleci.com/gh/the-spyke/undercut)
[![codecov](https://codecov.io/gh/the-spyke/undercut/branch/master/graph/badge.svg)](https://codecov.io/gh/the-spyke/undercut)
[![netlify](https://api.netlify.com/api/v1/badges/61838e27-0d07-49d4-a295-2d1ab2d91c4d/deploy-status)](https://app.netlify.com/sites/undercut/deploys)
[![license](https://img.shields.io/npm/l/undercut.svg)](https://github.com/the-spyke/undercut/blob/master/LICENSE)

JavaScript data processing pipelines and utilities. Use native JS features without framework overhead.

- Based on existing JS protocols and language features
- Balanced API: not too imperative, not too functional
- Various language utilities to use instead of Lodash
- Easy operation extensibility and composability
- Pure ES Modules with Node 14 loader compliance
- Raw code in the packages + precompiled versions
- Lazy evaluation when possible
- Tree shaking friendliness

## Usage

[![Undercut Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/undercut-demo-1up46?fontsize=14&hidenavigation=1&moduleview=1&theme=dark&previewwindow=console)

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

## Installation

There are 3 main packages:

- [@undercut/pull](https://www.npmjs.com/package/@undercut/pull) -- Pull Lines (Iterables).
- [@undercut/push](https://www.npmjs.com/package/@undercut/push) -- Push Lines (Observers).
- [@undercut/utils](https://www.npmjs.com/package/@undercut/utils) -- Various JavaScript language utilities.

These packages are the intended way to use `Undercut` and carry `stable ES Next` code in the `ESM` format. It is very convenient for apps using Webpack/Babel/etc, and helps to avoid double compilation and deoptimization. Only [finished proposals (Stage 4)](https://github.com/tc39/proposals/blob/master/finished-proposals.md) may be used in their codebase. The code itself is universal and may be used in Node/Browser/Microwave. Your environment may require `core-js@3` or similar polyfill to use them raw.

Checkout our [CodeSandbox demo](https://codesandbox.io/s/undercut-demo-1up46?fontsize=14&hidenavigation=1&moduleview=1&theme=dark&previewwindow=console) on how easy it is to use.

Package main entry points are stable, so any export removal/renaming is as a breaking change.

```sh
npm install @undercut/pull
# or
yarn add @undercut/pull
```

### Additional packages

Several precompiled packages are available:

- [@undercut/cli](https://www.npmjs.com/package/@undercut/cli) -- A command line interface for processing data with JavaScript and `Undercut` in a shell. Accepts string items from `stdin` and puts results as strings into `stdout`. Works on Node.js 10.13 and upwards.
- [@undercut/node-10](https://www.npmjs.com/package/@undercut/node-10) -- A precompiled CommonJS version for Node.js 10.13 and upwards. Requires stable polyfills from `core-js@3`.
- [@undercut/web-2019](https://www.npmjs.com/package/@undercut/web-2019) -- A precompiled version for web browsers not older than `2019-01-01`. Creates `undercut` variable in the global scope, may also be used by CJS/AMD loaders. Requires stable polyfills from `core-js@3`.

### Updating

If you're upgrading `Undercut` to a newer version, please upgrade `@babel/preset-env` and `core-js` packages to the latest versions too.

## Concepts

> Please visit [undercut.js.org](https://undercut.js.org) for full documentation or look in the [docs](docs/) folder.

`Undercut` helps constructing pipelines for data processing. Instead of creating new concepts it leverages existing JavaScript protocols and features like [Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) and [Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).

`Pipelines` is just a term for ordered sequences of operations (just like a conveyor on a factory). Imagine you want to process a bunch of `source` items and put the result items somewhere (`target`).

```text
source ----> [ op_0 | op_1 | ... | op_N ] ----> target
                       pipeline
```

Depending on the fact whether the `source` items are or aren't yet available you will have two different approaches: [pull](#pull) and [push](#push).

### Pull

If `source` items are available at the moment of execution, we can *pull* items from it one by one and process them synchronously. `Undercut` call this a `Pull Line`. It is created by combining a `source` and a `pipeline` into an `Iterable`. This `Iterable` may be passed around and used by any native ES construct like `for-of` loop to read the result. `Undercut` also provides a bunch of `target` helpers for one-line extracting results out of Iterables into common structures like arrays/objects/maps/etc.

Pull Line -- pull items from an Iterable:

```js
const source = [0, 1, 2, 3];
const pipeline = [
    append(4, 5),
    compact(),
    skip(2)
];

// source + pipeline = Iterable
const iterable = pullLine(pipeline, source);
```

Read more about [pull](https://undercut.js.org/docs/pull/overview).

### Push

If `source` items are **not** available at the moment of execution, we have to process items as they appear. We can do this by *pushing* items into a `Push Line`. It is created by combining a `pipeline` and a `target` into an `Observer`. `Observers` are convenient in use cases like reacting on a button click and may be passed around or used by several producers.

Push line -- push items into an Observer:

```js
const target = toArray();
const pipeline = [
    append(4, 5),
    compact(),
    skip(2)
];

// pipeline + target = Observer
const observer = pushLine(pipeline, target);
```

Of course, you can process synchronous items with `Push Lines` too, but `Pull Lines` are easier to operate and write operations for.

Read more about [push](https://undercut.js.org/docs/push/overview).

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
