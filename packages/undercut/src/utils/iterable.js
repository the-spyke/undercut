import { assertFunctor } from "./assert.js";
import { isFunction } from "./language.js";

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

/**
 * Closes the iterator if it has the `return()` method and returns `true` in this case.
 * @param {Iterator} iterator
 * @returns {boolean}
 */
export function tryCloseIterator(iterator) {
	if (isFunction(iterator.return)) {
		iterator.return();

		return true;
	}

	return false;
}
