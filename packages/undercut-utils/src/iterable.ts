import type { RecMapper, RecPredicate } from "@undercut/types";

import { assert, assertFunctor } from "./assert";
import { isFunction } from "./language";

export function getIterator<T>(iterable: Iterable<T>) {
	return iterable[Symbol.iterator]();
}

/**
 * A helper for generators to make them reiterable.
 */
export function createIterable<T, TReturn = any, TNext = undefined>(getIterator: () => Iterator<T, TReturn, TNext>) {
	assertFunctor(getIterator, `getIterator`);

	return {
		[Symbol.iterator]: getIterator
	};
}

/**
 * Returns the first item of the `iterable` or `undefined`.
 */
export function head<T>(iterable: Iterable<T>) {
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

export function* iterateMapRec<T, R, TReturn extends Iterable<T> | R>(
	predicate: RecPredicate<R, T>,
	mapper: RecMapper<T, TReturn> | undefined,
	item: T,
	index: number,
	depth: number
): Generator<TReturn> {
	const mappedItem = (mapper ? mapper(item, index, depth) : item) as TReturn;

	if (predicate(mappedItem, index, depth)) {
		let childIndex = 0;

		for (const childItem of mappedItem) {
			yield* iterateMapRec(predicate, mapper, childItem, childIndex, depth + 1);

			childIndex++;
		}
	} else {
		yield (mappedItem as TReturn);
	}

	// @ts-ignore
	return undefined;
}

/**
 * Returns a function for using with the `map` operation: maps an item and its sub-items into an iterator.
 * With it you can walk down a tree or another nested structure, map it and flatten it later.
*/
export function getRecursiveMapper<T, R>(predicate: RecPredicate<R, T>, mapper?: RecMapper<T, R | Iterable<T>>) {
	assertFunctor(predicate, `predicate`);
	assert(mapper === undefined || isFunction(mapper), `"mapper" should be a function or undefined.`);

	return function recursiveMapper(item: T, index: number) {
		return iterateMapRec(predicate, mapper, item, index, 0) as Iterable<R>;
	};
}
