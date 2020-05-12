import { describe, expect, test } from "@jest/globals";

import { testOperationPull, testOperationPush } from "@undercut/testing";

import { forEach as forEachPull } from "@undercut/pull/src/operations/for_each.js";
import { forEach as forEachPush } from "@undercut/push/src/operations/for_each.js";

function testForEach(testOperation, forEach) {
	expect(() => forEach()).toThrow();

	testOperation(forEach, {
		args: [() => true],
		source: [],
		target: [],
		callbackArgs: []
	});
	testOperation(forEach, {
		args: [() => true],
		source: [undefined, false, 7],
		target: [undefined, false, 7],
		callbackArgs: [[undefined, 0], [false, 1], [7, 2]]
	});
}

describe(`forEach`, () => {
	test(`pull`, () => testForEach(testOperationPull, forEachPull));
	test(`push`, () => testForEach(testOperationPush, forEachPush));
});
