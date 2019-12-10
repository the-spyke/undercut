import { testOperationPull, testOperationPush } from "@undercut/testing";

import { join as joinPull } from "@undercut/pull/src/operations/join.js";
import { join as joinPush } from "@undercut/push/src/operations/join.js";

function testJoin(testOperation, join) {
	testOperation(join, {
		source: [],
		target: [[].join()]
	});
	testOperation(join, {
		source: [1],
		target: [[1].join()]
	});
	testOperation(join, {
		source: [1, 3, 5],
		target: [[1, 3, 5].join()]
	});
	testOperation(join, {
		args: [null],
		source: [1, 3, 5],
		target: [[1, 3, 5].join(null)]
	});
	testOperation(join, {
		args: [``],
		source: [undefined, 1, ``],
		target: [[undefined, 1, ``].join(``)]
	});
	testOperation(join, {
		args: [33],
		source: [undefined, 1, ``],
		target: [[undefined, 1, ``].join(33)]
	});
}

describe(`join`, () => {
	test(`pull`, () => testJoin(testOperationPull, joinPull));
	test(`push`, () => testJoin(testOperationPush, joinPush));
});
