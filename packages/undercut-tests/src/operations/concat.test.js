import { testOperationPull, testOperationPush } from "@undercut/testing";

import { concatStart as concatStartPull, concatEnd as concatEndPull } from "../../pull/operations/concat.js";
import { concatStart as concatStartPush, concatEnd as concatEndPush } from "../../push/operations/concat.js";

function testConcatStart(testOperation, concatStart) {
	expect(() => concatStart()).toThrow();

	testOperation(concatStart, {
		args: [[]],
		source: [],
		target: []
	});
	testOperation(concatStart, {
		args: [[]],
		source: [1],
		target: [1]
	});
	testOperation(concatStart, {
		args: [[1]],
		source: [],
		target: [1]
	});
	testOperation(concatStart, {
		args: [[1, 3]],
		source: [2, 4],
		target: [1, 3, 2, 4]
	});
}

describe(`concatStart`, () => {
	test(`pull`, () => testConcatStart(testOperationPull, concatStartPull));
	test(`push`, () => testConcatStart(testOperationPush, concatStartPush));
});

function testConcatEnd(testOperation, concatEnd) {
	expect(() => concatEnd()).toThrow();

	testOperation(concatEnd, {
		args: [[]],
		source: [],
		target: []
	});
	testOperation(concatEnd, {
		args: [[]],
		source: [1],
		target: [1]
	});
	testOperation(concatEnd, {
		args: [[1]],
		source: [],
		target: [1]
	});
	testOperation(concatEnd, {
		args: [[1, 3]],
		source: [2, 4],
		target: [2, 4, 1, 3]
	});
}

describe(`concatEnd`, () => {
	test(`pull`, () => testConcatEnd(testOperationPull, concatEndPull));
	test(`push`, () => testConcatEnd(testOperationPush, concatEndPush));
});
