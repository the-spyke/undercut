import type { Observer, PushOperation } from "@undercut/types";

import { abort, asObserver, close, Cohort } from "@undercut/utils";

export function average(): PushOperation<number> {
	return asObserver(function* (observer: Observer<number>) {
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
