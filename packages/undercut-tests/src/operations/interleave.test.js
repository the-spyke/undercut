import { describe, test } from "@jest/globals";

import { testOperationPull, testOperationPush } from "@undercut/testing";

import { interleave as interleavePull } from "@undercut/pull/src/operations/interleave.js";
import { interleave as interleavePush } from "@undercut/push/src/operations/interleave.js";

function testInterleave(testOperation, interleave) {
	testOperation(interleave, {
		args: [[]],
		source: [],
		target: []
	});
	testOperation(interleave, {
		args: [[]],
		source: [1, 2],
		target: [1, 2]
	});
	testOperation(interleave, {
		args: [[1, 2]],
		source: [],
		target: [1, 2]
	});
	testOperation(interleave, {
		args: [[1, 3, 5]],
		source: [0, 2, 4],
		target: [0, 1, 2, 3, 4, 5]
	});
	testOperation(interleave, {
		args: [[1, 4], [2, 5]],
		source: [0, 3],
		target: [0, 1, 2, 3, 4, 5]
	});
}

describe(`interleave`, () => {
	test(`pull`, () => testInterleave(testOperationPull, interleavePull));
	test(`push`, () => testInterleave(testOperationPush, interleavePush));
});
