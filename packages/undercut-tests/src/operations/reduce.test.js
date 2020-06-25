import { expect, test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function reduce(type, reduce) {
	const testOperation = createTestOperation(type);

	test(`should throw on ivalid arguments`, () => {
		expect(() => reduce()).toThrow();
	});

	test(`should work [legacy]`, () => {
		testOperation(reduce, {
			args: [() => 3, -4],
			source: [],
			target: [-4]
		});
		testOperation(reduce, {
			args: [() => 7],
			source: [3, 4],
			target: [7],
			callbackArgs: [[undefined, 3, 0], [7, 4, 1]]
		});
		testOperation(reduce, {
			args: [(acc, x) => acc + x, 0],
			source: [],
			target: [0]
		});
		testOperation(reduce, {
			args: [(acc, x) => acc + x, 0],
			source: [1, -1, 3, 45],
			target: [48]
		});
	});
}
