import { assertFunctor } from "./assert.js";

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
export function createIterable(getIterator) {
	assertFunctor(getIterator, `getIterator`);

	return {
		[Symbol.iterator]: getIterator
	};
}
