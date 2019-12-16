import { testPull } from "./index.js";

test(`testPull`, () => {
	expect(testPull(i => i, [1, 3])).toEqual([1, 3]);
});
