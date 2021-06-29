import type { Observer, PushOperation } from "@undercut/types";

import { abort, asObserver, close, Cohort } from "@undercut/utils";

export function max(): PushOperation<number> {
	return asObserver(function* (observer: Observer<number>) {
		const cohort = Cohort.of(observer);

		let max: number | null = null;

		try {
			while (true) {
				const item: number = yield;

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
