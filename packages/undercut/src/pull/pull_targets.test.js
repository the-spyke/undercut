import {
	toArray,
	toConsumer,
	toMap,
	toNull,
	toObject,
	toSet,
	toValue
} from "./pull_targets.js";

test("toArray", () => {
	expect(toArray([])).toEqual([]);
	expect(toArray([1, 2, 3])).toEqual([1, 2, 3]);
	expect(toArray(
		(function* gen() {
			yield false;
			yield 0;
			yield null;
		})()
	)).toEqual([false, 0, null]);
});

test("toConsumer", () => {
	const consumer = jest.fn();
	expect(toConsumer(consumer)([1, 2])).toBe(undefined);
	expect(consumer.mock.calls).toEqual([[1, 0], [2, 1]]);
});

test("toMap", () => {
	expect(toMap([])).toEqual(new Map());
	expect(toMap(
		(function* gen() {
			yield [1, 1];
			yield [null, 3];
			yield [1, 2];
			yield [4, 5];
		})()
	)).toEqual(new Map([[1, 2], [null, 3], [4, 5]]));
});

test("toNull", () => {
	expect(toNull([1, 2])).toBe(undefined);
	let isFinished = false
	expect(toNull(
		(function* gen() {
			yield [1, 2];
			yield [null, 3];
			yield [4, 5];
			isFinished = true;
		})()
	)).toBe(undefined);
	expect(isFinished).toBe(true);
});

test("toObject", () => {
	expect(toObject([])).toEqual({});
	expect(toObject(
		(function* gen() {
			yield ["a", 2];
			yield ["b", 3];
			yield ["c", 5];
		})()
	)).toEqual({ "a": 2, "b": 3, "c": 5 });
});

test("toSet", () => {
	expect(toSet([])).toEqual(new Set());
	expect(toSet(
		(function* gen() {
			yield 1;
			yield null;
			yield 1;
			yield 4;
		})()
	)).toEqual(new Set([1, null, 4]));
});

test("toValue", () => {
	expect(toValue([])).toBe(undefined);
	expect(toValue(
		(function* gen() {
			yield 1;
		})()
	)).toBe(1);
	expect(() => toValue([1, 2])).toThrow();
});
