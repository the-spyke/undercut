import { targetOf } from "../../utils/tests.js";

import { take } from "./take.js";

test("take", () => {
	expect(() => take()).toThrow();

	expect(targetOf(take(1), [])).toEqual([]);
	expect(targetOf(take(0), [1])).toEqual([]);
	expect(targetOf(take(1), [1, 2])).toEqual([1]);
	expect(targetOf(take(5), [1])).toEqual([1]);
	expect(targetOf(take(3), [1, 2, 3, 4, 5])).toEqual([1, 2, 3]);
});
