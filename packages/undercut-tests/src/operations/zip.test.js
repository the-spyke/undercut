import { expect, test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function zip(type, zip) {
	const testOperation = createTestOperation(type);

	test(`should work [legacy]`, () => {
		testOperation(zip, {
			source: [],
			target: []
		});
		testOperation(zip, {
			args: [[]],
			source: [],
			target: []
		});
		testOperation(zip, {
			args: [[]],
			source: [1],
			target: [[1, undefined]]
		});
		testOperation(zip, {
			args: [[], []],
			source: [1],
			target: [[1, undefined, undefined]]
		});
		testOperation(zip, {
			args: [[1], []],
			source: [1],
			target: [[1, 1, undefined]]
		});
		testOperation(zip, {
			args: [[], [1]],
			source: [1],
			target: [[1, undefined, 1]]
		});
		testOperation(zip, {
			args: [[1], [1]],
			source: [1],
			target: [[1, 1, 1]]
		});
		testOperation(zip, {
			args: [[5, 6, 7]],
			source: [1, 2, 3],
			target: [[1, 5], [2, 6], [3, 7]]
		});
		testOperation(zip, {
			args: [[5, 6, 7]],
			source: [1, 2, 3, 4],
			target: [[1, 5], [2, 6], [3, 7], [4, undefined]]
		});
		testOperation(zip, {
			args: [[5, 6, 7, 8]],
			source: [1, 2, 3],
			target: [[1, 5], [2, 6], [3, 7], [undefined, 8]]
		});
	});
}

export function zipWith(type, zipWith) {
	const testOperation = createTestOperation(type);

	test(`should throw on ivalid arguments`, () => {
		expect(() => zipWith()).toThrow();
	});

	test(`should work [legacy]`, () => {
		testOperation(zipWith, {
			args: [() => 42, [1, 2]],
			source: [3, 4],
			target: [42, 42],
			callbackArgs: [[[3, 1], 0], [[4, 2], 1]]
		});

		testOperation(zipWith, {
			args: [x => x, []],
			source: [],
			target: []
		});
		testOperation(zipWith, {
			args: [x => x, []],
			source: [1],
			target: [[1, undefined]]
		});
		testOperation(zipWith, {
			args: [x => x, [1]],
			source: [],
			target: [[undefined, 1]]
		});
		testOperation(zipWith, {
			args: [values => values.join(), [3, 4], [5, 6]],
			source: [1, 2],
			target: [`1,3,5`, `2,4,6`]
		});
	});
}
