import { expect, test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function concatStart(type, concatStart) {
	const testOperation = createTestOperation(type);

	test(`should throw on ivalid arguments`, () => {
		expect(() => concatStart()).toThrow();
	});

	test(`should work [legacy]`, () => {
		testOperation(concatStart, {
			args: [[]],
			source: [],
			target: []
		});
		testOperation(concatStart, {
			args: [[]],
			source: [1],
			target: [1]
		});
		testOperation(concatStart, {
			args: [[1]],
			source: [],
			target: [1]
		});
		testOperation(concatStart, {
			args: [[1, 3]],
			source: [2, 4],
			target: [1, 3, 2, 4]
		});
	});
}

export function concatEnd(type, concatEnd) {
	const testOperation = createTestOperation(type);

	test(`should throw on ivalid arguments`, () => {
		expect(() => concatEnd()).toThrow();
	});

	test(`should work [legacy]`, () => {
		testOperation(concatEnd, {
			args: [[]],
			source: [],
			target: []
		});
		testOperation(concatEnd, {
			args: [[]],
			source: [1],
			target: [1]
		});
		testOperation(concatEnd, {
			args: [[1]],
			source: [],
			target: [1]
		});
		testOperation(concatEnd, {
			args: [[1, 3]],
			source: [2, 4],
			target: [2, 4, 1, 3]
		});
	});
}
