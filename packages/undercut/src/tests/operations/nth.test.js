import { testOperationPull, testOperationPush } from "../../utils/tests.js";

import { nth as nthPull } from "../../pull/operations/nth.js";
import { nth as nthPush } from "../../push/operations/nth.js";

function testNth(testOperation, nth) {
	expect(() => nth()).toThrow();
	expect(() => nth(-1)).toThrow();

	testOperation(nth, {
		args: [0],
		source: [],
		target: []
	});
	testOperation(nth, {
		args: [100],
		source: [],
		target: []
	});
	testOperation(nth, {
		args: [0],
		source: [1],
		target: [1]
	});
	testOperation(nth, {
		args: [0],
		source: [1, 2, 3],
		target: [1]
	});
	testOperation(nth, {
		args: [4],
		source: [1, false, {}, -3, undefined],
		target: [undefined]
	});
}

describe("nth", () => {
	test("pull", () => testNth(testOperationPull, nthPull));
	test("push", () => testNth(testOperationPush, nthPush));
});
