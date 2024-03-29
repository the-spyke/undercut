# ✂ undercut ✂

[![downloads](https://img.shields.io/npm/dm/@undercut/pull)](https://www.npmjs.com/package/@undercut/pull)
[![circleci](https://circleci.com/gh/the-spyke/undercut.svg?style=shield)](https://circleci.com/gh/the-spyke/undercut)
[![codecov](https://codecov.io/gh/the-spyke/undercut/branch/master/graph/badge.svg)](https://codecov.io/gh/the-spyke/undercut)
[![rms](https://img.shields.io/badge/RMS-0.3.0-blue)](https://github.com/the-spyke/rms)
[![netlify](https://api.netlify.com/api/v1/badges/61838e27-0d07-49d4-a295-2d1ab2d91c4d/deploy-status)](https://app.netlify.com/sites/undercut/deploys)
[![license](https://img.shields.io/npm/l/undercut.svg)](https://github.com/the-spyke/undercut/blob/master/LICENSE)

Undercut has started as a JavaScript library for lazy data processing and building pipelines. It also provides various language utilities, CLI, and more. The goal is to grow into a Standard Library one day. The code is universal and works in Node/browser/microwave.

- Based on existing JS protocols and language features
- Balanced API: not too imperative, not too functional
- Various language utilities to use as a Standard Library
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

```js
import { isNumberValue } from "@undercut/utils";

console.log(isNumberValue(123)); // true
console.log(isNumberValue("hello")); // false
console.log(isNumberValue(NaN)); // false
```

## Installation

Undercut is split into packages by functionality. `pull` and `push` provide pipelines for data processing, language utilities are in `utils`. `cli` allows to use Undercut in a shell.

- [@undercut/pull](https://www.npmjs.com/package/@undercut/pull) -- Pipelines on Iterables.
- [@undercut/push](https://www.npmjs.com/package/@undercut/push) -- Pipelines on Observers.
- [@undercut/utils](https://www.npmjs.com/package/@undercut/utils) -- Generic utilities for type checking, common functions, iterables, objects, promises, randomization, etc.

These packages are the intended way to use `Undercut`. They are compliant with the [Raw Module Specification 0.3.0](https://github.com/the-spyke/rms) and provide original modern JavaScript code in the `ESM` format.

[Precompiled packages are available too.](#precompiled-packages)

You may need to compile the code and/or load polyfills depending on your environment. Look for exact minimum versions of `@babel/preset-env` and `core-js` in the `package.json`.

Most modern apps already have such infrastructure or use similar tools. So most likely you don't have to do anything. If not, just add [Babel](https://babeljs.io/setup) to your build step.

Checkout our [CodeSandbox demo](https://codesandbox.io/s/undercut-demo-1up46?fontsize=14&hidenavigation=1&moduleview=1&theme=dark&previewwindow=console) on how easy it is.

Package main entry points are stable, so any export removal/renaming is a breaking change.

```sh
npm install @undercut/pull
# or
yarn add @undercut/pull
```

## CLI

[@undercut/cli](https://www.npmjs.com/package/@undercut/cli) package provides a command line interface for processing data with JavaScript and operations from Undercut in a shell. It allows you to pass strings from `stdin`, get results in `stdout`, and much more. Works on Node.js 12.17 and upwards.

```sh
$ cat strings.txt | undercut 'map(s => s.trim())' 'filter(s => s.length > 10)'
Hello world!
A very long string...

$ undercut -p -s 'pull.range(0, 5)' 'map(Math.sqrt)' 'sum()'
6.146264369941973
```

## Precompiled packages

- [@undercut/node](https://www.npmjs.com/package/@undercut/node) -- A precompiled version for Node.js 12.17 and upwards. Requires stable polyfills from `core-js@3`.
- [@undercut/web-2019](https://www.npmjs.com/package/@undercut/web-2019) -- A precompiled version for web browsers not older than `2019-01-01`. Creates `undercut` variable in the global scope, may also be used by CJS/AMD loaders. Requires stable polyfills from `core-js@3`.

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
