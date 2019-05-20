import { assert } from "../utils/assert.js";

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
	let value = undefined;
	let isFirstValue = true;

	for (const item of pullLine) {
		assert(isFirstValue, `"toValue()" may be applied only to a sequence of one item.`);

		value = item;
		isFirstValue = false;
	}

	return value;
}
