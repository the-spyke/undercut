import { abort, asObserver, close, Cohort } from "@undercut/utils/src/coroutine.js";

export function last() {
	return asObserver(function* (observer) {
		const cohort = Cohort.from(observer);

		let hasItems = false;
		let item = undefined;

		try {
			while (true) {
				item = yield;
				hasItems = true;
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine && hasItems) {
					observer.next(item);
				}
			});
		}
	});
}
