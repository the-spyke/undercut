import { targetOf } from "../../utils/tests.js";

import { compact } from "./compact.js";

test("compact", () => {
	expect(targetOf(compact(), [])).toEqual([]);
	expect(targetOf(compact(), [1])).toEqual([1]);
	expect(targetOf(compact(), [0, 0])).toEqual([]);
	expect(targetOf(compact(), [
		0, 1, false, 4, null, undefined, -1, "test", true, [], {}, ""
	])).toEqual([1, 4, -1, "test", true, [], {}]);
});
