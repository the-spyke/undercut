import { targetOf } from "../../utils/tests.js";

import { skip } from "./skip.js";

test("skip", () => {
	expect(() => skip()).toThrow();

	expect(targetOf(skip(1), [])).toEqual([]);
	expect(targetOf(skip(5), [1])).toEqual([]);
	expect(targetOf(skip(0), [1])).toEqual([1]);
	expect(targetOf(skip(1), [1, 2])).toEqual([2]);
	expect(targetOf(skip(3), [1, 2, 3, 4, 5])).toEqual([4, 5]);
});
