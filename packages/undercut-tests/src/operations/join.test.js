import { test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function join(type, join) {
	const testOperation = createTestOperation(type);

	test(`should work [legacy]`, () => {
		testOperation(join, {
			source: [],
			target: [[].join()]
		});
		testOperation(join, {
			source: [1],
			target: [[1].join()]
		});
		testOperation(join, {
			source: [1, 3, 5],
			target: [[1, 3, 5].join()]
		});
		testOperation(join, {
			args: [null],
			source: [1, 3, 5],
			target: [[1, 3, 5].join(null)]
		});
		testOperation(join, {
			args: [``],
			source: [undefined, 1, ``],
			target: [[undefined, 1, ``].join(``)]
		});
		testOperation(join, {
			args: [33],
			source: [undefined, 1, ``],
			target: [[undefined, 1, ``].join(33)]
		});
	});
}
