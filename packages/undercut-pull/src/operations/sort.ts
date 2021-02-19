import type { Comparator, PullOperation } from "@undercut/types";

import { assertFunctor } from "@undercut/utils/assert";
import { asc, compare } from "@undercut/utils";

export function sort<T>(comparator: Comparator<T>, order: any = asc): PullOperation<T> {
	assertFunctor(comparator, `comparator`);
	assertFunctor(order, `order`);

	const orderedComparator = order(comparator);

	return function* (iterable) {
		yield* [...iterable].sort(orderedComparator);
	};
}

export function sortNumbers(order = asc): PullOperation<number> {
	return sort(compare.numbers, order);
}

export function sortStrings(order = asc): PullOperation<string> {
	return sort(compare.strings, order);
}
