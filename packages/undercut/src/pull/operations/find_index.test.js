import { targetOf } from "../../utils/tests.js";

import { findIndex } from "./find_index.js";

test("findIndex", () => {
	expect(() => findIndex()).toThrow();

	const predicate = x => x === 2;

	expect(targetOf(findIndex(predicate), [])).toEqual([]);
	expect(targetOf(findIndex(predicate), [1])).toEqual([]);
	expect(targetOf(findIndex(predicate), [2, 5])).toEqual([0]);
	expect(targetOf(findIndex(predicate), [1, 0, 2, 5])).toEqual([2]);
	expect(targetOf(findIndex(predicate), [1, -3, -5, 2])).toEqual([3]);
});
