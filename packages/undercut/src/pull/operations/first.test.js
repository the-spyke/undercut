import { targetOf } from "../../utils/tests.js";

import { first } from "./first.js";

test("first", () => {
	expect(targetOf(first(), [])).toEqual([]);
	expect(targetOf(first(), [1])).toEqual([1]);
	expect(targetOf(first(), [undefined])).toEqual([undefined]);
	expect(targetOf(first(), [2, 4, -3])).toEqual([2]);
});
