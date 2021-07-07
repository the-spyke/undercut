import type { AnyOperation } from "@undercut/types";

import { expect, test } from "@jest/globals";

import { createExpectBySpec, OperationType } from "@undercut/testing";

export function buffer(type: OperationType, buffer: <I>(size: number) => AnyOperation<I>) {
	const bySpec = createExpectBySpec(type, buffer);

	test(`should throw on invalid or missing args`, () => {
		// @ts-expect-error
		expect(() => buffer()).toThrow();
		expect(() => buffer(-1)).toThrow();
		// @ts-expect-error
		expect(() => buffer(`1`)).toThrow();
	});

	test(`should work with empty source`, () => {
		bySpec({
			args: [5],
			source: [],
			target: [],
		});
	});

	test(`should work with size = 0`, () => {
		bySpec({
			args: [0],
			source: [1, 2, 3],
			target: [1, 2, 3],
		});
	});

	test(`should work with size = 1`, () => {
		bySpec({
			args: [1],
			source: [1, 2, 3],
			target: [1, 2, 3],
		});
	});

	test(`should work with size > 1`, () => {
		bySpec({
			args: [2],
			source: [1, 2, 3],
			target: [1, 2, 3],
		});
	});

	test(`should work with size > length of the sequence`, () => {
		bySpec({
			args: [10],
			source: [1, 2, 3, 4],
			target: [1, 2, 3, 4],
		});
	});

	test(`should work with different data types`, () => {
		bySpec({
			args: [3],
			source: [1, false, null, `s`, {}],
			target: [1, false, null, `s`, {}],
		});
	});
}

export function bufferAll(type: OperationType, bufferAll: <I>() => AnyOperation<I>) {
	const bySpec = createExpectBySpec(type, bufferAll);

	test(`should work with empty source`, () => {
		bySpec({
			args: [],
			source: [],
			target: [],
		});
	});

	test(`should work with different data types`, () => {
		bySpec({
			args: [],
			source: [1, false, null, `s`, {}],
			target: [1, false, null, `s`, {}],
		});
	});
}
