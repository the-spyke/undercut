import * as compare from "./compare.js";

import { asc, desc } from "./ordering.js";

test(`asc`, () => {
	expect(() => asc()).toThrow();

	expect(asc(compare.numbers)(5, 7)).toBeLessThan(0);
	expect(asc(compare.numbers)(7, 5)).toBeGreaterThan(0);
	expect(asc(compare.numbers)(4, 4) === 0).toBe(true);

	const selector = x => x * -1;

	expect(asc(compare.numbers, selector)(5, 7)).toBeGreaterThan(0);
	expect(asc(compare.numbers, selector)(7, 5)).toBeLessThan(0);
	expect(asc(compare.numbers, selector)(4, 4) === 0).toBe(true);
});

test(`desc`, () => {
	expect(() => desc()).toThrow();

	expect(desc(compare.numbers)(5, 7)).toBeGreaterThan(0);
	expect(desc(compare.numbers)(7, 5)).toBeLessThan(0);
	expect(desc(compare.numbers)(4, 4) === 0).toBe(true);

	const selector = x => x * -1;

	expect(desc(compare.numbers, selector)(5, 7)).toBeLessThan(0);
	expect(desc(compare.numbers, selector)(7, 5)).toBeGreaterThan(0);
	expect(desc(compare.numbers, selector)(4, 4) === 0).toBe(true);
});
