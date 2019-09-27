import { testOperationPull, testOperationPush } from "../../utils/tests.js";

import { includes as includesPull } from "../../pull/operations/includes.js";
import { includes as includesPush } from "../../push/operations/includes.js";

function testIncludes(testOperation, includes) {
	testOperation(includes, {
		source: [1],
		target: [false]
	});
	testOperation(includes, {
		source: [undefined],
		target: [true]
	});
	testOperation(includes, {
		args: [-5],
		source: [1, -3, -5, 2],
		target: [true]
	});
	testOperation(includes, {
		args: [-6],
		source: [1, -3, -5, 2],
		target: [false]
	});
}

describe("includes", () => {
	test("pull", () => testIncludes(testOperationPull, includesPull));
	test("push", () => testIncludes(testOperationPush, includesPush));
});
