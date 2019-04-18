import { targetOf } from "../../utils/tests.js";

import { reduce } from "./reduce.js";

test("reduce", () => {
	expect(() => reduce()).toThrow();

	expect(targetOf(reduce(() => 3, -4), [])).toEqual([-4]);
	expect(targetOf(reduce((acc, x) => acc + x, 0), [])).toEqual([0]);
	expect(targetOf(reduce((acc, x) => acc + x, 0), [1, -1, 3, 45])).toEqual([48]);
});
