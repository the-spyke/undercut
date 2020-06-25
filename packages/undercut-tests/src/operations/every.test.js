import { expect, test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function every(type, every) {
	const testOperation = createTestOperation(type);

	test(`should throw on ivalid arguments`, () => {
		expect(() => every()).toThrow();
	});

	test(`should work [legacy]`, () => {
		testOperation(every, {
			args: [() => true],
			source: [3, 4],
			target: [true],
			callbackArgs: [[3, 0], [4, 1]]
		});
		testOperation(every, {
			args: [x => x > 5],
			source: [],
			target: [true]
		});
		testOperation(every, {
			args: [x => x > 5],
			source: [1],
			target: [false]
		});
		testOperation(every, {
			args: [x => x > 5],
			source: [2, 5],
			target: [false]
		});
		testOperation(every, {
			args: [x => x > 5],
			source: [2, 6],
			target: [false]
		});
		testOperation(every, {
			args: [x => x > 5],
			source: [7, 6],
			target: [true]
		});
	});
}
