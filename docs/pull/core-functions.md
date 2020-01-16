---
title: Core Pull Functions
---

### `composeOperations(operations) => PullOperation`

Composes several existing operations into a new one.

```js
import { composeOperations, pullArray, flatten, zip } from "@undercut/pull";

function interleave(...sources) {
    const operations = [
        zip(...sources),
        flatten()
    ];

    return composeOperations(operations);
}

const source = [1, 3, 5];
const pipeline = [
    interleave([2, 4, 6])
];

const result = pullArray(pipeline, source);

console.log(result); // [1, 2, 3, 4, 5, 6]
```

### `pull(target, pipeline, source) => TargetReturnValue`

Executes the pipeline by pulling items from the source to the target and returns target's return value.

```js
import { pull, filter, map, skip, toArray } from "@undercut/pull";

const source = [1, 2, 3, 4, 5, 6, 7];
const pipeline = [
    skip(2),
    filter(x => x % 3),
    map(x => x * 2)
];

const result = pull(toArray(), pipeline, source);

console.log(result); // [8, 10, 14]
```

### `pullArray(pipeline, source) => Array`

Same as `pull`, but target is implicitly set to `toArray()`.

```js
import { pullArray, filter, map, skip } from "@undercut/pull";

const source = [1, 2, 3, 4, 5, 6, 7];
const pipeline = [
    skip(2),
    filter(x => x % 3),
    map(x => x * 2)
];

const result = pullArray(pipeline, source);

console.log(result); // [8, 10, 14]
```

### `pullLine(pipeline, source) => Iterable`

Creates a `Pull Line`.

Useful when you want to pass it somewhere or being able to re-evaluate the result again in the future.

```js
import { pullLine, append, compact, skip } from "@undercut/pull";

const source = [0, 1, 2, 3];
const pipeline = [
    append(4, 5),
    compact(),
    skip(2)
];

const myItems = pullLine(pipeline, source); // No evaluation happens at this step.

const result1 = Array.from(myItems);

console.log(result1); // [3, 4, 5]

source.push(7); // Modify the source and re-evaluate. Pull Line has a reference to the source.

const result2 = Array.from(myItems);

console.log(result2); // [3, 7, 4, 5]
```
