import { assert, assertFunctor } from "../../utils/assert.js";
import { isPositiveOrZero } from "../../utils/language.js";

export function take(count) {
	assert(isPositiveOrZero(count), `"count" is required, must be a number >= 0.`);

	count = Math.trunc(count);

	return takeWhile((_, i) => i < count);
}

export function takeWhile(predicate) {
	assertFunctor(predicate, "predicate");

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			if (predicate(item, index)) {
				yield item;
			} else {
				return;
			}

			index++;
		}
	};
}
