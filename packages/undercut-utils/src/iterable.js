import { assert, assertFunctor } from "./assert.js";
import { isFunction } from "./language";

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

/**
 * Returns the first item of the `iterable` or `undefined`.
 * @type {<T>(iterable: Iterable<T>) => T | undefined }
 */
export function peekIterable(iterable) {
	for (const item of iterable) {
		return item;
	}

	return undefined;
}

function* iterateMapTreeRec(mapper, predicate, item, index, depth) {
	const mappedItem = mapper ? mapper(item, index, depth) : item;

	if (predicate(mappedItem, index, depth)) {
		let childIndex = 0;

		for (const childItem of mappedItem) {
			yield* iterateMapTreeRec(mapper, predicate, childItem, childIndex, depth + 1);

			childIndex++;
		}
	} else {
		yield mappedItem;
	}
}

/**
 * Returns a function for using with the `map` operation: maps an item and its sub-items into an iterator.
 * With it you can walk down a tree or another nested structure, map it and flatten it later.
 * @param {(item: T, index: number, depth: number) => boolean} predicate
 * @param {(item: T, index: number, depth: number) => any} [mapper]
 * @returns {<T, R>(item: T, index: number) => Iterator<R>}
*/
export function getRecursiveMapper(predicate, mapper) {
	assertFunctor(predicate, `predicate`);
	assert(mapper === undefined || isFunction(mapper), `"mapper" should be a function or undefined.`);

	return function recursiveMapper(item, index) {
		return iterateMapTreeRec(mapper, predicate, item, index, 0);
	};
}
