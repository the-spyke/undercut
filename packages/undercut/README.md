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
npm install --save undercut
# or
yarn add undercut
```

`undercut` provides raw Stage 4 ECMAScript code in the package, **don't forget** to include its `node_modules` directories into [Babel](https://babeljs.io/) config or another compiler of your choice.

## Usage

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
