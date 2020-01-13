---
title: Promise Utils
---

- `delay(promise, time) => Promise` -- returns a new Promise that waits `time` more miliseconds after the `promise` fulfills returning its result.
- `unwrapPromise() => object` -- creates a new Promise and returns it together with its `resolve`/`reject` functions as properties.
- `wait(time) => Promise` -- returns a Promise fulfilling after `time` miliseconds.
