import { test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function interleave(type, interleave) {
	const testOperation = createTestOperation(type);

	test(`should work [legacy]`, () => {
		testOperation(interleave, {
			args: [[]],
			source: [],
			target: []
		});
		testOperation(interleave, {
			args: [[]],
			source: [1, 2],
			target: [1, 2]
		});
		testOperation(interleave, {
			args: [[1, 2]],
			source: [],
			target: [1, 2]
		});
		testOperation(interleave, {
			args: [[1, 3, 5]],
			source: [0, 2, 4],
			target: [0, 1, 2, 3, 4, 5]
		});
		testOperation(interleave, {
			args: [[1, 4], [2, 5]],
			source: [0, 3],
			target: [0, 1, 2, 3, 4, 5]
		});
	});
}
