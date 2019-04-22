# ✂ undercut ✂

JavaScript data processing pipelines and utilities.

## Installation

```sh
npm install --save undercut
# or
yarn add undercut
```

## Usage

By using latest JS syntax you could get more precise and optimized code. Delivering ES Modules makes dependencies clean and gives more possibilities of tree shaking. Modern applications are trying to leverage this power and compile their code with [Babel](https://babeljs.io/) or other compilers. `undercut` follows this trend and provides raw code in the package, so you could get better browser/node experience and customize for your needs.

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

Licensed under the MIT License.
