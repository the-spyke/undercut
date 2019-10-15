import { testOperationPull, testOperationPush } from "../../utils/tests.js";

import { reverse as reversePull } from "../../pull/operations/reverse.js";
import { reverse as reversePush } from "../../push/operations/reverse.js";

function testReverse(testOperation, reverse) {
	testOperation(reverse, {
		source: [],
		target: []
	});
	testOperation(reverse, {
		source: [1],
		target: [1]
	});
	testOperation(reverse, {
		source: [2, 5],
		target: [5, 2]
	});
	testOperation(reverse, {
		source: [undefined, 1, -7, "test", 0, null],
		target: [null, 0, "test", -7, 1, undefined]
	});
}

describe("reverse", () => {
	test("pull", () => testReverse(testOperationPull, reversePull));
	test("push", () => testReverse(testOperationPush, reversePush));
});
