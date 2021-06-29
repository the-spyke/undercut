import type { Observer, PushOperation } from "@undercut/types";

import { abort, asObserver, close, Cohort } from "@undercut/utils";

export function reverse<T>(): PushOperation<T> {
	return asObserver(function* (observer: Observer<T>) {
		const cohort = Cohort.of(observer);
		const items: T[] = [];

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
