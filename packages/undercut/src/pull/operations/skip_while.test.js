import { targetOf } from "../../utils/tests.js";

import { skipWhile } from "./skip_while.js";

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
