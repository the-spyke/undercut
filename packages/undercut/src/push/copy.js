import { assertFunctor } from "../../utils/assert.js";
import { tryCloseObserver } from "../../utils/observer.js";

export function reduce(reducer) {
	assertFunctor(reducer, "reducer");

	return function* (observer) {
		let success = true;
		let acc = initial;

		try {
			let index = 0;

			while (true) {
				acc = reducer(acc, yield, index);
				index++;
			}

			for (let index = 0; ; index++) {
				acc = predicate(acc, yield, index);
			}

			if (predicate(item, index)) {
				observer.next(item);
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
