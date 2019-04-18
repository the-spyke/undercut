import { assertPredicate } from "../../utils/assertions.js";

export function find(predicate) {
	assertPredicate(predicate);

	return function* (iterable) {
		for (const item of iterable) {
			if (predicate(item)) {
				yield item;

				return;
			}
		}
	};
}

export function findIndex(predicate) {
	assertPredicate(predicate);

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			if (predicate(item)) {
				yield index;

				return;
			}

			index += 1;
		}
	};
}
