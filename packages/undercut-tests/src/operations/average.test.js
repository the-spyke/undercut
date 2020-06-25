import { test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function average(type, average) {
	const testOperation = createTestOperation(type);

	test(`should work [legacy]`, () => {
		testOperation(average, {
			source: [],
			target: [0]
		});
		testOperation(average, {
			source: [0],
			target: [0]
		});
		testOperation(average, {
			source: [1],
			target: [1]
		});
		testOperation(average, {
			source: [0, 0],
			target: [0]
		});
		testOperation(average, {
			source: [1, 3, 5, 1],
			target: [2.5]
		});
	});
}
