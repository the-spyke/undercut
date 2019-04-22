import { assertPredicate } from "../../utils/assertions.js";

export function every(predicate) {
	assertPredicate(predicate);

	return function* (iterable) {
		let result = true;
		let index = 0;

		for (const item of iterable) {
			result = predicate(item, index);

			if (!result) {
				break;
			}

			index++;
		}

		yield result;
	};
}
