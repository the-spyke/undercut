import {
	identity,
	negate,
	noop,
	not,
} from "./function.js";

test(`identity`, () => {
	expect(identity(65)).toBe(65);
});

test(`negate`, () => {
	expect(negate(42)).toBe(-42);
	expect(negate(-42)).toBe(42);
});

test(`noop`, () => {
	expect(() => noop()).not.toThrow();
});

test(`not`, () => {
	expect(not(true)).toBe(false);
	expect(not(null)).toBe(true);
});
