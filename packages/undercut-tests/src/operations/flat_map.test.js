import { createBySpec } from "@undercut/testing";
import { isIterable, isNumberValue, isString, noop } from "@undercut/utils";

import * as pull from "@undercut/pull/src/operations/flat_map.js";
import * as push from "@undercut/push/src/operations/flat_map.js";

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
