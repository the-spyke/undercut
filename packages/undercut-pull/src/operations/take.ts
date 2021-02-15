import { assert, assertFunctor } from "@undercut/utils/src/assert.js";
import { isPositiveOrZero } from "@undercut/utils/src/language.js";

export function take(count) {
	assert(isPositiveOrZero(count), `"count" is required, must be a number >= 0.`);

	count = Math.trunc(count);

	return function* (iterable) {
		if (!count) {
			return;
		}

		let index = 0;

		for (const item of iterable) {
			yield item;
			index++;

			if (index >= count) {
				return;
			}
		}
	};
}

export function takeWhile(predicate) {
	assertFunctor(predicate, `predicate`);

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			if (!predicate(item, index)) {
				return;
			}

			yield item;
			index++;
		}
	};
}
