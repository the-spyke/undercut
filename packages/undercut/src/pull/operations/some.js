import { assertPredicate } from "../../utils/assertions.js";

export function some(predicate) {
	assertPredicate(predicate);

	return function* (iterable) {
		for (const item of iterable) {
			if (predicate(item)) {
				yield true;

				return;
			}
		}

		yield false;
	};
}
