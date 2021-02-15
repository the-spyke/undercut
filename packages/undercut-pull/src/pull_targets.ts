import { assert } from "@undercut/utils/assert";
import { abort, close, head, isObserver } from "@undercut/utils";

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
export function toObserver(observer) {
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
 * @returns {<T>(iterable: Iterable<T>) => T | undefined}
 */
export function toValue() {
	return head;
}
