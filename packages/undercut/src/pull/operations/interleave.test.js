import { targetOf } from "../../utils/tests.js";

import { interleave } from "./interleave.js";

test("interleave", () => {
	expect(targetOf(interleave([]), [])).toEqual([]);
	expect(targetOf(interleave([]), [1, 2])).toEqual([1, 2]);
	expect(targetOf(interleave([1, 2]), [])).toEqual([1, 2]);
	expect(targetOf(interleave([1, 3, 5]), [0, 2, 4])).toEqual([0, 1, 2, 3, 4, 5]);
	expect(targetOf(interleave([1, 3, 5]), [0, 2, 4])).toEqual([0, 1, 2, 3, 4, 5]);
	expect(targetOf(interleave([1, 4], [2, 5]), [0, 3])).toEqual([0, 1, 2, 3, 4, 5]);
});
