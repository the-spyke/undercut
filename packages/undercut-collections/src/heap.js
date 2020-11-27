import { desc, isNumberValue } from "@undercut/utils";
import { swapElements } from "@undercut/utils/src/array.js";
import { assertFunctor } from "@undercut/utils/src/assert.js";
import { numbers as numbersComparator } from "@undercut/utils/src/compare.js";

const EMPTY_ITEM = {};

class Heap {
	constructor(comparator) {
		assertFunctor(comparator, `comparator`);

		this.$items = [];
		this.$comparator = comparator;
	}

	static getParentIndex(index) {
		return Math.trunc((index - 1) / 2);
	}

	static getLeftChildIndex(index) {
		return 2 * index + 1;
	}

	static getRightChildIndex(index) {
		return 2 * index + 2;
	}

	get isEmpty() {
		return this.size === 0;
	}

	get size() {
		return this.$items.length;
	}

	[Symbol.iterator]() {
		return this.$items.values();
	}

	add(value) {
		this.$checkItemType(value);

		this.$items.push(value);

		return this.$heapifyUpAt(this.size - 1);
	}

	deleteAt(index) {
		if (!isNumberValue(index) || index < 0 || index >= this.size) {
			return undefined;
		}

		if (index === this.size - 1) {
			return this.$items.pop();
		}

		const value = this.$items[index];

		this.$items[index] = EMPTY_ITEM;
		this.$heapifyUpAt(index);
		this.$items[0] = this.$items.pop();
		this.$heapifyDownAt(0);

		return value;
	}

	getAt(index) {
		return this.$items[index];
	}

	peek() {
		return this.getAt(0);
	}

	pop() {
		return this.deleteAt(0);
	}

	replaceAt(index, value) {
		this.$checkItemType(value);

		if (!isNumberValue(index) || index < 0 || index >= this.size) {
			return -1;
		}

		const originalValue = this.$items[index];

		if (originalValue === value) {
			return index;
		}

		this.$items[index] = value;

		if (this.$comparator(originalValue, value) < 0) {
			return this.$heapifyDownAt(index);
		}

		return this.$heapifyUpAt(index);
	}

	$checkItemType(item) {
		if (!isNumberValue(item)) {
			throw new Error(`Heap can contain only valid Number values, got: ${item}`);
		}
	}

	$cloneTo(target) {
		target.$items = this.$items.slice();
	}

	$heapifyDownAt(index) {
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

	$heapifyUpAt(index) {
		let parentIndex = Heap.getParentIndex(index);

		while (index > 0 && (this.$items[index] === EMPTY_ITEM || this.$comparator(this.$items[index], this.$items[parentIndex]) < 0)) {
			swapElements(this.$items, index, parentIndex);

			index = parentIndex;
			parentIndex = Heap.getParentIndex(index);
		}

		return index;
	}
}

export class MinHeap extends Heap {
	static from(iterable) {
		const heap = new this();

		for (const item of iterable) {
			heap.add(item);
		}

		return heap;
	}

	static of(...values) {
		return this.from(values);
	}

	constructor() {
		super(numbersComparator);
	}

	clone() {
		return this.$cloneTo(new MinHeap());
	}
}

export class MaxHeap extends Heap {
	static from(iterable) {
		const heap = new this();

		for (const item of iterable) {
			heap.add(item);
		}

		return heap;
	}

	static of(...values) {
		return this.from(values);
	}

	constructor() {
		super(desc(numbersComparator));
	}

	clone() {
		return this.$cloneTo(new MaxHeap());
	}
}
