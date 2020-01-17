---
id: composing-operations-in-the-undercut
title: Composing operations in the undercut
tags: [pull, operation, tutorial]
---

Writing your own operations isn't difficult in the [undercut](https://undercut.js.org), but sometimes is not the quickest/easiest solution.

Many operations by their nature contain steps from more simple operations. For example, the `interleave` operation. You have several sources and need to output items from them in a Round-robin fashion:

```js
const source_1 = [1, 3, 5];
const source_2 = [2, 4, 6];

const expected_result = [1, 2, 3, 4, 5, 6];
```

<!--truncate-->
If you look at the result from a different angle, you may see groups of items from each source:

```js
[ [1, 2], [3, 4], [5, 6] ]
```

This looks like a result of a `zip` operation. That's right, you may write your own `interleave` using two operations:

1. `zip` to get an item from each source.
2. `flatten` to get rid of excess square brackets.

But how to make a single operation out of two? There's a [core](https://undercut.js.org/docs/pull/core-functions) function `composeOperations` which does exactly that: creates a new operation out of a sequence of existing operations. This is how it looks in action:

```js
import { composeOperations, flattenArrays, zip } from "@undercut/pull";

export function interleave(...sources) {
    const operations = [
        zip(...sources),
        flattenArrays()
    ];

    return composeOperations(operations);
}
```

And you can use it as any other operation:

```js
const source = [1, 3, 5];

const result = pullArray([
    interleave([2, 4, 6])
], source);

console.log(result); // [1, 2, 3, 4, 5, 6]
```

*\* We're using `pull` in examples, but `push` has the same principles.*

But there may be cases when you need to share a state between operations. If you'll do it right inside the `interleave` function, then it will be shared between all `interleave` invocations, which makes the operation non-reiterable. Hopefully, `composeOperations` can take a function instead of an array.

Let's do a more advanced example and write an implementation of a `chunk` operation. `Chunk` splits source items into chunks, so we need to store a chunk somewhere before passing it further.

To make things more interesting, let's do an internet challenge and use `filter` and `map` operations. It isn't effective, but whatever, we could even call it `chonk`:

```js
import { composeOperations, concatEnd, filter, forEach, map } from "@undercut/pull";

function chonk(size) {
    return composeOperations(() => {
        const chunks = [];

        return [
            forEach(x => chunks.length ? chunks[0].push(x) : chunks.push([x])),
            filter(() => chunks[0].length >= size),
            map(() => chunks.pop()),
            concatEnd(chunks)
        ];
    });
}
```

The argument function returns an array of operations that should be composed and may store some state in its closure.

The logic inside is complicated, but such was the challenge. We're memoizing incoming items (`forEach`) in an array while its length is less than `size` and not passing anything further until the chunk is full (`filter`). When the chunk is full, we pass the last item and swap it with the chunk itself (`map`). In the end, `concatEnd` will help in case if the last `chunk` wasn't filled up and swapped.

And it works:

```js
const source = [1, 2, 3, 4, 5, 6, 7];

const result = pullArray([
    chonk(3)
], source);

console.log(result); // [[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7 ]]
```

`Undercut` is built around pipelines, and the sequence of operations that we pass into `composeOperations` looks like a pipeline itself. Using this coincidence and knowing that an operation is a function taking and returning an Iterable, we can also rewrite the `chonk` in a totally different manner:

```js
export function chonk(size) {
    return function (iterable) {
        const chunks = [];
        const operations = [
            forEach(x => chunks.length ? chunks[0].push(x) : chunks.push([x])),
            filter(() => chunks[0].length >= size),
            map(() => chunks.pop()),
            concatEnd(chunks)
        ];

        return pullLine(operations, iterable);
    }
}
```

The `pullLine` function returns an Iterable, and that is exactly what we need. The variant with `composeOperations` is more intuitive, precise, and tells more about the intent.

In general, operation composition may be short, practical, and help in real code. Examples with the `chunk/chonk` might get you and idea of how it works inside.
