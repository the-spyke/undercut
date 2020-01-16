---
title: Introduction
---

`Undercut` is a JavaScript library for building data processing pipelines. It also provides general purpose utilities.

- Based on existing JS protocols and language features
- Balanced API: not too imperative, not too functional
- Easy operation extensibility and composability
- Pure ES Modules with Node 13 loader compliance
- Raw code in the packages + precompiled versions
- Lazy evaluation when possible
- Tree shaking friendliness

## Installation

There are 3 main packages:

- [`@undercut/pull`](pull/overview) -- exports Pull Lines (Iterables).
- [`@undercut/push`](push/overview) -- exports Push Lines (Observers).
- [`@undercut/utils`](utils/overview) -- exports all the various JavaScript utilities.

These packages are the intended way to use `undercut` and carry `stable ES Next` code. It is very convenient for apps using Webpack/Babel/etc, and will help to avoid double compilation and deoptimization. Only [finished proposals (Stage 4)](https://github.com/tc39/proposals/blob/master/finished-proposals.md) may be used in its codebase. The code is universal and may be used in Node/Browser/microwave.

Don't forget to check that `/node_modules/@undercut/` isn't excluded from compilation and `core-js@3` polyfill or analogue is in place.

Package main entry points are stable, so any export removal/renaming is as a breaking change.

```bash
npm install @undercut/pull
# or
yarn add @undercut/pull
```

### Additional packages

Several [precompiled packages](precompiled) are available too:

- `@undercut/cli`
- `@undercut/node-10`
- `@undercut/web-2019`

### Updating `undercut`

If you're updating `undercut` to a newer version, please update `@babel/preset-env` and `core-js` packages to the latest versions too.

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
