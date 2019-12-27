import { identity } from "@undercut/utils/src/function.js";
import { simulatePull } from "@undercut/testing";

import { first } from "./operations/first.js";
import { flattenArrays } from "./operations/flatten.js";
import { map } from "./operations/map.js";
import { zip } from "./operations/zip.js";

import {
	composeOperations,
	pull,
	pullArray,
	pullLine,
	pullValue,
} from "./pull_core.js";

test(`composeOperations`, () => {
	function interleave(...sources) {
		return composeOperations([zip(...sources), flattenArrays()]);
	}

	expect(simulatePull(interleave([2, 4]), [1, 3])).toEqual([1, 2, 3, 4]);

	function interleaveDynamic(...sources) {
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
	expect(() => pullLine()).toThrow();
	expect(() => pullLine([])).toThrow();
	expect(() => pullLine(1, [])).toThrow();
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
	expect(() => pull()).toThrow();
	expect(() => pull(Array.from)).toThrow();
	expect(() => pull(Array.from, [])).toThrow();
	expect(() => pull(1, [], [])).toThrow();
	expect(() => pull(Array.from, 2, [])).toThrow();
	expect(() => pull(Array.from, [], 3)).toThrow();

	expect(pull(Array.from, [], [])).toEqual([]);
	expect(pull(Array.from, [], [6, 7])).toEqual([6, 7]);
	expect(pull(Array.from, [map(x => x + 1)], [])).toEqual([]);
	expect(pull(Array.from, [map(x => x * 0)], [3, 4])).toEqual([0, 0]);
});

test(`pullArray`, () => {
	expect(() => pullArray()).toThrow();
	expect(() => pullArray([])).toThrow();
	expect(() => pullArray(2, [])).toThrow();
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
