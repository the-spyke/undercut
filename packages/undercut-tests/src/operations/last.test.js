import { test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function last(type, last) {
	const testOperation = createTestOperation(type);

	test(`should work [legacy]`, () => {
		testOperation(last, {
			source: [],
			target: []
		});
		testOperation(last, {
			source: [1],
			target: [1]
		});
		testOperation(last, {
			source: [undefined],
			target: [undefined]
		});
		testOperation(last, {
			source: [2, {}, undefined, 4, -3, null],
			target: [null]
		});
	});
}
