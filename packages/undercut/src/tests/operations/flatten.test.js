import { testOperationPull, testOperationPush } from "../../utils/tests.js";

import { flatten as flattenPull, flattenIterables as flattenIterablesPull } from "../../pull/operations/flatten.js";
import { flatten as flattenPush, flattenIterables as flattenIterablesPush } from "../../push/operations/flatten.js";

function testFlatten(testOperation, flatten) {
	expect(() => flatten(-1)).toThrow();

	testOperation(flatten, {
		source: [],
		target: []
	});
	testOperation(flatten, {
		source: [1],
		target: [1]
	});
	testOperation(flatten, {
		source: [undefined],
		target: [undefined]
	});
	testOperation(flatten, {
		source: [2, 4, [], 1],
		target: [2, 4, 1]
	});
	testOperation(flatten, {
		args: [0],
		source: [2, 4, [], 1],
		target: [2, 4, [], 1]
	});
	testOperation(flatten, {
		source: [2, 4, [6, 9], 1],
		target: [2, 4, 6, 9, 1]
	});
	testOperation(flatten, {
		args: [0.5],
		source: [2, 4, [6, [9]], 1],
		target: [2, 4, [6, [9]], 1]
	});
	testOperation(flatten, {
		args: [1.5],
		source: [2, 4, [6, [9]], 1],
		target: [2, 4, 6, [9], 1]
	});
	testOperation(flatten, {
		source: [[0], 2, 4, [6, 9], 1, [false, []]],
		target: [0, 2, 4, 6, 9, 1, false, []]
	});
	testOperation(flatten, {
		args: [2],
		source: [[0], 2, 4, [6, 9], 1, [false, [7, []]]],
		target: [0, 2, 4, 6, 9, 1, false, 7, []]
	});
	testOperation(flatten, {
		args: [Infinity],
		source: [[[[[[]]]]]],
		target: []
	});
}

describe("flatten", () => {
	test("pull", () => testFlatten(testOperationPull, flattenPull));
	test("push", () => testFlatten(testOperationPush, flattenPush));
});

function testFlattenIterables(testOperation, flattenIterables) {
	expect(() => flattenIterables(-1)).toThrow();

	testOperation(flattenIterables, {
		source: [],
		target: []
	});
	testOperation(flattenIterables, {
		source: [undefined],
		target: [undefined]
	});
	testOperation(flattenIterables, {
		source: ["test", 1, ["test"]],
		target: ["t", "e", "s", "t", 1, "test"]
	});
	testOperation(flattenIterables, {
		args: [5],
		source: [[[[[[]]]]]],
		target: []
	});
}

describe("flattenIterables", () => {
	test("pull", () => testFlattenIterables(testOperationPull, flattenIterablesPull));
	test("push", () => testFlattenIterables(testOperationPush, flattenIterablesPush));
});
