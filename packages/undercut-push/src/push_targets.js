import { assert, assertFunctor } from "@undercut/utils/src/assert.js";
import { asObserver } from "@undercut/utils/src/coroutine.js";
import { rethrow } from "@undercut/utils/src/function.js";
import { isUndefined, isFunction } from "@undercut/utils/src/language.js";

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

	let value = undefined;
	let success = true;

	try {
		value = yield;
		yield;
		throw new Error(`"toValue()" may be applied only to a sequence of one item, but got at least 2.`);
	} catch (error) {
		success = false;
		throw error;
	} finally {
		if (success) {
			setter(value);
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
