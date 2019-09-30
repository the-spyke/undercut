import { assertFunctor } from "../../utils/assert.js";
import { numbers, strings } from "../../utils/compare.js";
import { tryCloseObserver } from "../../utils/observer.js";
import { reverseComparator } from "../../utils/sorting.js";

export function sort(comparator, isReverse = false) {
	assertFunctor(comparator, "comparator");

	const actualComparator = isReverse ? reverseComparator(comparator) : comparator;

	return function* (observer) {
		const items = [];

		let success = true;

		try {
			while (true) {
				items.push(yield);
			}
		} catch (e) {
			success = false;
			observer.throw(e);
		} finally {
			if (success) {
				for (const item of items.sort(actualComparator)) {
					observer.next(item);
				}
			}

			tryCloseObserver(observer);
		}
	};
}

export function sortNumbers(isReverse = false) {
	return sort(numbers, isReverse);
}

export function sortStrings(isReverse = false) {
	return sort(strings, isReverse);
}
