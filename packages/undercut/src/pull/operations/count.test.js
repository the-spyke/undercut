import { targetOf } from "../../utils/tests.js";

import { count } from "./count.js";

test("count", () => {
	expect(targetOf(count(), [])).toEqual([0]);
	expect(targetOf(count(), [1])).toEqual([1]);
	expect(targetOf(count(), [1, 3, 5])).toEqual([3]);
	expect(targetOf(count(), [1, null, -5, undefined, {}, [42], false])).toEqual([7]);
});
