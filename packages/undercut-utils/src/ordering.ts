import type { Comparator, Selector } from "@undercut/types";

import { assert, assertFunctor } from "./assert";
import { isFunction } from "./language";

export function composeComparators<T>(comparators: Array<Comparator<T>>): Comparator<T> {
	assert(Array.isArray(comparators), `"comparators" must be an array of Comparator.`);
	comparators.forEach((comparator, index) => assert(isFunction(comparator), `#${index} comparator is invalid.`));

	return function (a, b) {
		for (const comparator of comparators) {
			const result = comparator(a, b);

			if (result) {
				return result;
			}
		}

		return 0;
	};
}

function asc<T>(comparator: Comparator<T>): Comparator<T>;
function asc<T, R>(comparator: Comparator<T>, selector: Selector<R, T>): Comparator<R>;
function asc<T, R>(comparator: Comparator<T>, selector?: Selector<R, T>): Comparator<R> {
	assertFunctor(comparator, `comparator`);
	assert(!selector || isFunction(selector), `"selector" should be undefined or a function.`);

	return selector
		? (a, b) => comparator(selector(a), selector(b))
		: ((comparator as unknown) as Comparator<R>);
}

function desc<T>(comparator: Comparator<T>): Comparator<T>;
function desc<T, R>(comparator: Comparator<T>, selector: Selector<R, T>): Comparator<R>;
function desc<T, R>(comparator: Comparator<T>, selector?: Selector<R, T>): Comparator<R> {
	assertFunctor(comparator, `comparator`);
	assert(!selector || isFunction(selector), `"selector" should be undefined or a function.`);

	return selector
		? (a, b) => -comparator(selector(a), selector(b))
		: (a, b) => -((comparator as unknown) as Comparator<R>)(a, b);
}

export { asc, desc };
