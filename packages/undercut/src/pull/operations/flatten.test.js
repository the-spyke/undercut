import { targetOf } from "../../utils/tests.js";

import { flatten, flattenIterables } from "./flatten.js";

test("flatten", () => {
	expect(() => flatten(-1)).toThrow();

	expect(targetOf(flatten(), [])).toEqual([]);
	expect(targetOf(flatten(), [1])).toEqual([1]);
	expect(targetOf(flatten(), [undefined])).toEqual([undefined]);
	expect(targetOf(flatten(), [2, 4, [], 1])).toEqual([2, 4, 1]);
	expect(targetOf(flatten(0), [2, 4, [], 1])).toEqual([2, 4, [], 1]);
	expect(targetOf(flatten(), [2, 4, [6, 9], 1])).toEqual([2, 4, 6, 9, 1]);
	expect(targetOf(flatten(0.5), [2, 4, [6, [9]], 1])).toEqual([2, 4, [6, [9]], 1]);
	expect(targetOf(flatten(1.5), [2, 4, [6, [9]], 1])).toEqual([2, 4, 6, [9], 1]);
	expect(targetOf(flatten(), [[0], 2, 4, [6, 9], 1, [false, []]])).toEqual([0, 2, 4, 6, 9, 1, false, []]);
	expect(targetOf(flatten(2), [[0], 2, 4, [6, 9], 1, [false, [7, []]]])).toEqual([0, 2, 4, 6, 9, 1, false, 7, []]);
	expect(targetOf(flatten(Infinity), [[[[[[]]]]]])).toEqual([]);

});

test("flattenIterables", () => {
	expect(targetOf(flattenIterables(), [])).toEqual([]);
	expect(targetOf(flattenIterables(), [undefined])).toEqual([undefined]);
	expect(targetOf(flattenIterables(), ["test", 1, ["test"]])).toEqual(["t", "e", "s", "t", 1, "test"]);
	expect(targetOf(flattenIterables(5), [[[[[[]]]]]])).toEqual([]);
});
