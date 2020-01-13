---
title: Utils Overview
---

`@undercut/utils` package provides various JavaScript utilities.

## Installation

`@undercut/utils` carries `stable ES Next` code. It is very convenient for apps using Webpack/Babel/etc, and will help to avoid double compilation and deoptimization. Only [finished proposals (Stage 4)](https://github.com/tc39/proposals/blob/master/finished-proposals.md) may be used in its codebase. The code is universal and may be used in Node/Browser/microwave.

Don't forget check that `/node_modules/@undercut/` isn't excluded from compilation and `core-js@3` polyfill or analogue is in place.

```bash
npm install @undercut/utils
# or
yarn add @undercut/utils
```

### Updating

If you're upgrading `undercut` to a newer version, please upgrade `@babel/preset-env` and `core-js` packages to the latest versions too.

## Usage

```js
import { isNumberValue } from "@undercut/utils";

console.log(isNumberValue(123)); // true
console.log(isNumberValue("hello")); // false
console.log(isNumberValue(NaN)); // false
```
