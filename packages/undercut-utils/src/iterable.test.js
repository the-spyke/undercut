import { peekIterable } from "./iterable.js";

test(`peekIterable`, () => {
	expect(() => peekIterable()).toThrow();

	expect(peekIterable([])).toBe(undefined);
	expect(peekIterable([54])).toBe(54);
	expect(peekIterable([undefined])).toBe(undefined);
	expect(peekIterable([undefined, 34])).toBe(undefined);
	expect(peekIterable([false, 34, 45])).toBe(false);
	expect(peekIterable([false, 34, 45].values())).toBe(false);
});
