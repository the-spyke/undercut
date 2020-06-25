import { test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function sum(type, sum) {
	const testOperation = createTestOperation(type);

	test(`should work [legacy]`, () => {
		testOperation(sum, {
			source: [],
			target: [0]
		});
		testOperation(sum, {
			source: [1],
			target: [1]
		});
		testOperation(sum, {
			source: [1, 3, 5],
			target: [9]
		});
		testOperation(sum, {
			source: [1, -3, -5],
			target: [-7]
		});
	});
}
