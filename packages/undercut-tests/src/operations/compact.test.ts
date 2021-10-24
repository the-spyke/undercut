import { test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function compact(type, compact) {
	const testOperation = createTestOperation(type);

	test(`should work [legacy]`, () => {
		testOperation(compact, {
			source: [],
			target: []
		});
		testOperation(compact, {
			source: [1],
			target: [1]
		});
		testOperation(compact, {
			source: [0, 0],
			target: []
		});
		testOperation(compact, {
			source: [0, 1, false, 4, null, undefined, -1, `test`, true, [], {}, ``],
			target: [1, 4, -1, `test`, true, [], {}]
		});
	});
}
