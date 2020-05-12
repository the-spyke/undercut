import { describe, test } from "@jest/globals";

import { testOperationPull, testOperationPush } from "@undercut/testing";

import { append as appendPull } from "@undercut/pull/src/operations/append.js";
import { append as appendPush } from "@undercut/push/src/operations/append.js";

function testAppend(testOperation, append) {
	testOperation(append, {
		source: [],
		target: []
	});
	testOperation(append, {
		source: [1],
		target: [1]
	});
	testOperation(append, {
		args: [2],
		source: [1],
		target: [1, 2]
	});
	testOperation(append, {
		args: [null],
		source: [1],
		target: [1, null]
	});
	testOperation(append, {
		args: [undefined],
		source: [1],
		target: [1, undefined]
	});
	testOperation(append, {
		args: [2, 3],
		source: [1],
		target: [1, 2, 3]
	});
}

describe(`append`, () => {
	test(`pull`, () => testAppend(testOperationPull, appendPull));
	test(`push`, () => testAppend(testOperationPush, appendPush));
});
