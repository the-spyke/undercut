import { lineTargetOf } from "../utils/tests.js";

import { map } from "./operations/map.js";

import { pull, pullLine } from "./pull_core.js";

test("pullLine", () => {
	expect(() => pullLine()).toThrow();
	expect(() => pullLine([])).toThrow();
	expect(() => pullLine(1, [])).toThrow();
	expect(() => pullLine(1, 2)).toThrow();

	expect(lineTargetOf(pullLine([], []))).toEqual([]);
	expect(lineTargetOf(pullLine([], [2, 3]))).toEqual([2, 3]);

	const line = pullLine([
		map(x => x * 2)
	], [0, 1, 2]);

	expect(lineTargetOf(line)).toEqual([0, 2, 4]);
	expect([...line, 7, ...line]).toEqual([0, 2, 4, 7, 0, 2, 4]);
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
