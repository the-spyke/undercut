import { assertFunctor } from "../../utils/assert.js";
import { closeObserver } from "../../utils/observer.js";

export function some(predicate) {
	assertFunctor(predicate, `predicate`);

	return function* (observer) {
		let success = true;
		let result = false;

		try {
			let index = 0;

			while (!result) {
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

			closeObserver(observer);
		}
	};
}
