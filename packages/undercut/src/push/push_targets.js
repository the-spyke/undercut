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
 * @param {Array} array
 * @returns {Observer}
 */
export function toArray(array) {
	return toConsumer(item => array.push(item));
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
 * @param {Map} map
 * @returns {Observer}
 */
export function toMap(map) {
	return toConsumer(([key, value]) => map.set(key, value));
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
 * @param {Object} object
 * @returns {Observer}
 */
export function toObject(object) {
	return toConsumer(([key, value]) => object[key] = value);
}

/**
 * @param {Set} set
 * @returns {Observer}
 */
export function toSet(set) {
	return toConsumer(key => set.add(key));
}

/**
 * @param {Function} setter
 * @returns {Observer}
 */
export function* toValue(setter) {
	let firstValue = undefined;
	let success = true;

	try {
		firstValue = yield;
		yield;

		assert(false, `"toValue()" may be applied only to a sequence of one item.`);
	} catch (e) {
		success = false;
		throw e;
	} finally {
		if (success) {
			setter(firstValue);
		}
	}
}
