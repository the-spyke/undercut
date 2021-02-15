import { describe, expect, test } from "@jest/globals";

import {
	getParentIndex,
	getLeftChildIndex,
	getRightChildIndex,
	Heap,
	MaxHeap,
	MinHeap,
} from "./heap";

describe(`Heap`, () => {
	test(`getParentIndex should return a valid index`, () => {
		expect(getParentIndex(0)).toBe(-1);
		expect(getParentIndex(1)).toBe(0);
		expect(getParentIndex(2)).toBe(0);
		expect(getParentIndex(3)).toBe(1);
		expect(getParentIndex(5)).toBe(2);
		expect(getParentIndex(14)).toBe(6);
	});

	test(`getLeftChildIndex should return a valid index`, () => {
		expect(getLeftChildIndex(0)).toBe(1);
		expect(getLeftChildIndex(1)).toBe(3);
		expect(getLeftChildIndex(2)).toBe(5);
		expect(getLeftChildIndex(3)).toBe(7);
		expect(getLeftChildIndex(5)).toBe(11);
		expect(getLeftChildIndex(6)).toBe(13);
	});

	test(`getRightChildIndex should return a valid index`, () => {
		expect(getRightChildIndex(0)).toBe(2);
		expect(getRightChildIndex(1)).toBe(4);
		expect(getRightChildIndex(2)).toBe(6);
		expect(getRightChildIndex(3)).toBe(8);
		expect(getRightChildIndex(5)).toBe(12);
		expect(getRightChildIndex(6)).toBe(14);
	});
});

describe(`MaxHeap`, () => {
	test(`from should return a MaxHeap instance`, () => {
		expect(MaxHeap.from([])).toBeInstanceOf(MaxHeap);
	});

	test(`from should return a MaxHeap with all values included`, () => {
		const values = [3, 1, 4, 2];

		expect([...MaxHeap.from(values)]).toEqual(expect.arrayContaining(values));
	});
});

describe(`MinHeap`, () => {
	test(`should work`, () => {
		expect(MinHeap.of(3, 1, 4, 2).peek()).toBe(1);
	});
});
