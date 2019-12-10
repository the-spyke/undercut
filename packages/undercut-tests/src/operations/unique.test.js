import { testOperationPull, testOperationPush } from "@undercut/testing";

import { unique as uniquePull, uniqueBy as uniqueByPull } from "@undercut/pull/src/operations/unique.js";
import { unique as uniquePush, uniqueBy as uniqueByPush } from "@undercut/push/src/operations/unique.js";

function testUnique(testOperation, unique) {
	testOperation(unique, {
		source: [],
		target: []
	});
	testOperation(unique, {
		source: [1],
		target: [1]
	});
	testOperation(unique, {
		source: [2, 5],
		target: [2, 5]
	});
	testOperation(unique, {
		source: [1, 1, 2, 1],
		target: [1, 2]
	});
	testOperation(unique, {
		source: [`a`, 1, `a`],
		target: [`a`, 1]
	});

	const users = [
		{ name: `a` },
		{ name: `b` },
		{ name: `c` }
	];

	testOperation(unique, {
		source: [users[0], users[0], users[1], users[0], users[1]],
		target: [users[0], users[1]]
	});
}

describe(`unique`, () => {
	test(`pull`, () => testUnique(testOperationPull, uniquePull));
	test(`push`, () => testUnique(testOperationPush, uniquePush));
});

function testUniqueBy(testOperation, uniqueBy) {
	expect(() => uniqueBy()).toThrow();
	expect(() => uniqueBy([1])).toThrow();

	testOperation(uniqueBy, {
		args: [item => item.x],
		source: [],
		target: []
	});
	testOperation(uniqueBy, {
		args: [item => item.x],
		source: [{ x: 1 }, { x: 1 }, { y: 1 }, { x: 2 }],
		target: [{ x: 1 }, { y: 1 }, { x: 2 }]
	});
}

describe(`uniqueBy`, () => {
	test(`pull`, () => testUniqueBy(testOperationPull, uniqueByPull));
	test(`push`, () => testUniqueBy(testOperationPush, uniqueByPush));
});
