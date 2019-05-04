import { callbackArgsOf, targetOf } from "../../utils/tests.js";

import { map } from "./map.js";

test("map", () => {
	expect(() => map()).toThrow();
	expect(callbackArgsOf(
		() => 1,
		cb => targetOf(map(cb), [3, 4])
	)).toEqual([[3, 0], [4, 1]]);

	expect(targetOf(map(() => 3), [])).toEqual([]);
	expect(targetOf(map(() => 3), [1, 2])).toEqual([3, 3]);
	expect(targetOf(map(x => x * 2), [1, -1, 3])).toEqual([2, -2, 6]);
});
