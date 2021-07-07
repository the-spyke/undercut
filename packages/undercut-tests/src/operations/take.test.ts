import { expect, test } from "@jest/globals";

import { createExpectBySpec } from "@undercut/testing";

export function take(type, take) {
	const expectBySpec = createExpectBySpec(type, take);

	test(`should throw on invalid or missing args`, () => {
		expect(() => take()).toThrow();
		expect(() => take(-1)).toThrow();
	});

	test(`should work with empty source`, () => {
		expectBySpec({
			args: [1],
			source: [],
			target: [],
		});
	});

	test(`should allow to take 0 items`, () => {
		expectBySpec({
			args: [0],
			source: [0, 1, 2, 3],
			target: [],
		});
	});

	test(`should not iterate with count = 0`, () => {
		expectBySpec({
			args: [0],
			source: [0, 1, 2, 3],
			limit: 0,
		});
	});

	test(`should iterate exactly 3 items with count = 3`, () => {
		expectBySpec({
			args: [3],
			source: [0, 1, 2, 3],
			limit: 3,
		});
	});

	test(`should truncate fractional values below 1`, () => {
		expectBySpec({
			args: [0.7555],
			source: [0, 1, 2],
			target: [],
		});
	});

	test(`should truncate fractional values with count between 1 and size`, () => {
		expectBySpec({
			args: [1.7],
			source: [0, 1, 2],
			target: [0],
		});
	});

	test(`should truncate fractional values with count > size`, () => {
		expectBySpec({
			args: [15.01],
			source: [0, 1, 2],
			target: [0, 1, 2],
		});
	});

	test(`should take 1 item`, () => {
		expectBySpec({
			args: [1],
			source: [0, 1, 2, 3],
			target: [0],
		});
	});

	test(`should take several items`, () => {
		expectBySpec({
			args: [3],
			source: [0, 1, 2, 3, 4, 5],
			target: [0, 1, 2],
		});
	});

	test(`should take even if source size is less than take value`, () => {
		expectBySpec({
			args: [15],
			source: [0, 1],
			target: [0, 1],
		});
	});
}

export function takeWhile(type, takeWhile) {
	const expectBySpec = createExpectBySpec(type, takeWhile);

	test(`should throw on invalid or missing args`, () => {
		expect(() => takeWhile()).toThrow();
	});

	test(`should pass item and index into callback`, () => {
		expectBySpec({
			args: [() => true],
			source: [3, 4],
			callbackArgs: [[3, 0], [4, 1]],
		});
	});

	test(`should work with empty sources`, () => {
		expectBySpec({
			args: [x => x < 10],
			source: [],
			target: [],
		});
	});

	test(`should pass all items satisfying the predicate for 1 item`, () => {
		expectBySpec({
			args: [x => x < 10],
			source: [1],
			target: [1],
		});
	});

	test(`should pass all items satisfying the predicate fore more than 1 item`, () => {
		expectBySpec({
			args: [x => x < 10],
			source: [1, 9],
			target: [1, 9],
		});
	});

	test(`should pass only items satisfying the predicate`, () => {
		expectBySpec({
			args: [x => x < 10],
			source: [1, 9, 10],
			target: [1, 9]
		});
	});

	test(`should pass all items satisfying the predicate with not eligable at the end`, () => {
		expectBySpec({
			args: [x => x < 10],
			source: [1, 2, 12],
			target: [1, 2],
		});
	});
}
