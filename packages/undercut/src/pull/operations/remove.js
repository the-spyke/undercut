import { assertFunctor } from "../../utils/assert.js";

export function remove(predicate) {
	assertFunctor(predicate, `predicate`);

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
