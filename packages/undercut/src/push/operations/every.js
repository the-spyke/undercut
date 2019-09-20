import { assertFunctor } from "../../utils/assert.js";
import { tryCloseObserver } from "../../utils/observer.js";

export function every(predicate) {
	assertFunctor(predicate, "predicate");

	return function* (observer) {
		let success = true;
		let result = true;

		try {
			let index = 0;

			while (result) {
				result = predicate(yield, index);
				index++;
			}
		} catch (e) {
			success = false;
			observer.throw(e);
		} finally {
			if (success) {
				observer.next(result);
			}

			tryCloseObserver(observer);
		}
	};
}
