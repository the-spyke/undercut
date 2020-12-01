# @undercut/utils

Generic JavaScript utilities for objects/promises/comparison/etc.

The package is a part of the larger [Undercut](https://github.com/the-spyke/undercut) project. Please visit [undercut.js.org](https://undercut.js.org) for overview and documentation.

## Usage

```js
import { isNumberValue } from "@undercut/utils";

console.log(isNumberValue(123)); // true
console.log(isNumberValue("hello")); // false
console.log(isNumberValue(NaN)); // false
```

## Installation

`@undercut/utils` complies with the [Raw Module Specification](https://github.com/the-spyke/rms) and provides original modern JavaScript code in the `ESM` format. It is very convenient for apps using Webpack/Babel/etc, and will help to avoid double compilation and deoptimization. Only [finished proposals (Stage 4)](https://github.com/tc39/proposals/blob/master/finished-proposals.md) may be used in its codebase. The code is universal and may be used in Node/Browser/microwave.

Don't forget check that `/node_modules/@undercut/` isn't excluded from compilation and `core-js@3` polyfill or analogue is in place.

```sh
npm install @undercut/utils
# or
yarn add @undercut/utils
```

### Updating

The process is as descibed in `RMS`: before upgrading the `Undercut` to a newer version, please upgrade `@babel/preset-env` and `core-js` packages to their latest versions too.

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
