import { describe, expect, test } from "@jest/globals";

import { Heap, MaxHeap, MinHeap } from "./heap";

describe(`Heap`, () => {
	test(`getParentIndex should return a valid index`, () => {
		expect(Heap.getParentIndex(0)).toBe(-1);
		expect(Heap.getParentIndex(1)).toBe(0);
		expect(Heap.getParentIndex(2)).toBe(0);
		expect(Heap.getParentIndex(3)).toBe(1);
		expect(Heap.getParentIndex(5)).toBe(2);
		expect(Heap.getParentIndex(14)).toBe(6);
	});

	test(`getLeftChildIndex should return a valid index`, () => {
		expect(Heap.getLeftChildIndex(0)).toBe(1);
		expect(Heap.getLeftChildIndex(1)).toBe(3);
		expect(Heap.getLeftChildIndex(2)).toBe(5);
		expect(Heap.getLeftChildIndex(3)).toBe(7);
		expect(Heap.getLeftChildIndex(5)).toBe(11);
		expect(Heap.getLeftChildIndex(6)).toBe(13);
	});

	test(`getRightChildIndex should return a valid index`, () => {
		expect(Heap.getRightChildIndex(0)).toBe(2);
		expect(Heap.getRightChildIndex(1)).toBe(4);
		expect(Heap.getRightChildIndex(2)).toBe(6);
		expect(Heap.getRightChildIndex(3)).toBe(8);
		expect(Heap.getRightChildIndex(5)).toBe(12);
		expect(Heap.getRightChildIndex(6)).toBe(14);
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
