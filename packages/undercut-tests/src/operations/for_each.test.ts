import { expect, test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function forEach(type, forEach) {
	const testOperation = createTestOperation(type);

	test(`should throw on ivalid arguments`, () => {
		expect(() => forEach()).toThrow();
	});

	test(`should work [legacy]`, () => {
		testOperation(forEach, {
			args: [() => true],
			source: [],
			target: [],
			callbackArgs: []
		});
		testOperation(forEach, {
			args: [() => true],
			source: [undefined, false, 7],
			target: [undefined, false, 7],
			callbackArgs: [[undefined, 0], [false, 1], [7, 2]]
		});
	});
}
