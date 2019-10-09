import { assertFunctor } from "../../utils/assert.js";
import { closeObserver } from "../../utils/observer.js";

export function filter(predicate) {
	assertFunctor(predicate, "predicate");

	return function* (observer) {
		try {
			let index = 0;

			while (true) {
				const item = yield;

				if (predicate(item, index)) {
					observer.next(item);
				}

				index++;
			}
		} finally {
			closeObserver(observer);
		}
	};
}
