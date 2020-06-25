import { expect, test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function find(type, find) {
	const testOperation = createTestOperation(type);

	test(`should throw on ivalid arguments`, () => {
		expect(() => find()).toThrow();
	});

	test(`should work [legacy]`, () => {
		testOperation(find, {
			args: [() => false],
			source: [3, 4],
			target: [],
			callbackArgs: [[3, 0], [4, 1]]
		});

		testOperation(find, {
			args: [x => x === 2],
			source: [],
			target: []
		});
		testOperation(find, {
			args: [x => x === 2],
			source: [1],
			target: []
		});
		testOperation(find, {
			args: [x => x === 2],
			source: [1, 0, 2, 5],
			target: [2]
		});
		testOperation(find, {
			args: [x => x === 2],
			source: [1, -3, -5, 2],
			target: [2]
		});

		const users = [
			{},
			{ name: `a` },
			{ name: `b` },
			{ name: `c` }
		];

		testOperation(find, {
			args: [u => u.name === `b`],
			source: users,
			target: [users[2]]
		});
	});
}

export function findIndex(type, findIndex) {
	const testOperation = createTestOperation(type);

	test(`should throw on ivalid arguments`, () => {
		expect(() => findIndex()).toThrow();
	});

	test(`should work [legacy]`, () => {
		testOperation(findIndex, {
			args: [() => false],
			source: [3, 4],
			target: [],
			callbackArgs: [[3, 0], [4, 1]]
		});

		testOperation(findIndex, {
			args: [x => x === 2],
			source: [],
			target: []
		});
		testOperation(findIndex, {
			args: [x => x === 2],
			source: [1],
			target: []
		});
		testOperation(findIndex, {
			args: [x => x === 2],
			source: [2, 5],
			target: [0]
		});
		testOperation(findIndex, {
			args: [x => x === 2],
			source: [1, 0, 2, 5],
			target: [2]
		});
		testOperation(findIndex, {
			args: [x => x === 2],
			source: [1, -3, -5, 2],
			target: [3]
		});
		testOperation(findIndex, {
			args: [x => x === 2],
			source: [],
			target: []
		});

		const users = [
			{},
			{ name: `a` },
			{ name: `b` },
			{ name: `c` }
		];

		testOperation(findIndex, {
			args: [u => u.name === `b`],
			source: users,
			target: [2]
		});
	});
}
