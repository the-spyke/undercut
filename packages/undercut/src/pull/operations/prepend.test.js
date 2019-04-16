import { targetOf } from "../../utils/tests.js";

import { prepend } from "./prepend.js";

test("prepend", () => {
	expect(targetOf(prepend(), [])).toEqual([]);
	expect(targetOf(prepend(), [1])).toEqual([1]);
	expect(targetOf(prepend(2), [1])).toEqual([2, 1]);
	expect(targetOf(prepend(null), [1])).toEqual([null, 1]);
	expect(targetOf(prepend(undefined), [1])).toEqual([undefined, 1]);
	expect(targetOf(prepend(2, 3), [1])).toEqual([2, 3, 1]);
});
