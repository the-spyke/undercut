import { targetOf } from "../../utils/tests.js";

import { join } from "./join.js";

test("join", () => {
	expect(targetOf(join(), [])).toEqual([[].join()]);
	expect(targetOf(join(), [1])).toEqual([[1].join()]);
	expect(targetOf(join(), [1, 3, 5])).toEqual([[1, 3, 5].join()]);
	expect(targetOf(join(null), [1, 3, 5])).toEqual([[1, 3, 5].join(null)]);
	expect(targetOf(join(""), [undefined, 1, ""])).toEqual([[undefined, 1, ""].join("")]);
	expect(targetOf(join(33), [undefined, 1, ""])).toEqual([[undefined, 1, ""].join(33)]);
});
