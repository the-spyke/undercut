# ✂ undercut ✂

JavaScript data processing pipelines and utilities. Use native Iterators/Generators/Observers like it's 2015 already.

- Based on existing JS protocols and language features
- Balanced API: not too imperative, not too functional
- Easy operation extensibility and composability
- Pure ES Modules with Node 12 loader compliance
- Raw code in packages (compile in place)
- Lazy evaluation when possible
- Tree shaking friendliness
- 90% test coverage
- SemVer

## Installation

```sh
npm install undercut
# or
yarn add undercut
```

### Prerequisites

Make sure that you're using latest `babel@7` and `core-js@3` and `node_modules/undercut` isn't excluded from compilation in Babel/Webpack/etc configuration.

More and more applications `compile` their code these days, so `undercut` carries `raw stable ES Next` code in its npm package to avoid double compilation and deoptimization. Only [finished proposals (Stage 4)](https://github.com/tc39/proposals/blob/master/finished-proposals.md) may be used in its codebase. This appraoch allows for cleaner and more precise code in the repo for us, and more optimal code in the browser/node for you.

## Usage

[![Edit undercut-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/undercut-example-9g1nh?fontsize=14&module=%2Fsrc%2Findex.js)

Please check [GitHub](https://github.com/the-spyke/undercut) for more detailed readme.

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
