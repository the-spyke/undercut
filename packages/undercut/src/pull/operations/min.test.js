import { targetOf } from "../utils/tests.js";

import { minPull } from "./min.js";

test("minPull", () => {
	expect(targetOf(minPull(), [])).toEqual([]);
	expect(targetOf(minPull(), [1])).toEqual([1]);
	expect(targetOf(minPull(), [0])).toEqual([0]);
	expect(targetOf(minPull(), [-1])).toEqual([-1]);
	expect(targetOf(minPull(), [-4, 1, 3, 5])).toEqual([-4]);
	expect(targetOf(minPull(), [1, -3, -5])).toEqual([-5]);
});
