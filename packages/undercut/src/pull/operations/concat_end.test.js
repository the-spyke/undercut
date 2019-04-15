import { targetOf } from "../../utils/tests.js";

import { concatEnd } from "./concat_end.js";

test("concatEnd", () => {
	expect(() => concatEnd()).toThrow();

	expect(targetOf(concatEnd([]), [])).toEqual([]);
	expect(targetOf(concatEnd([]), [1])).toEqual([1]);
	expect(targetOf(concatEnd([1]), [])).toEqual([1]);
	expect(targetOf(concatEnd([1, 3]), [2, 4])).toEqual([2, 4, 1, 3]);
});
