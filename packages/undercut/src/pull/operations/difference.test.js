import { targetOf } from "../../utils/tests.js";

import { difference, symmetricDifference } from "./difference.js";

test("difference", () => {
	expect(targetOf(difference(), [])).toEqual([]);
	expect(targetOf(difference(), [1])).toEqual([1]);
	expect(targetOf(difference([1]), [])).toEqual([]);
	expect(targetOf(difference([5]), [2])).toEqual([2]);
	expect(targetOf(difference([1, 1, 2]), [2, 1, 2, 1])).toEqual([]);
	expect(targetOf(difference([7, 1], [5, 5, 7]), [2, 1, 2, 1])).toEqual([2, 2]);
	expect(targetOf(difference(["b", 1], ["c", true, 2], [undefined]), [false, "a"])).toEqual([false, "a"]);
});

test("symmetricDifference", () => {
	expect(targetOf(symmetricDifference(), [])).toEqual([]);
	expect(targetOf(symmetricDifference(), [1])).toEqual([1]);
	expect(targetOf(symmetricDifference([1]), [])).toEqual([1]);
	expect(targetOf(symmetricDifference([5]), [2])).toEqual([2, 5]);
	expect(targetOf(symmetricDifference([1, 2, 3]), [3, 4, 5])).toEqual([4, 5, 1, 2]);
	expect(targetOf(symmetricDifference([0, 1, 2, 3], [3, 2, 7, 6]), [3, 4, 1, 6])).toEqual([3, 4, 0, 7]);
});
