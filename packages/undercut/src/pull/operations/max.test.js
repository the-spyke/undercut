import { targetOf } from "../../utils/tests.js";

import { max } from "./max.js";

test("max", () => {
	expect(targetOf(max(), [])).toEqual([]);
	expect(targetOf(max(), [1])).toEqual([1]);
	expect(targetOf(max(), [0])).toEqual([0]);
	expect(targetOf(max(), [-1])).toEqual([-1]);
	expect(targetOf(max(), [-4, 1, 3, 5])).toEqual([5]);
	expect(targetOf(max(), [1, -3, -5])).toEqual([1]);
});
