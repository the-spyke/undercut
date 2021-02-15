import { test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function max(type, max) {
	const testOperation = createTestOperation(type);

	test(`should work [legacy]`, () => {
		testOperation(max, {
			source: [],
			target: []
		});
		testOperation(max, {
			source: [1],
			target: [1]
		});
		testOperation(max, {
			source: [0],
			target: [0]
		});
		testOperation(max, {
			source: [-1],
			target: [-1]
		});
		testOperation(max, {
			source: [-4, 1, 3, 5],
			target: [5]
		});
		testOperation(max, {
			source: [1, -3, -5],
			target: [1]
		});
	});
}
