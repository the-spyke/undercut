import type { Comparator } from "@undercut/types";

import { desc, isNumberValue } from "@undercut/utils";
import { swapElements } from "@undercut/utils/src/array.js";
import { assertFunctor } from "@undercut/utils/src/assert.js";
import { numbers as numbersComparator } from "@undercut/utils/src/compare.js";

export class Heap<T> {
	static getParentIndex(index: number): number {
		return index < 1 ? -1 : Math.trunc((index - 1) / 2);
	}

	static getLeftChildIndex(index: number): number {
		return 2 * index + 1;
	}

	static getRightChildIndex(index: number): number {
		return 2 * index + 2;
	}

	$items: Array<T> = null;
	$comparator: Comparator<T> = null;

	constructor(comparator: Comparator<T>) {
		assertFunctor(comparator, `comparator`);

		this.$items = [];
		this.$comparator = comparator;
	}

	get isEmpty(): boolean {
		return this.size === 0;
	}

	get size(): number {
		return this.$items.length;
	}

	[Symbol.iterator]() {
		return this.$items.values();
	}

	add(value: T) {
		this.$checkItemType(value);

		this.$items.push(value);

		this.$heapifyUpAt(this.size - 1);
	}

	peek(): T | undefined {
		return this.$items[0];
	}

	pop(): T | undefined {
		return this.$deleteAt(0);
	}

	$checkItemType(item: unknown): void {
		if (!isNumberValue(item)) {
			throw new Error(`Heap can contain only valid Number values, got: ${item}`);
		}
	}

	$deleteAt(index: number): T {
		if (index === this.size - 1) {
			return this.$items.pop();
		}

		const value = this.$items[index];

		if (index > 0) {
			this.$heapifyUpAt(index, true);
		}

		this.$items[0] = this.$items.pop();
		this.$heapifyDownAt(0);

		return value;
	}

	/**
	 * @returns The index of the item after heapify operation.
	*/
	$heapifyDownAt(index: number): number {
		while (true) { // eslint-disable-line no-constant-condition
			const leftChildIndex = Heap.getLeftChildIndex(index);
			const rightChildIndex = Heap.getRightChildIndex(index);

			let nextIndex = index;

			if (leftChildIndex < this.size && this.$comparator(this.$items[leftChildIndex], this.$items[nextIndex]) < 0) {
				nextIndex = leftChildIndex;
			}

			if (rightChildIndex < this.size && this.$comparator(this.$items[rightChildIndex], this.$items[nextIndex]) < 0) {
				nextIndex = rightChildIndex;
			}

			if (nextIndex === index) {
				return index;
			}

			swapElements(this.$items, index, nextIndex);
			index = nextIndex;
		}
	}

	/**
	 * @param force Don't compare, just force item to the top.
	 * @returns The index of the item after heapify operation.
	*/
	$heapifyUpAt(index: number, force: boolean = false): number {
		let parentIndex = Heap.getParentIndex(index);

		while (index > 0 && (force || this.$comparator(this.$items[index], this.$items[parentIndex]) < 0)) {
			swapElements(this.$items, index, parentIndex);

			index = parentIndex;
			parentIndex = Heap.getParentIndex(index);
		}

		return index;
	}

	$replaceAt(index: number, value: T): T {
		const originalValue = this.$items[index];

		if (value !== originalValue) {
			this.$items[index] = value;

			if (this.$comparator(originalValue, value) < 0) {
				this.$heapifyDownAt(index);
			} else {
				this.$heapifyUpAt(index);
			}
		}

		return originalValue;
	}
}

function fromIterable<T, H extends Heap<T>>(Heap: new () => H, iterable: Iterable<T>): H {
	const heap = new Heap();

	for (const item of iterable) {
		heap.add(item);
	}

	return heap;
}

export class MaxHeap extends Heap<number> {
	static from(iterable: Iterable<number>): MaxHeap {
		return fromIterable(this, iterable);
	}

	static of(...values: Array<number>): MaxHeap {
		return this.from(values);
	}

	constructor() {
		super(desc(numbersComparator));
	}
}

export class MinHeap extends Heap<number> {
	static from(iterable: Iterable<number>): MinHeap {
		return fromIterable(this, iterable);
	}

	static of(...values: Array<number>): MinHeap {
		return this.from(values);
	}

	constructor() {
		super(numbersComparator);
	}
}
