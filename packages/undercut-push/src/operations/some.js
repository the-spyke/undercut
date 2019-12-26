import { assertFunctor } from "@undercut/utils/src/assert.js";
import { abort, asObserver, close, Cohort } from "@undercut/utils/src/coroutine.js";

export function some(predicate) {
	assertFunctor(predicate, `predicate`);

	return asObserver(function* (observer) {
		const cohort = Cohort.of(observer);

		let result = false;

		try {
			let index = 0;

			while (!result) {
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
