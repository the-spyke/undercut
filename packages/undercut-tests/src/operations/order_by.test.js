import { describe, expect, test } from "@jest/globals";

import * as compare from "@undercut/utils/src/compare.js";
import { asc, desc } from "@undercut/utils/src/ordering.js";
import { testOperationPull, testOperationPush } from "@undercut/testing";

import { orderBy as orderByPull } from "@undercut/pull/src/operations/order_by.js";
import { orderBy as orderByPush } from "@undercut/push/src/operations/order_by.js";

function testOrderBy(testOperation, orderBy) {
	expect(() => orderBy()).toThrow();

	testOperation(orderBy, {
		args: [asc(compare.numbers)],
		source: [],
		target: []
	});
	testOperation(orderBy, {
		args: [asc(compare.numbers)],
		source: [4, 1, 2],
		target: [1, 2, 4]
	});
	testOperation(orderBy, {
		args: [desc(compare.numbers)],
		source: [4, 1, 2],
		target: [4, 2, 1]
	});

	const users = [
		{ id: 0, name: `Tom`, posts: 32 },
		{ id: 1, name: `John`, posts: 12 },
		{ id: 2, name: `Sam`, posts: 1 },
		{ id: 3, name: `John`, posts: 5 },
		{ id: 4, name: `Admin`, posts: 1 },
	];

	testOperation(orderBy, {
		args: [asc(compare.strings, u => u.name)],
		source: users,
		target: [users[4], users[1], users[3], users[2], users[0]]
	});
	testOperation(orderBy, {
		args: [desc(compare.strings, u => u.name)],
		source: users,
		target: [users[0], users[2], users[1], users[3], users[4]]
	});
	testOperation(orderBy, {
		args: [asc(compare.numbers, u => u.posts)],
		source: users,
		target: [users[2], users[4], users[3], users[1], users[0]]
	});
	testOperation(orderBy, {
		args: [desc(compare.numbers, u => u.posts)],
		source: users,
		target: [users[0], users[1], users[3], users[2], users[4]]
	});
	testOperation(orderBy, {
		args: [
			asc(compare.strings, u => u.name),
			asc(compare.numbers, u => u.posts)
		],
		source: users,
		target: [users[4], users[3], users[1], users[2], users[0]]
	});
	testOperation(orderBy, {
		args: [
			asc(compare.strings, u => u.name),
			desc(compare.numbers, u => u.posts)
		],
		source: users,
		target: [users[4], users[1], users[3], users[2], users[0]]
	});
	testOperation(orderBy, {
		args: [
			desc(compare.strings, u => u.name),
			desc(compare.numbers, u => u.posts)
		],
		source: users,
		target: [users[0], users[2], users[1], users[3], users[4]]
	});
	testOperation(orderBy, {
		args: [
			desc(compare.strings, u => u.name),
			asc(compare.numbers, u => u.posts)
		],
		source: users,
		target: [users[0], users[2], users[3], users[1], users[4]]
	});
	testOperation(orderBy, {
		args: [
			asc(compare.numbers, u => u.posts),
			asc(compare.strings, u => u.name)
		],
		source: users,
		target: [users[4], users[2], users[3], users[1], users[0]]
	});
	testOperation(orderBy, {
		args: [
			asc(compare.numbers, u => u.posts),
			desc(compare.strings, u => u.name)
		],
		source: users,
		target: [users[2], users[4], users[3], users[1], users[0]]
	});
	testOperation(orderBy, {
		args: [
			desc(compare.numbers, u => u.posts),
			desc(compare.strings, u => u.name)
		],
		source: users,
		target: [users[0], users[1], users[3], users[2], users[4]]
	});
	testOperation(orderBy, {
		args: [
			desc(compare.numbers, u => u.posts),
			asc(compare.strings, u => u.name)
		],
		source: users,
		target: [users[0], users[1], users[3], users[4], users[2]]
	});
}

describe(`orderBy`, () => {
	test(`pull`, () => testOrderBy(testOperationPull, orderByPull));
	test(`push`, () => testOrderBy(testOperationPush, orderByPush));
});
