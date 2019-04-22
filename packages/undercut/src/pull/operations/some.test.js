import { targetOf, expectCallbackArgsToBe } from "../../utils/tests.js";

import { some } from "./some.js";

test("some", () => {
	expect(() => some()).toThrow();
	expectCallbackArgsToBe(
		() => false,
		cb => targetOf(some(cb), [3, 4]),
		[3, 0], [4, 1]
	);

	const predicate = x => x > 5;

	expect(targetOf(some(predicate), [])).toEqual([false]);
	expect(targetOf(some(predicate), [1])).toEqual([false]);
	expect(targetOf(some(predicate), [2, 5])).toEqual([false]);
	expect(targetOf(some(predicate), [1, 7, 2, 5])).toEqual([true]);
});
