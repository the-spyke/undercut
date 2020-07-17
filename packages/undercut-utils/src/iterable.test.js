import { describe, expect, test } from "@jest/globals";

import {
	head,
	headTail,
	tail,
} from "./iterable.js";

describe(`head`, () => {
	test(`should throw on no argument`, () => {
		expect(() => head()).toThrow();
	});

	test(`should return "undefined" for empty iterables`, () => {
		expect(head([])).toBe(undefined);
		expect(head(``)).toBe(undefined);
		expect(head(new Map())).toBe(undefined);
	});

	test(`should work with iterables`, () => {
		expect(head([54])).toBe(54);
		expect(head([null])).toBe(null);
		expect(head([false])).toBe(false);
		expect(head(`a`)).toBe(`a`);
		expect(head([undefined])).toBe(undefined);
		expect(head([undefined, 34])).toBe(undefined);
		expect(head([false, 34, 45])).toBe(false);
		expect(head(new Set([false, 34, 45]))).toBe(false);
		expect(head(`asd`)).toBe(`a`);
	});
});

describe(`headTail`, () => {
	test(`should throw on no argument`, () => {
		expect(() => headTail()).toThrow();
	});

	test(`should return had and tail both "undefined" for empty iterables`, () => {
		expect(headTail([])).toEqual({ head: undefined, tail: undefined });
		expect(headTail(``)).toEqual({ head: undefined, tail: undefined });
		expect(headTail(new Map())).toEqual({ head: undefined, tail: undefined });
	});

	test(`should return an iterator as the tail`, () => {
		expect(headTail([1, 2, 3]).tail).toEqual(expect.objectContaining({ next: expect.any(Function) }));
		expect(headTail([1, 2, 3]).tail.next()).toEqual({ value: 2, done: false });
	});

	test(`should work with iterables`, () => {
		expect(headTail([54])).toEqual({ head: 54, tail: expect.any(Object) });
		expect(headTail([null])).toEqual({ head: null, tail: expect.any(Object) });
		expect(headTail([false])).toEqual({ head: false, tail: expect.any(Object) });
		expect(headTail(`a`)).toEqual({ head: `a`, tail: expect.any(Object) });
		expect(headTail([undefined])).toEqual({ head: undefined, tail: expect.any(Object) });
		expect(headTail([undefined, 34])).toEqual({ head: undefined, tail: expect.any(Object) });
		expect(headTail([false, 34, 45])).toEqual({ head: false, tail: expect.any(Object) });
		expect(headTail(new Set([false, 34, 45]))).toEqual({ head: false, tail: expect.any(Object) });
		expect(headTail(`asd`)).toEqual({ head: `a`, tail: expect.any(Object) });
	});
});

describe(`tail`, () => {
	test(`should throw on no argument`, () => {
		expect(() => tail()).toThrow();
	});

	test(`should return "undefined" for empty iterables`, () => {
		expect(tail([])).toBe(undefined);
		expect(tail(``)).toBe(undefined);
		expect(tail(new Map())).toBe(undefined);
	});

	test(`should return an iterator`, () => {
		expect(tail([1, 2, 3])).toEqual(expect.objectContaining({ next: expect.any(Function) }));
		expect(tail([1, 2, 3]).next()).toEqual({ value: 2, done: false });
	});

	test(`should work with iterables`, () => {
		expect(tail([54])).toEqual(expect.any(Object));
		expect(tail([null])).toEqual(expect.any(Object));
		expect(tail([false])).toEqual(expect.any(Object));
		expect(tail(`a`)).toEqual(expect.any(Object));
		expect(tail([undefined])).toEqual(expect.any(Object));
		expect(tail([undefined, 34])).toEqual(expect.any(Object));
		expect(tail([false, 34, 45])).toEqual(expect.any(Object));
		expect(tail(new Set([false, 34, 45]))).toEqual(expect.any(Object));
		expect(tail(`asd`)).toEqual(expect.any(Object));
	});
});
