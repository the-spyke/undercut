# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0] - 2019-10-15

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

## [0.3.0] - 2019-07-15

Dependencies were updated to resolve GitHub security alerts.

### Added

- `toConsumer()` pull target. Sends items to a consumer function.
- `toNull()` pull target. A `/dev/null` analogue.

### Changed

- **[BREAKING]** Relaxed requirements for number arguments in `chunk()`, `flatten()`, `nth()`, `skip()`, and `take()`. Now they may take a fractional number. `flatten()` behavior is also more inline with `Array.prototype.flat()`.

## [0.2.0] - 2019-05-04

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

## [0.1.1] - 2019-04-24

This version works fine on Node 12.0.0 without ESM-to-CJS transpilation, just use `--experimental-modules` flag.

### Fixed

- Fixed module entry points

## [0.1.0] - 2019-04-22

Initial release.

### Added

- Pull pipelines through `pull()` and `pullLine()`.
- Pull operations: append, average, compact, concatEnd, concatStart, count, difference, every, filter, find, findIndex, first, flatten, forEach, groupBy, includes, intersection, last, map, max, min, nth, orderBy, prepend, reduce, reverse, skip, skipWhile, some, sort, sortNumbers, sortStrings, sum, symmetricDifference, take, takeWhile, union, unique, unzip, unzipWith, zip, zipWith.
- Pull targets: toArray, toMap, toObject, toSet, toValue.
- Function utilities: identity, negate, negateSign, noop.
- Language utilities: isArray, isBoolean, isDefined, isFalsy, isFunction, isIterable, isNil, isNull, isNumber, isObject, isString, isSymbol, isTruthy, isUndefined.
