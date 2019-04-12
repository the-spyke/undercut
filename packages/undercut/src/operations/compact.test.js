import { targetOf } from "../utils/tests.js";

import { compactPull } from "./compact.js";

test("compactPull", () => {
	expect(targetOf(compactPull(), [])).toEqual([]);
	expect(targetOf(compactPull(), [1])).toEqual([1]);
	expect(targetOf(compactPull(), [0, 0])).toEqual([]);
	expect(targetOf(compactPull(), [
		0, 1, false, 4, null, undefined, -1, "test", true, [], {}, ""
	])).toEqual([1, 4, -1, "test", true, [], {}]);
});
