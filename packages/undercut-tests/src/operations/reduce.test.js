import { testOperationPull, testOperationPush } from "@undercut/testing";

import { reduce as reducePull } from "../../pull/operations/reduce.js";
import { reduce as reducePush } from "../../push/operations/reduce.js";

function testReduce(testOperation, reduce) {
	expect(() => reduce()).toThrow();

	testOperation(reduce, {
		args: [() => 3, -4],
		source: [],
		target: [-4]
	});
	testOperation(reduce, {
		args: [() => 7],
		source: [3, 4],
		target: [7],
		callbackArgs: [[undefined, 3, 0], [7, 4, 1]]
	});
	testOperation(reduce, {
		args: [(acc, x) => acc + x, 0],
		source: [],
		target: [0]
	});
	testOperation(reduce, {
		args: [(acc, x) => acc + x, 0],
		source: [1, -1, 3, 45],
		target: [48]
	});
}

describe(`reduce`, () => {
	test(`pull`, () => testReduce(testOperationPull, reducePull));
	test(`push`, () => testReduce(testOperationPush, reducePush));
});
