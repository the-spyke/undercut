import { targetOf } from "../../utils/tests.js";

import { reverse } from "./reverse.js";

test("reverse", () => {
	expect(targetOf(reverse(), [])).toEqual([]);
	expect(targetOf(reverse(), [1])).toEqual([1]);
	expect(targetOf(reverse(), [2, 5])).toEqual([5, 2]);
	expect(targetOf(reverse(), [1, -7, "test", 0])).toEqual([0, "test", -7, 1]);
});
