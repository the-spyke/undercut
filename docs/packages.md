---
title: Precompiled Packages
---

### `@undercut/cli`

Provides a command line interface for processing data with JavaScript and `undercut` in a shell. Accepts string items from `stdin` and puts results as strings into `stdout`. This package works on Node.js 10.13 and upwards.

[Full documentation.](cli/overview)

### `@undercut/node-10`

A precompiled CommonJS version of `pull/push/utils` packages for Node.js 10.13 and upwards. Requires stable polyfills from `core-js@3`.

Usage is similar to original packages:

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

### `@undercut/web-2019`

A precompiled version of `pull/push/utils` packages for web browsers not older than `2019-01-01`. Creates `undercut` variable in the global scope, may also be used by CJS/AMD loaders. Requires stable polyfills from `core-js@3`.

Usage is similar to original packages, but supports different loading styles. Import desired entry first:

```js
// When using as a script tag and its global variable:
const { pullArray, filter, map, skip } = undercut.pull;
// When using as a CommonJS module:
const { pullArray, filter, map, skip } = require("@undercut/web-2019/pull");
// When using local copy as an AMD module:
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
