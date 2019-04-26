import { sourceItems } from "../utils/tests.js";

import { range } from "./pull_sources.js";

test("range", () => {
	expect(() => range()).toThrow();
	expect(() => range(1)).toThrow();
	expect(() => range(undefined, 2)).toThrow();
	expect(() => range(Infinity, 23)).toThrow();
	expect(() => range(23, NaN)).toThrow();
	expect(() => range(1, 5, -5)).toThrow();
	expect(() => range(1, 5, Infinity)).toThrow();

	expect(sourceItems(range(0, 1))).toEqual([0]);
	expect(sourceItems(range(3, 6))).toEqual([3, 4, 5]);
	expect(sourceItems(range(-2, 2))).toEqual([-2, -1, 0, 1]);
	expect(sourceItems(range(8, 5))).toEqual([8, 7, 6]);
	expect(sourceItems(range(-1, 3, 2))).toEqual([-1, 1]);
	expect(sourceItems(range(8, 3, 2))).toEqual([8, 6, 4]);

	const myRange = range(2, 5);

	expect([...myRange, 0, ...myRange]).toEqual([2, 3, 4, 0, 2, 3, 4]);
});
