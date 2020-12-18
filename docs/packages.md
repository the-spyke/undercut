---
title: Precompiled packages
---

## `@undercut/node-10`

A precompiled CommonJS version of the [Undercut](https://github.com/the-spyke/undercut) packages for Node.js 10 LTS and upward. Contains `pull`, `push`, and `utils` entries. An easy way to try `Undercut` when your project has no build step or you're doing a quick experiment.

### Usage

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

### Installation

```sh
npm install @undercut/node-10
# or
yarn add @undercut/node-10
```

You may also try [Yarn aliases](https://yarnpkg.com/en/docs/cli/add#toc-yarn-add-alias) for convenience:

```sh
yarn add undercut@npm:@undercut/node-10
```

### Updating

If you're upgrading `@undercut/node-10` to a newer version, please upgrade `core-js` to the latest version too.

## `@undercut/web-2019`

A precompiled version of the [Undercut](https://github.com/the-spyke/undercut) packages for [web browsers not older than 2019-01-01](https://browserl.ist/?q=since+2019%2C+edge+>%3D+18%2C+not+android+>+0). Contains `pull`, `push`, and `utils` entries. An easy way to try `Undercut` when your project has no build step or you're doing a quick experiment.

### Usage

Usage is similar to the original `ESM` packages.

Import desired entry first:

```js
// When using as a script tag and its global variable:
const { pullArray, filter, map, skip } = undercut.pull;
// When using as a CommonJS module:
const { pullArray, filter, map, skip } = require("@undercut/web-2019/pull");
// When using as an AMD module:
require(["scripts/undercut/pull.js"], function ({ pullArray, filter, map, skip }) {
    /* Your code */
});
```

*\* There're [example HTML pages](https://github.com/the-spyke/undercut/tree/master/packages/undercut-web-2019/examples) in the repository.*

And then use it in your code:

```js
const source = [1, 2, 3, 4, 5, 6, 7];

const result = pullArray([
    skip(2),
    filter(x => x % 3),
    map(x => x * 2) // Will be executed only 3 times.
], source);

console.log(result); // [8, 10, 14]
```

```js
console.log(isNumberValue(123)); // true
console.log(isNumberValue("hello")); // false
console.log(isNumberValue(NaN)); // false
```

### Prerequisites

You need to import `core-js@3` (or another similar polyfill) before you import `Undercut`:

```html
<!-- index.html -->
<script src="https://unpkg.com/core-js-bundle@^3/minified.js"></script>
```

### Installation

Install the `npm` package if you're using some kind of a bundler:

```sh
npm install @undercut/web-2019
# or
yarn add @undercut/web-2019
```

Or use the [unpkg](https://unpkg.com) CDN to import scripts by their URLs:

```html
<script src="https://unpkg.com/@undercut/web-2019/pull.js"></script>
<script src="https://unpkg.com/@undercut/web-2019/push.js"></script>
<script src="https://unpkg.com/@undercut/web-2019/utils.js"></script>
```

You may also try [Yarn aliases](https://yarnpkg.com/en/docs/cli/add#toc-yarn-add-alias) for convenience:

```sh
yarn add undercut@npm:@undercut/web-2019
```

### Updating

If you're upgrading `@undercut/web-2019` to a newer version, please upgrade `core-js` to the latest version too.
