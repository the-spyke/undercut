import { callbackArgsOf, targetOf } from "../../utils/tests.js";

import { reduce } from "./reduce.js";

test("reduce", () => {
	expect(() => reduce()).toThrow();
	expect(callbackArgsOf(
		() => 7,
		cb => targetOf(reduce(cb, 0), [3, 4])
	)).toEqual([[0, 3, 0], [7, 4, 1]]);

	expect(targetOf(reduce(() => 3, -4), [])).toEqual([-4]);
	expect(targetOf(reduce((acc, x) => acc + x, 0), [])).toEqual([0]);
	expect(targetOf(reduce((acc, x) => acc + x, 0), [1, -1, 3, 45])).toEqual([48]);
});
