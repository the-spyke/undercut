import { targetOf } from "../../utils/tests.js";

import { includes } from "./includes.js";

test("includes", () => {
	expect(targetOf(includes(), [])).toEqual([false]);
	expect(targetOf(includes(), [undefined])).toEqual([true]);
	expect(targetOf(includes(-5), [1, -3, -5, 2])).toEqual([true]);
});
