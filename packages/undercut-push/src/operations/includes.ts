import { abort, asObserver, close, Cohort } from "@undercut/utils/src/coroutine.js";

export function includes(value) {
	return asObserver(function* (observer) {
		const cohort = Cohort.of(observer);

		let hasValue = false;

		try {
			while (!hasValue) {
				hasValue = (yield) === value;
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					observer.next(hasValue);
				}
			});
		}
	});
}
