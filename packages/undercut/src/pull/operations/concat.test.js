import { targetOf } from "../../utils/tests.js";

import { concatEnd, concatStart } from "./concat.js";

test("concatStart", () => {
	expect(() => concatStart()).toThrow();

	expect(targetOf(concatStart([]), [])).toEqual([]);
	expect(targetOf(concatStart([]), [1])).toEqual([1]);
	expect(targetOf(concatStart([1]), [])).toEqual([1]);
	expect(targetOf(concatStart([1, 3]), [2, 4])).toEqual([1, 3, 2, 4]);
});

test("concatEnd", () => {
	expect(() => concatEnd()).toThrow();

	expect(targetOf(concatEnd([]), [])).toEqual([]);
	expect(targetOf(concatEnd([]), [1])).toEqual([1]);
	expect(targetOf(concatEnd([1]), [])).toEqual([1]);
	expect(targetOf(concatEnd([1, 3]), [2, 4])).toEqual([2, 4, 1, 3]);
});
