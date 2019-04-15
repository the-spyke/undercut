# ✂ undercut ✂

JavaScript data processing pipelines and utilities

Goals:

* Lazy evaluation
* Based on the Iterator protocol
* No precompilation, use your own
* ES Modules only
* Tree shaking friendly
* No dependencies

## Installation

```sh
npm install --save undercut
# or
yarn add undercut
```

## Usage

By using latest JS syntax you could get more precise and optimized code. Delivering ES Modules makes dependencies clean and gives more possibilities of tree shaking. Modern applications are trying to leverage this power and compile their code with Babel or other compilers. `undercut` follows this trend and provides raw code in the package, so you could get best browser and Node experience or customize for your needs.

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

## TODO

* Node 12 ES Modules compliance
* More operations and sources/targets
* Utilities
* Unit tests
* Work out entry point exports
* Performance tests/comparison
* Documentation
* Typings
* CI
* Push pipelines
* Async iteration and operations
* Code coverage
* Node precompiled packages
* Browser precompiled package

## License

Licensed under the MIT License, see [LICENSE.md](LICENSE.md) for more information!
