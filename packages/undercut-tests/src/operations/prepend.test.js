import { describe, test } from "@jest/globals";

import { testOperationPull, testOperationPush } from "@undercut/testing";

import { prepend as prependPull } from "@undercut/pull/src/operations/prepend.js";
import { prepend as prependPush } from "@undercut/push/src/operations/prepend.js";

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

describe(`prepend`, () => {
	test(`pull`, () => testPrepend(testOperationPull, prependPull));
	test(`push`, () => testPrepend(testOperationPush, prependPush));
});
