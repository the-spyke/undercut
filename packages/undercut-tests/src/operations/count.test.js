import { test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function count(type, count) {
	const testOperation = createTestOperation(type);

	test(`should work [legacy]`, () => {
		testOperation(count, {
			source: [],
			target: [0]
		});
		testOperation(count, {
			source: [1],
			target: [1]
		});
		testOperation(count, {
			source: [1, 3, 5],
			target: [3]
		});
		testOperation(count, {
			source: [1, null, -5, undefined, {}, [42], false],
			target: [7]
		});
	});
}
