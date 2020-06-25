import { test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function includes(type, includes) {
	const testOperation = createTestOperation(type);

	test(`should work [legacy]`, () => {
		testOperation(includes, {
			source: [1],
			target: [false]
		});
		testOperation(includes, {
			source: [undefined],
			target: [true]
		});
		testOperation(includes, {
			args: [-5],
			source: [1, -3, -5, 2],
			target: [true]
		});
		testOperation(includes, {
			args: [-6],
			source: [1, -3, -5, 2],
			target: [false]
		});
	});
}
