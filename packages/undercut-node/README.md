# @undercut/node

[![downloads](https://img.shields.io/npm/dm/@undercut/node)](https://www.npmjs.com/package/@undercut/node)
[![circleci](https://circleci.com/gh/the-spyke/undercut.svg?style=shield)](https://circleci.com/gh/the-spyke/undercut)
[![codecov](https://codecov.io/gh/the-spyke/undercut/branch/master/graph/badge.svg)](https://codecov.io/gh/the-spyke/undercut)
[![license](https://img.shields.io/npm/l/undercut.svg)](https://github.com/the-spyke/undercut/blob/master/LICENSE)

A precompiled version of the [Undercut](https://github.com/the-spyke/undercut) packages for Node.js 12.17 LTS and upward. Contains `pull`, `push`, `utils` entries. An easy way to use the `Undercut` when your Node app has no build step.

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

Usage is similar to the original raw packages.

```js
imprt { pullArray, filter, map, skip } from "@undercut/node/pull";

const source = [1, 2, 3, 4, 5, 6, 7];

const result = pullArray([
    skip(2),
    filter(x => x % 3),
    map(x => x * 2) // Will be executed only 3 times.
], source);

console.log(result); // [8, 10, 14]
```

```js
import { isNumberValue } from "@undercut/node/utils";

console.log(isNumberValue(123)); // true
console.log(isNumberValue("hello")); // false
console.log(isNumberValue(NaN)); // false
```

### Prerequisites

You may need to import `core-js@3` (or another similar polyfill) before you import the `Undercut`:

```js
// index.js
import "core-js/es/index.js";

import { pull } from "@undercut/node/pull";
```

## Installation

```sh
npm install @undercut/node
# or
yarn add @undercut/node
```

## Updating

If you're upgrading `@undercut/node` to a newer version, please upgrade `core-js` to the latest version too.

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
