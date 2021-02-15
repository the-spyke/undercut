import { expect, test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function chunk(type, chunk) {
	const testOperation = createTestOperation(type);

	test(`should throw on invalid arguments`, () => {
		expect(() => chunk()).toThrow();
		expect(() => chunk(-4)).toThrow();
		expect(() => chunk(0)).toThrow();
		expect(() => chunk(0.5)).toThrow();
	});

	test(`should work [legacy]`, () => {
		testOperation(chunk, {
			args: [2],
			source: [],
			target: []
		});
		testOperation(chunk, {
			args: [1],
			source: [1],
			target: [[1]]
		});
		testOperation(chunk, {
			args: [2],
			source: [1],
			target: [[1]]
		});
		testOperation(chunk, {
			args: [2],
			source: [1, 2],
			target: [[1, 2]]
		});
		testOperation(chunk, {
			args: [1.5],
			source: [1, 2],
			target: [[1], [2]]
		});
		testOperation(chunk, {
			args: [2],
			source: [1, 2, 3, 4],
			target: [[1, 2], [3, 4]]
		});
		testOperation(chunk, {
			args: [3],
			source: [1, 2, 3, 4],
			target: [[1, 2, 3], [4]]
		});
	});
}
