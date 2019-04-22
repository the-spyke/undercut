import { targetOf, expectCallbackArgsToBe } from "../../utils/tests.js";

import { every } from "./every.js";

test("every", () => {
	expect(() => every()).toThrow();

	expectCallbackArgsToBe(
		() => true,
		cb => targetOf(every(cb), [3, 4]),
		[3, 0], [4, 1]
	);

	const predicate = x => x > 5;

	expect(targetOf(every(predicate), [])).toEqual([true]);
	expect(targetOf(every(predicate), [1])).toEqual([false]);
	expect(targetOf(every(predicate), [2, 5])).toEqual([false]);
	expect(targetOf(every(predicate), [2, 6])).toEqual([false]);
	expect(targetOf(every(predicate), [7, 6])).toEqual([true]);
});
