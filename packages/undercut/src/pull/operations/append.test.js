import { targetOf } from "../../utils/tests.js";

import { append } from "./append.js";

test("append", () => {
	expect(targetOf(append(), [])).toEqual([]);
	expect(targetOf(append(), [1])).toEqual([1]);
	expect(targetOf(append(2), [1])).toEqual([1, 2]);
	expect(targetOf(append(null), [1])).toEqual([1, null]);
	expect(targetOf(append(undefined), [1])).toEqual([1, undefined]);
	expect(targetOf(append(2, 3), [1])).toEqual([1, 2, 3]);
});
