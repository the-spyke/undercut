import { targetOf } from "../../utils/tests.js";

import { average } from "./average.js";

test("average", () => {
	expect(targetOf(average(), [])).toEqual([0]);
	expect(targetOf(average(), [0])).toEqual([0]);
	expect(targetOf(average(), [1])).toEqual([1]);
	expect(targetOf(average(), [0, 0])).toEqual([0]);
	expect(targetOf(average(), [1, 3, 5, 1])).toEqual([2.5]);
});
