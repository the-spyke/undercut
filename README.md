# ✂ undercut ✂

JavaScript data processing pipelines and utilities

* Lazy evaluation
* Based on the Iterator protocol
* No precompilation, use your own
* ES Modules only
* Tree shaking friendly
* No dependencies
* Adapters for replacing transient dependencies

## Installation

```sh
npm install --save undercut
# or
yarn add undercut
```

## Usage

`undercut` is an ES Module and use latest JS syntax. This means you get more precise and cleaner code + tree shaking support. To leverage with power and extract as much browser performance as possible, you need to compile `undercut` together with your own app. Nowadays, the most of the apps use Babel or other compiler anyway, so it shouldn't be difficult.

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
* `lodash` adapter package
* `underscore` adapter package

## License

Licensed under the MIT License, see [LICENSE.md](LICENSE.md) for more information!
