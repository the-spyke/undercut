import { targetOf } from "../../utils/tests.js";

import { nth } from "./nth.js";

test("nth", () => {
	expect(() => nth()).toThrow();

	expect(targetOf(nth(0), [])).toEqual([]);
	expect(targetOf(nth(100), [])).toEqual([]);
	expect(targetOf(nth(0), [1])).toEqual([1]);
	expect(targetOf(nth(0), [1, 2, 3])).toEqual([1]);
	expect(targetOf(nth(4), [1, false, {}, -3, undefined])).toEqual([undefined]);
});
