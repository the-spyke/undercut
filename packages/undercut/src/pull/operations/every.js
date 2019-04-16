import { assertPredicate } from "../../utils/assertions.js";

export function every(predicate) {
	assertPredicate(predicate);

	return function* (iterable) {
		let result = true;

		for (const item of iterable) {
			result = predicate(item);

			if (!result) {
				break;
			}
		}

		yield result;
	};
}
