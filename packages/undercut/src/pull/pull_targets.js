import { assert } from "../utils/assert.js";
import { isObserver } from "../utils/language.js";
import { closeObserver } from "../utils/observer.js";

/**
 * @param {Iterable} pullLine 
 * @returns {Array}
 */
export function toArray(pullLine) {
	return Array.from(pullLine);
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
 * @param {Iterable} pullLine 
 * @returns {Map}
 */
export function toMap(pullLine) {
	return new Map(pullLine);
}

/**
 * @param {Iterable} pullLine 
 * @returns {void}
 */
export function toNull(pullLine) {
	for (const item of pullLine) {
		void item;
	}
}

/**
 * @param {Iterable} pullLine 
 * @returns {Object}
 */
export function toObject(pullLine) {
	return Object.fromEntries(pullLine);
}

/**
 * @param {Observer} pushLine
 * @returns {Function}
 */
export function toPushLine(pushLine) {
	assert(isObserver(pushLine), `"pushLine" is required and must be an Observable.`);

	return function (iterable) {
		try {
			for (const item of iterable) {
				pushLine.next(item);
			}
		} finally {
			closeObserver(pushLine);
		}

		return pushLine;
	};
}

/**
 * @param {Iterable} pullLine 
 * @returns {Set}
 */
export function toSet(pullLine) {
	return new Set(pullLine);
}

/**
 * @param {Iterable} pullLine 
 * @returns {any}
 */
export function toValue(pullLine) {
	let firstValue = undefined;
	let count = 0;

	for (const item of pullLine) {
		assert(count === 0, `"toValue()" may be applied only to a sequence of one item, but got at least 2.`);

		firstValue = item;
		count++;
	}

	assert(count === 1, `"toValue()" may be applied only to a sequence of one item, but got none.`);

	return firstValue;
}
