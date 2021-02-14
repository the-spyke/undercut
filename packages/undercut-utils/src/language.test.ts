import { describe, expect, test } from "@jest/globals";

import * as language from "./language";

describe.each(Object.entries(language))(`%s`, (name, operation) => {
	test.each([
		/* eslint-disable brace-style */
		[`Array (empty)`, []],
		[`Array (with values)`, [1, 2, 3]],
		[`ArrayBuffer`, new ArrayBuffer(8)],
		[`Date`, new Date()],
		[`Class (Empty)`, class Empty { }],
		[`Class (instance of Empty)`, getInstance(class Empty { })],
		[`Class (instance of User)`, getInstance(class User { hello() { return `hello`; } })],
		[`Coroutine (manual full)`, {
			next() { return { value: 40, done: false }; },
			close() { /* Empty. */ },
			throw(e) { throw e; },
		}],
		[`Coroutine (manual next only)`, {
			next() { return { value: 36, done: false }; }
		}],
		[`Coroutine (manual next + close)`, {
			next() { return { value: 38, done: false }; },
			close() { /* Empty. */ },
		}],
		[`Coroutine (manual next + throw)`, {
			next() { return { value: 39, done: false }; },
			throw(e) { throw e; },
		}],
		[`Error`, new Error(`Error message`)],
		[`False`, false],
		[`Function (async)`, async function () { await Promise.resolve(); }],
		[`Function (generator)`, function* () { yield 1; }],
		[`Function (regular)`, function () { return 0; }],
		[`Generator object`, (function* () { yield 1; })()],
		[`Infinity (negative)`, -Infinity],
		[`Infinity (positive)`, Infinity],
		[`Int8Array`, new Int8Array()],
		[`Int16Array`, new Int16Array()],
		[`Int32Array`, new Int32Array()],
		[`Iterable (manual)`, {
			[Symbol.iterator]() {
				return {
					next() { return { value: 37, done: false }; }
				};
			}
		}],
		[`Map`, new Map()],
		[`NaN`, NaN],
		[`Null`, null],
		[`Number (fractional negative)`, -123.321],
		[`Number (fractional positive)`, 123.321],
		[`Number (integer negative)`, -123],
		[`Number (integer positive)`, 123],
		[`Number (zero negative)`, -0],
		[`Number (zero positive)`, 0],
		[`Object (plain empty)`, {}],
		[`Object (plain with props)`, { x: 0 }],
		[`Promise`, Promise.resolve()],
		[`RegExp`, /test/],
		[`Set`, new Set()],
		[`String (empty)`, ``],
		[`String (simple)`, `test`],
		[`Symbol`, Symbol()],
		[`True`, true],
		[`Undefined`, undefined],
		[`WeakMap`, new WeakMap()],
		[`WeakSet`, new WeakSet()],
		/* eslint-enable brace-style */
	])(`should work for "%s"`, (name, value) => {
		expect(operation(value)).toMatchSnapshot();
	});
});

function getInstance(Class) {
	return new Class();
}
