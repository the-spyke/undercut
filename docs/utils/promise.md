---
title: Promise Utilities
---

Functions for creating promises or making their usage more convenient.

### delay

`delay(promise, time) => Promise`

Returns a new Promise that waits `time` more miliseconds after the `promise` fulfills returning its result.

### unwrapPromise

`unwrapPromise() => object`

Creates a new Promise and returns it together with its `resolve`/`reject` functions as properties.

### wait

`wait(time) => Promise`

Returns a Promise fulfilling after `time` miliseconds.
