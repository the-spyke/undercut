import { assertPredicate } from "../../utils/assertions.js";

export function takeWhile(predicate) {
	assertPredicate(predicate);

	return function* (iterable) {
		for (const item of iterable) {
			if (predicate(item)) {
				yield item;
			} else {
				return;
			}
		}
	};
}
