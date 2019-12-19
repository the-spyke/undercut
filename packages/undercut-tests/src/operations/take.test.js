import {
	getIntegerSource,
	testPullLimited,
	testPushLimited,
	testOperationPull,
	testOperationPush,
} from "@undercut/testing";

import { take as takePull, takeWhile as takeWhilePull } from "@undercut/pull/src/operations/take.js";
import { take as takePush, takeWhile as takeWhilePush } from "@undercut/push/src/operations/take.js";

function testTake(testOperation, take) {
	expect(() => take()).toThrow();
	expect(() => take(-1)).toThrow();

	testOperation(take, {
		args: [1],
		source: [],
		target: []
	});
	testOperation(take, {
		args: [0],
		source: [1],
		target: []
	});
	testOperation(take, {
		args: [0.5],
		source: [1],
		target: []
	});
	testOperation(take, {
		args: [1],
		source: [1, 2],
		target: [1]
	});
	testOperation(take, {
		args: [1.5],
		source: [1, 2],
		target: [1]
	});
	testOperation(take, {
		args: [5],
		source: [1],
		target: [1]
	});
	testOperation(take, {
		args: [3],
		source: [1, 2, 3, 4, 5],
		target: [1, 2, 3]
	});
}

describe(`take`, () => {
	const source = getIntegerSource(4);

	describe(`pull`, () => {
		const take = takePull;

		test(`should work`, () => testTake(testOperationPull, take));

		test(`should not iterate more items than specified`, () => {
			expect(() => testPullLimited(take(0), source, 0)).not.toThrow();
			expect(() => testPullLimited(take(3), source, 3)).not.toThrow();
		});
	});

	describe(`push`, () => {
		const take = takePush;

		test(`should work`, () => testTake(testOperationPush, take));

		test(`should not wait for more items than specified`, () => {
			expect(() => testPushLimited(take(0), source, 0)).not.toThrow();
			expect(() => testPushLimited(take(3), source, 3)).not.toThrow();
		});
	});
});

function testTakeWhile(testOperation, takeWhile) {
	expect(() => takeWhile()).toThrow();

	testOperation(takeWhile, {
		args: [() => true],
		source: [3, 4],
		target: [3, 4],
		callbackArgs: [[3, 0], [4, 1]]
	});

	testOperation(takeWhile, {
		args: [x => x < 10],
		source: [],
		target: []
	});
	testOperation(takeWhile, {
		args: [x => x < 10],
		source: [1],
		target: [1]
	});
	testOperation(takeWhile, {
		args: [x => x < 10],
		source: [1, 9],
		target: [1, 9]
	});
	testOperation(takeWhile, {
		args: [x => x < 10],
		source: [1, 9, 10],
		target: [1, 9]
	});
	testOperation(takeWhile, {
		args: [x => x < 10],
		source: [1, 2, 12],
		target: [1, 2]
	});
	testOperation(takeWhile, {
		args: [x => x < 10],
		source: [1, 2, 10, 12],
		target: [1, 2]
	});
}

describe(`takeWhile`, () => {
	test(`pull`, () => testTakeWhile(testOperationPull, takeWhilePull));
	test(`push`, () => testTakeWhile(testOperationPush, takeWhilePush));
});
