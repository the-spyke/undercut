---
title: Coroutine Utils
---

- `Cohort` -- a helper class to group several coroutines (iterables, observers, etc) and abort/close them together. It has some flags to check useful in the `close` callback. See examples in `push` operations code.
- `abort(coroutine, error) => never` -- helps to call coroutine's `throw` method.
- `asObserver(generator) => Observer` -- wraps a generator function to automatically call `next` method once right after creation. Observers (unlike other coroutines) must be ready to accept items immidietly and don't return any value. In this case the first `next` only starts the observer.
- `asUnclosable(coroutine) => Coroutine` -- creates a new coroutine forwarding `next` calls, but skipping `return` calls. This way you may guard an observer from being closed.
- `close(coroutine, tryBeforeClosing) => TryBeforeClosingReturnValue` -- closes the `coroutine` after passing it into optional `tryBeforeClosing` function allowing you to do something with it without manually writing `try/finally` block.
