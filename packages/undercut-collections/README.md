# @undercut/collections

[![downloads](https://img.shields.io/npm/dm/@undercut/collections)](https://www.npmjs.com/package/@undercut/collections)
[![circleci](https://circleci.com/gh/the-spyke/undercut.svg?style=shield)](https://circleci.com/gh/the-spyke/undercut)
[![codecov](https://codecov.io/gh/the-spyke/undercut/branch/master/graph/badge.svg)](https://codecov.io/gh/the-spyke/undercut)
[![rms](https://img.shields.io/badge/RMS-0.3.0-blue)](https://github.com/the-spyke/rms)
[![license](https://img.shields.io/npm/l/undercut.svg)](https://github.com/the-spyke/undercut/blob/master/LICENSE)

Useful collections and data structures. The code is universal and works in Node/browser/microwave.

- Based on existing JS protocols and language features
- Balanced API: not too imperative, not too functional
- Composability and extensibility by design
- Pure ES Modules with Node 14 loader compliance
- Tree shaking friendliness
- No external dependencies
- TypeScript in JSDoc

Please visit [undercut.js.org](https://undercut.js.org) for broader overview and documentation.

## Usage

```js
import { MinHeap } from "@undercut/collections";

const heap = MinHeap.of(9, 6, 1, 7, 2);

const min = heap.pop(); // 1

console.log(heap.peek()); // 2
```

## Prerequisites

The package is compliant with the [Raw Module Specification 0.3.0](https://github.com/the-spyke/rms) and provides original modern JavaScript code in the `ESM` format.

You may need to compile the code and/or load polyfills depending on your environment. Look for exact minimum versions of `@babel/preset-env` and `core-js` in the `package.json`.

Most modern apps already have such infrastructure or use similar tools. So most likely you don't have to do anything. If not, just add [Babel](https://babeljs.io/setup) to your build step.

## Installation

```sh
npm install @undercut/collections
# or
yarn add @undercut/collections
```

## Updating

As descibed in [RMS](https://github.com/the-spyke/rms): in case of upgrading the package to a newer version, please do so for `@babel/preset-env` and `core-js` too.

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
