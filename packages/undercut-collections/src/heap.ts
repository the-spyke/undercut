import type { Comparator } from "@undercut/types";

import { compare, desc } from "@undercut/utils";
import { swapElements } from "@undercut/utils/array";
import { assertFunctor } from "@undercut/utils/assert";

export function getParentIndex(index: number): number {
	return index < 1 ? -1 : Math.trunc((index - 1) / 2);
}

export function getLeftChildIndex(index: number): number {
	return 2 * index + 1;
}

export function getRightChildIndex(index: number): number {
	return 2 * index + 2;
}

export class Heap<T> {
	$items: Array<T>;
	$comparator: Comparator<T>;

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
		this.$items.push(value);

		this.$heapifyUpAt(this.size - 1);
	}

	peek(): T | undefined {
		return this.$items[0];
	}

	pop(): T | undefined {
		if (this.size < 1) {
			return undefined;
		}

		return this.$deleteAt(0);
	}

	$guardIndex(index: number): void {
		if (index < 0 || index >= this.size) {
			throw new RangeError(`Index out of bound`);
		}
	}

	/**
	 * @returns The deleted item.
	*/
	$deleteAt(index: number): T {
		this.$guardIndex(index);

		if (index === this.size - 1) {
			return this.$items.pop() as T;
		}

		const value = this.$items[index];

		if (index > 0) {
			this.$heapifyUpAt(index, true);
		}

		this.$items[0] = this.$items.pop() as T;
		this.$heapifyDownAt(0);

		return value;
	}

	/**
	 * @returns The index of the item after heapify operation.
	*/
	$heapifyDownAt(index: number): number {
		this.$guardIndex(index);

		while (true) { // eslint-disable-line no-constant-condition
			const leftChildIndex = getLeftChildIndex(index);
			const rightChildIndex = getRightChildIndex(index);

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
		this.$guardIndex(index);

		let parentIndex = getParentIndex(index);

		while (index > 0 && (force || this.$comparator(this.$items[index], this.$items[parentIndex]) < 0)) {
			swapElements(this.$items, index, parentIndex);

			index = parentIndex;
			parentIndex = getParentIndex(index);
		}

		return index;
	}

	/**
	 * @returns The replaced item.
	*/
	$replaceAt(index: number, value: T): T {
		this.$guardIndex(index);

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
		super(desc(compare.numbers));
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
		super(compare.numbers);
	}
}
