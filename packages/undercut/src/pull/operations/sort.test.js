import { targetOf } from "../../utils/tests.js";

import { sort, sortNumbers, sortStrings } from "./sort.js";

test("sort", () => {
	expect(() => targetOf(sort(), [])).toThrow();
	expect(targetOf(sort((a, b) => a - b), [4, 1, 2])).toEqual([1, 2, 4]);
});

test("sortNumbers", () => {
	expect(targetOf(sortNumbers(), [])).toEqual([]);
	expect(targetOf(sortNumbers(), [1])).toEqual([1]);
	expect(targetOf(sortNumbers(), [2, 1, 3])).toEqual([1, 2, 3]);
	expect(targetOf(sortNumbers(), [2, 1, -3])).toEqual([-3, 1, 2]);

	expect(targetOf(sortNumbers(true), [2, 1, -3])).toEqual([2, 1, -3]);
});

test("sortStrings", () => {
	expect(targetOf(sortStrings(), [])).toEqual([]);
	expect(targetOf(sortStrings(), [""])).toEqual([""]);
	expect(targetOf(sortStrings(), ["z", "a", "c"])).toEqual(["a", "c", "z"]);
	expect(targetOf(sortStrings(), ["51", "5", "10", "1"])).toEqual(["1", "10", "5", "51"]);

	expect(targetOf(sortStrings(true), ["z", "a", "c"])).toEqual(["z", "c", "a"]);
});
