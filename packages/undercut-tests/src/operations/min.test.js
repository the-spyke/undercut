import { test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function min(type, min) {
	const testOperation = createTestOperation(type);

	test(`should work [legacy]`, () => {
		testOperation(min, {
			source: [],
			target: []
		});
		testOperation(min, {
			source: [1],
			target: [1]
		});
		testOperation(min, {
			source: [0],
			target: [0]
		});
		testOperation(min, {
			source: [-1],
			target: [-1]
		});
		testOperation(min, {
			source: [-4, 1, 3, 5],
			target: [-4]
		});
		testOperation(min, {
			source: [1, -3, -5],
			target: [-5]
		});
	});
}
