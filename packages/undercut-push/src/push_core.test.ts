import { expect, test } from "@jest/globals";

import { simulatePush } from "@undercut/testing";

import { first } from "./operations/first";
import { flattenArrays } from "./operations/flatten";
import { map } from "./operations/map";
import { zip } from "./operations/zip";

import { toArray } from "./push_targets";

import {
	composeOperations,
	push,
	pushArray,
	pushLine,
	pushValue,
} from "./push_core";

test(`composeOperations`, () => {
	function interleave(...sources: any[]) {
		return composeOperations([
			zip(...sources),
			flattenArrays()
		]);
	}

	expect(simulatePush(interleave([2, 4]), [1, 3])).toEqual([1, 2, 3, 4]);

	function interleaveDynamic(...sources: any[]) {
		return composeOperations(() => [
			zip(...sources),
			flattenArrays()
		]);
	}

	expect(simulatePush(interleaveDynamic([2, 4]), [1, 3])).toEqual([1, 2, 3, 4]);
});

test(`pushLine`, () => {
	function simulatePushLine(pipeline: any[], source: any[]) {
		const target = toArray();
		const observer = pushLine(pipeline, target);

		try {
			source.forEach(item => observer.next(item));
		} finally {
			(observer as any).return();
		}

		return target.values;
	}

	// @ts-expect-error
	expect(() => pushLine()).toThrow();
	// @ts-expect-error
	expect(() => pushLine([])).toThrow();
	// @ts-expect-error
	expect(() => pushLine(1, [])).toThrow();
	// @ts-expect-error
	expect(() => pushLine([], 1)).toThrow();
	// @ts-expect-error
	expect(() => pushLine(1, 2)).toThrow();

	expect(simulatePushLine([], [])).toEqual([]);
	expect(simulatePushLine([], [2, 3])).toEqual([2, 3]);

	let target = toArray();
	let pushLine1: any = pushLine([
		map(x => x * 2)
	], target);

	[0, 1, 2].forEach(x => pushLine1.next(x));

	expect(target.values).toEqual([0, 2, 4]);

	pushLine1.return();

	target = toArray();
	pushLine1 = pushLine([
		map(x => x * 2)
	], target);

	[0, 1, 2].forEach(x => pushLine1.next(x));
	[7].forEach(x => pushLine1.next(x));
	[0, 1, 2].forEach(x => pushLine1.next(x));
	pushLine1.return();

	expect(target.values).toEqual([0, 2, 4, 14, 0, 2, 4]);
});

test(`push`, () => {
	// @ts-expect-error
	expect(() => push()).toThrow();
	// @ts-expect-error
	expect(() => push(toArray())).toThrow();
	// @ts-expect-error
	expect(() => push(toArray(), [])).toThrow();
	// @ts-expect-error
	expect(() => push(1, [], [])).toThrow();
	// @ts-expect-error
	expect(() => push(toArray(), 2, [])).toThrow();
	// @ts-expect-error
	expect(() => push(toArray(), [], 3)).toThrow();

	let target;

	target = toArray();
	expect(push(target, [], [])).toBe(target);

	target = toArray();
	expect(push(target, [], []).values).toEqual([]);

	target = toArray();
	expect(push(target, [], [6, 7]).values).toEqual([6, 7]);

	target = toArray();
	expect(push(target, [map(x => x + 1)], []).values).toEqual([]);

	target = toArray();
	expect(push(target, [map(x => x * 0)], [3, 4]).values).toEqual([0, 0]);
});

test(`pushArray`, () => {
	// @ts-expect-error
	expect(() => pushArray()).toThrow();
	// @ts-expect-error
	expect(() => pushArray([])).toThrow();
	// @ts-expect-error
	expect(() => pushArray(2, [])).toThrow();
	// @ts-expect-error
	expect(() => pushArray([], 3)).toThrow();

	expect(pushArray([], [])).toEqual([]);
	expect(pushArray([], [6, 7])).toEqual([6, 7]);
	expect(pushArray([map(x => x + 1)], [])).toEqual([]);
	expect(pushArray([map(x => x * 0)], [3, 4])).toEqual([0, 0]);
});

test(`pushValue`, () => {
	expect(pushValue([], [])).toBe(undefined);
	expect(pushValue([], [6, 7])).toBe(6);
	expect(pushValue([map(x => x + 1)], [])).toBe(undefined);
	expect(pushValue([map(x => x + 1)], [1])).toBe(2);
	expect(pushValue([map(x => x + 1)], [6, 3])).toBe(7);
	expect(pushValue([map(x => x * 2), first()], [3, 4])).toBe(6);
});
