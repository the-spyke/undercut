# @undercut/utils

This package provides various JavaScript utilities and is a part of the larger [undercut](https://github.com/the-spyke/undercut) project.

## Quicklinks

- [Installation](#installation)
- [Usage](#usage)
- [Utilities](#utilities)
- [License](#license)

## Installation

`@undercut/utils` carries `stable ES Next` code. It is very convenient for apps using Webpack/Babel/etc, and will help to avoid double compilation and deoptimization. Only [finished proposals (Stage 4)](https://github.com/tc39/proposals/blob/master/finished-proposals.md) may be used in its codebase. The code is universal and may be used in Node/Browser/microwave.

Don't forget check that `/node_modules/@undercut/` isn't excluded from compilation and `core-js@3` polyfill or analogue is in place.

```sh
npm install @undercut/utils
# or
yarn add @undercut/utils
```

### Upgrading

If you're upgrading the `undercut` to a newer version, please upgrade `@babel/preset-env` and `core-js` packages to the latest versions too.

## Usage

```js
import { isNumberValue } from "@undercut/utils";

console.log(isNumberValue(123)); // true
console.log(isNumberValue("hello")); // false
console.log(isNumberValue(NaN)); // false
```

[![Edit undercut-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/undercut-example-9g1nh?fontsize=14&module=%2Fsrc%2Findex.js)

## Utilities

- `Cohort` -- a helper class to group several coroutines (iterables, observers, etc) and abort/close them together. It has some flags to check useful in the `close` callback. See examples in `push` operations code.
- `abort(coroutine, error) => never` -- helps to call coroutine's `throw` method.
- `asObserver(generator) => Observer` -- wraps a generator function to automatically call `next` method once right after creation. Observers (unlike other coroutines) must be ready to accept items immidietly and don't return any value. In this case the first `next` only starts the observer.
- `asUnclosable(coroutine) => Coroutine` -- creates a new coroutine forwarding `next` calls, but skipping `return` calls. This way you may guard an observer from being closed.
- `asc(comparator, selector) => Comparator` -- used itself as a value for specifying ascending sorting direction, or as a factory function for building orders for `orderBy`.
- `close(coroutine, tryBeforeClosing) => TryBeforeClosingReturnValue` -- closes the `coroutine` after passing it into optional `tryBeforeClosing` function allowing you to do something with it without manually writing `try/finally` block.
- `compare` -- a set of predefined comparators for sorting: numbers, strings, classic (convert all to strings).
- `composeComparators(comparators) => Comparator` -- composes several comparators into one.
- `createIterable(function) => Iterable` -- makes an `Iterable` from a provided function. It could be a generator or a factory, but must return a new `Iterator` every time.
- `delay(promise, time) => Promise` -- returns a new Promise that waits `time` more miliseconds after the `promise` fulfills returning its result.
- `desc(comparator, selector) => Comparator` -- used itself as a value for specifying descending sorting direction, or as a factory function for building orders for `orderBy`.
- `getDoneItem(value) => IteratorResult` -- returns an IteratorResult with `done` set to `true`.
- `getIterator(iterable) => Iterator` -- calls the `Symbol.iterator` method of the `iterable` for you.
- `getRecursiveMapper(predicate, mapper) => Mapper` -- creates a mapper function to use with the `map` operation. Converts every incomming item into an Iterable of all nested bubitems. The `predicate` helps to choose if the item should be iterated. The `mapper`, if specified, allows to convert the item before checking it with the `predicate` and iterating over it.
- `hasOwnProps(value) => boolean` -- returns `true` if the `value` is an object having own properties, `false` otherwise.
- `identity(value) => value` -- returns the same `value` the was provided as the first argument.
- `isArrayBuffer(value) => boolean` -- returns `true` if the `value` is an `ArrayBuffer`, `false` otherwise.
- `isBoolean(value) => boolean` -- returns `true` if the `value` is of the boolean type, `false` otherwise.
- `isCoroutine(value) => boolean` -- returns `true` if the `value` looks like `Coroutine`, `false` otherwise. The only mandatory method is `next`.
- `isDate(value) => boolean` -- returns `true` if the `value` is a `Date` object, `false` otherwise.
- `isDefined(value) => boolean` -- returns `true` if the `value` is exactly not `undefined`, `false` otherwise.
- `isError(value) => boolean` -- returns `true` if the `value` is an `Error`, `false` otherwise.
- `isFalsy(value) => boolean` -- returns `true` if the `value` converted to Boolean is `false`, `false` otherwise.
- `isFunction(value) => boolean` -- returns `true` if the `value` is a function, `false` otherwise.
- `isIterable(value) => boolean` -- returns `true` if the `value` is an object having `Symbol.iterator` method, `false` otherwise.
- `isIterator(value) => boolean` -- returns `true` if the `value` is an object having `next` method, `false` otherwise.
- `isMap(value) => boolean` -- returns `true` if the `value` is an `Map`, `false` otherwise.
- `isNegative(value) => boolean` -- returns `true` if the `value` is a Number less than zero, `false` otherwise.
- `isNegativeOrZero(value) => boolean` -- returns `true` if the `value` is a Number less or equal to zero, `false` otherwise.
- `isNull(value) => boolean` -- returns `true` if the `value` is exactly `null`, `false` otherwise.
- `isNullish(value) => boolean` -- returns `true` if the `value` is exactly `null` or `undefined`, `false` otherwise.
- `isNumber(value) => boolean` -- returns `true` if the `value` is of the Number type, `false` otherwise. `NaN` is a Number in JavaScript.
- `isNumberValue(value) => boolean` -- same as `isNumber`, but returns `false` for `NaN`.
- `isObject(value) => boolean` -- returns `true` if the `value` is an Object, `false` otherwise. `null` is an Object is JavaScript.
- `isObjectValue(value) => boolean` -- same as `isObject`, but returns `false` for `null`.
- `isObserver(value) => boolean` -- returns `true` if the `value` is an object with the `next` method, `false` otherwise.
- `isPlainObject(value) => boolean` -- returns `true` if the `value` is an object having no prototype or an Object.prototype, `false` otherwise.
- `isPositive(value) => boolean` -- returns `true` if the `value` is a Number greater that zero, `false` otherwise.
- `isPositiveOrZero(value) => boolean` -- returns `true` if the `value` is a Number equal or greater than zero, `false` otherwise.
- `isRegExp(value) => boolean` -- returns `true` if the `value` is a `RegExp`, `false` otherwise.
- `isSet(value) => boolean` -- returns `true` if the `value` is a `Set`, `false` otherwise.
- `isString(value) => boolean` -- returns `true` if the `value` is of the String type, `false` otherwise.
- `isSymbol(value) => boolean` -- returns `true` if the `value` is of the Symbol type, `false` otherwise.
- `isTruthy(value) => boolean` -- returns `true` if the `value` converted to Boolean is `true`, `false` otherwise.
- `isUndefined(value) => boolean` -- returns `true` if the `value` is exactly `undefined`, `false` otherwise.
- `isWeakMap(value) => boolean` -- returns `true` if the `value` is a `WeakMap`, `false` otherwise.
- `isWeakSet(value) => boolean` -- returns `true` if the `value` is a `WeakSet`, `false` otherwise.
- `negate(value) => boolean` -- inverts the sign of the numeric `value`.
- `noop() => void` -- an empty function.
- `not(value) => number` -- performs boolean not `!` operation with the vale.
- `peekIterable(iterable) => item` -- returns the first item of the `iterable` or `undefined`.
- `rethrow(error) => never` -- immidietly throws provided `error`.
- `unwrapPromise() => object` -- creates a new Promise and returns it together with its `resolve`/`reject` functions as properties.
- `wait(time) => Promise` -- returns a Promise fulfilling after `time` miliseconds.

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
