import { assertFunctor } from "../../utils/assert.js";
import { abort, asObserver, close, Cohort } from "../../utils/coroutine.js";

export function every(predicate) {
	assertFunctor(predicate, `predicate`);

	return asObserver(function* (observer) {
		const cohort = Cohort.from(observer);

		let result = true;

		try {
			let index = 0;

			while (result) {
				result = predicate(yield, index);
				index++;
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					observer.next(result);
				}
			});
		}
	});
}
