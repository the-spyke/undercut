import { assertFunctor } from "../../utils/assert.js";

export function filter(predicate) {
	assertFunctor(predicate, "predicate");

	return function* (next) {
		let index = 0;

		while (true) {
			const item = yield;

			if (predicate(item, index)) {
				next.next(item);
			}

			index++;
		}
	};
}
