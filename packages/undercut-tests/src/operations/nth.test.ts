import { expect, test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function nth(type, nth) {
	const testOperation = createTestOperation(type);

	test(`should throw on ivalid arguments`, () => {
		expect(() => nth()).toThrow();
		expect(() => nth(-1)).toThrow();
	});

	test(`should work [legacy]`, () => {
		testOperation(nth, {
			args: [0],
			source: [],
			target: []
		});
		testOperation(nth, {
			args: [100],
			source: [],
			target: []
		});
		testOperation(nth, {
			args: [0],
			source: [1],
			target: [1]
		});
		testOperation(nth, {
			args: [0],
			source: [1, 2, 3],
			target: [1]
		});
		testOperation(nth, {
			args: [4],
			source: [1, false, {}, -3, undefined],
			target: [undefined]
		});
	});
}
