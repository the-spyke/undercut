import { testPush } from "@undercut/testing";

import { flatten } from "./operations/flatten.js";
import { map } from "./operations/map.js";
import { zip } from "./operations/zip.js";

import { toArray } from "./push_targets.js";

import {
	composeOperations,
	push,
	pushItems,
	pushLine,
} from "./push_core.js";

test(`composeOperations`, () => {
	function interleave(...sources) {
		return composeOperations([
			zip(...sources),
			flatten()
		]);
	}

	expect(testPush(interleave([2, 4]), [1, 3])).toEqual([1, 2, 3, 4]);

	function interleaveDynamic(...sources) {
		return composeOperations(() => [
			zip(...sources),
			flatten()
		]);
	}

	expect(testPush(interleaveDynamic([2, 4]), [1, 3])).toEqual([1, 2, 3, 4]);
});

test(`pushLine`, () => {
	function testPushLine(pushLineFactory, source) {
		const target = toArray();
		const observer = pushLineFactory(target);

		try {
			source.forEach(item => observer.next(item));
		} finally {
			observer.return();
		}

		return target.values;
	}

	expect(() => pushLine()).toThrow();
	expect(() => pushLine([])).toThrow();
	expect(() => pushLine(1, [])).toThrow();
	expect(() => pushLine([], 1)).toThrow();
	expect(() => pushLine(1, 2)).toThrow();

	expect(testPushLine(t => pushLine([], t), [])).toEqual([]);
	expect(testPushLine(t => pushLine([], t), [2, 3])).toEqual([2, 3]);

	let target = toArray();
	let pushLine1 = pushLine([
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
	expect(() => push()).toThrow();
	expect(() => push(toArray())).toThrow();
	expect(() => push(toArray(), [])).toThrow();
	expect(() => push(1, [], [])).toThrow();
	expect(() => push(toArray(), 2, [])).toThrow();
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

test(`pushItems`, () => {
	expect(() => pushItems()).toThrow();
	expect(() => pushItems([])).toThrow();
	expect(() => pushItems(2, [])).toThrow();
	expect(() => pushItems([], 3)).toThrow();

	expect(pushItems([], [])).toEqual([]);
	expect(pushItems([], [6, 7])).toEqual([6, 7]);
	expect(pushItems([map(x => x + 1)], [])).toEqual([]);
	expect(pushItems([map(x => x * 0)], [3, 4])).toEqual([0, 0]);
});