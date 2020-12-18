---
title: Introduction
---

JavaScript lazy data processing, pipelines, and language utilities built around native JS features and protocols.

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

- [@undercut/pull](pull/overview) -- Pipelines on Iterables.
- [@undercut/push](push/overview) -- Pipelines on Observers.
- [@undercut/utils](utils/overview) -- Generic utilities for type checking, common functions, iterables, objects, promises, randomization, etc.

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

[@undercut/cli](cli/overview) package provides a command line interface for processing data with JavaScript and operations from Undercut in a shell. It allows you to pass strings from `stdin`, get results in `stdout`, and much more. Works on Node.js 10.13 and upwards.

```sh
$ cat strings.txt | undercut 'map(s => s.trim())' 'filter(s => s.length > 10)'
Hello world!
A very long string...

$ undercut -s 'range(0, 5)' 'map(Math.sqrt)' 'sum()'
6.146264369941973
```

## Precompiled packages

- [@undercut/node-10](packages#undercutnode-10) -- A precompiled CommonJS version for Node.js 10.13 and upwards. Requires stable polyfills from `core-js@3`.
- [@undercut/web-2019](packages#undercutweb-2019) -- A precompiled version for web browsers not older than `2019-01-01`. Creates `undercut` variable in the global scope, may also be used by CJS/AMD loaders. Requires stable polyfills from `core-js@3`.
