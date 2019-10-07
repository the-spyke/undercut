import { testPull } from "../utils/tests.js";

import { flatten } from "./operations/flatten.js";
import { map } from "./operations/map.js";
import { zip } from "./operations/zip.js";

import {
	composeOperations,
	createPullLine,
	pull,
	pullItems
} from "./pull_core.js";

test("composeOperations", () => {
	function interleave(...sources) {
		const pipeline = [zip(...sources), flatten()];

		return composeOperations(pipeline);
	}

	expect(testPull(interleave([2, 4]), [1, 3])).toEqual([1, 2, 3, 4]);

	function* fakeOperation(iterable) {
		for (const item of iterable) {
			yield item;
		}
	}

	const pipeline = [
		fakeOperation,
		fakeOperation,
		interleave([2, 4]),
		fakeOperation
	];

	expect(pull(Array.from, pipeline, [1, 3])).toEqual([1, 2, 3, 4]);

	const pullLine = createPullLine(pipeline, [1, 3]);

	expect([...pullLine, 7, ...pullLine]).toEqual([1, 2, 3, 4, 7, 1, 2, 3, 4]);
});

test("createPullLine", () => {
	expect(() => createPullLine()).toThrow();
	expect(() => createPullLine([])).toThrow();
	expect(() => createPullLine(1, [])).toThrow();
	expect(() => createPullLine(1, 2)).toThrow();

	expect([...createPullLine([], [])]).toEqual([]);
	expect([...createPullLine([], [2, 3])]).toEqual([2, 3]);

	const pullLine = createPullLine([
		map(x => x * 2)
	], [0, 1, 2]);

	expect([...pullLine]).toEqual([0, 2, 4]);
	expect([...pullLine, 7, ...pullLine]).toEqual([0, 2, 4, 7, 0, 2, 4]);
});

test("pull", () => {
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

test("pullItems", () => {
	expect(() => pullItems()).toThrow();
	expect(() => pullItems([])).toThrow();
	expect(() => pullItems(2, [])).toThrow();
	expect(() => pullItems([], 3)).toThrow();

	expect(pullItems([], [])).toEqual([]);
	expect(pullItems([], [6, 7])).toEqual([6, 7]);
	expect(pullItems([map(x => x + 1)], [])).toEqual([]);
	expect(pullItems([map(x => x * 0)], [3, 4])).toEqual([0, 0]);
});
