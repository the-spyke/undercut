import {
	isBoolean, isDefined, isFalsy, isFunction, isIterable,
	isIterator, isNegative, isNegativeOrZero, isNull, isNullish,
	isNumber, isNumberValue, isObject, isObjectValue, isObserver,
	isPositive, isPositiveOrZero, isString, isSymbol, isTruthy, isUndefined
} from "./language.js";

test("isBoolean", () => {
	expect(isBoolean(false)).toBe(true);
});

test("isDefined", () => {
	expect(isDefined([])).toBe(true);
});

test("isFalsy", () => {
	expect(isFalsy("")).toBe(true);
});

test("isFunction", () => {
	expect(isFunction(() => { })).toBe(true);
});

test("isIterable", () => {
	expect(isIterable([])).toBe(true);
});

test("isIterator", () => {
	expect(isIterator([].values())).toBe(true);
});

test("isNegative", () => {
	expect(isNegative(-123)).toBe(true);
});

test("isNegativeOrZero", () => {
	expect(isNegativeOrZero(0)).toBe(true);
});

test("isNull", () => {
	expect(isNull(null)).toBe(true);
});

test("isNullish", () => {
	expect(isNullish(null)).toBe(true);
});

test("isNumber", () => {
	expect(isNumber(2)).toBe(true);
});

test("isNumberValue", () => {
	expect(isNumberValue(Infinity)).toBe(true);
});

test("isObject", () => {
	expect(isObject({})).toBe(true);
});

test("isObjectValue", () => {
	expect(isObjectValue({})).toBe(true);
});

test("isObserver", () => {
	expect(isObserver((function* () { yield; })())).toBe(true);
});

test("isPositive", () => {
	expect(isPositive(5)).toBe(true);
});

test("isPositiveOrZero", () => {
	expect(isPositiveOrZero(0)).toBe(true);
});

test("isString", () => {
	expect(isString("")).toBe(true);
});

test("isSymbol", () => {
	expect(isSymbol(Symbol())).toBe(true);
});

test("isTruthy", () => {
	expect(isTruthy("false")).toBe(true);
});

test("isUndefined", () => {
	expect(isUndefined(undefined)).toBe(true);
});
