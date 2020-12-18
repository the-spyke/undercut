# @undercut/node-10

[![downloads](https://img.shields.io/npm/dm/@undercut/node-10)](https://www.npmjs.com/package/@undercut/node-10)
[![circleci](https://circleci.com/gh/the-spyke/undercut.svg?style=shield)](https://circleci.com/gh/the-spyke/undercut)
[![codecov](https://codecov.io/gh/the-spyke/undercut/branch/master/graph/badge.svg)](https://codecov.io/gh/the-spyke/undercut)
[![license](https://img.shields.io/npm/l/undercut.svg)](https://github.com/the-spyke/undercut/blob/master/LICENSE)

A precompiled CommonJS version of the [Undercut](https://github.com/the-spyke/undercut) packages for Node.js 10 LTS and upward. Contains `pull`, `push`, and `utils` entries. An easy way to try `Undercut` when your project has no build step or you're doing a quick experiment.

Lazy data processing, pipelines, and language utilities built around native JS features and protocols.

- Based on existing JS protocols and language features
- Balanced API: not too imperative, not too functional
- Various language utilities to use as a Standard Library
- Composability and extensibility by design
- Custom operations in a couple of lines
- Lazy evaluation when possible
- No external dependencies
- TypeScript in JSDoc

Please visit [undercut.js.org](https://undercut.js.org) for broader overview and documentation.

## Usage

Usage is similar to the original `ESM` packages.

```js
const { pullArray, filter, map, skip } = require("@undercut/node-10/pull");

const source = [1, 2, 3, 4, 5, 6, 7];

const result = pullArray([
    skip(2),
    filter(x => x % 3),
    map(x => x * 2) // Will be executed only 3 times.
], source);

console.log(result); // [8, 10, 14]
```

```js
const { isNumberValue } = require("@undercut/node-10/utils");

console.log(isNumberValue(123)); // true
console.log(isNumberValue("hello")); // false
console.log(isNumberValue(NaN)); // false
```

### Prerequisites

You may need to import `core-js@3` (or another similar polyfill) before you import `Undercut`:

```js
// index.js
require("core-js/es");
```

## Installation

```sh
npm install @undercut/node-10
# or
yarn add @undercut/node-10
```

You may also try [Yarn aliases](https://yarnpkg.com/en/docs/cli/add#toc-yarn-add-alias) for convenience:

```sh
yarn add undercut@npm:@undercut/node-10
```

## Updating

If you're upgrading `@undercut/node-10` to a newer version, please upgrade `core-js` to the latest version too.

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
