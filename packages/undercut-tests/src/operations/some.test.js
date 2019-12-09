import { testOperationPull, testOperationPush } from "@undercut/testing";

import { some as somePull } from "../../pull/operations/some.js";
import { some as somePush } from "../../push/operations/some.js";

function testSome(testOperation, some) {
	expect(() => some()).toThrow();

	testOperation(some, {
		args: [() => false],
		source: [3, 4],
		target: [false],
		callbackArgs: [[3, 0], [4, 1]]
	});
	testOperation(some, {
		args: [x => x > 5],
		source: [],
		target: [false]
	});
	testOperation(some, {
		args: [x => x > 5],
		source: [1],
		target: [false]
	});
	testOperation(some, {
		args: [x => x > 5],
		source: [2, 5],
		target: [false]
	});
	testOperation(some, {
		args: [x => x > 5],
		source: [1, 7, 2, 5],
		target: [true]
	});
}

describe(`some`, () => {
	test(`pull`, () => testSome(testOperationPull, somePull));
	test(`push`, () => testSome(testOperationPush, somePush));
});
