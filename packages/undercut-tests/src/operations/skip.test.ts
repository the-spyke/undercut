import { expect, test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function skip(type, skip) {
	const testOperation = createTestOperation(type);

	test(`should throw on ivalid arguments`, () => {
		expect(() => skip()).toThrow();
		expect(() => skip(-1)).toThrow();
	});

	test(`should work [legacy]`, () => {
		testOperation(skip, {
			args: [1],
			source: [],
			target: []
		});
		testOperation(skip, {
			args: [5],
			source: [1],
			target: []
		});
		testOperation(skip, {
			args: [0],
			source: [1],
			target: [1]
		});
		testOperation(skip, {
			args: [0.5],
			source: [1],
			target: [1]
		});
		testOperation(skip, {
			args: [1],
			source: [1, 2],
			target: [2]
		});
		testOperation(skip, {
			args: [1.5],
			source: [1, 2],
			target: [2]
		});
		testOperation(skip, {
			args: [3],
			source: [1, 2, 3, 4, 5],
			target: [4, 5]
		});
	});
}

export function skipWhile(type, skipWhile) {
	const testOperation = createTestOperation(type);

	test(`should throw on ivalid arguments`, () => {
		expect(() => skipWhile()).toThrow();
	});

	test(`should work [legacy]`, () => {
		testOperation(skipWhile, {
			args: [() => true],
			source: [3, 4],
			target: [],
			callbackArgs: [[3, 0], [4, 1]]
		});
		testOperation(skipWhile, {
			args: [x => x < 10],
			source: [],
			target: []
		});
		testOperation(skipWhile, {
			args: [x => x < 10],
			source: [1],
			target: []
		});
		testOperation(skipWhile, {
			args: [x => x < 10],
			source: [1, 9],
			target: []
		});
		testOperation(skipWhile, {
			args: [x => x < 10],
			source: [1, 9, 10],
			target: [10]
		});
		testOperation(skipWhile, {
			args: [x => x < 10],
			source: [1, 2, 12],
			target: [12]
		});
		testOperation(skipWhile, {
			args: [x => x < 10],
			source: [1, 2, 10, 12],
			target: [10, 12]
		});
	});
}
