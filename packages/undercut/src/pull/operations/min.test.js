import { targetOf } from "../../utils/tests.js";

import { min } from "./min.js";

test("min", () => {
	expect(targetOf(min(), [])).toEqual([]);
	expect(targetOf(min(), [1])).toEqual([1]);
	expect(targetOf(min(), [0])).toEqual([0]);
	expect(targetOf(min(), [-1])).toEqual([-1]);
	expect(targetOf(min(), [-4, 1, 3, 5])).toEqual([-4]);
	expect(targetOf(min(), [1, -3, -5])).toEqual([-5]);
});
