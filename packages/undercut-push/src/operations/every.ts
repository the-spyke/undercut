import type { Observer, Predicate, PushOperation } from "@undercut/types";

import { assertFunctor } from "@undercut/utils/assert";
import { abort, asObserver, close, Cohort } from "@undercut/utils";

export function every<T>(predicate: Predicate<T>): PushOperation<T, boolean> {
	assertFunctor(predicate, `predicate`);

	return asObserver(function* (observer: Observer<boolean>) {
		const cohort = Cohort.of(observer);

		let result = true;

		try {
			let index = 0;

			while (result) {
				result = predicate(yield, index);
				index++;
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					observer.next(result);
				}
			});
		}
	});
}
