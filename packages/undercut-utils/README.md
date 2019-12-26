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

Some specific utilities like `asc`/`desc` are exported in `pull` and `push` packages too, but they are identical to the ones in this package.

- `asc(comparator, selector = identity) => OrderingSpec` -- used itself as a value for specifying ascending sorting direction, of as a factory function for creating OrderingSpec for `groupBy` operation.
- `close(coroutine, tryBeforeClosing) => TryBeforeClosingReturnValue` -- closes the `coroutine` after passing it into optional `tryBeforeClosing` function allowing you to do something with it without manually writing `try/finally` block.
- `compare` -- a set of predefined comparators for sorting.
- `createIterable(function) => Iterable` -- makes an `Iterable` from a provided function. It could be a generator or a factory, but must return a new iterator every time.
- `delay(promise, time) => Promise` -- returns a new Promise that waits `time` more miliseconds after the `promise` and fulfills with its result.
- `desc(comparator, selector = identity) => OrderingSpec` -- used itself as a value for specifying descending sorting direction, of as a factory function for creating OrderingSpec for `groupBy` operation.
- `getIterator(iterable) => Iterator` -- calls the `Symbol.iterator` method of the `iterable` for you.
- `identity(value) => value` -- returns the same `value` the was provided as the first argument.
- `isBoolean(value) => boolean` -- returns `true` if the `value` is of the boolean type, `false` otherwise.
- `isDefined(value) => boolean` -- returns `true` if the `value` is exactly not `undefined`, `false` otherwise.
- `isFalsy(value) => boolean` -- returns `true` if the `value` converted to Boolean is `false`, `false` otherwise.
- `isFunction(value) => boolean` -- returns `true` if the `value` is a function, `false` otherwise.
- `isIterable(value) => boolean` -- returns `true` if the `value` is an object having `Symbol.iterator` method, `false` otherwise.
- `isIterator(value) => boolean` -- returns `true` if the `value` is an object having `next` method, `false` otherwise.
- `isNegative(value) => boolean` -- returns `true` if the `value` is a Number less than zero, `false` otherwise.
- `isNegativeOrZero(value) => boolean` -- returns `true` if the `value` is a Number less or equal to zero, `false` otherwise.
- `isNull(value) => boolean` -- returns `true` if the `value` is exactly `null`, `false` otherwise.
- `isNullish(value) => boolean` -- returns `true` if the `value` is exactly `null` or `undefined`, `false` otherwise.
- `isNumber(value) => boolean` -- returns `true` if the `value` is of the Number type, `false` otherwise. `NaN` is a Number in JavaScript.
- `isNumberValue(value) => boolean` -- same as `isNumber`, but returns `false` for `NaN`.
- `isObject(value) => boolean` -- returns `true` if the `value` is an Object, `false` otherwise. `null` is an Object is JavaScript.
- `isObjectValue(value) => boolean` -- same as `isObject`, but returns `false` for `null`.
- `isObserver(value) => boolean` -- returns `true` if the `value` is an object with the `next` method, `false` otherwise.
- `isPositive(value) => boolean` -- returns `true` if the `value` is a Number greater that zero, `false` otherwise.
- `isPositiveOrZero(value) => boolean` -- returns `true` if the `value` is a Number equal or greater than zero, `false` otherwise.
- `isString(value) => boolean` -- returns `true` if the `value` is of the String type, `false` otherwise.
- `isSymbol(value) => boolean` -- returns `true` if the `value` is of the Symbol type, `false` otherwise.
- `isTruthy(value) => boolean` -- returns `true` if the `value` converted to Boolean is `true`, `false` otherwise.
- `isUndefined(value) => boolean` -- returns `true` if the `value` is exactly `undefined`, `false` otherwise.
- `negate(value) => boolean` -- performs the `!` operation with provided value.
- `negateSign(value) => number` -- inverts the sign of the numeric value.
- `noop() => void` -- an empty function.
- `rethrow(error) => void` -- immidietly throws provided `error`.
- `unwrapPromise() => object` -- creates a new Promise and returnss it together with its `resolve`/`reject` functions.
- `wait(time) => Promise` -- returns a Promise fulfilling after `time` miliseconds.

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
