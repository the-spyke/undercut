# @undercut/push

This package provides the `push` functionality and is a part of the larger [undercut](https://github.com/the-spyke/undercut) project.

## Installation

`@undercut/push` carries `stable ES Next` code. It is very convenient for apps using Webpack/Babel/etc, and will help to avoid double compilation and deoptimization. Only [finished proposals (Stage 4)](https://github.com/tc39/proposals/blob/master/finished-proposals.md) may be used in its codebase. The code is universal and may be used in Node/Browser/microwave.

Don't forget check that `/node_modules/@undercut/` isn't excluded from compilation and `core-js@3` polyfill or analogue is in place.

```sh
npm install @undercut/push
# or
yarn add @undercut/push
```

### Updating

If you're upgrading `undercut` to a newer version, please upgrade `@babel/preset-env` and `core-js` packages to the latest versions too.

## Usage

```js
import { pushArray, filter, map, skip } from "@undercut/push";

const source = [1, 2, 3, 4, 5, 6, 7];

const result = pushArray([
    skip(2),
    filter(x => x % 3),
    map(x => x * 2) // Will be executed only 3 times.
], source);

console.log(result); // [8, 10, 14]
```

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
