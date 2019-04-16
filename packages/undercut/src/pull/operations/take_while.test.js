import { targetOf } from "../../utils/tests.js";

import { takeWhile } from "./take_while.js";

test("takeWhile", () => {
	expect(() => takeWhile()).toThrow();

	const predicate = x => x < 10;

	expect(targetOf(takeWhile(predicate), [])).toEqual([]);
	expect(targetOf(takeWhile(predicate), [1])).toEqual([1]);
	expect(targetOf(takeWhile(predicate), [1, 9])).toEqual([1, 9]);
	expect(targetOf(takeWhile(predicate), [1, 9, 10])).toEqual([1, 9]);
	expect(targetOf(takeWhile(predicate), [1, 2, 12])).toEqual([1, 2]);
	expect(targetOf(takeWhile(predicate), [1, 2, 10, 12])).toEqual([1, 2]);
});
