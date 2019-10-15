import { assert, assertFunctor } from "../../utils/assert.js";
import { numbers, strings } from "../../utils/compare.js";
import { closeObserver } from "../../utils/observer.js";
import { asc, desc } from "../../utils/ordering.js";

export function sort(comparator, order = asc) {
	assertFunctor(comparator, "comparator");
	assert(order === asc || order === desc, `"order" must be the asc or the desc function.`);

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

			closeObserver(observer);
		}
	};
}

export function sortNumbers(order = asc) {
	return sort(numbers, order);
}

export function sortStrings(order = asc) {
	return sort(strings, order);
}
