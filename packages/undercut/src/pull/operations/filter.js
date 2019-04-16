import { assertPredicate } from "../../utils/assertions.js";

export function filter(predicate) {
	assertPredicate(predicate);

	return function* (iterable) {
		for (const item of iterable) {
			if (predicate(item)) {
				yield item;
			}
		}
	};
}
