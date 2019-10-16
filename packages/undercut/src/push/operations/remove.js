import { assertFunctor } from "../../utils/assert.js";
import { closeObserver } from "../../utils/observer.js";

export function remove(predicate) {
	assertFunctor(predicate, "predicate");

	return function* (observer) {
		try {
			let index = 0;

			while (true) {
				const item = yield;

				if (!predicate(item, index)) {
					observer.next(item);
				}

				index++;
			}
		} catch (e) {
			observer.throw(e);
		} finally {
			closeObserver(observer);
		}
	};
}