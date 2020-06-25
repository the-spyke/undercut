import { test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function reverse(type, reverse) {
	const testOperation = createTestOperation(type);

	test(`should work [legacy]`, () => {
		testOperation(reverse, {
			source: [],
			target: []
		});
		testOperation(reverse, {
			source: [1],
			target: [1]
		});
		testOperation(reverse, {
			source: [2, 5],
			target: [5, 2]
		});
		testOperation(reverse, {
			source: [undefined, 1, -7, `test`, 0, null],
			target: [null, 0, `test`, -7, 1, undefined]
		});
	});
}
