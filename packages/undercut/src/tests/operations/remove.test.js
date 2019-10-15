import { testOperationPull, testOperationPush } from "../../utils/tests.js";

import { remove as removePull } from "../../pull/operations/remove.js";
import { remove as removePush } from "../../push/operations/remove.js";

function testRemove(testOperation, remove) {
	expect(() => remove()).toThrow();

	testOperation(remove, {
		args: [() => false],
		source: [3, 4],
		target: [3, 4],
		callbackArgs: [[3, 0], [4, 1]]
	});
	testOperation(remove, {
		args: [x => x > 5],
		source: [],
		target: []
	});
	testOperation(remove, {
		args: [x => x > 5],
		source: [1],
		target: [1]
	});
	testOperation(remove, {
		args: [x => x > 5],
		source: [2, 5],
		target: [2, 5]
	});
	testOperation(remove, {
		args: [x => x > 5],
		source: [1, 7, 2, 5, -1],
		target: [1, 2, 5, -1]
	});
}

describe("remove", () => {
	test("pull", () => testRemove(testOperationPull, removePull));
	test("push", () => testRemove(testOperationPush, removePush));
});
