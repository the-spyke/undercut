import { expect, test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function map(type, map) {
	const testOperation = createTestOperation(type);

	test(`should throw on ivalid arguments`, () => {
		expect(() => map()).toThrow();
	});

	test(`should work [legacy]`, () => {
		testOperation(map, {
			args: [() => 3],
			source: [],
			target: []
		});
		testOperation(map, {
			args: [() => 3],
			source: [1, 2],
			target: [3, 3],
			callbackArgs: [[1, 0], [2, 1]]
		});
		testOperation(map, {
			args: [x => x * 2],
			source: [1, -1, 3],
			target: [2, -2, 6]
		});
	});
}
