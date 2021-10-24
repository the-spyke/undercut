import { test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function first(type, first) {
	const testOperation = createTestOperation(type);

	test(`should work [legacy]`, () => {
		testOperation(first, {
			source: [],
			target: []
		});
		testOperation(first, {
			source: [1],
			target: [1]
		});
		testOperation(first, {
			source: [undefined],
			target: [undefined]
		});
		testOperation(first, {
			source: [2, 4, -3],
			target: [2]
		});
	});
}
