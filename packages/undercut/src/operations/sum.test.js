import { first } from "../utils/tests.js";

import { sumPull } from "./sum.js";

test("sum of 1 + 2 + 3 equals 6", () => {
	expect(first([1, 2, 3], sumPull)).toBe(6);
});
