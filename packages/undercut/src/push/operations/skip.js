import { assert, assertFunctor } from "../../utils/assert.js";
import { isPositiveOrZero } from "../../utils/language.js";
import { closeObserver } from "../../utils/observer.js";

export function skip(count) {
	assert(isPositiveOrZero(count), `"count" is required, must be a number >= 0.`);

	count = Math.trunc(count);

	return skipWhile((_, i) => i < count);
}

export function skipWhile(predicate) {
	assertFunctor(predicate, "predicate");

	return function* (observer) {
		try {
			let skip = true;
			let index = 0;

			while (true) {
				const item = yield;

				if (skip) {
					skip = predicate(item, index);
					index++;

					if (skip) {
						continue;
					}
				}

				observer.next(item);
			}
		} finally {
			closeObserver(observer);
		}
	};
}
