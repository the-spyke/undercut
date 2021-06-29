import type { Observer, PushOperation } from "@undercut/types";

import { abort, asObserver, close, Cohort } from "@undercut/utils";

export function includes<T>(value: T): PushOperation<T, boolean> {
	return asObserver(function* (observer: Observer<boolean>) {
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
