import { expect, test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function unique(type, unique) {
	const testOperation = createTestOperation(type);

	test(`should work [legacy]`, () => {
		testOperation(unique, {
			source: [],
			target: []
		});
		testOperation(unique, {
			source: [1],
			target: [1]
		});
		testOperation(unique, {
			source: [2, 5],
			target: [2, 5]
		});
		testOperation(unique, {
			source: [1, 1, 2, 1],
			target: [1, 2]
		});
		testOperation(unique, {
			source: [`a`, 1, `a`],
			target: [`a`, 1]
		});

		const users = [
			{ name: `a` },
			{ name: `b` },
			{ name: `c` }
		];

		testOperation(unique, {
			source: [users[0], users[0], users[1], users[0], users[1]],
			target: [users[0], users[1]]
		});
	});
}

export function uniqueBy(type, uniqueBy) {
	const testOperation = createTestOperation(type);

	test(`should throw on ivalid arguments`, () => {
		expect(() => uniqueBy()).toThrow();
		expect(() => uniqueBy([1])).toThrow();
	});

	test(`should work [legacy]`, () => {
		testOperation(uniqueBy, {
			args: [item => item.x],
			source: [],
			target: []
		});
		testOperation(uniqueBy, {
			args: [item => item.x],
			source: [{ x: 1 }, { x: 1 }, { y: 1 }, { x: 2 }],
			target: [{ x: 1 }, { y: 1 }, { x: 2 }]
		});
	});
}
