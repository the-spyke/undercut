# @undercut/node-10

A precompiled CommonJS version of the [undercut](https://github.com/the-spyke/undercut) packages for Node.js 10 LTS and upward. Contains `pull`, `push`, and `utils` entries. An easy way to try `Undercut` when your project has no build step or you're doing a quick experiment.

Please visit [undercut.js.org](https://undercut.js.org) for overview and documentation.

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

### Prerequisites

You need to import `core-js@3` (or another similar polyfill) before you import `Undercut`:

```js
// index.js
require("core-js/es");
```

### Updating

If you're upgrading `Undercut` to a newer version, please upgrade `core-js` to the latest versions too.

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
