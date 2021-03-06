import { abort, asObserver, close, Cohort } from "@undercut/utils/src/coroutine.js";

export function average() {
	return asObserver(function* (observer) {
		const cohort = Cohort.of(observer);

		let sum = 0;
		let count = 0;

		try {
			while (true) {
				sum += yield;
				count++;
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					observer.next(count && sum / count);
				}
			});
		}
	});
}
