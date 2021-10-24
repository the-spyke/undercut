import { expect, test } from "@jest/globals";

import { simulatePull } from "@undercut/testing";

import { identity } from "@undercut/utils";

import { first } from "./operations/first";
import { flattenArrays } from "./operations/flatten";
import { map } from "./operations/map";
import { zip } from "./operations/zip";

import {
	composeOperations,
	pull,
	pullArray,
	pullLine,
	pullValue,
} from "./pull_core";

test(`composeOperations`, () => {
	function interleave<T>(...sources: Array<Iterable<T>>) {
		return composeOperations([zip(...sources), flattenArrays()]);
	}

	expect(simulatePull(interleave([2, 4]), [1, 3])).toEqual([1, 2, 3, 4]);

	function interleaveDynamic<T>(...sources: Array<Iterable<T>>) {
		return composeOperations(() => [zip(...sources), flattenArrays()]);
	}

	expect(simulatePull(interleaveDynamic([2, 4]), [1, 3])).toEqual([1, 2, 3, 4]);

	const fakeOperation = identity;
	const pipeline = [
		fakeOperation,
		fakeOperation,
		interleave([2, 4]),
		fakeOperation
	];

	expect(pull(Array.from, pipeline, [1, 3])).toEqual([1, 2, 3, 4]);

	const pullLine1 = pullLine(pipeline, [1, 3]);

	expect([...pullLine1, 7, ...pullLine1]).toEqual([1, 2, 3, 4, 7, 1, 2, 3, 4]);
});

test(`pullLine`, () => {
	// @ts-expect-error
	expect(() => pullLine()).toThrow();
	// @ts-expect-error
	expect(() => pullLine([])).toThrow();
	// @ts-expect-error
	expect(() => pullLine(1, [])).toThrow();
	// @ts-expect-error
	expect(() => pullLine(1, 2)).toThrow();

	expect([...pullLine([], [])]).toEqual([]);
	expect([...pullLine([], [2, 3])]).toEqual([2, 3]);

	const pullLine1 = pullLine([
		map(x => x * 2)
	], [0, 1, 2]);

	expect([...pullLine1]).toEqual([0, 2, 4]);
	expect([...pullLine1, 7, ...pullLine1]).toEqual([0, 2, 4, 7, 0, 2, 4]);
});

test(`pull`, () => {
	// @ts-expect-error
	expect(() => pull()).toThrow();
	// @ts-expect-error
	expect(() => pull(Array.from)).toThrow();
	// @ts-expect-error
	expect(() => pull(Array.from, [])).toThrow();
	// @ts-expect-error
	expect(() => pull(1, [], [])).toThrow();
	// @ts-expect-error
	expect(() => pull(Array.from, 2, [])).toThrow();
	// @ts-expect-error
	expect(() => pull(Array.from, [], 3)).toThrow();

	expect(pull(Array.from, [], [])).toEqual([]);
	expect(pull(Array.from, [], [6, 7])).toEqual([6, 7]);
	expect(pull(Array.from, [map(x => x + 1)], [])).toEqual([]);
	expect(pull(Array.from, [map(x => x * 0)], [3, 4])).toEqual([0, 0]);
});

test(`pullArray`, () => {
	// @ts-expect-error
	expect(() => pullArray()).toThrow();
	// @ts-expect-error
	expect(() => pullArray([])).toThrow();
	// @ts-expect-error
	expect(() => pullArray(2, [])).toThrow();
	// @ts-expect-error
	expect(() => pullArray([], 3)).toThrow();

	expect(pullArray([], [])).toEqual([]);
	expect(pullArray([], [6, 7])).toEqual([6, 7]);
	expect(pullArray([map(x => x + 1)], [])).toEqual([]);
	expect(pullArray([map(x => x * 0)], [3, 4])).toEqual([0, 0]);
});

test(`pullValue`, () => {
	expect(pullValue([], [])).toBe(undefined);
	expect(pullValue([], [6, 7])).toBe(6);
	expect(pullValue([map(x => x + 1)], [])).toBe(undefined);
	expect(pullValue([map(x => x + 1)], [1])).toBe(2);
	expect(pullValue([map(x => x + 1)], [6, 3])).toBe(7);
	expect(pullValue([map(x => x * 2), first()], [3, 4])).toBe(6);
});
