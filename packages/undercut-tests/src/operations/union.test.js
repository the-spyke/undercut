import { describe, expect, test } from "@jest/globals";

import { testOperationPull, testOperationPush } from "@undercut/testing";

import { union as unionPull, unionBy as unionByPull } from "@undercut/pull/src/operations/union.js";
import { union as unionPush, unionBy as unionByPush } from "@undercut/push/src/operations/union.js";

function testUnion(testOperation, union) {
	testOperation(union, {
		source: [],
		target: []
	});
	testOperation(union, {
		source: [1],
		target: [1]
	});
	testOperation(union, {
		args: [[5]],
		source: [2],
		target: [2, 5]
	});
	testOperation(union, {
		args: [[1, 1, 2]],
		source: [2, 1, 2, 1],
		target: [2, 1]
	});
	testOperation(union, {
		args: [[1, 1, 2], [], [5, 5, 7]],
		source: [2, 1, 2, 1],
		target: [2, 1, 5, 7]
	});
	testOperation(union, {
		args: [[`a`, 1, false]],
		source: [false, `a`, 2, undefined],
		target: [false, `a`, 2, undefined, 1]
	});

	const users = [
		{ name: `a` },
		{ name: `b` },
		{ name: `c` }
	];

	testOperation(union, {
		args: [[users[0], users[0]]],
		source: [users[1], users[0]],
		target: [users[1], users[0]]
	});
}

describe(`union`, () => {
	test(`pull`, () => testUnion(testOperationPull, unionPull));
	test(`push`, () => testUnion(testOperationPush, unionPush));
});

function testUnionBy(testOperation, unionBy) {
	expect(() => unionBy()).toThrow();
	expect(() => unionBy([1])).toThrow();

	testOperation(unionBy, {
		args: [item => item.x, []],
		source: [],
		target: []
	});
	testOperation(unionBy, {
		args: [item => item.x, [{ x: 1 }, { x: 2 }, { y: 1 }]],
		source: [{ x: 2 }, { x: 3 }, { y: 1 }],
		target: [{ x: 2 }, { x: 3 }, { y: 1 }, { x: 1 }]
	});
}

describe(`unionBy`, () => {
	test(`pull`, () => testUnionBy(testOperationPull, unionByPull));
	test(`push`, () => testUnionBy(testOperationPush, unionByPush));
});
