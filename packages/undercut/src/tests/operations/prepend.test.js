import { testOperationPull, testOperationPush } from "../../utils/tests.js";

import { prepend as prependPull } from "../../pull/operations/prepend.js";
import { prepend as prependPush } from "../../push/operations/prepend.js";

function testPrepend(testOperation, prepend) {
	testOperation(prepend, {
		source: [],
		target: []
	});
	testOperation(prepend, {
		source: [1],
		target: [1]
	});
	testOperation(prepend, {
		args: [2],
		source: [1],
		target: [2, 1]
	});
	testOperation(prepend, {
		args: [null],
		source: [1],
		target: [null, 1]
	});
	testOperation(prepend, {
		args: [undefined],
		source: [1],
		target: [undefined, 1]
	});
	testOperation(prepend, {
		args: [2, 3],
		source: [1],
		target: [2, 3, 1]
	});
}

describe("prepend", () => {
	test("pull", () => testPrepend(testOperationPull, prependPull));
	test("push", () => testPrepend(testOperationPush, prependPush));
});
