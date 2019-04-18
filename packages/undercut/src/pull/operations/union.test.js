import { targetOf } from "../../utils/tests.js";

import { union } from "./union.js";

test("union", () => {
	expect(targetOf(union(), [])).toEqual([]);
	expect(targetOf(union(), [1])).toEqual([1]);
	expect(targetOf(union([5]), [2])).toEqual([2, 5]);
	expect(targetOf(union([1, 1, 2]), [2, 1, 2, 1])).toEqual([2, 1]);
	expect(targetOf(union([1, 1, 2], [], [5, 5, 7]), [2, 1, 2, 1])).toEqual([2, 1, 5, 7]);
	expect(targetOf(union(["a", 1, false]), [false, "a", 2, undefined])).toEqual([false, "a", 2, undefined, 1]);

	const users = [
		{ name: "a" },
		{ name: "b" },
		{ name: "c" }
	];

	expect(targetOf(union([users[0], users[0]]), [users[1], users[0]])).toEqual([users[1], users[0]]);
});
