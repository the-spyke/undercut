import type { Comparator, PushOperation } from "@undercut/types";

import { assertFunctor } from "@undercut/utils/assert";
import { abort, asc, close, Cohort, compare } from "@undercut/utils"; // eslint-disable-line import/named

import { asPushOperation } from "../push_core";

export function sort<T>(comparator: Comparator<T>, order: any = asc): PushOperation<T> {
	assertFunctor(comparator, `comparator`);
	assertFunctor(order, `order`);

	const orderedComparator: Comparator<T> = order(comparator);

	return asPushOperation<T>(function* (observer) {
		const cohort = Cohort.of(observer);
		const items: T[] = [];

		try {
			while (true) {
				items.push(yield);
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					items.sort(orderedComparator);

					for (const item of items) {
						observer.next(item);
					}
				}
			});
		}
	});
}

export function sortNumbers(order = asc) {
	return sort(compare.numbers, order);
}

export function sortStrings(order = asc) {
	return sort(compare.strings, order);
}
