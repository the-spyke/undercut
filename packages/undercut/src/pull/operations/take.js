import { assertCount, assertFunctor } from "../../utils/assert.js";

export function take(count) {
	assertCount(count);

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
