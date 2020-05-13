# @undercut/pull

This package provides the `pull` functionality and is a part of the larger [undercut](https://github.com/the-spyke/undercut) project.

Please visit [undercut.js.org](https://undercut.js.org) for overview and documentation.

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

## Installation

`@undercut/pull` carries `stable ES Next` code in the `ESM` format. The code is universal and may be used in Node/Browser/microwave.

Don't forget check that `/node_modules/@undercut/` isn't excluded from compilation and `core-js@3` polyfill or analogue is in place.

```sh
npm install @undercut/pull
# or
yarn add @undercut/pull
```

### Updating

If you're upgrading `undercut` to a newer version, please upgrade `@babel/preset-env` and `core-js` packages to the latest versions too.

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
