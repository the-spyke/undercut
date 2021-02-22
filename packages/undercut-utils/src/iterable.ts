import type { RecMapper, RecPredicate } from "@undercut/types";

import { assert, assertFunctor } from "./assert";
import { isFunction } from "./language";

export function getIterator<T>(iterable: Iterable<T>): Iterator<T> {
	return iterable[Symbol.iterator]();
}

/**
 * A helper for generators to make them reiterable.
 */
export function createIterable<T>(getIterator: () => Iterator<T>): Iterable<T> {
	assertFunctor(getIterator, `getIterator`);

	return {
		[Symbol.iterator]: getIterator
	};
}

/**
 * Returns the first item of the `iterable` or `undefined`.
 */
export function head<T>(iterable: Iterable<T>): T | undefined {
	for (const item of iterable) {
		return item;
	}

	return undefined;
}

/**
 * Returns an object with the `head` (the first item, if it exists) and the `tail` (an iterator for remaining items, if there are some).
 * Missing `tail` tells that the `iterable` is empty and there is no `head` value.
 */
export function headTail<T>(iterable: Iterable<T>) {
	const iterator = getIterator(iterable);
	const { value, done } = iterator.next();

	return {
		head: value,
		tail: done ? undefined : iterator,
	};
}

/**
 * Returns the `tail` (an iterator for remaining items) of the `iterable`. In case of an empty `iterable` returns `undefined`.
 */
export function tail<T>(iterable: Iterable<T>) {
	const iterator = getIterator(iterable);
	const { done } = iterator.next();

	return done ? undefined : iterator;
}

function* mapFilterRec<T, R = T>(
	predicate: RecPredicate<T, R>,
	mapper: RecMapper<T, R> | undefined,
	item: T,
	index: number,
	depth: number
): Iterable<R> {
	const mappedItem = (mapper ? mapper(item, index, depth) : item) as R;

	if (predicate(mappedItem, index, depth)) {
		let childIndex = 0;

		for (const childItem of mappedItem) {
			yield* mapFilterRec(predicate, mapper, childItem, childIndex, depth + 1);

			childIndex++;
		}
	} else {
		yield mappedItem;
	}
}

/**
 * Returns a function for using with the `map` operation: maps an item and its sub-items into an iterator.
 * With it you can walk down a tree or another nested structure: map first and flatten later.
*/
export function getRecursiveMapper<T, R = T>(predicate: RecPredicate<T, R>, mapper?: RecMapper<T, R>) {
	assertFunctor(predicate, `predicate`);
	assert(mapper === undefined || isFunction(mapper), `"mapper" should be a function or undefined.`);

	return function recursiveMapper(item: T, index: number) {
		return mapFilterRec(predicate, mapper, item, index, 0) as Iterable<R>;
	};
}
