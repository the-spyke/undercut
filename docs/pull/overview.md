---
title: Pull Overview
---

`Pull Lines` are bases on `Iterables`:

```typescript
interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
}

interface Iterator<T> {
    next(): IteratorResult<T>;
    return?(): void;
}

interface IteratorResult<T> {
    value: T;
    done: boolean;
}
```

`Pull` is the most used type of pipelines. A `Pull Line` is re-usable if its source is re-iterable.

Terms in releation to `Pull Lines`:

- `iterable` -- an object implementing the [Iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol).
- `operation` -- a function taking an `Iterable` of source items and returning an `Iterable` of result items.
- `pipeline` -- an ordered sequence (array) of `operations`.
- `source` -- an `Iterable` which items will be processed. Many native objects are `Iterable` out of the box: arrays, maps, sets, strings.
- `target` -- a function for extracting the result out of pipeline. Takes an `Iterable` and returns some value. Many native functions behave this way: `Array.from()`, `new Map()`, `Object.fromEntries()`, etc. `Targets` provided by `undercut` are mostly wrappers around those native functions/constructors for convenience. Feel free to use the originals.

```typescript
type PullOperation = <T, R>(iterable: Iterable<T>) => Iterable<R>;

type PullPipeline = Array<PullOperation>;

type PullTarget = <T, R>(iterable: Iterable<T>) => R;
```
