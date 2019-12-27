# Operations

## Common operations

These operations exist in both `pull` and `push` versions:

- `append(...items)` -- adds its arguments to the end of the sequence.
- `average()` -- reduces the sequence into a number by calculating the average of it.
- `chunk(size)` -- groups items in the sequence into arrays of `size` items.
- `compact()` -- removes all falsy items from the sequence.
- `concatEnd(source)` -- adds items from the `source` to the end of the sequence.
- `concatStart(source)` -- adds items from the `source` to the beginning of the sequence.
- `count()` -- reduces the sequence into a number by countint items in it.
- `difference(...sources)` -- removes sources' items from the sequence matching by their identity.
- `differenceBy(selector, ...sources)` -- removes sources' items from the sequence matching by the `selected` value.
- `every(predicate)` -- reduces the sequence into a boolean by calculating if the `predicate` returns `true` for every item.
- `filter(predicate)` -- removes all items from the sequence for which the `predicate` returns `false`.
- `find(predicate)` -- reduces the sequence to the first item for which `predicate` have returned `true`.
- `findIndex(predicate)` -- reduces the sequence to the index of the first item for which the `predicate` have returned `true`.
- `first()` -- removes all items from the sequence, but the first one.
- `flatten(depth = 1)` -- flattens nested arrays in the sequence `depth` levels deep. `depth` can be `Infinity`.
- `flattenIterables(depth = 1)` -- flattens nested iterables in the sequence `depth` levels deep. `depth` can be `Infinity`.
- `forEach(action)` -- executes the `action` for every item in the sequence, used for side effects.
- `groupBy(keySelector)` -- groups items of the sequence into the new `[key, items]` items matching by the `selected key`.
- `includes(value)` -- reduces the sequence into a boolean depending on whether the `value` was found in it.
- `interleave(...sources)` -- interleaves sources' items into the sequence in round-robin fashion.
- `intersection(...sources)` -- reduces the sequence to items to which have identicals in every source.
- `intersectionBy(selector, ...sources)` -- reduces the sequence to items to which have identicals in every source matching by the `selected` value.
- `join(separator = ",")` -- reduces the sequence into a string, works the same as `Array.prototype.join()`.
- `last()` -- removes all items from the sequence, but the last one.
- `map(mapper)` -- transforms the sequence into a new one by `mapping` all its items.
- `max()` -- reduces the sequence into a number by finding maximum value.
- `min()` -- reduces the sequence into a number by finding minimum value.
- `nth(n)` -- removes all items from the sequence, but the `n`th one.
- `orderBy(...orderingSpecs)` -- reorders items in the sequence by ordering specs, you build them with `asc` and `desc` utilities.
- `prepend(...items)` -- adds its arguments to the beginning of the sequence.
- `reduce(reducer, initial = undefined)` -- reduces the sequence into a value starting with the `initial` one and executing the `reducer` for every item.
- `remove(predicate)` -- removes all items from the sequence for which the `predicate` returns `true`.
- `reverse()` -- reverses the order of the items in the sequence.
- `skip(count)` -- removes the first `count` items from the sequence.
- `skipWhile(predicate)` -- removes the first items from the sequence for which the `predicate` consequently have returned `true`.
- `some()` -- reduces the sequence into a boolean by calculating if the `predicate` returns `true` at least for one item.
- `sort(comparator, order = asc)` -- sorts the items in the sequence using the `comparator`.
- `sortNumbers(order = asc)` -- sorts the items as numbers in the sequence.
- `sortStrings(order = asc)` -- sorts the items as strings in the sequence.
- `sum()` -- reduces the sequence into a number by summing all items.
- `symmetricDifference(...sources)` -- reduces the sequence by applying [Symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference) with sources' items matching by their identity.
- `symmetricDifferenceBy(selector, ...sources)` -- reduces the sequence by applying [Symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference) with sources' items matching by the `selected` value.
- `take(count)` -- reduces the sequence the the first `count` items.
- `takeWhile(predicate)` -- reduces the sequence the the first `count` items for which the `predicate` consequently have returned `true`.
- `union(...sources)` -- reduces the sequence by combining it with sources an leaving only unique items matching by their identity.
- `unionBy(selector, ...sources)` -- reduces the sequence by combining it with sources an leaving only unique items matching by the `selected` value.
- `unique()` -- educes the sequence by leaving only unique items matching by their identity.
- `uniqueBy(selector)` -- reduces the sequence by combining it with sources an leaving only unique items matching by the `selected` value.
- `unzip()` -- reverse to the `zip` producing a sequence of sources.
- `unzipWith(itemsExtractor)` -- reverse to the `zip` producing a sequence of sources by getting their items from the `extractor`.
- `zip(...sources)` -- transforms the sequence into a new one by combining by one item from it and the sources into an array.
- `zipWith(itemFactory, ...sources)` -- transforms the sequence into a new one by combining by one item from it and the source into a value returned by the `itemFactory`.

## Pull-only operations

- N/A

## Push-only operations

- N/A
