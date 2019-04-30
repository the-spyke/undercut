# ✂ undercut ✂

JavaScript data processing pipelines and utilities.

Goals:

- Simple API: not too imperative, not too functional
- Lazy evaluation when possible
- Use existing protocols and existing JS ecosystem
- Easy extensibility
- Raw code in the npm package (compile in place)
- Pure ES Modules, Node 12 compliance
- Tree shaking friendly
- Typings

## Installation

```sh
npm install --save undercut
# or
yarn add undercut
```

`Undercut` provides raw latest ES code in the package, **don't forget** to include its directory into [Babel](https://babeljs.io/) config or another compiler you use.

## Usage

Please check [GitHub](https://github.com/the-spyke/undercut) for more detailed readme.

```js
import { pull, filter, map, skip, toArray } from "undercut";

const data = [1, 2, 3, 4, 5, 6, 7];

const result = pull(toArray, [
    skip(2),
    filter(x => x % 3 === 0),
    map(x => x * 2) // will be executed only 3 times
], data);

console.log(result); // [8, 10, 14]
```

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
