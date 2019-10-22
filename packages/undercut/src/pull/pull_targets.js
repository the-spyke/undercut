import { assert } from "../utils/assert.js";
import { isObserver } from "../utils/language.js";
import { closeObserver } from "../utils/observer.js";

/**
 * @param {Iterable} iterable
 * @returns {Array}
 */
export function toArray(iterable) {
	return Array.from(iterable);
}

/**
 * @param {Function} consumer
 * @returns {Function}
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
 * @param {Iterable} iterable
 * @returns {Map}
 */
export function toMap(iterable) {
	return new Map(iterable);
}

/**
 * @param {Iterable} iterable
 * @returns {void}
 */
export function toNull(iterable) {
	for (const item of iterable) { // eslint-disable-line no-unused-vars
		// Do nothing.
	}
}

/**
 * @param {Iterable} iterable
 * @returns {Object}
 */
export function toObject(iterable) {
	return Object.fromEntries(iterable);
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
		} finally {
			closeObserver(observer);
		}

		return observer;
	};
}

/**
 * @param {Iterable} iterable
 * @returns {Set}
 */
export function toSet(iterable) {
	return new Set(iterable);
}

/**
 * @param {Iterable} iterable
 * @returns {any}
 */
export function toValue(iterable) {
	let firstValue = undefined;
	let count = 0;

	for (const item of iterable) {
		assert(count === 0, `"toValue()" may be applied only to a sequence of one item, but got at least 2.`);

		firstValue = item;
		count++;
	}

	assert(count === 1, `"toValue()" may be applied only to a sequence of one item, but got none.`);

	return firstValue;
}
