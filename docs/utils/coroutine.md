---
title: Coroutine Utilities
---

Corutines are processes with an API of a Generator Object. So, an Observer is a Coroutine. The point is that the process is controllable with `next` and `return` methods to `start` and `stop` Coroutines respectively.

### abort

`abort(coroutine, error) => never`

Helps to call coroutine's `throw` method.

### asObserverFactory

`asObserver(generator) => Observer`

Wraps a generator function to automatically call `next` method once right after creation. Observers (unlike other coroutines) must be ready to accept items immidietly and don't return any value. In this case the first `next` only starts the observer.

### asUnclosable

`asUnclosable(coroutine) => Coroutine`

Creates a new coroutine forwarding `next` calls, but skipping `return` calls. This way you may guard an observer from being closed.

### close

`close(coroutine, tryBeforeClosing) => TryBeforeClosingReturnValue`

Closes the `coroutine` after passing it into optional `tryBeforeClosing` function allowing you to do something with it without manually writing `try/finally` block.

### Cohort

`Cohort`

A helper class representing a group of several coroutines (iterables, observers, etc) intended to abort/close together. It has some flags to check useful in the `close` callback. See examples in `push` operations code.
