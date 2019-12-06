import { abort, asObserver, close, Cohort } from "../../utils/coroutine.js";

export function max() {
	return asObserver(function* (observer) {
		const cohort = Cohort.from(observer);

		let max = null;

		try {
			while (true) {
				const item = yield;

				if (max === null || item > max) {
					max = item;
				}
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine && max !== null) {
					observer.next(max);
				}
			});
		}
	});
}
