# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `chunk()` pull operation. Splits a sequence into arrays of N items.
- `interleave()` pull operation. Joins sequences by alternating their values.
- `join()` pull operation. Works the same way as `Array.prototype.join()`.
- `remove()` pull operation. It's an opposite to the `filter()` operation.
- `range()` pull source. Creates an iterable of numbers in range `[start, end)` with optional step.
- `composeOperations()` helper. Allows to compose a new operation from several existing.
- `getIterator()` helper.
- `tryCloseIterator()` helper.
- `isFinite()` lang utility. Just a wrapper for `Number.isFinite()`.

### Changed

- **[BREAKING]** Renamed `pullLine()` into `createPullLine()`.

### Removed

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
