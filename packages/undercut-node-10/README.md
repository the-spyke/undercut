# ✂ undercut-node-10 ✂

An official prebuilt CommonJS version of the [undercut](https://www.npmjs.com/package/undercut) package for Node.js 10. An easy way to try the `undercut` when your project isn't built or doesn't have Babel yet.

## Installation

```sh
npm install undercut-node-10
# or
yarn add undercut-node-10
```

You may also try [Yarn aliases](https://yarnpkg.com/en/docs/cli/add#toc-yarn-add-alias) for convenience:

```sh
yarn add undercut@npm:undercut-node-10
```

### Prerequisites

You need to import `core-js@3` somewhere at the very beginning of you app. Like so:

```js
// index.js
require("core-js/es");
// ...
const undercut = require("undercut-node-10");
```

## Usage

Same as for the `undercut`, but imports should be from the `undercut-node-10` if you aren't using Yarn aliases.

Please check [GitHub repo](https://github.com/the-spyke/undercut) for more detailed documentation and examples.

[![Edit undercut-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/undercut-example-9g1nh?fontsize=14&module=%2Fsrc%2Findex.js)

```js
import { pull, filter, map, skip, toArray } from "undercut";

const source = [1, 2, 3, 4, 5, 6, 7];

const result = pull(toArray, [
    skip(2),
    filter(x => x % 3 === 0),
    map(x => x * 2) // Will be executed only 3 times.
], source);

console.log(result); // [8, 10, 14]
```

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
