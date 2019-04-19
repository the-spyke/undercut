import { targetOf } from "../../utils/tests.js";

import { flatten } from "./flatten.js";

test("flatten", () => {
	expect(targetOf(flatten(), [])).toEqual([]);
	expect(targetOf(flatten(), [1])).toEqual([1]);
	expect(targetOf(flatten(), [undefined])).toEqual([undefined]);
	expect(targetOf(flatten(), [2, 4, [], 1])).toEqual([2, 4, 1]);
	expect(targetOf(flatten(), [2, 4, [6, 9], 1])).toEqual([2, 4, 6, 9, 1]);
	expect(targetOf(flatten(), [[0], 2, 4, [6, 9], 1, [false, []]])).toEqual([0, 2, 4, 6, 9, 1, false, []]);
});
