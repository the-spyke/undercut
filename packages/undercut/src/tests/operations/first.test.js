import { testOperationPull, testOperationPush } from "../../utils/tests.js";

import { first as firstPull } from "../../pull/operations/first.js";
import { first as firstPush } from "../../push/operations/first.js";

function testFirst(testOperation, first) {
	testOperation(first, {
		source: [],
		target: []
	});
	testOperation(first, {
		source: [1],
		target: [1]
	});
	testOperation(first, {
		source: [undefined],
		target: [undefined]
	});
	testOperation(first, {
		source: [2, 4, -3],
		target: [2]
	});
}

describe("first", () => {
	test("pull", () => testFirst(testOperationPull, firstPull));
	test("push", () => testFirst(testOperationPush, firstPush));
});
