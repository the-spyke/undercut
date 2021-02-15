import { assertFunctor } from "@undercut/utils/assert";
import { asc, compare  } from "@undercut/utils";

export function sort(comparator, order = asc) {
	assertFunctor(comparator, `comparator`);
	assertFunctor(order, `order`);

	const orderedComparator = order(comparator);

	return function* (iterable) {
		yield* [...iterable].sort(orderedComparator);
	};
}

export function sortNumbers(order = asc) {
	return sort(compare.numbers, order);
}

export function sortStrings(order = asc) {
	return sort(compare.strings, order);
}
