import { describe, test } from "@jest/globals";

import { testOperationPull, testOperationPush } from "@undercut/testing";

import { compact as compactPull } from "@undercut/pull/src/operations/compact.js";
import { compact as compactPush } from "@undercut/push/src/operations/compact.js";

function testCompact(testOperation, compact) {
	testOperation(compact, {
		source: [],
		target: []
	});
	testOperation(compact, {
		source: [1],
		target: [1]
	});
	testOperation(compact, {
		source: [0, 0],
		target: []
	});
	testOperation(compact, {
		source: [0, 1, false, 4, null, undefined, -1, `test`, true, [], {}, ``],
		target: [1, 4, -1, `test`, true, [], {}]
	});
}

describe(`compact`, () => {
	test(`pull`, () => testCompact(testOperationPull, compactPull));
	test(`push`, () => testCompact(testOperationPush, compactPush));
});
