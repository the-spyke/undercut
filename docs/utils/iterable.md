---
title: Iterable Utilities
---

- `createIterable(function) => Iterable` -- makes an `Iterable` from a provided function. It could be a generator or a factory, but must return a new `Iterator` every time.
- `getIterator(iterable) => Iterator` -- calls the `Symbol.iterator` method of the `iterable` for you.
- `getRecursiveMapper(predicate, mapper) => Mapper` -- creates a mapper function to use with the `map` operation. Converts every incomming item into an Iterable of all nested bubitems. The `predicate` helps to choose if the item should be iterated. The `mapper`, if specified, allows to convert the item before checking it with the `predicate` and iterating over it.
- `peekIterable(iterable) => item` -- returns the first item of the `iterable` or `undefined`.
