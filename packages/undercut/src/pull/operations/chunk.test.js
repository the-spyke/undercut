import { targetOf } from "../../utils/tests.js";

import { chunk } from "./chunk.js";

test("chunk", () => {
	expect(() => chunk()).toThrow();
	expect(() => chunk(0)).toThrow();
	expect(() => chunk(-4)).toThrow();

	expect(targetOf(chunk(2), [])).toEqual([]);
	expect(targetOf(chunk(1), [1])).toEqual([[1]]);
	expect(targetOf(chunk(2), [1])).toEqual([[1]]);
	expect(targetOf(chunk(2), [1, 2])).toEqual([[1, 2]]);
	expect(targetOf(chunk(2), [1, 2, 3, 4])).toEqual([[1, 2], [3, 4]]);
	expect(targetOf(chunk(3), [1, 2, 3, 4])).toEqual([[1, 2, 3], [4]]);
});
