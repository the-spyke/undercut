# ✂ undercut ✂

JavaScript data processing pipelines and utilities.

## Installation

```sh
npm install --save undercut
# or
yarn add undercut
```

## Usage

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
