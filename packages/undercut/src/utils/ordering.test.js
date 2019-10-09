import * as compare from "./compare.js";
import { identity } from "./function.js";

import { asc, desc } from "./sorting.js";

test("asc", () => {
	const selector = x => x;

	expect(() => asc()).toThrow();
	expect(asc(compare.numbers)).toEqual([compare.numbers, identity, 1]);
	expect(asc(compare.numbers, selector)).toEqual([compare.numbers, selector, 1]);
});

test("desc", () => {
	const selector = x => x;

	expect(() => desc()).toThrow();
	expect(desc(compare.numbers)).toEqual([compare.numbers, identity, -1]);
	expect(desc(compare.numbers, selector)).toEqual([compare.numbers, selector, -1]);
});
