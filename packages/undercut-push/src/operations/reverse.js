import { abort, asObserver, close, Cohort } from "@undercut/utils/src/coroutine.js";

export function reverse() {
	return asObserver(function* (observer) {
		const cohort = Cohort.from(observer);
		const items = [];

		try {
			while (true) {
				items.push(yield);
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					for (let i = items.length - 1; i >= 0; i--) {
						observer.next(items[i]);
					}
				}
			});
		}
	});
}
