# @undercut/utils

[![downloads](https://img.shields.io/npm/dm/@undercut/utils)](https://www.npmjs.com/package/@undercut/utils)
[![circleci](https://circleci.com/gh/the-spyke/undercut.svg?style=shield)](https://circleci.com/gh/the-spyke/undercut)
[![codecov](https://codecov.io/gh/the-spyke/undercut/branch/master/graph/badge.svg)](https://codecov.io/gh/the-spyke/undercut)
[![rms](https://img.shields.io/badge/RMS-0.3.0-blue)](https://github.com/the-spyke/rms)
[![license](https://img.shields.io/npm/l/undercut.svg)](https://github.com/the-spyke/undercut/blob/master/LICENSE)

JavaScript utilities for type checking, arrays, comparison, common functions, iterables, objects, promises, randomization, etc. The code is universal and works in Node/browser/microwave.

- Based on existing JS protocols and language features
- Composability and extensibility by design
- Pure ES Modules with Node 14 loader compliance
- Tree shaking friendliness
- No external dependencies
- TypeScript in JSDoc
- [RMS 0.3.0](https://github.com/the-spyke/rms)

Please visit [undercut.js.org](https://undercut.js.org) for broader overview and documentation.

## Usage

[![Undercut Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/undercut-demo-1up46?fontsize=14&hidenavigation=1&moduleview=1&theme=dark&previewwindow=console&file=/utils.js)

```js
import { isNumberValue } from "@undercut/utils";

console.log(isNumberValue(123)); // true
console.log(isNumberValue("hello")); // false
console.log(isNumberValue(NaN)); // false
```

## Prerequisites

The package is compliant with the [Raw Module Specification 0.3.0](https://github.com/the-spyke/rms) and provides original modern JavaScript code in the `ESM` format.

You may need to compile the code and/or load polyfills depending on your environment. Look for exact minimum versions of `@babel/preset-env` and `core-js` in the `package.json`.

Most modern apps already have such infrastructure or use similar tools. So most likely you don't have to do anything. If not, just add [Babel](https://babeljs.io/setup) to your build step.

## Installation

```sh
npm install @undercut/utils
# or
yarn add @undercut/utils
```

## Updating

As descibed in [RMS](https://github.com/the-spyke/rms): in case of upgrading the package to a newer version, please do so for `@babel/preset-env` and `core-js` too.

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
