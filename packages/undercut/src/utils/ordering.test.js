import * as compare from "./compare.js";
import { identity } from "./function.js";

import { asc, desc } from "./ordering.js";

test(`asc`, () => {
	const selector = x => x;

	expect(() => asc()).toThrow();
	expect(asc(compare.numbers)).toEqual([asc, compare.numbers, identity]);
	expect(asc(compare.numbers, selector)).toEqual([asc, compare.numbers, selector]);
});

test(`desc`, () => {
	const selector = x => x;

	expect(() => desc()).toThrow();
	expect(desc(compare.numbers)).toEqual([desc, compare.numbers, identity]);
	expect(desc(compare.numbers, selector)).toEqual([desc, compare.numbers, selector]);
});
