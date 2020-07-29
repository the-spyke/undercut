---
title: Promise Utilities
---

Function creating promises or making their use more convenient.

- [delay](#delay)
- [unwrapPromise](#unwrappromise)
- [wait](#wait)

### delay

`delay(promise, time) => Promise`

Returns a new Promise that waits `time` more miliseconds after the `promise` fulfills returning its result.

### unwrapPromise

`unwrapPromise() => object`

Creates a new Promise and returns it together with its `resolve`/`reject` functions as properties.

### wait

`wait(time) => Promise`

Returns a Promise fulfilling after `time` miliseconds.
