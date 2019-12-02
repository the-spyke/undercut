import { assertFunctor } from "./assert.js";

export {
	close as closeIterator,
	useClosable as useIterator,
} from "./generator.js";

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
