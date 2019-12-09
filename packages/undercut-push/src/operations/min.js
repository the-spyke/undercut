import { abort, asObserver, close, Cohort } from "@undercut/utils/src/coroutine.js";

export function min() {
	return asObserver(function* (observer) {
		const cohort = Cohort.from(observer);

		let min = null;

		try {
			while (true) {
				const item = yield;

				if (min === null || item < min) {
					min = item;
				}
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine && min !== null) {
					observer.next(min);
				}
			});
		}
	});
}
