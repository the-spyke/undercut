import { describe, expect, test } from "@jest/globals";

import { MaxHeap, MinHeap } from "./heap.js";

describe(`MaxHeap`, () => {
	test(`should work`, () => {
		expect(MaxHeap.of(1, 20, 4, 8).pop()).toBe(20);
	});
});

describe(`MinHeap`, () => {
	test(`should work`, () => {
		expect(MinHeap.of(20, 4, 1, 8).pop()).toBe(1);
	});
});
