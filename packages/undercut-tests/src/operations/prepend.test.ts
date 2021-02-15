import { test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function prepend(type, prepend) {
	const testOperation = createTestOperation(type);

	test(`should work [legacy]`, () => {
		testOperation(prepend, {
			source: [],
			target: []
		});
		testOperation(prepend, {
			source: [1],
			target: [1]
		});
		testOperation(prepend, {
			args: [2],
			source: [1],
			target: [2, 1]
		});
		testOperation(prepend, {
			args: [null],
			source: [1],
			target: [null, 1]
		});
		testOperation(prepend, {
			args: [undefined],
			source: [1],
			target: [undefined, 1]
		});
		testOperation(prepend, {
			args: [2, 3],
			source: [1],
			target: [2, 3, 1]
		});
	});
}
