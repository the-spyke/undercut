import { lineTargetOf } from "../utils/tests.js";

import { map } from "./operations/map.js";

import { pull, createPullLine } from "./pull_core.js";

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
