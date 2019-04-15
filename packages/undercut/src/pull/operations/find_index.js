import { assert } from "../../utils/helpers.js";
import { isFunction } from "../../utils/lang.js";

export function findIndex(predicate) {
	assert(isFunction(predicate), "Predicate is required.");

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
