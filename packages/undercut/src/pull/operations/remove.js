import { assertPredicate } from "../../utils/assertions.js";

export function remove(predicate) {
	assertPredicate(predicate);

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			if (!predicate(item, index)) {
				yield item;
			}

			index++;
		}
	};
}
