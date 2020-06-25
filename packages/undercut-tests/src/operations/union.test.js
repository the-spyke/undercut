import { expect, test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function union(type, union) {
	const testOperation = createTestOperation(type);

	test(`should work [legacy]`, () => {
		testOperation(union, {
			source: [],
			target: []
		});
		testOperation(union, {
			source: [1],
			target: [1]
		});
		testOperation(union, {
			args: [[5]],
			source: [2],
			target: [2, 5]
		});
		testOperation(union, {
			args: [[1, 1, 2]],
			source: [2, 1, 2, 1],
			target: [2, 1]
		});
		testOperation(union, {
			args: [[1, 1, 2], [], [5, 5, 7]],
			source: [2, 1, 2, 1],
			target: [2, 1, 5, 7]
		});
		testOperation(union, {
			args: [[`a`, 1, false]],
			source: [false, `a`, 2, undefined],
			target: [false, `a`, 2, undefined, 1]
		});

		const users = [
			{ name: `a` },
			{ name: `b` },
			{ name: `c` }
		];

		testOperation(union, {
			args: [[users[0], users[0]]],
			source: [users[1], users[0]],
			target: [users[1], users[0]]
		});
	});
}

export function unionBy(type, unionBy) {
	const testOperation = createTestOperation(type);

	test(`should throw on ivalid arguments`, () => {
		expect(() => unionBy()).toThrow();
		expect(() => unionBy([1])).toThrow();
	});

	test(`should work [legacy]`, () => {
		testOperation(unionBy, {
			args: [item => item.x, []],
			source: [],
			target: []
		});
		testOperation(unionBy, {
			args: [item => item.x, [{ x: 1 }, { x: 2 }, { y: 1 }]],
			source: [{ x: 2 }, { x: 3 }, { y: 1 }],
			target: [{ x: 2 }, { x: 3 }, { y: 1 }, { x: 1 }]
		});
	});
}
