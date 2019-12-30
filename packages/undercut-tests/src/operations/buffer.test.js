import { createBySpec } from "@undercut/testing";

import { buffer as bufferPull, bufferAll as bufferAllPull } from "@undercut/pull/src/operations/buffer.js";
import { buffer as bufferPush, bufferAll as bufferAllPush } from "@undercut/push/src/operations/buffer.js";

describe(`buffer`, () => {
	describe.each([
		[`pull`, bufferPull],
		[`push`, bufferPush],
	])(`%s`, (type, buffer) => {
		const bySpec = createBySpec(type, buffer);

		test(`should throw on invalid or missing args`, () => {
			expect(() => buffer()).toThrow();
			expect(() => buffer(-1)).toThrow();
			expect(() => buffer(`1`)).toThrow();
		});

		test(`should work with empty source`, () => bySpec({
			args: [5],
			source: [],
			target: [],
		}));
		test(`should work with size = 0`, () => bySpec({
			args: [0],
			source: [1, 2, 3],
			target: [1, 2, 3],
		}));
		test(`should work with size = 1`, () => bySpec({
			args: [1],
			source: [1, 2, 3],
			target: [1, 2, 3],
		}));
		test(`should work with size > 1`, () => bySpec({
			args: [2],
			source: [1, 2, 3],
			target: [1, 2, 3],
		}));
		test(`should work with size > length of the sequence`, () => bySpec({
			args: [10],
			source: [1, 2, 3, 4],
			target: [1, 2, 3, 4],
		}));
		test(`should work with different data types`, () => bySpec({
			args: [3],
			source: [1, false, null, `s`, {}],
			target: [1, false, null, `s`, {}],
		}));
	});
});

describe(`bufferAll`, () => {
	describe.each([
		[`pull`, bufferAllPull],
		[`push`, bufferAllPush],
	])(`%s`, (type, bufferAll) => {
		const bySpec = createBySpec(type, bufferAll);

		test(`should work with empty source`, () => bySpec({
			source: [],
			target: [],
		}));
		test(`should work with different data types`, () => bySpec({
			source: [1, false, null, `s`, {}],
			target: [1, false, null, `s`, {}],
		}));
	});
});
