import { callbackArgsOf, targetOf } from "../../utils/tests.js";

import { filter } from "./filter.js";

test("filter", () => {
	expect(() => filter()).toThrow();

	expect(callbackArgsOf(
		() => true,
		cb => targetOf(filter(cb), [3, 4])
	)).toEqual([[3, 0], [4, 1]]);

	const predicate = x => x > 5;

	expect(targetOf(filter(predicate), [])).toEqual([]);
	expect(targetOf(filter(predicate), [1])).toEqual([]);
	expect(targetOf(filter(predicate), [2, 5])).toEqual([]);
	expect(targetOf(filter(predicate), [1, 7, 2, 5])).toEqual([7]);
});
