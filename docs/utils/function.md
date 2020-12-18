---
title: Function Utilities
---

Functions implementing common logic like `noop()`.

### getDoneItem

`getDoneItem(value) => IteratorResult`

Returns an `IteratorResult` with `done` set to `true`.

### identity

`identity(value) => value`

Returns the same `value` the was provided as the first argument.

### negate

`negate(value) => boolean`

Inverts the sign of the numeric `value`.

### noop

`noop() => void`

An empty function.

### not

`not(value) => number`

Performs boolean not `!` operation with the vale.

### rethrow

`rethrow(error) => never`

Immidietly throws provided `error`.
