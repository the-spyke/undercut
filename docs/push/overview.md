---
title: Push Overview
---

`Push Lines` are based on `Observers` (which are a sub-type of Coroutines):

```typescript
interface Observer<T> {
    next(value : T): void;
    return?(): void;
    throw?(error): void;
}
```

`Push` is used less often than `Pull` and has an independent implementation. `Push Lines` are **not** re-usable and you **must** close the `observer` when you're done with it by calling its `.return()` method. Closing the `observer` also signals `end-of-sequence` (many operations wait till they gather all items, until they could continue). The `.throw()` method allows to cancel execution at any time.

To use `Push Lines` you need to import from `@undercut/push` entry point.

Terms in releation to `Push Lines`:

- `observer` -- an object implementing the `Observer protocol`.
- `operation` -- a function taking an `observer` accepting result items and returning an `observer` accepting source items.
- `pipeline` -- an ordered sequence (array) of `operations`.
- `source` -- there is no real `source` in `Push Lines`, because someone need to manually put items into the `observer`, but several `push` functions can help you to process `iterables` with `Push Lines`.
- `target` -- an `observer` that will receive the result.

```typescript
type PushOperation = <T, R>(observer: Observer<T>) => Observer<R>;

type PullPipeline = Array<PushOperation>;

type PushTarget = Observer<T>;
```
