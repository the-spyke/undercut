import { targetOf } from "../../utils/tests.js";

import { concatStart } from "./concat_start.js";

test("concatStart", () => {
	expect(() => concatStart()).toThrow();

	expect(targetOf(concatStart([]), [])).toEqual([]);
	expect(targetOf(concatStart([]), [1])).toEqual([1]);
	expect(targetOf(concatStart([1]), [])).toEqual([1]);
	expect(targetOf(concatStart([1, 3]), [2, 4])).toEqual([1, 3, 2, 4]);
});
