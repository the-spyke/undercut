---
title: Introduction
---

`Undercut` is a JavaScript library for building data processing pipelines. It also provides general purpose utilities.

- Based on existing JS protocols and language features
- Balanced API: not too imperative, not too functional
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

- [@undercut/pull](pull/overview) -- provides Pull Lines (Iterables).
- [@undercut/push](push/overview) -- provides Push Lines (Observers).
- [@undercut/utils](utils/overview) -- provides all the various JavaScript utilities.

These packages are the intended way to use `Undercut` and carry `stable ES Next` code in the `ESM` format. It is very convenient for apps using Webpack/Babel/etc, and will help to avoid double compilation and deoptimization. Only [finished proposals (Stage 4)](https://github.com/tc39/proposals/blob/master/finished-proposals.md) may be used in its codebase. The code is universal and may be used in Node/Browser/microwave. Don't forget to check that `/node_modules/@undercut/` isn't excluded from compilation and `core-js@3` polyfill or analogue is in place.

If you're scared of written above, checkout our [CodeSandbox demo](https://codesandbox.io/s/undercut-demo-1up46?fontsize=14&hidenavigation=1&moduleview=1&theme=dark&previewwindow=console) on how easy it's to use.

Package main entry points are stable, so any export removal/renaming is as a breaking change.

```bash
npm install @undercut/pull
# or
yarn add @undercut/pull
```

### Additional packages

Several [precompiled packages](precompiled) are available too:

- [@undercut/cli](cli/overview) -- provides a command line interface for processing data with JavaScript and `Undercut` in a shell. Accepts string items from `stdin` and puts results as strings into `stdout`. Works on Node.js 10.13 and upwards.
- [@undercut/node-10](packages#undercutnode-10) -- a precompiled CommonJS version for Node.js 10.13 and upwards. Requires stable polyfills from `core-js@3`.
- [@undercut/web-2019](packages#undercutweb-2019) -- a precompiled version for web browsers not older than `2019-01-01`. Creates `undercut` variable in the global scope, may also be used by CJS/AMD loaders. Requires stable polyfills from `core-js@3`.

### Updating

If you're updating `Undercut` to a newer version, please update `@babel/preset-env` and `core-js` packages to the latest versions too.
