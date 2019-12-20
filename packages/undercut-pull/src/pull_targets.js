import { assert } from "@undercut/utils/src/assert.js";
import { abort, close } from "@undercut/utils/src/coroutine.js";
import { isObserver } from "@undercut/utils/src/language.js";

/**
 * @returns {Array}
 */
export function toArray() {
	return Array.from;
}

/**
 * @type {<T>(consumer: (T, number) => void) => (Iterable<T>) => void}
 */
export function toConsumer(consumer) {
	return function (iterable) {
		let index = 0;

		for (const item of iterable) {
			consumer(item, index);
			index++;
		}
	};
}

/**
 * @returns {<T>(iterable: Iterable<T>) => Map<T>}
 */
export function toMap() {
	return function (iterable) {
		return new Map(iterable);
	};
}

/**
 * @returns {<T>(iterable: Iterable<T>) => void}
 */
export function toNull() {
	return function (iterable) {
		for (const item of iterable) { // eslint-disable-line no-unused-vars
			// Do nothing.
		}
	};
}

/**
 * @returns {Object}
 */
export function toObject() {
	return Object.fromEntries;
}

/**
 * @param {Observer} observer
 * @returns {Function}
 */
export function toPushLine(observer) {
	assert(isObserver(observer), `"observer" is required and must be an Observable.`);

	return function (iterable) {
		try {
			for (const item of iterable) {
				observer.next(item);
			}
		} catch (error) {
			abort(observer, error);
		} finally {
			close(observer);
		}

		return observer;
	};
}

/**
 * @returns {<T>(iterable: Iterable<T>) => Set<T>}
 */
export function toSet() {
	return function (iterable) {
		return new Set(iterable);
	};
}

/**
 * @returns {any}
 */
export function toValue() {
	return function (iterable) {
		let firstValue = undefined;
		let count = 0;

		for (const item of iterable) {
			assert(count === 0, `"toValue()" may be applied only to a sequence of one item, but got at least 2.`);

			firstValue = item;
			count++;
		}

		assert(count === 1, `"toValue()" may be applied only to a sequence of one item, but got none.`);

		return firstValue;
	};
}
