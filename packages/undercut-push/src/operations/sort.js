import { assertFunctor } from "@undercut/utils/src/assert.js";
import { numbers, strings } from "@undercut/utils/src/compare.js";
import { abort, asObserver, close, Cohort } from "@undercut/utils/src/coroutine.js";
import { asc } from "@undercut/utils/src/ordering.js";

export function sort(comparator, order = asc) {
	assertFunctor(comparator, `comparator`);
	assertFunctor(order, `order`);

	const compare = order(comparator);

	return asObserver(function* (observer) {
		const cohort = Cohort.of(observer);
		const items = [];

		try {
			while (true) {
				items.push(yield);
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					items.sort(compare);

					for (const item of items) {
						observer.next(item);
					}
				}
			});
		}
	});
}

export function sortNumbers(order = asc) {
	return sort(numbers, order);
}

export function sortStrings(order = asc) {
	return sort(strings, order);
}
