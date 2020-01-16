---
title: Core Push Functions
---

### `composeOperations(operations) => PushOperation`

Composes several existing operations into a new one.

```js
import { composeOperations, pushArray, flatten, zip } from "@undercut/push";

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

const result = pushArray(pipeline, source);

console.log(result); // [1, 2, 3, 4, 5, 6]
```

### `push(target, pipeline, source) => target`

Executes the pipeline by pushing items from an iterable source to the target and returns the target back.

```js
import { push, filter, map, skip, toArray } from "@undercut/push";

const source = [1, 2, 3, 4, 5, 6, 7];
const pipeline = [
    skip(2),
    filter(x => x % 3),
    map(x => x * 2)
];
const target = toArray();

const target2 = push(target, pipeline, source); // target2 === target

// `toArray` target has `values` property.
console.log(target.values); // [8, 10, 14]
```

### `pushArray(pipeline, source) => Array`

Same as `push`, but target is implicitly set to `toArray()` and its `values` property is returned.

```js
import { pushArray, filter, map, skip } from "@undercut/push";

const source = [1, 2, 3, 4, 5, 6, 7];
const pipeline = [
    skip(2),
    filter(x => x % 3),
    map(x => x * 2)
];

const result = pushArray(pipeline, source);

console.log(result); // [8, 10, 14]
```

### `pushLine(pipeline, target) => Observer`

Creates a `Push Line`.

Usually, you will push an item in an event handler like button click, etc.

```js
import { pushLine, append, compact, skip, toArray } from "@undercut/push";

const target = toArray();
const pipeline = [
    append(4, 5),
    compact(),
    skip(2)
];

const numbersObserver = pushLine(pipeline, target); // No evaluation happens at this step.

[0, 1, 2, 3].forEach(x => numbersObserver.next(x)); // Push items.

numbersObserver.return(); // Close the observer.

console.log(target.values); // [3, 4, 5]

useClosable(pushLine(pipeline, target), o => [1, 2, 3].forEach(x => o.next(x)));
```
