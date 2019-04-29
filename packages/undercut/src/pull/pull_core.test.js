import { lineTargetOf, targetOf, testOperation } from "../utils/tests.js";

import { flatten } from "./operations/flatten.js";
import { map } from "./operations/map.js";
import { zip } from "./operations/zip.js";

import { pull, composeOperations, createPullLine } from "./pull_core.js";

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

test("createPullLine", () => {
	expect(() => createPullLine()).toThrow();
	expect(() => createPullLine([])).toThrow();
	expect(() => createPullLine(1, [])).toThrow();
	expect(() => createPullLine(1, 2)).toThrow();

	expect(lineTargetOf(createPullLine([], []))).toEqual([]);
	expect(lineTargetOf(createPullLine([], [2, 3]))).toEqual([2, 3]);

	const pullLine = createPullLine([
		map(x => x * 2)
	], [0, 1, 2]);

	expect(lineTargetOf(pullLine)).toEqual([0, 2, 4]);
	expect([...pullLine, 7, ...pullLine]).toEqual([0, 2, 4, 7, 0, 2, 4]);
});

test("composeOperations", () => {
	function interleave(...sources) {
		const pipeline = [zip(...sources), flatten()];

		return composeOperations(pipeline);
	}

	expect(targetOf(interleave([2, 4]), [1, 3])).toEqual([1, 2, 3, 4]);

	const pipeline = [
		testOperation(),
		testOperation(),
		interleave([2, 4]),
		testOperation()
	];

	expect(pull(Array.from, pipeline, [1, 3])).toEqual([1, 2, 3, 4]);

	const pullLine = createPullLine(pipeline, [1, 3]);

	expect([...pullLine, 7, ...pullLine]).toEqual([1, 2, 3, 4, 7, 1, 2, 3, 4]);
});
