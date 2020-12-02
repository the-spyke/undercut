import { desc, isNumberValue } from "@undercut/utils";
import { swapElements } from "@undercut/utils/src/array.js";
import { assertFunctor } from "@undercut/utils/src/assert.js";
import { numbers as numbersComparator } from "@undercut/utils/src/compare.js";

const EMPTY_ITEM = {};

/**
 * @template T
 */
class Heap {
	/**
	 * @param {(a: T, b: T) => number} comparator
	*/
	constructor(comparator) {
		assertFunctor(comparator, `comparator`);

		/** @type {Array<T>} */
		this.$items = [];
		this.$comparator = comparator;
	}

	/**
	 * @param {number} index
	 * @returns {number}
	*/
	static getParentIndex(index) {
		return Math.trunc((index - 1) / 2);
	}

	/**
	 * @param {number} index
	 * @returns {number}
	*/
	static getLeftChildIndex(index) {
		return 2 * index + 1;
	}

	/**
	 * @param {number} index
	 * @returns {number}
	*/
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

	/**
	 * @param {T} value
	 * @returns {void}
	*/
	add(value) {
		this.$checkItemType(value);

		this.$items.push(value);

		this.$heapifyUpAt(this.size - 1);
	}

	peek() {
		return this.$items[0];
	}

	pop() {
		return this.$deleteAt(0);
	}

	/**
	 * @param {unknown} item
	 * @returns {void}
	*/
	$checkItemType(item) {
		if (!isNumberValue(item)) {
			throw new Error(`Heap can contain only valid Number values, got: ${item}`);
		}
	}

	/**
	 * @param {number} index
	 * @returns {T}
	*/
	$deleteAt(index) {
		if (index === this.size - 1) {
			return this.$items.pop();
		}

		const value = this.$items[index];

		if (index > 0) {
			this.$items[index] = EMPTY_ITEM;
			this.$heapifyUpAt(index);
		}

		this.$items[0] = this.$items.pop();
		this.$heapifyDownAt(0);

		return value;
	}

	/**
	 * @param {number} index
	 * @returns {number} The index of the item after heapify operation.
	*/
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

	/**
	 * @param {number} index
	 * @returns {number} The index of the item after heapify operation.
	*/
	$heapifyUpAt(index) {
		let parentIndex = Heap.getParentIndex(index);

		while (index > 0 && (this.$items[index] === EMPTY_ITEM || this.$comparator(this.$items[index], this.$items[parentIndex]) < 0)) {
			swapElements(this.$items, index, parentIndex);

			index = parentIndex;
			parentIndex = Heap.getParentIndex(index);
		}

		return index;
	}

	/**
	 * @param {number} index
	 * @param {T} value
	 * @returns {T} The original value at the specified index.
	*/
	$replaceAt(index, value) {
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

/**
 * @type {<T, H extends Heap<T>>(Heap: new () => H, iterable: Iterable<T>) => H}
 */
function fromIterable(Heap, iterable) {
	const heap = new Heap();

	for (const item of iterable) {
		heap.add(item);
	}

	return heap;
}

/**
 * @extends {Heap<number>}
 */
export class MaxHeap extends Heap {
	/**
	 * @param {Iterable<number>} iterable
	 * @returns {MaxHeap}
	 */
	static from(iterable) {
		return fromIterable(this, iterable);
	}

	/**
	 * @param {...number} values
	 * @returns {MaxHeap}
	 */
	static of(...values) {
		return this.from(values);
	}

	constructor() {
		super(desc(numbersComparator));
	}
}

/**
 * @extends {Heap<number>}
 */
export class MinHeap extends Heap {
	/**
	 * @param {Iterable<number>} iterable
	 * @returns {MinHeap}
	 */
	static from(iterable) {
		return fromIterable(this, iterable);
	}

	/**
	 * @param {...number} values
	 * @returns {MinHeap}
	 */
	static of(...values) {
		return this.from(values);
	}

	constructor() {
		super(numbersComparator);
	}
}
