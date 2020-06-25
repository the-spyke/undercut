import { expect, test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function remove(type, remove) {
	const testOperation = createTestOperation(type);

	test(`should throw on ivalid arguments`, () => {
		expect(() => remove()).toThrow();
	});

	test(`should work [legacy]`, () => {
		testOperation(remove, {
			args: [() => false],
			source: [3, 4],
			target: [3, 4],
			callbackArgs: [[3, 0], [4, 1]]
		});
		testOperation(remove, {
			args: [x => x > 5],
			source: [],
			target: []
		});
		testOperation(remove, {
			args: [x => x > 5],
			source: [1],
			target: [1]
		});
		testOperation(remove, {
			args: [x => x > 5],
			source: [2, 5],
			target: [2, 5]
		});
		testOperation(remove, {
			args: [x => x > 5],
			source: [1, 7, 2, 5, -1],
			target: [1, 2, 5, -1]
		});
	});
}
