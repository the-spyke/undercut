import { expect, test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

import { desc } from "@undercut/utils";

export function sort(type, sort) {
	const testOperation = createTestOperation(type);

	test(`should work [legacy]`, () => {
		expect(() => testOperation(sort, {
			args: [(a, b) => a - b, 32],
			source: [4, 1, 2],
			target: [1, 2, 4]
		})).toThrow();

		testOperation(sort, {
			args: [(a, b) => a - b],
			source: [4, 1, 2],
			target: [1, 2, 4]
		});

		testOperation(sort, {
			args: [(a, b) => a - b, desc],
			source: [4, 1, 2],
			target: [4, 2, 1]
		});
	});
}

export function sortNumbers(type, sortNumbers) {
	const testOperation = createTestOperation(type);

	test(`should work [legacy]`, () => {
		testOperation(sortNumbers, {
			source: [],
			target: []
		});
		testOperation(sortNumbers, {
			source: [1],
			target: [1]
		});
		testOperation(sortNumbers, {
			source: [2, 1, 3],
			target: [1, 2, 3]
		});
		testOperation(sortNumbers, {
			source: [2, 1, -3],
			target: [-3, 1, 2]
		});
		testOperation(sortNumbers, {
			args: [desc],
			source: [2, 1, -3],
			target: [2, 1, -3]
		});
	});
}

export function sortStrings(type, sortStrings) {
	const testOperation = createTestOperation(type);

	test(`should work [legacy]`, () => {
		testOperation(sortStrings, {
			source: [],
			target: []
		});
		testOperation(sortStrings, {
			source: [``],
			target: [``]
		});
		testOperation(sortStrings, {
			source: [`z`, `a`, `c`],
			target: [`a`, `c`, `z`]
		});
		testOperation(sortStrings, {
			source: [`51`, `5`, `10`, `1`],
			target: [`1`, `10`, `5`, `51`]
		});
		testOperation(sortStrings, {
			args: [desc],
			source: [`z`, `a`, `c`],
			target: [`z`, `c`, `a`]
		});
	});
}
