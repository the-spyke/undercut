import { assert, assertFunctor } from "./assert.js";
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
export function createIterable(getIterator) {
	assertFunctor(getIterator, `getIterator`);

	return {
		[Symbol.iterator]: getIterator
	};
}

/**
 * Returns the first item of the `iterable` or `undefined`.
 * @type {<T>(iterable: Iterable<T>) => T | undefined}
 */
export function head(iterable) {
	for (const item of iterable) {
		return item;
	}

	return undefined;
}

/**
 * Returns an object with the `head` (the first item, if it exists) and the `tail` (an iterator for remaining items, if there are some).
 * Missing `tail` tells that the `iterable` is empty and there is no `head` value.
 * @type {<T>(iterable: Iterable<T>) => { head: T, tail?: Iterator<T> }}
 */
export function headTail(iterable) {
	const iterator = getIterator(iterable);
	const { value, done } = iterator.next();

	return {
		head: value,
		tail: done ? undefined : iterator,
	};
}

/**
 * Returns the `tail` (an iterator for remaining items) of the `iterable`. In case of an empty `iterable` returns `undefined`.
 * @type {<T>(iterable: Iterable<T>) => Iterator<T> | undefined}
 */
export function tail(iterable) {
	const iterator = getIterator(iterable);
	const { done } = iterator.next();

	return done ? undefined : iterator;
}

function* iterateMapTreeRec(predicate, mapper, item, index, depth) {
	const mappedItem = mapper ? mapper(item, index, depth) : item;

	if (predicate(mappedItem, index, depth)) {
		let childIndex = 0;

		for (const childItem of mappedItem) {
			yield* iterateMapTreeRec(predicate, mapper, childItem, childIndex, depth + 1);

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
		return iterateMapTreeRec(predicate, mapper, item, index, 0);
	};
}
