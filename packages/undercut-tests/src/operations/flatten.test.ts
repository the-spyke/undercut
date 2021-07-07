import { expect, test } from "@jest/globals";

import { createExpectBySpec } from "@undercut/testing";
import { isMap, isString, noop } from "@undercut/utils";

export function flatten(type, flatten) {
	const expectBySpec = createExpectBySpec(type, flatten);

	test(`should throw on invalid or missing args`, () => {
		expect(() => flatten()).toThrow();
		expect(() => flatten(-1)).toThrow();
		expect(() => flatten(noop, -1)).toThrow();
	});

	test(`should not call the predicate when depth = 0`, () => {
		expectBySpec({
			args: [Array.isArray, 0],
			source: [[7], 2, 4, [false, [5]], `test`],
			callbackArgs: [],
		});
	});

	test(`should pass item, index, depth into the predicate when depth = 1`, () => {
		expectBySpec({
			args: [Array.isArray, 1],
			source: [[7], 2, 4, [false, [5]], `test`],
			callbackArgs: [
				[[7], 0, 0],
				[2, 1, 0],
				[4, 2, 0],
				[[false, [5]], 3, 0],
				[`test`, 4, 0],
			],
		});
	});

	test(`should pass item, index, depth into the predicate when depth = 2`, () => {
		expectBySpec({
			args: [Array.isArray, 2],
			source: [[7], 2, 4, [false, [5]], `test`],
			callbackArgs: [
				[[7], 0, 0],
				[7, 0, 1],
				[2, 1, 0],
				[4, 2, 0],
				[[false, [5]], 3, 0],
				[false, 0, 1],
				[[5], 1, 1],
				[`test`, 4, 0],
			],
		});
	});

	test(`should work with empty sources`, () => {
		expectBySpec({
			args: [Array.isArray],
			source: [],
			target: [],
		});
	});

	test(`should work when there is nothing to flatten`, () => {
		expectBySpec({
			args: [Array.isArray],
			source: [1, 2, 3],
			target: [1, 2, 3],
		});
	});

	test(`should work with depth = 1 by default`, () => {
		expectBySpec({
			args: [Array.isArray],
			source: [1, [2, [3]], 4],
			target: [1, 2, [3], 4],
		});
	});

	test(`should flatten arrays when predicate = isArray`, () => {
		expectBySpec({
			args: [Array.isArray, 2],
			source: [[0], 2, 4, [6, 9], 1, [false, []], `test`],
			target: [0, 2, 4, 6, 9, 1, false, `test`],
		});
	});

	test(`should flatten nested empty arrays when predicate = isArray and depth = Infinity`, () => {
		expectBySpec({
			args: [Array.isArray, Infinity],
			source: [[[[[[[[[]]]]]]]]],
			target: [],
		});
	});

	test(`should flatten maps when predicate = isMap`, () => {
		expectBySpec({
			args: [isMap],
			source: [[0], 2, 4, [6, 9], 1, [false, []], new Map<number, number | string>([[1, 11], [2, `test`]]), `test`],
			target: [[0], 2, 4, [6, 9], 1, [false, []], [1, 11], [2, `test`], `test`],
		});
	});

	test(`should flatten string when predicate = isString and length check present`, () => {
		expectBySpec({
			args: [isString, 1],
			source: [`test`, [1], `hello`],
			target: [`t`, `e`, `s`, `t`, [1], `h`, `e`, `l`, `l`, `o`],
		});
	});
}

export function flattenArrays(type, flattenArrays) {
	const expectBySpec = createExpectBySpec(type, flattenArrays);

	test(`should throw on invalid args`, () => {
		expect(() => flattenArrays(-1)).toThrow();
		expect(() => flattenArrays(NaN)).toThrow();
	});

	test(`should work with empty sources`, () => {
		expectBySpec({
			args: [],
			source: [],
			target: [],
		});
	});

	test(`should work when there is nothing to flatten`, () => {
		expectBySpec({
			args: [],
			source: [1, 2, 3],
			target: [1, 2, 3],
		});
	});

	test(`should work with depth = 1 by default`, () => {
		expectBySpec({
			args: [],
			source: [1, [2, [3]], 4],
			target: [1, 2, [3], 4],
		});
	});

	test(`should work with depth > 1`, () => {
		expectBySpec({
			args: [10],
			source: [[0], 2, 4, [6, 9], 1, [false, []], `test`],
			target: [0, 2, 4, 6, 9, 1, false, `test`],
		});
	});

	test(`should flatten deeply nested arrays when depth = Infinity`, () => {
		expectBySpec({
			args: [Infinity],
			source: [[[[[[[[[]]]]]]]]],
			target: [],
		});
	});
}

export function flattenIterables(type, flattenIterables) {
	const expectBySpec = createExpectBySpec(type, flattenIterables);

	test(`should throw on invalid args`, () => {
		expect(() => flattenIterables(-1)).toThrow();
		expect(() => flattenIterables(NaN)).toThrow();
	});

	test(`should work with empty sources`, () => {
		expectBySpec({
			args: [],
			source: [],
			target: [],
		});
	});

	test(`should work when there is nothing to flatten`, () => {
		expectBySpec({
			args: [],
			source: [1, 2, 3],
			target: [1, 2, 3],
		});
	});

	test(`should work with depth = 1 by default`, () => {
		expectBySpec({
			args: [],
			source: [1, [2, [3]], 4, new Set([5, 6])],
			target: [1, 2, [3], 4, 5, 6],
		});
	});

	test(`should work with depth > 1`, () => {
		expectBySpec({
			args: [10],
			source: [[0], 2, 4, [6, 9], 1, [false, [new Set([5, 6])]]],
			target: [0, 2, 4, 6, 9, 1, false, 5, 6],
		});
	});

	test(`should flatten deeply nested iterables when depth = Infinity`, () => {
		expectBySpec({
			args: [Infinity],
			source: [[[[[[[[[new Set([5, 6])]]]]]]]]],
			target: [5, 6],
		});
	});
}
