import { assert, assertFunctor } from "@undercut/utils/src/assert.js";
import { numbers, strings } from "@undercut/utils/src/compare.js";
import { abort, asObserver, close, Cohort } from "@undercut/utils/src/coroutine.js";
import { asc, desc } from "@undercut/utils/src/ordering.js";

export function sort(comparator, order = asc) {
	assertFunctor(comparator, `comparator`);
	assert(order === asc || order === desc, `"order" must be the asc or the desc function.`);

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
					items.sort(comparator);

					if (order === asc) {
						for (const item of items) {
							observer.next(item);
						}
					} else {
						for (let index = items.length - 1; index >= 0; index--) {
							observer.next(items[index]);
						}
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
