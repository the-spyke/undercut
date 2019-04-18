import { targetOf } from "../../utils/tests.js";

import { intersection } from "./intersection.js";

test("intersection", () => {
	expect(targetOf(intersection(), [])).toEqual([]);
	expect(targetOf(intersection(), [1])).toEqual([]);
	expect(targetOf(intersection([1]), [])).toEqual([]);
	expect(targetOf(intersection([5]), [2])).toEqual([]);
	expect(targetOf(intersection([1, 1, 2]), [2, 1, 2, 1])).toEqual([2, 1]);
	expect(targetOf(intersection([1, 1, 2], [2, 7, 1], [5, 5, 2, 7]), [2, 1, 2, 1])).toEqual([2]);
	expect(targetOf(intersection(["a", 1, false]), [false, "a", 2, undefined])).toEqual([false, "a"]);
});
