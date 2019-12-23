import { createBySpec } from "@undercut/testing";

import * as pull from "@undercut/pull/src/operations/flatten.js";
import * as push from "@undercut/push/src/operations/flatten.js";

describe(`flatten`, () => {
	describe.each([
		[`pull`, pull.flatten],
		[`push`, push.flatten],
	])(`%s`, (type, flatten) => {
		const bySpec = createBySpec(type, flatten);

		test(`should throw on invalid or missing args`, () => {
			expect(() => flatten(-1)).toThrow();
		});
		test(`should work with empty sources`, () => bySpec(
			{
				args: [1],
				source: [],
				target: [],
			},
			{
				source: [],
				target: []
			}
		));
		test(`should set depth = 1 by default`, () => bySpec({
			source: [[0], 2, 4, [6, 9], 1, [false, []]],
			target: [0, 2, 4, 6, 9, 1, false, []]
		}));
		test(`should work with different item types`, () => bySpec(
			{
				source: [1],
				target: [1]
			},
			{
				source: [undefined],
				target: [undefined]
			},
			{
				source: [2, 4, [], 1],
				target: [2, 4, 1]
			}
		));
		test(`should not flatten when depth = 0`, () => bySpec({
			args: [0],
			source: [2, 4, [], 1],
			target: [2, 4, [], 1]
		}));
		test(`should flatten when depth = 1`, () => bySpec({
			source: [2, 4, [6, 9], 1],
			target: [2, 4, 6, 9, 1]
		}));
		test(`should truncate fractional depth`, () => bySpec(
			{
				args: [0.89],
				source: [2, 4, [6, [9]], 1],
				target: [2, 4, [6, [9]], 1]
			},
			{
				args: [1.115],
				source: [2, 4, [6, [9]], 1],
				target: [2, 4, 6, [9], 1]
			}
		));

		test(`should flatten nested arrays when depht > 1`, () => bySpec({
			args: [2],
			source: [[0], 2, 4, [6, 9], 1, [false, [7, []]]],
			target: [0, 2, 4, 6, 9, 1, false, 7, []]
		}));
		test(`should work with depth = Infinity`, () => bySpec({
			args: [Infinity],
			source: [[[[[[]]]]]],
			target: []
		}));
	});
});

describe(`flattenIterables`, () => {
	describe.each([
		[`pull`, pull.flattenIterables],
		[`push`, push.flattenIterables],
	])(`%s`, (type, flattenIterables) => {
		const bySpec = createBySpec(type, flattenIterables);

		test(`should throw on invalid or missing args`, () => {
			expect(() => flattenIterables(-1)).toThrow();
		});
		test(`should work with empty sources`, () => bySpec(
			{
				args: [1],
				source: [],
				target: [],
			},
			{
				source: [],
				target: []
			}
		));
		test(`should work with different item types`, () => bySpec(
			{
				source: [1],
				target: [1]
			},
			{
				source: [undefined],
				target: [undefined]
			},
			{
				source: [2, 4, [], 1],
				target: [2, 4, 1]
			}
		));
		test(`should flatten only arrays`, () => bySpec({
			source: [`test`, 1, [`test`]],
			target: [`t`, `e`, `s`, `t`, 1, `test`]
		}));
		test(`should work with big depth values`, () => bySpec({
			args: [5],
			source: [[[[[[]]]]]],
			target: []
		}));
	});
});
