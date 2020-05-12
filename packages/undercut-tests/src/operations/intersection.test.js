import { describe, expect, test } from "@jest/globals";

import { testOperationPull, testOperationPush } from "@undercut/testing";

import { intersection as intersectionPull, intersectionBy as intersectionByPull } from "@undercut/pull/src/operations/intersection.js";
import { intersection as intersectionPush, intersectionBy as intersectionByPush } from "@undercut/push/src/operations/intersection.js";

function testIntersection(testOperation, intersection) {
	testOperation(intersection, {
		source: [],
		target: []
	});
	testOperation(intersection, {
		source: [1],
		target: []
	});
	testOperation(intersection, {
		args: [[1]],
		source: [],
		target: []
	});
	testOperation(intersection, {
		args: [[5]],
		source: [2],
		target: []
	});
	testOperation(intersection, {
		args: [[1, 1, 2]],
		source: [2, 1, 2, 1],
		target: [2, 1]
	});
	testOperation(intersection, {
		args: [[1, 1, 2], [2, 7, 1], [5, 5, 2, 7]],
		source: [2, 1, 2, 1],
		target: [2]
	});
	testOperation(intersection, {
		args: [[`a`, 1, false]],
		source: [false, `a`, 2, undefined],
		target: [false, `a`]
	});
}

describe(`intersection`, () => {
	test(`pull`, () => testIntersection(testOperationPull, intersectionPull));
	test(`push`, () => testIntersection(testOperationPush, intersectionPush));
});

function testIntersectionBy(testOperation, intersectionBy) {
	expect(() => intersectionBy()).toThrow();
	expect(() => intersectionBy([1])).toThrow();

	testOperation(intersectionBy, {
		args: [item => item.x],
		source: [],
		target: []
	});
	testOperation(intersectionBy, {
		args: [item => item.x, [{ x: 1 }, { x: 2 }, { y: 1 }]],
		source: [{ x: 2 }, { x: 3 }, { y: 1 }],
		target: [{ x: 2 }, { y: 1 }]
	});
}

describe(`intersectionBy`, () => {
	test(`pull`, () => testIntersectionBy(testOperationPull, intersectionByPull));
	test(`push`, () => testIntersectionBy(testOperationPush, intersectionByPush));
});
