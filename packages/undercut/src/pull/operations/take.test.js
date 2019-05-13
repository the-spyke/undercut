import { callbackArgsOf, targetOf } from "../../utils/tests.js";

import { take, takeWhile } from "./take.js";

test("take", () => {
	expect(() => take()).toThrow();
	expect(() => take(-1)).toThrow();

	expect(targetOf(take(1), [])).toEqual([]);
	expect(targetOf(take(0), [1])).toEqual([]);
	expect(targetOf(take(0.5), [1])).toEqual([]);
	expect(targetOf(take(1), [1, 2])).toEqual([1]);
	expect(targetOf(take(1.5), [1, 2])).toEqual([1]);
	expect(targetOf(take(5), [1])).toEqual([1]);
	expect(targetOf(take(3), [1, 2, 3, 4, 5])).toEqual([1, 2, 3]);
});

test("takeWhile", () => {
	expect(() => takeWhile()).toThrow();
	expect(callbackArgsOf(
		() => true,
		cb => targetOf(takeWhile(cb), [3, 4])
	)).toEqual([[3, 0], [4, 1]]);

	const predicate = x => x < 10;

	expect(targetOf(takeWhile(predicate), [])).toEqual([]);
	expect(targetOf(takeWhile(predicate), [1])).toEqual([1]);
	expect(targetOf(takeWhile(predicate), [1, 9])).toEqual([1, 9]);
	expect(targetOf(takeWhile(predicate), [1, 9, 10])).toEqual([1, 9]);
	expect(targetOf(takeWhile(predicate), [1, 2, 12])).toEqual([1, 2]);
	expect(targetOf(takeWhile(predicate), [1, 2, 10, 12])).toEqual([1, 2]);
});
