---
title: Pull Targets
---

- `toArray() => PullTarget` -- returns a function that pulls an iterable into an array.
- `toConsumer(consumer) => PullTarget` -- returns a function that pulls an iterable an passes items one-by-one into the `consumer` function.
- `toMap() => PullTarget` -- returns a function that pulls an iterable into a Map. So, items must be `[key, value]`.
- `toNull() => PullTarget` -- returns a function that pulls an iterable and does nothing with the items.
- `toObject() => PullTarget` -- returns a function that pulls an iterable into an object. So, items must be `[key, value]` and keys will be stringified.
- `toObserver(observer) => PullTarget` -- returns a function that pulls and pushed item one-by-one into the specified observer.
- `toSet() => PullTarget` -- returns a function that pulls an iterable into a Set.
- `toValue() => PullTarget` -- returns a function that pulls the first item of the iterable and returns it or `undefined`.
