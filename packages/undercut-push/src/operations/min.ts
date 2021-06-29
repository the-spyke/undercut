import type { Observer, PushOperation } from "@undercut/types";

import { abort, asObserver, close, Cohort } from "@undercut/utils";

export function min(): PushOperation<number> {
	return asObserver(function* (observer: Observer<number>) {
		const cohort = Cohort.of(observer);

		let min: number | null = null;

		try {
			while (true) {
				const item: number = yield;

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
