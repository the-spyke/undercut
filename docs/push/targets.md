---
title: Push Targets
---

Push targets are just observers.

### toArray

`toArray() => Observer`

Returns an observer that saves all items into an array. The observer has the `values` property to access this array.

### toConsumer

`toConsumer(consumer, finalizer) => Observer`

Returns an observer that passes items into the `consumer`. On `end-of-sequence` or error the `finalizer` will be called with the `error` (if any, or `undefined`) and items `count`.

### toNull

`toNull() => Observer`

Returns an observer that does nothing.

### toValue

`toValue() => Observer`

Returns an observer that saves the first item into the own `value` property. There's also `hasValue` property to check if there was an item at all.
