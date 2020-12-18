# @undercut/pull

[![downloads](https://img.shields.io/npm/dm/@undercut/pull)](https://www.npmjs.com/package/@undercut/pull)
[![circleci](https://circleci.com/gh/the-spyke/undercut.svg?style=shield)](https://circleci.com/gh/the-spyke/undercut)
[![codecov](https://codecov.io/gh/the-spyke/undercut/branch/master/graph/badge.svg)](https://codecov.io/gh/the-spyke/undercut)
[![rms](https://img.shields.io/badge/RMS-0.3.0-blue)](https://github.com/the-spyke/rms)
[![license](https://img.shields.io/npm/l/undercut.svg)](https://github.com/the-spyke/undercut/blob/master/LICENSE)

Lazy data processing and pipelines built around native JS Iterators and Generators. You may also use it as a replacement for Lodash's `chain`. The code is universal and works in Node/browser/microwave.

- Based on existing JS protocols and language features
- Balanced API: not too imperative, not too functional
- Composability and extensibility by design
- Custom operations in a couple of lines
- Pure ES Modules with Node 14 loader compliance
- Lazy evaluation when possible
- Tree shaking friendliness
- No external dependencies
- TypeScript in JSDoc
- [RMS 0.3.0](https://github.com/the-spyke/rms)

Please visit [undercut.js.org](https://undercut.js.org) for broader overview and documentation.

## Usage

[![Undercut Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/undercut-demo-1up46?fontsize=14&hidenavigation=1&moduleview=1&theme=dark&previewwindow=console&file=/pull.js)

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

## Prerequisites

The package is compliant with the [Raw Module Specification 0.3.0](https://github.com/the-spyke/rms) and provides original modern JavaScript code in the `ESM` format.

You may need to compile the code and/or load polyfills depending on your environment. Look for exact minimum versions of `@babel/preset-env` and `core-js` in the `package.json`.

Most modern apps already have such infrastructure or use similar tools. So most likely you don't have to do anything. If not, just add [Babel](https://babeljs.io/setup) to your build step.

## Installation

```sh
npm install @undercut/pull
# or
yarn add @undercut/pull
```

## Updating

As descibed in [RMS](https://github.com/the-spyke/rms): in case of upgrading the package to a newer version, please do so for `@babel/preset-env` and `core-js` too.

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
