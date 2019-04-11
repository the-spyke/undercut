import { targetOf } from "../utils/tests.js";

import { sumPull } from "./sum.js";

test("sumPull", () => {
	expect(targetOf(sumPull(), [])).toEqual([0]);
	expect(targetOf(sumPull(), [1])).toEqual([1]);
	expect(targetOf(sumPull(), [1, 3, 5])).toEqual([9]);
	expect(targetOf(sumPull(), [1, -3, -5])).toEqual([-7]);
});
