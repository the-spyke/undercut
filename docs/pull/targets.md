---
title: Pull Targets
---

Pull targets are functions taking iterables and returning some values.

- [toArray](#toarray)
- [toConsumer](#toconsumer)
- [toMap](#tomap)
- [toObject](#toobject)
- [toObserver](#toobserver)
- [toValue](#tovalue)

### toArray

`toArray() => PullTarget`

Returns a function that pulls an iterable into an array.

### toConsumer

`toConsumer(consumer) => PullTarget`

Returns a function that pulls an iterable an passes items one-by-one into the `consumer` function.

### toMap

`toMap() => PullTarget`

Returns a function that pulls an iterable into a Map. So, items must be `[key, value]`.

### toNull

`toNull() => PullTarget`

Returns a function that pulls an iterable and does nothing with the items.

### toObject

`toObject() => PullTarget`

Returns a function that pulls an iterable into an object. So, items must be `[key, value]` and keys will be stringified.

### toObserver

`toObserver(observer) => PullTarget`

Returns a function that pulls and pushed item one-by-one into the specified observer.

### toSet

`toSet() => PullTarget`

Returns a function that pulls an iterable into a Set.

### toValue

`toValue() => PullTarget`

Returns a function that pulls the first item of the iterable and returns it or `undefined`.
