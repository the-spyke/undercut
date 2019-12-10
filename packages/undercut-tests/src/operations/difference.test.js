import { testOperationPull, testOperationPush } from "@undercut/testing";

import {
	difference as differencePull,
	differenceBy as differenceByPull,
	symmetricDifference as symmetricDifferencePull,
	symmetricDifferenceBy as symmetricDifferenceByPull,
} from "@undercut/pull/src/operations/difference.js";
import {
	difference as differencePush,
	differenceBy as differenceByPush,
	symmetricDifference as symmetricDifferencePush,
	symmetricDifferenceBy as symmetricDifferenceByPush,
} from "@undercut/push/src/operations/difference.js";

function testDifference(testOperation, difference) {
	testOperation(difference, {
		source: [],
		target: []
	});
	testOperation(difference, {
		source: [1],
		target: [1]
	});
	testOperation(difference, {
		args: [[1]],
		source: [],
		target: []
	});
	testOperation(difference, {
		args: [[5]],
		source: [2],
		target: [2]
	});
	testOperation(difference, {
		args: [[1, 1, 2]],
		source: [2, 1, 2, 1],
		target: []
	});
	testOperation(difference, {
		args: [[7, 1], [5, 5, 7]],
		source: [2, 1, 2, 1],
		target: [2, 2]
	});
	testOperation(difference, {
		args: [[`b`, 1], [`c`, true, 2], [undefined]],
		source: [false, `a`],
		target: [false, `a`]
	});
}

describe(`difference`, () => {
	test(`pull`, () => testDifference(testOperationPull, differencePull));
	test(`push`, () => testDifference(testOperationPush, differencePush));
});

function testDifferenceBy(testOperation, differenceBy) {
	expect(() => differenceBy()).toThrow();
	expect(() => differenceBy([1])).toThrow();

	testOperation(differenceBy, {
		args: [x => x.prop],
		source: [],
		target: []
	});
	testOperation(differenceBy, {
		args: [x => x.prop, [{ x: 1 }]],
		source: [{ x: 2 }],
		target: []
	});
	testOperation(differenceBy, {
		args: [x => x.prop, [{ prop: 3 }, { prop: 2 }]],
		source: [{ prop: 1 }, { x: 1 }, { prop: 2 }],
		target: [{ prop: 1 }, { x: 1 }]
	});
}

describe(`differenceBy`, () => {
	test(`pull`, () => testDifferenceBy(testOperationPull, differenceByPull));
	test(`push`, () => testDifferenceBy(testOperationPush, differenceByPush));
});

function testSymmetricDifference(testOperation, symmetricDifference) {
	testOperation(symmetricDifference, {
		source: [],
		target: []
	});
	testOperation(symmetricDifference, {
		source: [1],
		target: [1]
	});
	testOperation(symmetricDifference, {
		args: [[1]],
		source: [],
		target: [1]
	});
	testOperation(symmetricDifference, {
		args: [[5]],
		source: [2],
		target: [2, 5]
	});
	testOperation(symmetricDifference, {
		args: [[1, 2, 3]],
		source: [3, 4, 5],
		target: [4, 5, 1, 2]
	});
	testOperation(symmetricDifference, {
		args: [[0, 1, 2, 3], [3, 2, 7, 6]],
		source: [3, 4, 1, 6],
		target: [3, 4, 0, 7]
	});
}

describe(`symmetricDifference`, () => {
	test(`pull`, () => testSymmetricDifference(testOperationPull, symmetricDifferencePull));
	test(`push`, () => testSymmetricDifference(testOperationPush, symmetricDifferencePush));
});

function testSymmetricDifferenceBy(testOperation, symmetricDifferenceBy) {
	expect(() => symmetricDifferenceBy()).toThrow();
	expect(() => symmetricDifferenceBy([1])).toThrow();

	testOperation(symmetricDifferenceBy, {
		args: [x => x.prop],
		source: [],
		target: []
	});
	testOperation(symmetricDifferenceBy, {
		args: [x => x.prop, [{ x: 1 }, { prop: 1 }]],
		source: [{ x: 2 }, { prop: 2 }],
		target: [{ prop: 2 }, { prop: 1 }]
	});
}

describe(`symmetricDifferenceBy`, () => {
	test(`pull`, () => testSymmetricDifferenceBy(testOperationPull, symmetricDifferenceByPull));
	test(`push`, () => testSymmetricDifferenceBy(testOperationPush, symmetricDifferenceByPush));
});
