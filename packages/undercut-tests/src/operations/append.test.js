import { test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function append(type, append) {
	const testOperation = createTestOperation(type);

	test(`should work [legacy]`, () => {
		testOperation(append, {
			source: [],
			target: []
		});
		testOperation(append, {
			source: [1],
			target: [1]
		});
		testOperation(append, {
			args: [2],
			source: [1],
			target: [1, 2]
		});
		testOperation(append, {
			args: [null],
			source: [1],
			target: [1, null]
		});
		testOperation(append, {
			args: [undefined],
			source: [1],
			target: [1, undefined]
		});
		testOperation(append, {
			args: [2, 3],
			source: [1],
			target: [1, 2, 3]
		});
	});
}
