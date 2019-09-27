import { testOperationPull, testOperationPush } from "../../utils/tests.js";

import { find as findPull, findIndex as findIndexPull } from "../../pull/operations/find.js";
import { find as findPush, findIndex as findIndexPush } from "../../push/operations/find.js";

function testFind(testOperation, find) {
	expect(() => find()).toThrow();

	testOperation(find, {
		args: [() => false],
		source: [3,4],
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
		{ name: "a" },
		{ name: "b" },
		{ name: "c" }
	];

	testOperation(find, {
		args: [u => u.name === "b"],
		source: users,
		target: [users[2]]
	});
}

describe("find", () => {
	test("pull", () => testFind(testOperationPull, findPull));
	test("push", () => testFind(testOperationPush, findPush));
});

function testFindIndex(testOperation, findIndex) {
	expect(() => findIndex()).toThrow();

	testOperation(findIndex, {
		args: [() => false],
		source: [3,4],
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
		source: [2,5],
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
		{ name: "a" },
		{ name: "b" },
		{ name: "c" }
	];

	testOperation(findIndex, {
		args: [u => u.name === "b"],
		source: users,
		target: [2]
	});
}

describe("findIndex", () => {
	test("pull", () => testFindIndex(testOperationPull, findIndexPull));
	test("push", () => testFindIndex(testOperationPush, findIndexPush));
});
