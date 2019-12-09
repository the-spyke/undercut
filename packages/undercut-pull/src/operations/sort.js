import { assert, assertFunctor } from "@undercut/utils/src/assert.js";
import { numbers, strings } from "@undercut/utils/src/compare.js";
import { asc, desc } from "@undercut/utils/src/ordering.js";

export function sort(comparator, order = asc) {
	assertFunctor(comparator, `comparator`);
	assert(order === asc || order === desc, `"order" must be the asc or the desc function.`);

	return function* (iterable) {
		const items = [...iterable].sort(comparator);

		if (order === asc) {
			yield* items;
		} else {
			for (let index = items.length - 1; index >= 0; index--) {
				yield items[index];
			}
		}
	};
}

export function sortNumbers(order = asc) {
	return sort(numbers, order);
}

export function sortStrings(order = asc) {
	return sort(strings, order);
}
