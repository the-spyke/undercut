import { targetOf } from "../../utils/tests.js";

import { last } from "./last.js";

test("last", () => {
	expect(targetOf(last(), [])).toEqual([]);
	expect(targetOf(last(), [1])).toEqual([1]);
	expect(targetOf(last(), [undefined])).toEqual([undefined]);
	expect(targetOf(last(), [2, {}, undefined, 4, -3, null])).toEqual([null]);
});
