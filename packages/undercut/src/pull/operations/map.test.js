import { targetOf } from "../../utils/tests.js";

import { map } from "./map.js";

test("map", () => {
	expect(() => map()).toThrow();

	expect(targetOf(map(() => 3), [])).toEqual([]);
	expect(targetOf(map(() => 3), [1, 2])).toEqual([3, 3]);
	expect(targetOf(map(x => x * 2), [1, -1, 3])).toEqual([2, -2, 6]);
});
