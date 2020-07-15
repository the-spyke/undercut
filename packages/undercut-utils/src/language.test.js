import { expect, test } from "@jest/globals";

import { noop } from "./function.js";

import * as language from "./language.js";

function getTestValues() {
	/* eslint-disable brace-style */
	return [
		[10, undefined],
		[11, false],
		[12, true],
		[13, -123, `Negative integer`],
		[14, 0, `Zero`],
		[15, 123, `Positive integer`],
		[16, ``, `Empty string`],
		[17, `test`, `String`],
		[18, Symbol(), `Symbol`],
		[19, null],
		[20, {}, `Plain empty object`],
		[21, { x: 0 }, `Plain object with props`],
		[22, [], `Empty array`],
		[23, [1, 2, 3], `Array with values`],
		[24, noop, `Function`],
		[25, /test/, `RegExp`],
		[26, new Map(), `Map`],
		[27, new Set(), `Set`],
		[28, new WeakMap(), `WeakMap`],
		[29, new WeakSet(), `WeakSet`],
		[30, new ArrayBuffer(), `ArrayBuffer`],
		[31, new Int32Array(), `Int32Array`],
		[32, new Error(`Error message`), `Error`],
		[33, new Date(), `Date`],
		[34, function* () { yield 1; }, `Generator function`],
		[35, (function* () { yield 1; })(), `Generator object`],
		[36, {
			next() { return { value: 36, done: false }; }
		}, `Manual coroutine`],
		[37, {
			[Symbol.iterator]() {
				return {
					next() { return { value: 37, done: false }; }
				};
			}
		}, `Manual iterable`],
		[38, {
			next() { return { value: 38, done: false }; },
			close() { /* Empty. */ },
		}, `Manual closable coroutine`],
		[39, {
			next() { return { value: 39, done: false }; },
			throw(e) { throw e; },
		}, `Manual throwable coroutine`],
		[40, {
			next() { return { value: 40, done: false }; },
			close() { /* Empty. */ },
			throw(e) { throw e; },
		}, `Manual full coroutine`],
		[41, NaN, `NaN`],
		[42, Infinity, `+Infinity`],
		[43, -Infinity, `-Infinity`],
		[44, class User { }, `User class`],
		[45, getInstance(class UserEmpty { }), `EmptyUser object`],
		[46, getInstance(class UserHello { hello() { return `hello`; } }), `UserHello object with hello() method`],
		[47, -123.321, `Negative fractional number`],
		[48, -0, `Negative zero`],
		[49, 123.321, `Positive fractional number`],
		[50, async function () { await Promise.resolve(); }, `Async function`],
	];
	/* eslint-enable brace-style */
}

test(`getObjectType`, () => {
	const types = getTestValues().map(tv => language.getObjectType(tv[1]));

	expect(types).toMatchSnapshot();
});

test(`hasOwnProps`, () => {
	expect(positiveResults(language.hasOwnProps)).toEqual(resultsByIndex([
		21, 23, 36, 38, 39, 40,
	]));
});

test(`isArrayBuffer`, () => {
	expect(positiveResults(language.isArrayBuffer)).toEqual(resultsByIndex([
		30,
	]));
});

test(`isBoolean`, () => {
	expect(positiveResults(language.isBoolean)).toEqual(resultsByIndex([
		11, 12,
	]));
});

test(`isCoroutine`, () => {
	expect(positiveResults(language.isCoroutine)).toEqual(resultsByIndex([
		35, 36, 38, 39, 40,
	]));
});

test(`isDate`, () => {
	expect(positiveResults(language.isDate)).toEqual(resultsByIndex([
		33,
	]));
});

test(`isDefined`, () => {
	expect(positiveResults(language.isDefined)).toEqual(resultsByExcluded([
		10,
	]));
});

test(`isError`, () => {
	expect(positiveResults(language.isError)).toEqual(resultsByIndex([
		32,
	]));
});

test(`isFalsy`, () => {
	expect(positiveResults(language.isFalsy)).toEqual(resultsByIndex([
		10, 11, 14, 16, 19, 41, 48,
	]));
});

test(`isFunction`, () => {
	expect(positiveResults(language.isFunction)).toEqual(resultsByIndex([
		24, 34, 44, 50,
	]));
});

test(`isIterable`, () => {
	expect(positiveResults(language.isIterable)).toEqual(resultsByIndex([
		16, 17, 22, 23, 26, 27, 31, 35, 37,
	]));
});

test(`isIterator`, () => {
	expect(positiveResults(language.isIterator)).toEqual(resultsByIndex([
		35, 36, 38, 39, 40,
	]));
});

test(`isMap`, () => {
	expect(positiveResults(language.isMap)).toEqual(resultsByIndex([
		26,
	]));
});

test(`isNegative`, () => {
	expect(positiveResults(language.isNegative)).toEqual(resultsByIndex([
		13, 43, 47,
	]));
});

test(`isNegativeOrZero`, () => {
	expect(positiveResults(language.isNegativeOrZero)).toEqual(resultsByIndex([
		13, 14, 43, 47, 48,
	]));
});

test(`isNull`, () => {
	expect(positiveResults(language.isNull)).toEqual(resultsByIndex([
		19,
	]));
});

test(`isNullish`, () => {
	expect(positiveResults(language.isNullish)).toEqual(resultsByIndex([
		10, 19,
	]));
});

test(`isNumber`, () => {
	expect(positiveResults(language.isNumber)).toEqual(resultsByIndex([
		13, 14, 15, 41, 42, 43, 47, 48, 49,
	]));
});

test(`isNumberValue`, () => {
	expect(positiveResults(language.isNumberValue)).toEqual(resultsByIndex([
		13, 14, 15, 42, 43, 47, 48, 49,
	]));
});

test(`isObject`, () => {
	expect(positiveResults(language.isObject)).toEqual(resultsByExcluded([
		10, 11, 12, 13, 14, 15, 16, 17, 18, 24, 34, 41, 42, 43, 44, 47, 48, 49, 50,
	]));
});

test(`isObjectValue`, () => {
	expect(positiveResults(language.isObjectValue)).toEqual(resultsByExcluded([
		10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 24, 34, 41, 42, 43, 44, 47, 48, 49, 50,
	]));
});

test(`isObserver`, () => {
	expect(positiveResults(language.isObserver)).toEqual(resultsByIndex([
		35, 36, 38, 39, 40,
	]));
});

test(`isPlainObject`, () => {
	expect(positiveResults(language.isPlainObject)).toEqual(resultsByIndex([
		20, 21, 36, 37, 38, 39, 40,
	]));
});

test(`isPositive`, () => {
	expect(positiveResults(language.isPositive)).toEqual(resultsByIndex([
		15, 42, 49,
	]));
});

test(`isPositiveOrZero`, () => {
	expect(positiveResults(language.isPositiveOrZero)).toEqual(resultsByIndex([
		14, 15, 42, 48, 49,
	]));
});

test(`isRegExp`, () => {
	expect(positiveResults(language.isRegExp)).toEqual(resultsByIndex([
		25,
	]));
});

test(`isSet`, () => {
	expect(positiveResults(language.isSet)).toEqual(resultsByIndex([
		27,
	]));
});

test(`isString`, () => {
	expect(positiveResults(language.isString)).toEqual(resultsByIndex([
		16, 17,
	]));
});

test(`isSymbol`, () => {
	expect(positiveResults(language.isSymbol)).toEqual(resultsByIndex([
		18,
	]));
});

test(`isTruthy`, () => {
	expect(positiveResults(language.isTruthy)).toEqual(resultsByExcluded([
		10, 11, 14, 16, 19, 41, 48,
	]));
});

test(`isUndefined`, () => {
	expect(positiveResults(language.isUndefined)).toEqual(resultsByIndex([
		10,
	]));
});

test(`isWeakMap`, () => {
	expect(positiveResults(language.isWeakMap)).toEqual(resultsByIndex([
		28,
	]));
});

test(`isWeakSet`, () => {
	expect(positiveResults(language.isWeakSet)).toEqual(resultsByIndex([
		29,
	]));
});

test(`getTestValues`, () => {
	expect(getTestValues().every((entry, index) => entry[0] - 10 === index)).toBe(true);
});

function getInstance(Class) {
	return new Class();
}

function mapValues([index, value, name]) {
	return `${index} : ${name !== undefined ? name : String(value)}`;
}

function positiveResults(predicate) {
	return getTestValues().filter(e => predicate(e[1])).map(mapValues);
}

function resultsByIndex(indexes) {
	const values = getTestValues();

	return indexes.map(i => values[i - 10]).map(mapValues);
}

function resultsByExcluded(indexes) {
	const exclude = new Set(indexes);

	return getTestValues().filter(e => !exclude.has(e[0])).map(mapValues);
}
