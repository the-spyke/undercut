import { testOperationPull, testOperationPush } from "@undercut/testing";

import { filter as filterPull } from "@undercut/pull/src/operations/filter.js";
import { filter as filterPush } from "@undercut/push/src/operations/filter.js";

function testFilter(testOperation, filter) {
	expect(() => filter()).toThrow();

	testOperation(filter, {
		args: [x => x > 2],
		source: [3, 4],
		target: [3, 4],
		callbackArgs: [[3, 0], [4, 1]]
	});
	testOperation(filter, {
		args: [x => x > 5],
		source: [],
		target: [],
		callbackArgs: []
	});
	testOperation(filter, {
		args: [x => x > 5],
		source: [1],
		target: []
	});
	testOperation(filter, {
		args: [x => x > 5],
		source: [2, 5],
		target: []
	});
	testOperation(filter, {
		args: [x => x > 5],
		source: [1, 7, 2, 5],
		target: [7]
	});
}

describe(`filter`, () => {
	test(`pull`, () => testFilter(testOperationPull, filterPull));
	test(`push`, () => testFilter(testOperationPush, filterPush));
});
