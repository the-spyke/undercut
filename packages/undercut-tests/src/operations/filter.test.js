import { expect, test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function filter(type, filter) {
	const testOperation = createTestOperation(type);

	test(`should throw on ivalid arguments`, () => {
		expect(() => filter()).toThrow();
	});

	test(`should work [legacy]`, () => {
		testOperation(filter, {
			args: [x => x > 2],
			source: [3, 4],
			target: [3, 4],
			callbackArgs: [[3, 0], [4, 1]]
		});
		testOperation(filter, {
			args: [x => x > 5],
			source: [],
			target: [],
			callbackArgs: []
		});
		testOperation(filter, {
			args: [x => x > 5],
			source: [1],
			target: []
		});
		testOperation(filter, {
			args: [x => x > 5],
			source: [2, 5],
			target: []
		});
		testOperation(filter, {
			args: [x => x > 5],
			source: [1, 7, 2, 5],
			target: [7]
		});
	});
}
