import {
	identity,
	negate,
	negateSign,
	noop
} from "./function.js";

test("identity", () => {
	expect(identity(65)).toBe(65);
});

test("negate", () => {
	expect(negate(x => x > 0)(42)).toBe(false);
});

test("negateSign", () => {
	expect(negateSign(x => x + 1)(42)).toBe(-43);
});

test("noop", () => {
	expect(() => noop()).not.toThrow();
});
