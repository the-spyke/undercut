import { assertFunctor } from "../../utils/assert.js";
import { tryCloseObserver } from "../../utils/observer.js";

export function reduce(reducer, initial) {
	assertFunctor(reducer, "predicate");

	return function* (observer) {
		let success = true;
		let acc = initial;

		try {
			let index = 0;

			while (true) {
				acc = reducer(acc, yield, index);
				index++;
			}
		} catch (e) {
			success = false;
			observer.throw(e);
		} finally {
			if (success) {
				observer.next(acc);
			}

			tryCloseObserver(observer);
		}
	};
}
