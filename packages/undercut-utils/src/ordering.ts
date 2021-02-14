import { assert, assertFunctor } from "./assert.js";
import { isFunction } from "./language.js";

export function composeComparators(comparators) {
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

/**
 * @typedef {<T>(a: T, b: T) => number} Comparator
 * @param {Comparator} comparator
 * @param {(value: any) => any} [selector]
 * @returns {Comparator}
*/
export function asc(comparator, selector) {
	assertFunctor(comparator, `comparator`);
	assert(!selector || isFunction(selector), `"selector" should be undefined or a function.`);

	return selector
		? (a, b) => comparator(selector(a), selector(b))
		: comparator;
}

/**
 * @typedef {<T>(a: T, b: T) => number} Comparator
 * @param {Comparator} comparator
 * @param {(value: any) => any} [selector]
 * @returns {Comparator}
*/
export function desc(comparator, selector) {
	assertFunctor(comparator, `comparator`);
	assert(!selector || isFunction(selector), `"selector" should be undefined or a function.`);

	return selector
		? (a, b) => -comparator(selector(a), selector(b))
		: (a, b) => -comparator(a, b);
}
