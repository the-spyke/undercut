import { testPush } from "../utils/tests.js";

import { flatten } from "./operations/flatten.js";
import { map } from "./operations/map.js";
import { zip } from "./operations/zip.js";

import { createPushTarget } from "./push_targets.js";

import {
	composeOperations,
	push,
	pushItems,
	pushLine,
} from "./push_core.js";

test("composeOperations", () => {
	function interleave(...sources) {
		return composeOperations([
			zip(...sources),
			flatten()
		]);
	}

	expect(testPush(interleave([2, 4]), [1, 3])).toEqual([1, 2, 3, 4]);
});

test("pushLine", () => {
	function testPushLine(pushLineFactory, source) {
		const target = createPushTarget();
		const pushline = pushLineFactory(target);

		try {
			source.forEach(item => pushline.next(item));
		} finally {
			pushline.return();
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

	let target = createPushTarget();
	let pushLine1 = pushLine([
		map(x => x * 2)
	], target);

	[0, 1, 2].forEach(x => pushLine1.next(x));

	expect(target.values).toEqual([0, 2, 4]);

	pushLine1.return();

	target = createPushTarget();
	pushLine1 = pushLine([
		map(x => x * 2)
	], target);

	[0, 1, 2].forEach(x => pushLine1.next(x));
	[7].forEach(x => pushLine1.next(x));
	[0, 1, 2].forEach(x => pushLine1.next(x));
	pushLine1.return();

	expect(target.values).toEqual([0, 2, 4, 14, 0, 2, 4]);
});

test("push", () => {
	expect(() => push()).toThrow();
	expect(() => push(createPushTarget())).toThrow();
	expect(() => push(createPushTarget(), [])).toThrow();
	expect(() => push(1, [], [])).toThrow();
	expect(() => push(createPushTarget(), 2, [])).toThrow();
	expect(() => push(createPushTarget(), [], 3)).toThrow();

	let target;

	target = createPushTarget();
	expect(push(target, [], [])).toBe(target);

	target = createPushTarget();
	expect(push(target, [], []).values).toEqual([]);

	target = createPushTarget();
	expect(push(target, [], [6, 7]).values).toEqual([6, 7]);

	target = createPushTarget();
	expect(push(target, [map(x => x + 1)], []).values).toEqual([]);

	target = createPushTarget();
	expect(push(target, [map(x => x * 0)], [3, 4]).values).toEqual([0, 0]);
});

test("pushItems", () => {
	expect(() => pushItems()).toThrow();
	expect(() => pushItems([])).toThrow();
	expect(() => pushItems(2, [])).toThrow();
	expect(() => pushItems([], 3)).toThrow();

	expect(pushItems([], [])).toEqual([]);
	expect(pushItems([], [6, 7])).toEqual([6, 7]);
	expect(pushItems([map(x => x + 1)], [])).toEqual([]);
	expect(pushItems([map(x => x * 0)], [3, 4])).toEqual([0, 0]);
});
