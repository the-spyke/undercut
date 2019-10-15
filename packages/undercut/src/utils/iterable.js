import { assertFunctor } from "./assert.js";
import { isFunction } from "./language.js";

/**
 * Closes the iterator if it has the `return()` method.
 * @param {Iterator} iterator
 * @returns {void}
 */
export function closeIterator(iterator) {
	if (isFunction(iterator.return)) {
		iterator.return();
	}
}

/**
 * @param {Iterable} iterable
 * @returns {Iterator}
 */
export function getIterator(iterable) {
	return iterable[Symbol.iterator]();
}

/**
 * A helper for generators to make them reiterable.
 * @param {Function} getIterator
 * @returns {Iterable}
 */
export function makeReiterable(getIterator) {
	assertFunctor(getIterator, `getIterator`);

	return {
		[Symbol.iterator]: getIterator,
		isReiterable: true,
	};
}
