import { assert } from "../utils/assert.js";

export function createPushTarget() {
	return {
		next(value) {
			this.items.push(value);
		},
		return() {
			// Empty.
		},
		throw(e) {
			throw e;
		},
		items: [],
		clear() {
			this.items = [];
		}
	};
}

/**
 * @param {Function} consumer
 * @param {Function} [finalizer]
 * @returns {Observer}
 */
export function* toConsumer(consumer, finalizer) {
	let error = undefined;
	let index = 0;

	try {
		while (true) {
			consumer(yield, index);
			index++;
		}
	} catch (e) {
		error = e;
		throw e;
	} finally {
		if (finalizer) {
			finalizer(error, index);
		}
	}
}

/**
 * @returns {Observer}
 */
export function toNull() {
	return {
		next(value) {
			void value;
		},
		return() {
			// Empty.
		},
		throw(e) {
			throw e;
		}
	};
}

/**
 * @param {Function} setter
 * @returns {Observer}
 */
export function* toValue(setter) {
	let firstValue = undefined;
	let count = 0;

	try {
		firstValue = yield;
		count++;
		yield;
		count++;

		assert(count === 1, `"toValue()" may be applied only to a sequence of one item, but got at least 2.`);
	} finally {
		assert(count === 0, `"toValue()" may be applied only to a sequence of one item, but got none.`);

		if (count === 1) {
			setter(firstValue);
		}
	}
}
