import { callbackArgsOf, targetOf } from "../../utils/tests.js";

import { remove } from "./remove.js";

test("remove", () => {
	expect(() => remove()).toThrow();

	expect(callbackArgsOf(
		() => false,
		cb => targetOf(remove(cb), [3, 4])
	)).toEqual([[3, 0], [4, 1]]);

	const predicate = x => x > 5;

	expect(targetOf(remove(predicate), [])).toEqual([]);
	expect(targetOf(remove(predicate), [1])).toEqual([1]);
	expect(targetOf(remove(predicate), [2, 5])).toEqual([2, 5]);
	expect(targetOf(remove(predicate), [1, 7, 2, 5, -1])).toEqual([1, 2, 5, -1]);
});
