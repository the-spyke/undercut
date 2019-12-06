import { assertFunctor } from "../../utils/assert.js";
import { abort, asObserver, close, Cohort } from "../../utils/coroutine.js";

export function reduce(reducer, initial) {
	assertFunctor(reducer, `predicate`);

	return asObserver(function* (observer) {
		const cohort = Cohort.from(observer);

		let acc = initial;

		try {
			let index = 0;

			while (true) {
				acc = reducer(acc, yield, index);
				index++;
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					observer.next(acc);
				}
			});
		}
	});
}
