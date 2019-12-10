import { testOperationPull, testOperationPush } from "@undercut/testing";

import { last as lastPull } from "@undercut/pull/src/operations/last.js";
import { last as lastPush } from "@undercut/push/src/operations/last.js";

function testLast(testOperation, last) {
	testOperation(last, {
		source: [],
		target: []
	});
	testOperation(last, {
		source: [1],
		target: [1]
	});
	testOperation(last, {
		source: [undefined],
		target: [undefined]
	});
	testOperation(last, {
		source: [2, {}, undefined, 4, -3, null],
		target: [null]
	});
}

describe(`last`, () => {
	test(`pull`, () => testLast(testOperationPull, lastPull));
	test(`push`, () => testLast(testOperationPush, lastPush));
});
