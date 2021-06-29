import type { Observer, PushOperation } from "@undercut/types";

import { abort, asObserver, close, Cohort } from "@undercut/utils";

export function last<T>(): PushOperation<T> {
	return asObserver(function* (observer: Observer<T>) {
		const cohort = Cohort.of(observer);

		let hasItems = false;
		let item: T | undefined = undefined;

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
					observer.next(item as T);
				}
			});
		}
	});
}
