import { targetOf } from "../../utils/tests.js";

import { sum } from "./sum.js";

test("sumPull", () => {
	expect(targetOf(sum(), [])).toEqual([0]);
	expect(targetOf(sum(), [1])).toEqual([1]);
	expect(targetOf(sum(), [1, 3, 5])).toEqual([9]);
	expect(targetOf(sum(), [1, -3, -5])).toEqual([-7]);
});
