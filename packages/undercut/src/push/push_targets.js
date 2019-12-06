import { assert, assertFunctor } from "../utils/assert.js";
import { asObserver } from "../utils/coroutine.js";
import { rethrow } from "../utils/function.js";
import { isUndefined, isFunction } from "../utils/language.js";

export function toArray() {
	return {
		next(value) {
			this.values.push(value);
		},
		return() {
			// Empty.
		},
		throw: rethrow,
		values: [],
	};
}

const consumerTarget = asObserver(function* (consumer, finalizer) {
	assertFunctor(consumer, `consumer`);
	assert(isUndefined(finalizer) || isFunction(finalizer), `"finalizer" is optional, could be a function.`);

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
});

/**
 * @param {Function} consumer
 * @param {Function} [finalizer]
 * @returns {Observer}
 */
export function toConsumer(consumer, finalizer) {
	return consumerTarget(consumer, finalizer);
}

/**
 * @returns {Observer}
 */
export function toNull() {
	return {
		next() {
			// Empty.
		},
		return() {
			// Empty.
		},
		throw(e) {
			throw e;
		}
	};
}

const valueTarget = asObserver(function* (setter) {
	assertFunctor(setter, `setter`);

	let firstValue = undefined;
	let count = 0;

	try {
		firstValue = yield;
		count++;
		yield;
		count++;

		assert(count === 1, `"toValue()" may be applied only to a sequence of one item, but got at least 2.`);
	} finally {
		assert(count > 0, `"toValue()" may be applied only to a sequence of one item, but got none.`);

		if (count === 1) {
			setter(firstValue);
		}
	}
});

/**
 * @param {Function} setter
 * @returns {Observer}
 */
export function toValue(setter) {
	return valueTarget(setter);
}
