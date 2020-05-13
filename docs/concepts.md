---
title: Concepts
---

`Undercut` helps constructing pipelines for data processing. Instead of creating new concepts it leverages existing JavaScript protocols and features like [Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) and [Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).

`Pipelines` is just a term for ordered sequences of operations (just like a conveyor on a factory). Imagine you want to process a bunch of `source` items and put the result items into a `target`.

```text
source ----> [ op_0 | op_1 | ... | op_N ] ----> target
                       pipeline
```

Depending on the fact whether the `source` items are or aren't yet available you will have two different approaches: [pull](#pull) and [push](#push).

### Pull

If `source` items **are** available at the moment of execution, we can *pull* items from it one by one and process them synchronously. `Undercut` call this a `Pull Line`. It is created by combining a `source` and a `pipeline` into an `Iterable`. This `Iterable` may be passed around and used by any native ES construct like `for-of` loop to read the result. `Undercut` also provides a bunch of `target` helpers for one-line extracting results out of Iterables into common structures like arrays/objects/maps/etc.

Pull Line -- pull items from an Iterable:

```js
const source = [0, 1, 2, 3];
const pipeline = [
    append(4, 5),
    compact(),
    skip(2)
];

// source + pipeline = Iterable
const iterable = pullLine(pipeline, source);
```

Read more about [pull](pull/overview).

### Push

If `source` items are **not** available at the moment of execution, we have to process items as they appear. We can do this by *pushing* items into a `Push Line`. It is created by combining a `pipeline` and a `target` into an `Observer`. `Observers` are convenient in use cases like reacting on a button click and may be passed around or used by several producers.

Push line -- push items into an Observer:

```js
const target = toArray();
const pipeline = [
    append(4, 5),
    compact(),
    skip(2)
];

// pipeline + target = Observer
const observer = pushLine(pipeline, target);
```

Of course, you can process synchronous items with `Push Lines` too, but `Pull Lines` are easier to operate and write operations for.

Read more about [push](push/overview).
