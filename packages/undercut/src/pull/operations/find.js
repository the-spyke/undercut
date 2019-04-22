import { assertPredicate } from "../../utils/assertions.js";

export function find(predicate) {
	assertPredicate(predicate);

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			if (predicate(item, index)) {
				yield item;

				return;
			}

			index++;
		}
	};
}

export function findIndex(predicate) {
	assertPredicate(predicate);

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			if (predicate(item, index)) {
				yield index;

				return;
			}

			index++;
		}
	};
}
