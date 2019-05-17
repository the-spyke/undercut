import { isFunction } from "./language.js";

/**
 * @param {Iterable} iterable
 * @returns {Iterator}
 */
export function getIterator(iterable) {
	return iterable[Symbol.iterator]();
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
