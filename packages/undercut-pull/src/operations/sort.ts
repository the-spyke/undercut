import { assertFunctor } from "@undercut/utils/src/assert.js";
import { numbers, strings } from "@undercut/utils/src/compare.js";
import { asc } from "@undercut/utils/src/ordering.js";

export function sort(comparator, order = asc) {
	assertFunctor(comparator, `comparator`);
	assertFunctor(order, `order`);

	const compare = order(comparator);

	return function* (iterable) {
		yield* [...iterable].sort(compare);
	};
}

export function sortNumbers(order = asc) {
	return sort(numbers, order);
}

export function sortStrings(order = asc) {
	return sort(strings, order);
}
