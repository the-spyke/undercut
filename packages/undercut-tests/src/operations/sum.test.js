import { testOperationPull, testOperationPush } from "@undercut/testing";

import { sum as sumPull } from "@undercut/pull/src/operations/sum.js";
import { sum as sumPush } from "@undercut/push/src/operations/sum.js";

function testSum(testOperation, sum) {
	testOperation(sum, {
		source: [],
		target: [0]
	});
	testOperation(sum, {
		source: [1],
		target: [1]
	});
	testOperation(sum, {
		source: [1, 3, 5],
		target: [9]
	});
	testOperation(sum, {
		source: [1, -3, -5],
		target: [-7]
	});
}

describe(`sum`, () => {
	test(`pull`, () => testSum(testOperationPull, sumPull));
	test(`push`, () => testSum(testOperationPush, sumPush));
});
