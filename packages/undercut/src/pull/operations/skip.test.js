import { targetOf } from "../../utils/tests.js";

import { skip, skipWhile } from "./skip.js";

test("skip", () => {
	expect(() => skip()).toThrow();

	expect(targetOf(skip(1), [])).toEqual([]);
	expect(targetOf(skip(5), [1])).toEqual([]);
	expect(targetOf(skip(0), [1])).toEqual([1]);
	expect(targetOf(skip(1), [1, 2])).toEqual([2]);
	expect(targetOf(skip(3), [1, 2, 3, 4, 5])).toEqual([4, 5]);
});

test("skipWhile", () => {
	expect(() => skipWhile()).toThrow();

	const predicate = x => x < 10;

	expect(targetOf(skipWhile(predicate), [])).toEqual([]);
	expect(targetOf(skipWhile(predicate), [1])).toEqual([]);
	expect(targetOf(skipWhile(predicate), [1, 9])).toEqual([]);
	expect(targetOf(skipWhile(predicate), [1, 9, 10])).toEqual([10]);
	expect(targetOf(skipWhile(predicate), [1, 2, 12])).toEqual([12]);
	expect(targetOf(skipWhile(predicate), [1, 2, 10, 12])).toEqual([10, 12]);
});
