import { expect, test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function some(type, some) {
	const testOperation = createTestOperation(type);

	test(`should throw on ivalid arguments`, () => {
		expect(() => some()).toThrow();
	});

	test(`should work [legacy]`, () => {
		testOperation(some, {
			args: [() => false],
			source: [3, 4],
			target: [false],
			callbackArgs: [[3, 0], [4, 1]]
		});
		testOperation(some, {
			args: [x => x > 5],
			source: [],
			target: [false]
		});
		testOperation(some, {
			args: [x => x > 5],
			source: [1],
			target: [false]
		});
		testOperation(some, {
			args: [x => x > 5],
			source: [2, 5],
			target: [false]
		});
		testOperation(some, {
			args: [x => x > 5],
			source: [1, 7, 2, 5],
			target: [true]
		});
	});
}
