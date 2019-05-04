import { callbackArgsOf, targetOf } from "../../utils/tests.js";

import { forEach } from "./for_each.js";

test("forEach", () => {
	expect(() => forEach()).toThrow();

	expect(callbackArgsOf(
		() => true,
		cb => targetOf(forEach(cb), [])
	)).toEqual([]);

	expect(callbackArgsOf(
		() => true,
		cb => targetOf(forEach(cb), [undefined, false, 7])
	)).toEqual([[undefined, 0], [false, 1], [7, 2]]);
});
