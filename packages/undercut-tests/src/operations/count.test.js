import { describe, test } from "@jest/globals";

import { testOperationPull, testOperationPush } from "@undercut/testing";

import { count as countPull } from "@undercut/pull/src/operations/count.js";
import { count as countPush } from "@undercut/push/src/operations/count.js";

function testCount(testOperation, count) {
	testOperation(count, {
		source: [],
		target: [0]
	});
	testOperation(count, {
		source: [1],
		target: [1]
	});
	testOperation(count, {
		source: [1, 3, 5],
		target: [3]
	});
	testOperation(count, {
		source: [1, null, -5, undefined, {}, [42], false],
		target: [7]
	});
}

describe(`count`, () => {
	test(`pull`, () => testCount(testOperationPull, countPull));
	test(`push`, () => testCount(testOperationPush, countPush));
});
