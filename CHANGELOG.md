# Changelog

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.5.1](https://github.com/the-spyke/undercut/compare/v0.5.0...v0.5.1) (2020-05-30)

Updated `readme` files and package metadata.

## [0.5.0](https://github.com/the-spyke/undercut/compare/v0.4.0...v0.5.0) (2020-01-08)

`Undercut` moved away from a single package to a set of independent scoped packages:

- `@undercut/pull`
- `@undercut/push`
- `@undercut/utils`

There're also 3 new precompiled packages for browsers and Node:

- `@undercut/cli`
- `@undercut/node-10`
- `@undercut/web-2019`

### Added

- Added `collect` operation. Much like `reduce`, but for filling items into a mutable `collection`. No need to return a value from the functor.
- Added predefined `collect` variants: `collectArray`, `collectMap`, `collectObject`, and `collectSet`.
- Added Coroutine utilities.
- Added new `delay` and `rethrow` utilities.
- An ability of `composeOperations` to take a function instead of an array: `() => Array<Operation>`. This allows dynamic composition and having some shared state in a closure.
- Precompiled packages for browsers and Node.
- `@undercut/cli` package for using in a shell for processing strings with JavaScript.
- `pullValue` and `pushValue` core functions running the pipeline and returning a single item or `undefined` from it. Basically, it's a `pull/push` with target implicitly set to `toValue()`.
- Added Iterable utilities back to the `utils` package.
- Additional language utilities: `hasOwnProps`, `isArrayBuffer`, `isCoroutine`, `isDate`, `isError`, `isMap`, `isNegative`, `isNegativeOrZero`, `isNumberValue`, `isPlainObject`, `isPositive`, `isPositiveOrZero`, `isRegExp`, `isSet`, `isWeakMap`, `isWeakSet`.
- Added `flatMap` recursive operation and `getRecursiveMapper` iterable utility for working with nested data.
- Added predefined `flattenArrays` operation for convenience.
- Added back `peekIterable` utility.
- Added `buffer` and `bufferAll` operations.
- Added `composeComparators` utility.

### Changed

- **[BREAKING]** Deprecate `undercut` package in favor of scoped versions `@undercut/*`.
- **[BREAKING]** Renamed `makeReiterable` into `createIterable`.
- **[BREAKING]** Renamed `makeUnclosable` into `asUnclosable`.
- **[BREAKING]** Renamed the old `delay` into `wait`.
- **[BREAKING]** Renamed `unwrap` into `unwrapPromise`.
- **[BREAKING]** Renamed `pullItems` and `pushItems` into `pullArray` and `pushArray`.
- **[BREAKING]** Unified pull targets so all of them should be called first, like `toConsumer` did and push targets too.
- **[BREAKING]** Changed `toValue` to not throw on empty sequences or >1 item. It just returns the first item or `undefined`.
- **[BREAKING]** Replaced `closeIterator`, `closeObserver`, `initializeObserver` with generic Coroutine utilities.
- **[BREAKING]** Changed `flatten` to accept `predicate` and `depth` instead of just `depth` to be able to flatten different types of iterables.
- **[BREAKING]** Renamed `toPushLine` pull target into `toObserver`.
- **[BREAKING]** Renamed `negate` into `not` and `negateSign` into `negate`, they now work with values instead of functions.
- **[BREAKING]** Refactored `asc` and `desc` functions to return a Comparator instead of an array.

### Removed

- **[BREAKING]** Removed utilities from `pull` and `push` package exports.

### Fixed

- `take` operations iteraited/observed a one excess item before exiting.

## [0.4.0](https://github.com/the-spyke/undercut/compare/v0.3.0...v0.4.0) (2019-10-15)

This release adds `Push Lines` and makes API more consistent in general.

### Added

- Push Lines!
- Array utility `filterInPlace`.
- Iterable utility `makeReiterable`.
- Language utilities: `isIterator`, `isObjectValue`, `isObserver`.
- Observer utilities: `closeObserver`, `initializeObserver`, `makeUnclosable`.
- Promise utilities: `delay` and `unwrap`.
- `toPushLine` pull target.

### Changed

- **[BREAKING]** `toValue` pull target now throws on 0 items (you've expected a value, but got an empty sequence).
- **[BREAKING]** Removed Iterable utilities from `utils` entry.
- **[BREAKING]** Renamed back `createPullLine` into just `pullLine`.
- **[BREAKING]** Renamed `isNil` utility to `isNullish` (better consistency with ES naming like "Nullish Coalescing Operator").
- **[BREAKING]** Replaced `isReverse` parameter of the `sort` operation with `order` parameter accepting `asc/desc` functions.
- **[BREAKING]** Replaced `tryCloseIterator` helper with `closeIterator`.
- Optimized `interleave` operation.

### Removed

- **[BREAKING]** Removed `reverseComparator` utility.

## [0.3.0](https://github.com/the-spyke/undercut/compare/v0.2.0...v0.3.0) (2019-07-15)

Dependencies were updated to resolve GitHub security alerts.

### Added

- `toConsumer()` pull target. Sends items to a consumer function.
- `toNull()` pull target. A `/dev/null` analogue.

### Changed

- **[BREAKING]** Relaxed requirements for number arguments in `chunk()`, `flatten()`, `nth()`, `skip()`, and `take()`. Now they may take a fractional number. `flatten()` behavior is also more inline with `Array.prototype.flat()`.

## [0.2.0](https://github.com/the-spyke/undercut/compare/v0.1.1...v0.2.0) (2019-05-04)

### Added

- `chunk()` pull operation. Splits a sequence into arrays of N items.
- `composeOperations()` helper. Allows to compose a new operation from several existing.
- `differenceBy()` pull operation. Same as `difference()`, but with a `selector` as the first argument.
- `flattenIterables()` pull operation. Classic `flatten()` operates only on arrays. Both now support `depth` parameter.
- `getIterator()` helper.
- `interleave()` pull operation. Joins sequences by alternating their values.
- `intersectionBy()` pull operation. Same as `intersection()`, but with a `selector` as the first argument.
- `join()` pull operation. Works the same way as `Array.prototype.join()`.
- `range()` pull source. Creates an iterable of numbers in range `[start, end)` with optional step.
- `remove()` pull operation. It's an opposite to the `filter()` operation.
- `symmetricDifferenceBy()` pull operation. Same as `symmetricDifference()` by accepts a `selector` as the first argument.
- `tryCloseIterator()` helper.
- `unionBy()` pull operation. Same as `union()`, but with a `selector` as the first argument.
- `uniqueBy()` pull operation. Same as `unique()`, but with a `selector` as the first argument.

### Changed

- **[BREAKING]** Renamed `pullLine()` into `createPullLine()`.

### Removed

- **[BREAKING]** Removed `isArray()` lang utility. Use `Array.isArray()` instead.
- **[BREAKING]** Removed `peekIterable()` helper.

### Fixed

- Fixed re-iteration support of pull lines.

## [0.1.1](https://github.com/the-spyke/undercut/compare/v0.1.0...v0.1.1) (2019-04-24)

This version works fine on Node 12.0.0 without ESM-to-CJS transpilation, just use `--experimental-modules` flag.

### Fixed

- Fixed module entry points

## 0.1.0 (2019-04-22)

Initial release.

### Added

- Pull pipelines through `pull()` and `pullLine()`.
- Pull operations: append, average, compact, concatEnd, concatStart, count, difference, every, filter, find, findIndex, first, flatten, forEach, groupBy, includes, intersection, last, map, max, min, nth, orderBy, prepend, reduce, reverse, skip, skipWhile, some, sort, sortNumbers, sortStrings, sum, symmetricDifference, take, takeWhile, union, unique, unzip, unzipWith, zip, zipWith.
- Pull targets: toArray, toMap, toObject, toSet, toValue.
- Function utilities: identity, negate, negateSign, noop.
- Language utilities: isArray, isBoolean, isDefined, isFalsy, isFunction, isIterable, isNil, isNull, isNumber, isObject, isString, isSymbol, isTruthy, isUndefined.
