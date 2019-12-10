import { testOperationPull, testOperationPush } from "@undercut/testing";

import { every as everyPull } from "@undercut/pull/src/operations/every.js";
import { every as everyPush } from "@undercut/push/src/operations/every.js";

function testEvery(testOperation, every) {
	expect(() => every()).toThrow();

	testOperation(every, {
		args: [() => true],
		source: [3, 4],
		target: [true],
		callbackArgs: [[3, 0], [4, 1]]
	});
	testOperation(every, {
		args: [x => x > 5],
		source: [],
		target: [true]
	});
	testOperation(every, {
		args: [x => x > 5],
		source: [1],
		target: [false]
	});
	testOperation(every, {
		args: [x => x > 5],
		source: [2, 5],
		target: [false]
	});
	testOperation(every, {
		args: [x => x > 5],
		source: [2, 6],
		target: [false]
	});
	testOperation(every, {
		args: [x => x > 5],
		source: [7, 6],
		target: [true]
	});
}

describe(`every`, () => {
	test(`pull`, () => testEvery(testOperationPull, everyPull));
	test(`push`, () => testEvery(testOperationPush, everyPush));
});
