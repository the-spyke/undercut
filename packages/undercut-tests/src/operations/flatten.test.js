import { createBySpec } from "@undercut/testing";
import { isIterable, isMap, isNumberValue, isString, noop } from "@undercut/utils";

import * as pull from "@undercut/pull/src/operations/flatten.js";
import * as push from "@undercut/push/src/operations/flatten.js";

describe(`flatten`, () => {
	describe.each([
		[`pull`, pull.flatten],
		[`push`, push.flatten],
	])(`%s`, (type, flatten) => {
		const bySpec = createBySpec(type, flatten);

		test(`should throw on invalid or missing args`, () => {
			expect(() => flatten()).toThrow();
			expect(() => flatten(-1)).toThrow();
			expect(() => flatten(noop, -1)).toThrow();
		});
		test(`should not call the predicate when depth = 0`, () => bySpec({
			args: [Array.isArray, 0],
			source: [[7], 2, 4, [false, [5]], `test`],
			callbackArgs: [],
		}));
		test(`should pass item, index, depth into the predicate when depth = 1`, () => bySpec({
			args: [Array.isArray, 1],
			source: [[7], 2, 4, [false, [5]], `test`],
			callbackArgs: [
				[[7], 0, 0],
				[2, 1, 0],
				[4, 2, 0],
				[[false, [5]], 3, 0],
				[`test`, 4, 0],
			],
		}));
		test(`should pass item, index, depth into the predicate when depth = 2`, () => bySpec({
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
		}));
		test(`should work with empty sources`, () => bySpec({
			args: [Array.isArray],
			source: [],
			target: [],
		}));
		test(`should work when there is nothing to flatten`, () => bySpec({
			args: [Array.isArray],
			source: [1, 2, 3],
			target: [1, 2, 3],
		}));
		test(`should work with depth = 1 by default`, () => bySpec({
			args: [Array.isArray],
			source: [1, [2, [3]], 4],
			target: [1, 2, [3], 4],
		}));
		test(`should flatten arrays when predicate = isArray`, () => bySpec({
			args: [Array.isArray, 2],
			source: [[0], 2, 4, [6, 9], 1, [false, []], `test`],
			target: [0, 2, 4, 6, 9, 1, false, `test`],
		}));
		test(`should flatten nested empty arrays when predicate = isArray and depth = Infinity`, () => bySpec({
			args: [Array.isArray, Infinity],
			source: [[[[[[[[[]]]]]]]]],
			target: [],
		}));
		test(`should flatten maps when predicate = isMap`, () => bySpec({
			args: [isMap],
			source: [[0], 2, 4, [6, 9], 1, [false, []], new Map([[1, 11], [2, `test`]]), `test`],
			target: [[0], 2, 4, [6, 9], 1, [false, []], [1, 11], [2, `test`], `test`],
		}));
		test(`should flatten string when predicate = isString and length check present`, () => bySpec({
			args: [isString, 1],
			source: [`test`, [1], `hello`],
			target: [`t`, `e`, `s`, `t`, [1], `h`, `e`, `l`, `l`, `o`],
		}));
	});
});

describe(`flattenArrays`, () => {
	describe.each([
		[`pull`, pull.flattenArrays],
		[`push`, push.flattenArrays],
	])(`%s`, (type, flattenArrays) => {
		const bySpec = createBySpec(type, flattenArrays);

		test(`should throw on invalid args`, () => {
			expect(() => flattenArrays(-1)).toThrow();
			expect(() => flattenArrays(NaN)).toThrow();
		});
		test(`should work with empty sources`, () => bySpec({
			source: [],
			target: [],
		}));
		test(`should work when there is nothing to flatten`, () => bySpec({
			source: [1, 2, 3],
			target: [1, 2, 3],
		}));
		test(`should work with depth = 1 by default`, () => bySpec({
			source: [1, [2, [3]], 4],
			target: [1, 2, [3], 4],
		}));
		test(`should work with depth > 1`, () => bySpec({
			args: [10],
			source: [[0], 2, 4, [6, 9], 1, [false, []], `test`],
			target: [0, 2, 4, 6, 9, 1, false, `test`],
		}));
		test(`should flatten deeply nested arrays when depth = Infinity`, () => bySpec({
			args: [Infinity],
			source: [[[[[[[[[]]]]]]]]],
			target: [],
		}));
	});
});

describe(`flatMap`, () => {
	describe.each([
		[`pull`, pull.flatMap],
		[`push`, push.flatMap],
	])(`%s`, (type, flatMap) => {
		const bySpec = createBySpec(type, flatMap);

		test(`should throw on invalid or missing args`, () => {
			expect(() => flatMap()).toThrow();
			expect(() => flatMap(1)).toThrow();
			expect(() => flatMap(noop, 1)).toThrow();
		});
		test(`should work without mapper`, () => bySpec({
			args: [Array.isArray],
			source: [[7], 2, 4, [[5]], `test`],
			target: [7, 2, 4, 5, `test`],
		}));
		test(`should pass item, index, depth into the predicate`, () => bySpec({
			args: [Array.isArray],
			source: [[7], 2, 4, [false, [5]], `test`],
			callbackArgs: [
				[[7], 0, 0],
				[7, 0, 1],
				[2, 1, 0],
				[4, 2, 0],
				[[false, [5]], 3, 0],
				[false, 0, 1],
				[[5], 1, 1],
				[5, 0, 2],
				[`test`, 4, 0],
			],
		}));
		test(`should pass item, index, depth into the mapper`, () => bySpec({
			args: [Array.isArray, x => x],
			source: [[7], 2, 4, [false, [5]], `test`],
			callbackPosition: 1,
			callbackArgs: [
				[[7], 0, 0],
				[7, 0, 1],
				[2, 1, 0],
				[4, 2, 0],
				[[false, [5]], 3, 0],
				[false, 0, 1],
				[[5], 1, 1],
				[5, 0, 2],
				[`test`, 4, 0],
			],
		}));
		test(`should flatten only items for which predicate has returned true`, () => bySpec({
			args: [item => isString(item) && item.length > 1],
			source: [[7], 2, 4, [false, [5]], `test`],
			target: [[7], 2, 4, [false, [5]], `t`, `e`, `s`, `t`],
		}));
		test(`should map all the items independently of the predicate's return value`, () => bySpec({
			args: [
				(item, index, depth) => Array.isArray(item) && depth < 1,
				item => isNumberValue(item) ? item + 0.5 : item
			],
			source: [[7], 2, 4, [false, [5]], `test`],
			target: [7.5, 2.5, 4.5, false, [5], `test`],
		}));
		test(`should work with any iterable items`, () => bySpec({
			args: [
				isIterable,
				item => Array.isArray(item) ? item.values() : item
			],
			source: [[7, [[]]], 2, 4, [false, [5], new Map()], new Set([9, 0])],
			target: [7, 2, 4, false, 5, 9, 0],
		}));
	});
});
