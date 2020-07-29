---
title: Introduction
---

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

- [@undercut/pull](docs/pull/overview) -- Pull Lines (Iterables).
- [@undercut/push](docs/push/overview) -- Push Lines (Observers).
- [@undercut/utils](docs/utils/overview) -- Various JavaScript language utilities.

These packages are the intended way to use `Undercut` and carry `stable ES Next` code in the `ESM` format. It is very convenient for apps using Webpack/Babel/etc, and helps to avoid double compilation and deoptimization. Only [finished proposals (Stage 4)](https://github.com/tc39/proposals/blob/master/finished-proposals.md) may be used in their codebase. The code itself is universal and may be used in Node/Browser/Microwave. Your environment may require `core-js@3` or similar polyfill to use them raw.

Checkout our [CodeSandbox demo](https://codesandbox.io/s/undercut-demo-1up46?fontsize=14&hidenavigation=1&moduleview=1&theme=dark&previewwindow=console) on how easy it is to use.

Package main entry points are stable, so any export removal/renaming is as a breaking change.

```bash
npm install @undercut/pull
# or
yarn add @undercut/pull
```

### Additional packages

Several [precompiled packages](docs/packages) are available too:

- [@undercut/cli](docs/cli/overview) -- A command line interface for processing data with JavaScript and `Undercut` in a shell. Accepts string items from `stdin` and puts results as strings into `stdout`. Works on Node.js 10.13 and upwards.
- [@undercut/node-10](docs/packages#undercutnode-10) -- A precompiled CommonJS version for Node.js 10.13 and upwards. Requires stable polyfills from `core-js@3`.
- [@undercut/web-2019](docs/packages#undercutweb-2019) -- A precompiled version for web browsers not older than `2019-01-01`. Creates `undercut` variable in the global scope, may also be used by CJS/AMD loaders. Requires stable polyfills from `core-js@3`.

### Updating

If you're updating `Undercut` to a newer version, please update `@babel/preset-env` and `core-js` packages to the latest versions too.
