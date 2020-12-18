---
title: Language Utilities
---

Mostly type or instance checking.

### getObjectType

`getObjectType(value) => string`

Gets value's type from `Object.prototype.toString` method. For example, an async function will return `AsyncFunction`.

### hasOwnProps

`hasOwnProps(value) => boolean`

Returns `true` if the `value` is an object having own properties, `false` otherwise.

### isArrayBuffer

`isArrayBuffer(value) => boolean`

Returns `true` if the `value` is an `ArrayBuffer`, `false` otherwise.

### isBoolean

`isBoolean(value) => boolean`

Returns `true` if the `value` is of the boolean type, `false` otherwise.

### isCoroutine

`isCoroutine(value) => boolean`

Returns `true` if the `value` looks like `Coroutine`, `false` otherwise. The only mandatory method is `next`.

### isDate

`isDate(value) => boolean`

Returns `true` if the `value` is a `Date` object, `false` otherwise.

### isDefined

`isDefined(value) => boolean`

Returns `true` if the `value` is exactly not `undefined`, `false` otherwise.

### isError

`isError(value) => boolean`

Returns `true` if the `value` is an `Error`, `false` otherwise.

### isFalsy

`isFalsy(value) => boolean`

Returns `true` if the `value` converted to Boolean is `false`, `false` otherwise.

### isFunction

`isFunction(value) => boolean`

Returns `true` if the `value` is a function, `false` otherwise.

### isIterable

`isIterable(value) => boolean`

Returns `true` if the `value` is an object having `Symbol.iterator` method, `false` otherwise.

### isIterator

`isIterator(value) => boolean`

Returns `true` if the `value` is an object having `next` method, `false` otherwise.

### isMap

`isMap(value) => boolean`

Returns `true` if the `value` is an `Map`, `false` otherwise.

### isNegative

`isNegative(value) => boolean`

Returns `true` if the `value` is a Number less than zero, `false` otherwise.

### isNegativeOrZero

`isNegativeOrZero(value) => boolean`

Returns `true` if the `value` is a Number less or equal to zero, `false` otherwise.

### isNull

`isNull(value) => boolean`

Returns `true` if the `value` is exactly `null`, `false` otherwise.

### isNullish

`isNullish(value) => boolean`

Returns `true` if the `value` is exactly `null` or `undefined`, `false` otherwise.

### isNumber

`isNumber(value) => boolean`

Returns `true` if the `value` is of the Number type, `false` otherwise. `NaN` is a Number in JavaScript.

### isNumberValue

`isNumberValue(value) => boolean`

same as `isNumber`, but Returns `false` for `NaN`.

### isObject

`isObject(value) => boolean`

Returns `true` if the `value` is an Object, `false` otherwise. `null` is an Object is JavaScript.

### isObjectValue

`isObjectValue(value) => boolean`

same as `isObject`, but Returns `false` for `null`.

### isObserver

`isObserver(value) => boolean`

Returns `true` if the `value` is an object with the `next` method, `false` otherwise.

### isPlainObject

`isPlainObject(value) => boolean`

Returns `true` if the `value` is an object having no prototype or an Object.prototype, `false` otherwise.

### isPositive

`isPositive(value) => boolean`

Returns `true` if the `value` is a Number greater that zero, `false` otherwise.

### isPositiveOrZero

`isPositiveOrZero(value) => boolean`

Returns `true` if the `value` is a Number equal or greater than zero, `false` otherwise.

### isPromise

`isPromise(value) => boolean`

Returns `true` if the `value` is a Promise instance, `false` otherwise.

### isRegExp

`isRegExp(value) => boolean`

Returns `true` if the `value` is a `RegExp`, `false` otherwise.

### isSet

`isSet(value) => boolean`

Returns `true` if the `value` is a `Set`, `false` otherwise.

### isString

`isString(value) => boolean`

Returns `true` if the `value` is of the String type, `false` otherwise.

### isSymbol

`isSymbol(value) => boolean`

Returns `true` if the `value` is of the Symbol type, `false` otherwise.

### isTruthy

`isTruthy(value) => boolean`

Returns `true` if the `value` converted to Boolean is `true`, `false` otherwise.

### isUndefined

`isUndefined(value) => boolean`

Returns `true` if the `value` is exactly `undefined`, `false` otherwise.

### isWeakMap

`isWeakMap(value) => boolean`

Returns `true` if the `value` is a `WeakMap`, `false` otherwise.

### isWeakSet

`isWeakSet(value) => boolean`

Returns `true` if the `value` is a `WeakSet`, `false` otherwise.
