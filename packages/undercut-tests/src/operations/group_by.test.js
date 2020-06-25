import { expect, test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function groupBy(type, groupBy) {
	const testOperation = createTestOperation(type);

	test(`should throw on ivalid arguments`, () => {
		expect(() => groupBy()).toThrow();
	});

	test(`should work [legacy]`, () => {
		testOperation(groupBy, {
			args: [() => 1],
			source: [3, 4],
			target: [[1, [3, 4]]],
			callbackArgs: [[3, 0], [4, 1]]
		});
		testOperation(groupBy, {
			args: [x => x],
			source: [],
			target: []
		});
		testOperation(groupBy, {
			args: [x => Math.trunc(x / 10)],
			source: [0, 1, 4, 8, 10, 15, 42],
			target: [
				[0, [0, 1, 4, 8]],
				[1, [10, 15]],
				[4, [42]]
			]
		});

		const users = [
			{ groupId: 1, name: `Tom` },
			{ groupId: 3, name: `John` },
			{ groupId: 2, name: `Sam` },
			{ groupId: 1, name: `Ann` },
			{ groupId: 2, name: `Dan` },
		];

		testOperation(groupBy, {
			args: [u => u.groupId],
			source: users,
			target: [
				[1, [users[0], users[3]]],
				[3, [users[1]]],
				[2, [users[2], users[4]]]
			]
		});
	});
}
